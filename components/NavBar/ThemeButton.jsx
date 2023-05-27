"use client"
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { MdLightMode, MdNightlight } from "react-icons/md";



const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();


    return (
        <div className="h-full aspect-square justify-center items-center flex cursor-pointer" onClick={toggleTheme}>
            {theme === "" ? <MdNightlight className="w-6 h-6" /> : <MdLightMode className="w-6 h-6" />}
        </div>
    );
}


export default ThemeButton;