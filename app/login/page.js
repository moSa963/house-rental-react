"use client"
import LoginForm from "@/components/Form/LoginForm";
import Signin from "@/components/Form/SigninForm";
import ActionsBar from "@/components/elements/ActionsBar/ActionsBar";
import ProgressLinear from "@/components/elements/ProgressLinear";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";


const Card = ({ hidden, children }) => {

    return (
        <div style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "all" }}
            className="absolute transition-opacity w-full h-full bg-level2 drop-shadow-md rounded-lg p-5 overflow-y-auto">
            {children}
        </div>
    );
}

const Register = () => {
    const [selected, setSelected] = React.useState("login");
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState(false);
    const { login, register } = useAuth();

    const handleSubmit = async (f, data) => {
        setProcessing(true);

        await f(data, setError);

        setProcessing(false);
    }

    return (
        <div className="w-full bg-inherit mt-24 max-w-2xl px-2 ">
            <ActionsBar actions={{Login: "login", Signup: "register"}} onChange={setSelected} value={selected} />
            {error && <p>{error}</p>}
            <div className="relative w-full h-[800px] my-9">
                <Card hidden={selected !== "login"}>
                    <ProgressLinear active={processing}/>
                    <LoginForm onSubmit={(data) => handleSubmit(login, data)} disabled={processing} />   
                </Card>  
                <Card hidden={selected !== "register"}>
                    <ProgressLinear active={processing}/>
                    <Signin onSubmit={(data) => handleSubmit(register, data)} disabled={processing}/>
                </Card>
            </div>
        </div>
    );
}

export default Register;