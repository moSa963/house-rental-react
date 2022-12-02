import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaymentForm from "../components/Form/PaymentForm";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "../contexts/RequestContext";
import Button from "../elements/Button";
import ButtonGradient from "../elements/ButtonGradient";
import Text from "../elements/Text";

const ShowContract = () => {
    const [contract, setContract] = React.useState(null);
    const params = useParams();
    const request = useRequest();
    const nav = useNavigate();
    const { auth } = useAuth();
    const [inputs, setInputs] = React.useState({});


    React.useEffect(()=>{
        getContract(request, params.id, setContract);
    }, [params.id, request]);

    const handleInput = (key, value) => {
        inputs[key] = value;
        setInputs({...inputs});
    }

    const handleConfirm = () =>{
        confirm(request, contract.house_id, contract.id, inputs);
    }

    return (
        <div className="w-full grid grid-cols-1 bg-inherit mt-24 max-w-5xl px-2 gap-5">
            <div className="grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                <div className="p-2 text-center border-2 border-primary rounded-lg"  style={{ backgroundColor: contract?.confirmed ? "#3333ff88" : "#ff333388" }}>
                    <Text type="h5">{contract?.confirmed ? "Confirmed" : "Awaiting Payment"}</Text>
                </div>

                <Text type="h4" >House: <Link className="hover:text-slate-700" to={"/house/" + contract?.house_id}>{contract?.house_id}</Link> </Text>
                <Text type="h4" >Username: {contract?.user.username} </Text>
                
                <Text>Check-in: {contract?.start_date}</Text>
                <Text>Check-out: {contract?.end_date}</Text>
                <Text type="h2">Total Price: {contract?.total_price}$</Text>
            </div>

            {
                !contract?.confirmed && contract?.user_id === auth?.user?.id &&
                <>
                    <div className="grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                        <PaymentForm inputs={inputs} onChange={handleInput}/>
                        <ButtonGradient value="Confirm" onClick={handleConfirm}/>
                    </div>
                    <div className="flex justify-end">
                        <Button value="Delete" color="#ff333399" onClick={()=>deleteContract(request, contract.id, () => nav("/"))}/>
                    </div>
                </>
            }
        </div>
    );
}


const getContract = async (request, id, setContract) => {
    const res = await request("api/contract/" + id);

    if (res.ok){
        setContract((await res.json()).data);
    }
}


export const deleteContract = async (request, id, onDeleted) => {
    const res = await request("api/contract/" + id, "DELETE");
    if (res.ok){
        onDeleted&&onDeleted(id);
    }
}

const confirm = async (request, house_id, id, data) => {
    const res = await request(`api/house/${house_id}/contract/${id}/confirm`, "POST", data);
    if (res.ok){
        window.location.reload();
    }
}

export default ShowContract;