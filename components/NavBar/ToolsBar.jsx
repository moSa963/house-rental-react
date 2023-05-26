import { State } from "@/contexts/ScreenContext";
import React from "react";




const ToolsBar = ({ collapse, children, size }) => {

    return(
        <div style={{ display: (size !== State.sm || collapse) ? "flex" : "none" }}
            className="flex-shrink-0 flex-wrap sm:bg-transparent w-full sm:w-fit shadow-md sm:shadow-none bg-opacity-30 backdrop-blur-md sm:backdrop-blur-0 items-center h-fit sm:h-full overflow-hidden"  >
                {children}
        </div>
    );
}


export default ToolsBar;