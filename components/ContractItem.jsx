import React from "react";
import Button from "./elements/Button";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";


const ContractItem = ({ contract, onDleted }) => {
    const { user } = useAuth();

    return (
        <Link href={"/contract/" + contract?.id}>
            <div className="w-full flex bg-level2 rounded-lg p-2 select-none cursor-pointer flex-wrap"  style={{ backgroundColor: contract?.confirmed ? "#22ff2233" : null }}>
                <div className="flex-1">
                    <p>username: {contract?.user.username}</p>
                    <p>owner: {contract?.owner.username}</p>
                    <p>{contract?.start_date} . {contract?.end_date}</p>
                </div>
                {
                    user?.id === contract?.user_id && !contract?.confirmed &&
                    <div className="h-full flex justify-center items-center">
                        <Button  color="#ff3333aa" value="Delete" onClick={() => deleteContract(request, contract?.id, onDleted)}/>
                    </div>
                }
            </div>
        </Link>
    );
}



export default ContractItem;