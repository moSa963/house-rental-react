import React from "react";


const ProgressLinear = ({ active }) => {


    return (
        <div className="relative w-full h-1 overflow-hidden" style={{ display: active ? "block" : "none" }}>
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-r from-transparent via-slate-500 to-transparent " style={{animationName: active ? "progress" : "none", animationDuration: "2s", animationIterationCount: "infinite", animationTimingFunction: "linear"}}>

            </div>
        </div>
    );
}


export default ProgressLinear;