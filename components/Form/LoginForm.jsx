import { Validator } from "@/utils/Validator";
import React from "react";
import TextInput from "../elements/TextInput";
import Switch from "../elements/Switch";
import ButtonGradient from "../elements/ButtonGradient";

const validator = new Validator({
    username: { min: 3, max: 50, match: /^[A-Za-z]+([._-]?[A-Za-z0-9]+)*$/s},
    password: { min: 8, max: 50, }
});

const LoginForm = ({ onSubmit, disabled }) => {
    const [inputs, setInputs] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const handleInput = (key, value)=>{
        inputs[key] = value;
        setInputs({...inputs});
        errors[key] = validator.validateOne(key, inputs);
        setErrors({...errors});
    }

    const handleClick = ()=>{
        const errs = validator.validate(inputs);
        if (errs){
            setErrors(errs);
            return;
        }

        onSubmit && onSubmit(inputs);
    }

    return(
        <div className="w-full grid grid-cols-1 gap-5 bg-inherit">
            <TextInput disabled={disabled} title="Username" error={errors?.username} value={inputs?.username} onInput={(v) => handleInput("username", v)}/>
            <TextInput disabled={disabled} type="password" title="Password" error={errors?.password} value={inputs?.password} onInput={(v) => handleInput("password", v)}/>
            <div className="flex items-center py-4">
                <p className="mr-3">Remember me: </p>
                <Switch disabled={disabled} value={inputs?.remember} onChange={(v) => handleInput("remember", !inputs?.remember)}/>
            </div>
            <ButtonGradient disabled={disabled} value="Login" onClick={handleClick} />
        </div>
    )
}

export default LoginForm;