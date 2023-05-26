import React from "react";


const TextInput = ({ title, value="", error, onInput, type="text", disabled, className="w-full" }) => {
    const [foucs, setFoucs] = React.useState(false);

    return (
        <div className={"bg-inherit " + className}>
            <div style={{ borderColor: disabled ? "gray" : (error && error !== "") ? "red" : null, color: disabled ? "gray" : null }}
                className="relative col-span-8 h-10 border-primary border-[1px] bg-inherit text-primary rounded-md flex items-center px-5">
                <p className="absolute bg-inherit transition-transform select-none pointer-events-none"
                    style={{ transform: `translateY(${foucs || value ? -70 : 0}%) scale(${foucs || value ? 0.9 : 1})`, top: foucs || value ? 1 : null }}>
                    {title}
                </p>
                <input type={type} disabled={disabled} className="w-full h-full bg-transparent outline-none" value={value} onInput={(e) => onInput&&onInput(e.currentTarget.value)}
                onFocus={()=> setFoucs(true)} 
                onBlur={()=> setFoucs(false)}/>
            </div>
            {
                error && error !== "" && <p className="text-red-700">{error}</p>
            }
        </div>
    );
}


export default TextInput;