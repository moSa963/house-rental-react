import React from "react";
import Text from "../elements/Text";
import TextInput from "../elements/TextInput";
import Counter from "../elements/Counter";
import Button from "../elements/Button";
import request from "@/utils/Request";
import Link from "next/link";

const UpdateHouseInfoForm = ({ house, processing, setProcessing, inputs, setInputs }) => {
    
    const handleInput = (key, value)=>{
        inputs[key] = value;
        setInputs({...inputs});
    }

    return (
        <React.Fragment>
            <Text type="h4" >Id: <Link className="hover:text-slate-700" href={"/house/" + house?.id}>{house?.id}</Link> </Text>

            <TextInput value={inputs?.name} title="Name" error="" onInput={(e) => handleInput("name", e)} disabled={processing}/>

            <div className="flex bg-inherit">
                <p className="mr-5">Night cost: </p>
                <Counter min={1} step={0.1} value={parseFloat(inputs?.night_cost) || 1} onChange={(e) => handleInput("night_cost", e)} disabled={processing}/>
            </div>

            <p title="here you can add more information about your place">About this place: </p>
            <textarea value={inputs?.about} onInput={(e)=>handleInput("about", e.currentTarget.value)} className="w-full resize-y outline-none border-[1px] bg-transparent border-primary bg-opacity-25 text-lg p-5"></textarea>
            <div className="flex w-full justify-end">
                <Button value="Save" onClick={() => updateHouse(house?.id, inputs, setProcessing)} disabled={processing}/>
            </div>
        </React.Fragment>
    );
}

const updateHouse = async (house_id, data, setProcessing)=>{
    setProcessing(true);
    await request(`api/house/${house_id}`, "POST", data);
    setProcessing(false);
}

export default UpdateHouseInfoForm;