import React from "react";
import {SiVisa} from "react-icons/si";
import {BsQuestionLg} from "react-icons/bs";
import {SiAmericanexpress} from "react-icons/si";
import {FaCcDiscover} from "react-icons/fa";
import {FaCcDinersClub} from "react-icons/fa";
import {FaCcMastercard} from "react-icons/fa";
import {FaCcJcb} from "react-icons/fa";
import TextInput from "../elements/TextInput";


const cardType = [
    {
        regex: /^3[47]\d{0,13}$/,
        icon: SiAmericanexpress,
        type: 'american express'
    },
    {
        regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}$/,
        icon: FaCcDiscover,
        type: 'discover'
    },
    {
        format: [4, 6, 4],
        regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}$/,
        icon: FaCcDinersClub,
        type: 'diners'
    },
    {
        regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}$/,
        icon: FaCcMastercard,
        type: 'mastercard'
    },
    {
        regex: /^(?:35\d{0,2})\d{0,12}$/,
        icon: FaCcJcb,
        type: 'jcb'
    },
    {
        regex: /^4\d{0,15}$/,
        icon: SiVisa,
        type: 'visa'
    },
]

const getIcon = (card_number) => {
    var Icon = BsQuestionLg;

    card_number && cardType.forEach(e => {
        if (card_number.match(e.regex)){
           Icon = e.icon;
        }
    });

    return <Icon className="h-full w-full mx-1" />
}

const PaymentForm = ({ inputs={}, onChange })=>{

    return(
        <div className="w-full bg-level3 p-3 rounded-lg">
            <div className="bg-inherit col-span-2 sm:col-span-1">
                <div className="w-full grid grid-cols-4 gap-5 bg-inherit">
                    <TextInput className="col-span-4" title="Name" value={inputs?.name} onInput={(v) => onChange("name", v)}/>
                    <div className="col-span-4 flex bg-inherit">
                        <TextInput className="w-full" title="Card Number" value={inputs?.card_number} onInput={(v) => onChange("card_number", v)}/>
                        <div className="w-11 h-full p-1">
                        {
                            getIcon(inputs?.card_number)
                        }
                        </div>
                    </div>
                    <TextInput className="col-span-4 sm:col-span-2" title="Expiry month" value={inputs?.expiry_month} onInput={(v) => onChange("expiry_month", v)}/> 
                    <TextInput className="col-span-4 sm:col-span-2" title="Expiry year" value={inputs?.expiry_year} onInput={(v) => onChange("expiry_year", v)}/>
                    <TextInput className="col-span-4 sm:col-span-2" title="Security Code" value={inputs?.security_code} onInput={(v) => onChange("security_code", v)}/>
                </div>
            </div>
        </div>
    );
}



export default PaymentForm;