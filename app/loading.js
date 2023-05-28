import ProgressLinear from "@/components/elements/ProgressLinear";
import React from "react";



const Loading = () => {

    return (
        <div className="w-full absolute z-50">
            <ProgressLinear active />
        </div>
    )
}


export default Loading;