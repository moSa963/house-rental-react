import React from "react";
import ProgressCircular from "./elements/ProgressCircular";



const LoadingScreen = () => {


    return(
        <div className="w-full h-full flex justify-center items-center">
            <ProgressCircular active/>
        </div>
    )
}



export default LoadingScreen;