"use client"
import { useScroll } from "@/contexts/ScrollContext";
import { interpolate } from "@/utils/Interpolator";
import React from "react";



const Section = ({ from, to, reverse, children }) => {
    const {scroll} = useScroll();

    return (
        <div className="flex justify-center my-5 py-5 bg-level2" style={{ transform: `translateX(${interpolate(scroll, [from, to], [reverse ? -100 : 100, 0])}%)` }}>
            
            <div className="flex-[3] flex flex-col text-center transition-all justify-center items-center px-0 sm:px-12" >
                {children}
            </div>
        </div>
    );
}



export default Section;