import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "../contexts/RequestContext";
import Button from "../elements/Button";
import { deleteContract } from "../screens/ShowContract";


const ContractItem = ({ contract, onDleted }) => {
    const {auth} = useAuth();
    const request = useRequest();

    return (
        <Link to={"/contract/" + contract?.id}>
            <div className="w-full flex bg-level2 rounded-lg p-2 select-none cursor-pointer flex-wrap"  style={{ backgroundColor: contract?.confirmed ? "#22ff2233" : null }}>
                <div className="flex-1">
                    <p>username: {contract?.user.username}</p>
                    <p>owner: {contract?.owner.username}</p>
                    <p>{contract?.start_date} . {contract?.end_date}</p>
                </div>
                {
                    auth?.user?.id === contract?.user_id && !contract?.confirmed &&
                    <div className="h-full flex justify-center items-center">
                        <Button  color="#ff3333aa" value="Delete" onClick={() => deleteContract(request, contract?.id, onDleted)}/>
                    </div>
                }
            </div>
        </Link>
    );
}



export default ContractItem;