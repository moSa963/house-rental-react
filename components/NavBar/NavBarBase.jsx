"use client"
import { useScroll } from "@/contexts/ScrollContext";
import { interpolate } from "@/utils/Interpolator";
import React from "react";



const NavBarBase = ({ children }) => {
    const {scroll} = useScroll();

    const p = interpolate(scroll, [0, 150], [15, 0]);

    return (
        <div className={`fixed top-0 w-full z-10 select-none`} style={{ paddingLeft: p + "px", paddingTop: p + "px", paddingRight: p + "px", }}>
            <div className={`bg-level3 w-full h-11 rounded-lg ${p == 0 ? "shadow-md" : "shadow-sm"} px-5 flex flex-wrap`} style={{ borderRadius: p + "px"}}>
                { children }
            </div>
        </div>
    );
}



export default NavBarBase;