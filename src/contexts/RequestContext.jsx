import React, { createContext } from "react";
import sendRequest from "../utils/Request";
import {useNavigate} from "react-router-dom";

const Context = createContext();


const RequestProvider = ({ children }) => {
    const nav = useNavigate();

    return (
        <Context.Provider value={(url, method = "GET", data = null) => Request(url, method, data, nav)}>
            {children}
        </Context.Provider>
    );
}

const Request = async (url, method = "GET", data = null, nav) => {
    try {
        const res = await sendRequest(url, method, data);

        if (res && (res.ok || res.status === 400 || res.status === 422 || res.status === 429)) {
            return res
        };

        if (res.status === 401){
            nav("/login?re=" + window.location.pathname, { replace: true });
        } else {
            nav(`/error?status=${res.status}&&text=${res.statusText}`, { replace: true });
        }

    } catch (e) {
        nav(`/error?text=${e.message}`, { replace: true });
    }
    
    return { ok: false,  status: null, statusText: ""};
}

export default RequestProvider;

export const useRequest = () => React.useContext(Context);