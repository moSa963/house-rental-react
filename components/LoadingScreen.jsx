import React from "react";
import ProgressCircular from "./elements/ProgressCircular";



const LoadingScreen = () => {


    return(
        <div className="w-full h-full bg-inherit mt-24 max-w-5xl px-2 min-h-screen flex justify-center">
            <ProgressCircular active/>
        </div>
    )
}



export default LoadingScreen;