import React from "react";


const ProgressCircular = ({ active }) => {


    return (
        <div className="relative w-16 h-16 overflow-hidden" style={{ display: active ? "block" : "none", animation: "rotate 2s linear infinite" }}>
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <circle cx="50" cy="50" r="40" stroke="rgb(100 116 139)" strokeWidth="10" strokeMiterlimit="10" style={{animation: "progress-circular 2s linear infinite", strokeLinecap: "round"}}/>
            </svg>
        </div>
    );
}


export default ProgressCircular;