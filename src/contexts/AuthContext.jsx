import React, { createContext } from "react";
import sendRequest from "../utils/Request";

const Context = createContext();

export const AuthStatus = {
    WAITING: 0,
    AUTHENTICATED: 1,
    UNVERIFIED: 2,
    UNAUTHENTICATED: 3,
}

export const Types = {
    LOGIN: 0,
    SIGNUP: 1,
    LOGOUT: 2,
}

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = React.useState({ status: AuthStatus.WAITING, user: null });

    React.useEffect(() => {
        getUser(setAuth);
    }, []);

    return (
        <Context.Provider value={{auth, setAuth: (type, data, setErrors) => authRequest(type, data, setErrors, auth, setAuth)}}>
            {children}
        </Context.Provider>
    );
}

const getUser = async (setAuth) => {
    const res = await sendRequest("api/user");
    if (res.ok) {
        setAuth({ status: AuthStatus.AUTHENTICATED, user: await res.json() });
    } else {
        setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
    }
}

const authRequest = async (type, data, setErrors, auth, setAuth) => {

    if (auth.status === AuthStatus.WAITING) return;

    switch (type) {
        case Types.LOGIN: {
            const res = await sendRequest("login", "POST", data);
            if (res.ok){
                setAuth({ status: AuthStatus.AUTHENTICATED, user: await res.json() });
            } else if (res.status === 422){
                setErrors( (await res.json())?.message);
                setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
            }
            return;
        }
        case Types.SIGNUP: {
            const res = await sendRequest("register", "POST", data);
            if (res.ok){
                setAuth({ status: AuthStatus.AUTHENTICATED, user: await res.json() });
            } else if (res.status === 422){
                setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
                setErrors((await res.json())?.message);
            }
            break;
        }
        case Types.LOGOUT: {
            const res = await sendRequest("logout", "POST");
            if (res.ok){
                setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
            }
            break;
        }
        default: return;
    }
}

export default AuthProvider;

export function useAuth() { return React.useContext(Context) };