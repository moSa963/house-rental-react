import React from "react";
import LoginForm from "../components/Form/LoginForm";
import Signin from "../components/Form/SigninForm";
import { useAuth, Types } from "../contexts/AuthContext";
import ActionsBar from "../elements/ActionsBar";
import ProgressLinear from "../elements/ProgressLinear";


const Card = ({ hidden, children }) => {

    return (
        <div style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "all" }}
            className="absolute transition-opacity w-full h-full bg-level2 drop-shadow-md rounded-lg p-5 overflow-y-auto">
            {children}
        </div>
    );
}

const Register = () => {
    const [selected, setSelected] = React.useState(Types.LOGIN);
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState(false);
    const {setAuth} = useAuth();

    const handleSubmit = async (data) => {
        setProcessing(true);

        await setAuth(selected, data, setError);

        setProcessing(false);
    }

    return (
        <div className="w-full bg-inherit mt-24 max-w-2xl px-2 ">
            <ActionsBar actions={{Login: Types.LOGIN, Signup: Types.SIGNUP}} onChange={setSelected} value={selected} />
            {error && <p>{error}</p>}
            <div className="relative w-full h-[800px] my-9">
                <Card hidden={selected !== Types.LOGIN}>
                    <ProgressLinear active={processing}/>
                    <LoginForm onSubmit={handleSubmit} disabled={processing} />   
                </Card>  
                <Card hidden={selected !== Types.SIGNUP}>
                    <ProgressLinear active={processing}/>
                    <Signin onSubmit={handleSubmit} disabled={processing}/>
                </Card>
            </div>
        </div>
    );
}

export default Register;