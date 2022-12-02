import React from "react";


const Switch = ({ value, onChange, disabled, title }) => {

    return (
        <div className="flex items-center">
            {
                title&&
                <p className="mr-2">{title}</p>
            }
            <div title={title} className="relative w-8 h-5 flex items-center cursor-pointer" onClick={()=> !disabled && onChange && onChange(!value)}>
                <div className="w-full h-2/3 rounded-md shadow-inner flex overflow-hidden" >
                    <div className="h-full bg-blue-500 flex-1" style={{ backgroundColor: disabled ? "gray" : null}}></div>
                    <div className="h-full bg-slate-500 flex-1" style={{ backgroundColor: disabled ? "gray" : null}}></div>
                </div>
                <div style={{ transform: `translateX(${value ? 15 : 0}px)`, backgroundColor: disabled ? "#333333" : null }}
                    className="absolute h-full aspect-square rounded-full transition-all bg-slate-400 shadow-lg" />
            </div>
        </div>
    );
}

export default Switch;