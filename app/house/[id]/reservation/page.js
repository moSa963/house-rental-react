"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { getHouse } from "../page";
import Text from "@/components/elements/Text";
import RatingBar from "@/components/elements/RatingBar";
import DateInput from "@/components/elements/DateInput";
import Counter from "@/components/elements/Counter";
import ButtonGradient from "@/components/elements/ButtonGradient";
import request from "@/utils/Request";



const Reservation = () => {
    const [data, setData] = React.useState({});
    const [house, setHouse] = React.useState(null);
    const [errors, setErrors] = React.useState(null);
    const [processing, setProcessing] = React.useState(false);
    const params = useParams();
    const search = useSearchParams();
    const router = useRouter();

    
    React.useEffect(()=>{
        setData(v => ({
            ...v,
            start_date: search.get("in"),
            end_date: search.get("out"),
            guests: search.get("guests"),
        }));
        getHouse(params.id, setHouse);
    }, [params.id, search]);

    const handleInput = (key, value) => {
        data[key] = value;
        setData({...data});
    }

    const handleClick = ()=>{
        createContract(house.id, data, router, setErrors, setProcessing);
    }

    return (
        <div className="w-full grid grid-cols-1 bg-inherit mt-24 max-w-5xl px-2 gap-5">
            {
                errors && Object.values(errors).map((e, i) => <p key={i}>{e}</p>)
            }
            <div className="flex flex-col">
                <div className="flex flex-wrap">
                    <Text type="h2">{house?.name}</Text>
                    <div className="flex-grow"></div>
                    <RatingBar rating={house?.rating || 0} disabled={processing}/>
                </div>
                <p className="font-mono  mb-3">@{house?.username} . {house?.city},{house?.country}</p>
            </div>

            <DateInput value={data} onChange={(key, value) => handleInput(key, value)} disabled={processing}/>

            <div className="flex">
                <p className="mr-10">Guests: </p>
                <Counter min={1} value={parseFloat(data?.guests)} onChange={(v) => handleInput("guests", v)} disabled={processing}/>
            </div>

            <ButtonGradient value="Reserve" onClick={handleClick} disabled={processing}/>
        </div>
    );
}


const createContract = async (house_id, data, router, setError, setProcessing) => {
    setProcessing(true);
    const res = await request(`api/house/${house_id}/contract`, "POST", data);

    if (res.ok){
        const js = await res.json();
        router.push("/contract/" + js.id);
        return;
    }
    const js = await res.json();

    setError(js?.errors || js?.message);
    setProcessing(false);
}

export default Reservation;