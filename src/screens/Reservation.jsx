import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DateInput from "../elements/DateInput";
import RatingBar from "../elements/RatingBar";
import { useRequest } from "../contexts/RequestContext";
import ButtonGradient from "../elements/ButtonGradient";
import Counter from "../elements/Counter";
import Text from "../elements/Text";
import { getHouse } from "./ShowHouse";



const Reservation = () => {
    const { search } = useLocation();
    const [house, setHouse] = React.useState(null);
    const [errors, setErrors] = React.useState(null);
    const request = useRequest();
    const quary = React.useMemo(() => new URLSearchParams(search), [search]);
    const params = useParams();
    const [data, setData] = React.useState({});
    const [processing, setProcessing] = React.useState(false);
    const nav = useNavigate();

    React.useEffect(()=>{
        setData(v => ({
            ...v,
            start_date: quary.get("in"),
            end_date: quary.get("out"),
            guests: quary.get("guests"),
        }));
        getHouse(request, params.id, setHouse);
    }, [params.id, quary, request]);

    const handleInput = (key, value) => {
        data[key] = value;
        setData({...data});
    }

    const handleClick = ()=>{
        createContract(request, house.id, data, nav, setErrors, setProcessing);
    }

    return (
        <div className="w-full grid grid-cols-1 bg-inherit mt-24 max-w-5xl px-2 gap-5">
            {
                errors&&Object.values(errors).map((e, i) => <p key={i}>{e}</p>)
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


const createContract = async (request, house_id, data, nav, setError, setProcessing) => {
    setProcessing(true);
    const res = await request(`api/house/${house_id}/contract`, "POST", data);

    if (res.ok){
        const js = await res.json();
        nav("/contract/" + js.id);
        return;
    }
    const js = await res.json();

    setError(js?.errors || js?.message);
    setProcessing(false);

}

export default Reservation;