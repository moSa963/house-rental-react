"use client"
import PaymentForm from "@/components/Form/PaymentForm";
import Button from "@/components/elements/Button";
import ButtonGradient from "@/components/elements/ButtonGradient";
import Text from "@/components/elements/Text";
import { useAuth } from "@/contexts/AuthContext";
import request from "@/utils/Request";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ShowContract = () => {
    const [contract, setContract] = React.useState(null);
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [inputs, setInputs] = React.useState({});

    console.log(contract);
    React.useEffect(()=>{
        getContract(params.id, setContract);
    }, [params.id]);

    const handleInput = (key, value) => {
        inputs[key] = value;
        setInputs({...inputs});
    }

    const handleConfirm = () =>{
        confirm(contract.house_id, contract.id, inputs);
    }

    return (
        <div className="w-full grid grid-cols-1 bg-inherit mt-24 max-w-5xl px-2 gap-5">
            <div className="grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                <div className="p-2 text-center border-2 border-primary rounded-lg"  style={{ backgroundColor: contract?.confirmed ? "#3333ff88" : "#ff333388" }}>
                    <Text type="h5">{contract?.confirmed ? "Confirmed" : "Awaiting Payment"}</Text>
                </div>

                <Text type="h4" >House: <Link className="hover:text-slate-700" href={"/house/" + contract?.house_id}>{contract?.house_id}</Link> </Text>
                <Text type="h4" >Username: {contract?.user.username} </Text>
                
                <Text>Check-in: {contract?.start_date}</Text>
                <Text>Check-out: {contract?.end_date}</Text>
                <Text type="h2">Total Price: {contract?.total_price}$</Text>
            </div>

            {
                !contract?.confirmed && contract?.user.id === user?.id &&
                <>
                    <div className="grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                        <PaymentForm inputs={inputs} onChange={handleInput}/>
                        <ButtonGradient value="Confirm" onClick={handleConfirm}/>
                    </div>
                    <div className="flex justify-end">
                        <Button value="Delete" color="#ff333399" onClick={()=>deleteContract(request, contract.id, () => router.push("/"))}/>
                    </div>
                </>
            }
        </div>
    );
}


const getContract = async (id, setContract) => {
    const res = await request("api/contract/" + id);

    if (res.ok){
        setContract((await res.json()).data);
    }
}


export const deleteContract = async (id, onDeleted) => {
    const res = await request("api/contract/" + id, "DELETE");
    if (res.ok){
        onDeleted&&onDeleted(id);
    }
}

const confirm = async (house_id, id, data) => {
    const res = await request(`api/house/${house_id}/contract/${id}/confirm`, "POST", data);
    if (res.ok){
        window.location.reload();
    }
}

export default ShowContract;