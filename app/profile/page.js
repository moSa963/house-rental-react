"use client"
import ContractItem from "@/components/ContractItem";
import Avatar from "@/components/elements/Avatar/Avatar";
import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import { useAuth } from "@/contexts/AuthContext";
import { useScroll } from "@/contexts/ScrollContext";
import request from "@/utils/Request";
import React, { useRef } from "react";


const Profile = () => {
    const {user, logout} = useAuth();
    const [data, setData] = React.useState({});
    const [contracts, setContracts] = React.useState([]);
    const [processing, setProcessing] = React.useState(false);
    const [next, setNext] = React.useState(null);
    const listRef = useRef();
    const {scroll} = useScroll();

    const handleImageInput = async (e) => {
        setData({ ...data, image: URL.createObjectURL(e[0]) });
    }

    React.useEffect(()=>{
        getContracts(setContracts, setNext, setProcessing);
    }, []);

    React.useEffect(()=>{
        if (Object.keys(data).length > 0){
            update(data);
        }
    }, [data]);

    React.useEffect(()=>{
        if (listRef.current.getBoundingClientRect().bottom < 600 && next && !processing){
            getNext(next, setContracts, setNext, setProcessing);
        }
    }, [scroll, next, processing]);

    const handleDeleted = (id) => {
        setContracts(contracts.filter(e => e.id !== id));
    }

    return (
        <div className="w-full grid grid-cols-1 bg-inherit mt-24 max-w-5xl px-2 gap-5">
            <div className="flex">
                <Avatar size="large" src={data?.image || `${process.env.api_url}api/user/${user?.username}/image`} onChange={(e) => handleImageInput(e)} />
                <div className="flex-1 ml-2 flex flex-col  justify-center">
                    <Text>{user && (user.first_name + " " + user.last_name)}</Text>
                    <Text>{user && ("@" + user.username)}</Text>
                </div>
            </div>
            <div className="flex h-fit justify-end">
                <Button value="Logout" color="#ff3333aa" onClick={logout}/>
            </div>

            <div className="w-full grid grid-cols-1 gap-5" ref={listRef}>
                <Text type="h3">Contracts: </Text>
                {
                    contracts.map((e, i) => <ContractItem contract={e} key={i} onDleted={handleDeleted}/>)
                }
            </div>
        </div>
    );
}


const update = async (data) => {
    await request("api/user", "POST", data);
}

const getContracts = async (setContracts, setNext, setProcessing) => {
    setProcessing(true);
    const res = await request("api/contract");

    if (res.ok){
        const js = await res.json();
        setNext(js.links.next);
        setContracts(js.data);
    }

    setProcessing(false);
}

const getNext = async (next, setContracts, setNext, setProcessing) => {
    setProcessing(true);

    const res = await request(next);

    if (res.ok){
        const js = await res.json();
        setNext(js.links.next);
        setContracts(v => ([...v, ...js.data]));
    }

    setProcessing(false);
}

export default Profile;