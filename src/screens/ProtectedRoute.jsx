import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, AuthStatus } from "../contexts/AuthContext";

const ProtectedRoute = ({ Element, guest, ...rest })=>{
    const { auth } = useAuth();
    
    if (guest && auth.status === AuthStatus.AUTHENTICATED){
        return(
            <Navigate replace to="/" />
        );
    } else if (!guest && auth.status !== AuthStatus.AUTHENTICATED){
        return(
            <Navigate replace to="/login" />
        );
    }

    return <Element {...rest} />;
}

export default ProtectedRoute;