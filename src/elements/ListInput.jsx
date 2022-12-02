import React from "react";
import Text from "./Text";
import {VscDebugBreakpointLogUnverified} from "react-icons/vsc";

const Input = ({ value, onChange, index })=>{


    return (
        <div className="w-full flex items-center">
            <VscDebugBreakpointLogUnverified className="h-6 w-6"/>
            <div className="relative w-full h-10 border-primary border-[1px] bg-level3 text-primary rounded-lg flex items-center px-5 my-1">
                <input type="text" className="w-full h-full bg-transparent outline-none" value={value} onChange={(e) => onChange(index, e.currentTarget.value)}/>
            </div>
        </div>
    );
}

const ListInput = ({ title, value, onChange})=>{

    const handleChange = (index, v) => {
        value[index] = v;
        onChange([...value.filter(e => e !== ""), ""]);
    }

    return (
        <div className="w-full">
            <Text type="h4">{title}</Text>
            <div className="w-full">
                {
                    value&&value.map((e,i) => <Input key={i} index={i} value={e} onChange={handleChange} />)
                }
            </div>
        </div>
    );
}


export default ListInput;