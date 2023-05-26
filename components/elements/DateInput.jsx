import React from "react";


const DateInput = ({ value, onChange, disabled }) => {


    return (
        <div className="w-full h-full flex overflow-hidden flex-wrap">
            <div className="flex-1 flex flex-col">
                <p>Check-in:</p>
                <input className="outline-none bg-transparent text-primary" type="date" value={value?.start_date || ""} disabled={disabled}
                    min={new Date().toLocaleDateString('en-ca')}
                    onChange={(e) => onChange&&onChange("start_date", e.currentTarget.value)}/>
            </div>
            <div className="flex-1 flex flex-col">
                <p>Check-out:</p>
                <input className="outline-none bg-transparent text-primary w-full" value={value?.end_date || ""} disabled={disabled}
                    type="date" 
                    onChange={(e) => onChange&&onChange("end_date", e.currentTarget.value)}
                    min={new Date().toLocaleDateString('en-ca')}/>
            </div>
        </div>
    );
}


export default DateInput;