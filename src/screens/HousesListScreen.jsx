import React from "react";
import { useLocation } from "react-router-dom";
import HouseList from "../components/House/HouseList";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "../contexts/RequestContext";
import Switch from "../elements/Switch";
import TextInput from "../elements/TextInput";

const HousesList = () => {
    const [list, setList] = React.useState([]);
    const [next, setNext] = React.useState(null);
    const request = useRequest();
    const [data, setData] = React.useState({});
    const { search } = useLocation();
    const quary = React.useMemo(() => new URLSearchParams(search), [search]);
    const [processing, setProcessing] = React.useState(false);
    const { auth } = useAuth();

    React.useEffect(()=>{
        setData(v => ({
            ...v,
            country: quary.get("country") || "",
            city: quary.get("city") || "",
        }));
    }, [quary]);

    const handleInput = (key, value) => {
        data[key] = value;
        setData({...data});
    }

    React.useEffect(()=>{
        getList(request, setList, setNext, data, auth, setProcessing);
    }, [request, data, setProcessing, auth]);


    const handleLoadNext = () => {
        if(next && !processing){
            getNext(request, setList, setNext, next, setProcessing);
        }
    }

    return (
        <div className="w-full grid grid-cols-3 bg-inherit mt-24 max-w-7xl px-2">
            <div className="col-span-3 md:col-span-2" >
                <HouseList list={list} next={next} onLoadNext={handleLoadNext}/>
            </div>
            <div className="relative px-5 col-span-3 md:col-span-1 row-start-1 md:row-start-auto mb-7">
                <div className="w-full max-w-none md:max-w-md bg-level2 sticky top-16 rounded-xl shadow-sm p-5 grid grid-cols-1 gap-5">
                    <TextInput title="Country" onInput={(v)=>handleInput("country", v)} value={data?.country} />
                    <TextInput title="City" onInput={(v)=>handleInput("city", v)} value={data?.city}/>
                    {auth?.user && <Switch title="My Houses" onChange={(v)=>handleInput("mine", v)} value={data?.mine} />}
                </div>
            </div>
        </div>
    );
}

const getList = async (request, setList, setNext, data, auth, setProcessing) => {
    setProcessing(true);

    var url = "api/house?";
    data?.country && (url += "country=" + data.country + "&");
    data?.city && (url += "city=" + data.city + "&");
    data?.mine && auth?.user && (url += "username=" + auth.user.username);
 
    const res = await request(url);
    
    if (res.ok){
        const js = await res.json();
        setList(js.data);
        setNext(js.links.next);
    }

    setProcessing(false);
}

const getNext = async (request, setList, setNext, next, setProcessing) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);
    
    if (res.ok){
        const js = await res.json();
        setList(e => [...e, ...js.data]);
        setNext(js.links.next);
    }
    setProcessing(false);
}

export default HousesList;