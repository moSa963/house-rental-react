"use client"
import ButtonGradient from "@/components/elements/ButtonGradient";
import Counter from "@/components/elements/Counter";
import ProgressLinear from "@/components/elements/ProgressLinear";
import Text from "@/components/elements/Text";
import TextInput from "@/components/elements/TextInput";
import request from "@/utils/Request";
import { Validator } from "@/utils/Validator";
import { useRouter } from "next/navigation";
import React from "react";

const validator = new Validator({
    "name": {},
    "country": {},
    "city": {},
    "address": {},
    "zip": { min:5, max:5 },
    "night_cost": {},
    "about": {},
});

const CreateHouse = () => {
    const [inputs, setInputs] = React.useState({lat: 15, lng: 654});
    const [errors, setErrors] = React.useState({});
    const [processing, setProcessing] = React.useState(false);
    const router = useRouter();

    const handleInput = (key, value)=>{
        inputs[key] = value;
        setInputs({...inputs});
        errors[key] = validator.validateOne(key, inputs);
        setErrors({...errors});
    }

    const handleSubmit = ()=>{
        const errs = validator.validate(inputs);

        if (errs){
            setErrors(errs);
            return;
        }
        
        submit(inputs, router, setProcessing);
    }

    return (
        <div className="w-full grid grid-cols-3 bg-inherit mt-24 max-w-5xl px-2">
            <div className="col-span-3 grid grid-cols-1 text-center" >
                <Text type="h3">Host your place and start earning money</Text>
                <hr className="my-3 border-primary"/>
            </div>
            <div className="col-span-3 md:col-span-2 grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                <ProgressLinear active={processing}/>
                <TextInput value={inputs?.name} title="Name" error={errors?.name} onInput={(e) => handleInput("name", e)} disabled={processing}/>
                <div className="grid grid-cols-2 gap-5 bg-inherit">
                    <TextInput value={inputs?.country} title="Country" error={errors?.country} onInput={(e) => handleInput("country", e)} disabled={processing}/>
                    <TextInput value={inputs?.city} title="City" error={errors?.city} onInput={(e) => handleInput("city", e)} disabled={processing}/>
                </div>
                <TextInput value={inputs?.address} title="Address" error={errors?.address}  onInput={(e) => handleInput("address", e)} disabled={processing}/>
                <TextInput value={inputs?.zip} title="zip" error={errors?.zip} onInput={(e) => handleInput("zip", e)} disabled={processing} />

                <div className="flex bg-inherit">
                    <p className="mr-3">Night cost: </p>
                    <Counter min={1} step={0.1} value={parseFloat(inputs?.night_cost) || 1} onChange={(v) => handleInput("night_cost", v)} disabled={processing}/>
                </div>
                <p title="here you can add more information about your place">About this place: </p>
                <textarea value={inputs?.about} onInput={(e)=>handleInput("about", e.currentTarget.value)} className="w-full resize-y outline-none border-[1px] bg-transparent border-primary bg-opacity-25 text-lg p-5" disabled={processing}></textarea>
                <ButtonGradient disabled={processing} onClick={handleSubmit} value="Save"/>
            </div>
        </div>
    );
}


const submit = async (inputs, router, setProcessing) => {
    setProcessing(true);

    const res = await request("api/house", "POST", inputs);

    if (res.ok){
        const js = await res.json();
        router.push(`/house/${js.data.id}/update`);
        return;
    }

    setProcessing(false);
}

export default CreateHouse;