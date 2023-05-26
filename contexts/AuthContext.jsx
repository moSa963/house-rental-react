import LoadingScreen from "@/components/LoadingScreen";
import request from "@/utils/Request";
import { usePathname, useRouter } from "next/navigation";
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
    const [{status, user}, setAuth] = React.useState({ status: AuthStatus.WAITING, user: null });
    const path = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        getUser(setAuth);
    }, []);

    React.useEffect(() => {
        if (status === AuthStatus.UNAUTHENTICATED && protected_routes.find(v => path.match(v)))
        {
            router.replace("/login");
        }
    
        if (status === AuthStatus.AUTHENTICATED && guest_routes.find(v => path.match(v)))
        {
            router.replace("/");
        }
    }, [status, path]);

    return (
        <Context.Provider value={{
                user, 
                status,
                login: (data, setErrors) => authRequest("login", data, setErrors, status, setAuth),
                register: (data, setErrors) => authRequest("register", data, setErrors, status, setAuth),
                logout: (data, setErrors) => authRequest("logout", data, setErrors, status, setAuth),
            }}>
            {status === AuthStatus.WAITING ? <LoadingScreen /> : children}
        </Context.Provider>
    );
}

const protected_routes = [
    "profile/*",
    "contract/*",
    "house/*/reservation",
    "house/*/update",
];

const guest_routes = [
    "login",
];

const getUser = async (setAuth) => {
    const res = await request("api/user");

    if (res.ok) {
        const user = await res.json();
        setAuth({ status: AuthStatus.AUTHENTICATED, user });
        return;
    }
    
    setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
}

const authRequest = async (type, data, setErrors, status, setAuth) => {

    if (status === AuthStatus.WAITING) return;

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