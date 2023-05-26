import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";


const Counter = ({ max, min, step=1, value=0.0, onChange, disabled }) =>{
    const [input, setInput] = React.useState(value.toFixed(2));

    React.useEffect(()=>{
        setInput(value.toFixed(2));
    }, [value]);

    const handleClick = (v) => {
        if (disabled) return;

        const newValue = value + (v * step);

        if ((max && newValue > max) || (min && newValue < min)) return;

        onChange(newValue);
    }

    const handleBlur = ()=>{
        if (input.match(/^[+-]?\d+(\.\d+)?$/)){
            onChange(parseFloat(parseFloat(input).toFixed(2)));
            return;
        }
        setInput(value.toFixed(2));
    }

    return (
        <div className="flex select-none items-center" >
            <div className="w-7 h-7 rounded-full border-primary border-2 opacity-25 hover:opacity-100 hover:rotate-180 transition-transform cursor-pointer flex justify-center items-center" onClick={() => handleClick(-1)}>
                <FiMinus />
            </div>
            <input className="h-full w-20 text-center bg-transparent outline-none" type="text" value={input} onInput={(e)=>setInput(e.currentTarget.value)} onBlur={handleBlur} disabled={disabled}/>
            <div className="w-7 h-7 rounded-full border-primary border-2 opacity-25 hover:opacity-100 hover:rotate-180 transition-transform cursor-pointer flex justify-center items-center" onClick={() => handleClick(+1)}>
                <BsPlusLg />
            </div>
        </div>
    );
}


export default Counter;