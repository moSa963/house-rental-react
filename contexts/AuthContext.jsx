import request from "@/utils/Request";
import React, { createContext } from "react";

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
        <Context.Provider value={{
                user: auth.user, 
                status: auth.status,
                login: (data, setErrors) => authRequest("login", data, setErrors, auth, setAuth),
                register: (data, setErrors) => authRequest("register", data, setErrors, auth, setAuth),
                logout: (data, setErrors) => authRequest("logout", data, setErrors, auth, setAuth),
            }}>
            {children}
        </Context.Provider>
    );
}

const getUser = async (setAuth) => {
    const res = await request("api/user");

    if (res.ok) {
        const user = await res.json();
        setAuth({ status: AuthStatus.AUTHENTICATED, user });
        return;
    }
    
    setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
}

const authRequest = async (type, data, setErrors, auth, setAuth) => {

    if (auth.status === AuthStatus.WAITING) return;

    const res = await sendRequest(type, "POST", data);

    switch (type) {
        case "login": 
        case "register": 
        {
            if (res.ok){
                const user =  res.json();
                setAuth({ status: AuthStatus.AUTHENTICATED, user });
            } else if (res.status === 422){
                setErrors((await res.json())?.message);
                setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
            }
            return;
        }
        case "logout": 
        {
            if (res.ok){
                setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
            }
            return;
        }
    }
}

export default AuthProvider;

export function useAuth() { return React.useContext(Context) };