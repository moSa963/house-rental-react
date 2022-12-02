import React, { useRef } from "react";
import Avatar from "../elements/Avatar";
import ContractItem from "../components/ContractItem";
import { Types, useAuth } from "../contexts/AuthContext";
import { useRequest } from "../contexts/RequestContext";
import { useScroll } from "../contexts/ScrollContext";
import Button from "../elements/Button";
import Text from "../elements/Text";
import { APP_URL } from "../utils/Request";

const Profile = () => {
    const {auth, setAuth} = useAuth();
    const [data, setData] = React.useState({});
    const request = useRequest();
    const [contracts, setContracts] = React.useState([]);
    const [processing, setProcessing] = React.useState(false);
    const [next, setNext] = React.useState(null);
    const listRef = useRef();
    const {scroll} = useScroll();

    const handleImageInput = async (e) => {
        setData({ ...data, image: URL.createObjectURL(e[0]) });
    }

    React.useEffect(()=>{
        getContracts(request, setContracts, setNext, setProcessing);
    }, [request]);

    React.useEffect(()=>{
        if (Object.keys(data).length > 0){
            update(request, data);
        }
    }, [data, request]);

    React.useEffect(()=>{
        if (listRef.current.getBoundingClientRect().bottom < 600 && next && !processing){
            getNext(request, next, setContracts, setNext, setProcessing);
        }
    }, [scroll, next, request, processing]);

    const handleDeleted = (id) => {
        setContracts(contracts.filter(e => e.id !== id));
    }

    return (
        <div className="w-full grid grid-cols-1 bg-inherit mt-24 max-w-5xl px-2 gap-5">
            <div className="flex">
                <Avatar size="large" src={data?.image || (APP_URL + `api/user/${auth.user.username}/image`)} onChange={(e) => handleImageInput(e)} />
                <div className="flex-1 ml-2 flex flex-col  justify-center">
                    <Text>{auth?.user && (auth.user.first_name + " " + auth.user.last_name)}</Text>
                    <Text>{auth?.user && ("@" + auth?.user.username)}</Text>
                </div>
            </div>
            <div className="flex h-fit justify-end">
                <Button value="Logout" color="#ff3333aa" onClick={() => setAuth(Types.LOGOUT)}/>
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


const update = async (request, data) => {
    await request("api/user", "POST", data);
}

const getContracts = async (request, setContracts, setNext, setProcessing) => {
    setProcessing(true);
    const res = await request("api/contract");

    if (res.ok){
        const js = await res.json();
        setNext(js.links.next);
        setContracts(js.data);
    }
    setProcessing(false);

}

const getNext = async (request, next, setContracts, setNext, setProcessing) => {
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