import React from "react";
import { State, useScreenSize } from "@/contexts/ScreenContext";
import { useScroll } from "@/contexts/ScrollContext";
import { interpolate } from "@/utils/Interpolator";

const NavButton = ({ children, Icon, title, onClick }) => {
    const {scroll} = useScroll();
    const {size} = useScreenSize();

    return (
        <div title={title} className="aspect-auto sm:aspect-square hover:scale-105 w-full h-fit sm:h-full sm:w-fit" style={{ padding: interpolate(scroll, [0, 150], [3, 1]) + "px" }} to="">
            <div style={{ borderRadius: size === State.sm ? 0 : interpolate(scroll, [0, 150], [50, 0]) + "%" }} onClick={onClick}
                className="h-full w-full justify-center items-center flex cursor-pointer overflow-hidden bg-slate-500 bg-opacity-10 transition-colors hover:bg-opacity-50">
                <div className="w-full h-full flex justify-start items-center sm:justify-center p-2 px-7 sm:p-0 " >
                    {children}
                    {Icon && <Icon className="w-5 h-5"/>}
                    {title && <p className="flex sm:hidden pl-3">{title}</p>}
                </div>
            </div>
        </div>
    );
}

export default NavButton;