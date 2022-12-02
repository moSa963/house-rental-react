import React from "react";


const Action = ({ onClick, name, value, selected })=>{

    return (
        <p className="p-1 cursor-pointer bg-slate-500 bg-opacity-0 hover:bg-opacity-30 border-primary" 
            style={{ borderBottomWidth: selected ? 2 : 0 }}
        onClick={()=>onClick(value)}>{name}</p>
    );
}



const ActionsBar = ({ actions={}, value, onChange }) => {

    
    return (
        <div className="w-full flex justify-center items-center">
            {
                actions && Object.keys(actions).map((e, i) => <Action onClick={onChange} name={e} value={actions[e]} selected={actions[e] === value} key={i} />)
            }
        </div>
    );
}

export default ActionsBar;