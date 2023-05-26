"use client"
import React from "react";
import Text from "./Text";



const Button = ({ value, onClick, small, color, disabled }) => {
    const [v, setValue] = React.useState(null);

    const handleMouseMove = (e) => {
        setValue({
            x: (e.clientX - e.currentTarget.getBoundingClientRect().left) - 24, 
            y: (e.clientY - e.currentTarget.getBoundingClientRect().top) - 24
        });
    }

    return (
        <div onClick={()=> !disabled && onClick && onClick()} onMouseLeave={(e)=> setValue(null)} onMouseMove={handleMouseMove}
            style={{ padding: small ? "4px" : "8px", backgroundColor: disabled ? "gray" : (color ? color : "") }}
            className="relative select-none m-1 overflow-hidden rounded-lg w-fit text-white bg-blue-500 border-[1px] border-primary bg-opacity-75 hover:bg-opacity-50 cursor-pointer hover:shadow-md">
            <Text className="font-bold" type="p">{value}</Text>
            {v&&<div className="absolute w-12 h-12 top-0 left-0 rounded-full radial" style={{ left: v.x, top: v.y }}></div>}
        </div>
    );
}



export default Button;