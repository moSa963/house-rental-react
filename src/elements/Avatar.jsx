import React from "react";


const Skeleton = ({ size }) => {

    return (
        <div className="rounded-full overflow-hidden bg-slate-500 animate-pulse aspect-square" style={{ width: size }}></div>
    );
}

const sizes = {
    small: "25px",
    medium: "40px",
    large: "80px",
}

const Avatar = ({ src, size="medium", onChange }) => {

    if (!src || src === "") return <Skeleton size={sizes[size]}/>

    return (
        <div className="relative rounded-full overflow-hidden aspect-square " style={{ width: sizes[size] }}> 
            <img src={src} className="h-full w-full object-cover object-center" alt=""/>
            {
                onChange&&
                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0" onInput={(e)=>onChange(e.currentTarget.files)}/>
            }
        </div>
    );
}

export default Avatar;