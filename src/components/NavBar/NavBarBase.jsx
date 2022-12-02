import React from "react";
import { useScroll } from "../../contexts/ScrollContext";
import { interpolate } from "../../utils/Interpolator";



const NavBarBase = ({ children }) => {
    const {scroll} = useScroll();

    const p = interpolate(scroll, [0, 150], [15, 0]) + "px";

    return (
        <div className={`fixed top-0 w-full z-10 select-none`} style={{ paddingLeft: p, paddingTop: p, paddingRight: p, }}>
            <div className="bg-level3 w-full h-11 rounded-lg shadow-sm px-5 flex flex-wrap" style={{ borderRadius: p}}>
                { children }
            </div>
        </div>
    );
}



export default NavBarBase;