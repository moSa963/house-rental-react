import React from "react";


const Action = ({ onClick, name, value, selected })=>{

    return (
        <p className="p-1 cursor-pointer bg-slate-500 bg-opacity-0 hover:bg-opacity-30 border-primary" 
            style={{ borderBottomWidth: selected ? 2 : 0 }}
        onClick={()=>onClick(value)}>{name}</p>
    );
}


export default Action;