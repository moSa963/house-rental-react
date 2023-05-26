import { Validator } from "@/utils/Validator";
import React from "react";
import TextInput from "../elements/TextInput";
import ButtonGradient from "../elements/ButtonGradient";

const validator = new Validator({
    first_name: {min: 3, max: 50},
    last_name:  {min: 3, max: 50},
    username:   {min: 3, max: 50 , match:/^[A-Za-z]+([._-]?[A-Za-z0-9]+)*$/s},
    email:      {min: 8, max: 50, match:/^[a-zA-z]+([._]?[a-zA-z0-9]+)*[@][a-zA-z]+[.][a-zA-z]+$/s},
    password:   {min: 8, max: 50},
    password_confirmation: { min: 8, max: 50, confirm: 'password'},
});

const Signin = ({ onSubmit, disabled }) => {
    const [inputs, setInputs] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const handleInput = (key, value) => {
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
        <div className="w-full grid grid-cols-1 gap-5 bg-level2">
            <div className="bg-inherit grid grid-cols-2 gap-5">
                <TextInput disabled={disabled} title="First name" error={errors?.first_name} value={inputs?.first_name} onInput={(v) => handleInput("first_name", v)}/>
                <TextInput disabled={disabled} title="Last name" error={errors?.last_name} value={inputs?.last_name} onInput={(v) => handleInput("last_name", v)}/>
            </div>

            <TextInput disabled={disabled} title="Username" error={errors?.username} value={inputs?.username} onInput={(v) => handleInput("username", v)}/>

            <TextInput disabled={disabled} type="email" title="Email" error={errors?.email} value={inputs?.email} onInput={(v) => handleInput("email", v)}/>
        
            <TextInput disabled={disabled} type="password" title="Password" error={errors?.password} value={inputs?.password} onInput={(v) => handleInput("password", v)}/>
        
            <TextInput disabled={disabled} type="password" title="Confirmation" error={errors?.password_confirmation} value={inputs?.password_confirmation} onInput={(v) => handleInput("password_confirmation", v)}/>

            <ButtonGradient disabled={disabled} value="Sign in" onClick={handleClick}/>
        </div>
    )
}

export default Signin;