import { useRouter } from "next/navigation";
import React from "react";
import DateInput from "./elements/DateInput";
import Counter from "./elements/Counter";
import Text from "./elements/Text";
import ButtonGradient from "./elements/ButtonGradient";
import request from "@/utils/Request";
import { getDays } from "@/utils/Date";


const ReservationCard = ({ house }) => {
    const [data, setData] = React.useState({});
    const [available, setAvailable] = React.useState(null);
    const [error, setError] = React.useState(null);
    const router = useRouter();

    const handleInput = (key, value) => {
        setAvailable(null);
        data[key] = value;
        setData({...data});
    }

    const handleClick = ()=>{
        if (available){
            router.push(`/house/${house.id}/reservation?guests=${data["guests"]}&in=${data["start_date"]}&out=${data["end_date"]}`);
            return;
        }
        check(house?.id, data["start_date"], data["end_date"], setAvailable, setError);
    }

    return (
        <div className="w-full max-w-md bg-level2 sticky border-[1px] top-16 rounded-xl shadow-sm p-3 grid grid-cols-1 gap-10 border-primary">
            <p><span className="font-bold">{house?.night_cost || 0} $</span> /night</p>

            <DateInput value={data} onChange={(key, value) => handleInput(key, value)} />

            <div className="flex">
                <p className="mr-10">Guests: </p>
                <Counter min={1} value={parseFloat(data?.guests) || 0} onChange={(v) => handleInput("guests", v)} />
            </div>
            {
                error && <Text className="text-red-700">{error}</Text>
            }
            {
                available &&
                <div>
                    <hr className="border-primary"/>
                    <Text>{getDays(data["start_date"], data["end_date"])} x {house.night_cost}</Text>
                    <Text>Total: {getDays(data["start_date"], data["end_date"]) * house.night_cost} $</Text>
                </div>
            }

            <ButtonGradient value={available ? "Reserve" : "Check"} onClick={handleClick}/>
        </div>
    );
}

const check = async (house_id, start, end, setAvailable, setError)=>{
    setError(null);
    const res = await request(`api/house/${house_id}/check/${start}/${end}`);

    if (res.ok){
        const js = await res.json();
        setAvailable(js.available);
        setError(!js.available ? "Rent during the selected period is not available." : null);
        return;
    }

    setError((await res.json())?.message);
}

export default ReservationCard;