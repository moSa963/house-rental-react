import React from "react";
import Action from "./Action";


const ActionsBar = ({ actions={}, value, onChange }) => {

    
    return (
        <div className="w-full flex justify-center items-center">
            {
                actions && 
                Object.keys(actions).map((e, i) => (
                    <Action onClick={onChange} name={e} value={actions[e]} selected={actions[e] === value} key={i} />
                ))
            }
        </div>
    );
}

export default ActionsBar;