import React from "react";
import { interpolate } from "../utils/Interpolator";


const ButtonGradient = ({ value, onClick, disabled }) => {
    const [anim, setValue] = React.useState(50);
    
    const handleMouseMove = (e) => {
        !disabled && setValue(100 - ((e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.clientWidth) * 100);
    }

    return (
        <div onMouseMove={handleMouseMove} onMouseLeave={(e)=> setValue(50)} onClick={()=>!disabled&&onClick&&onClick()}
            style={{ background: `linear-gradient(230deg, rgba(203, 213, 225,0.1) 0%, rgba(71, 85, 105 ,0.8) ${interpolate(anim, [0, 50], [0, 30])}%, rgba(71, 85, 105,0.8)  ${interpolate(anim, [50, 100], [70, 100])}%, rgba(203, 213, 225,0.1) 100%)`, opacity: disabled ? 0.5 : 1 }} 
            className="w-full flex my-10 rounded-lg justify-center items-center font-bold  text-lg p-2 border-primary hover:border-[2px] cursor-pointer text-white select-none transition-transform">
            <p>{value}</p>
        </div>
    );
}

export default ButtonGradient;