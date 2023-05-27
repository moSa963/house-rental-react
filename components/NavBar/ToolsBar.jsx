"use client"
import { State, useScreenSize } from "@/contexts/ScreenContext";
import React from "react";
import NavButton from "./NavButton";
import AuthNavItem from "./AuthNavItem";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { VscListSelection } from "react-icons/vsc";
import { BsList } from "react-icons/bs";



const ToolsBar = () => {
    const [collapse, setCollapse] = React.useState(false);
    const { size } = useScreenSize();

    React.useEffect(() => {
        setCollapse(size !== State.sm);
    }, [size]);

    return (
        <React.Fragment>
            <div className="h-full aspect-square justify-center items-center flex sm:hidden cursor-pointer" onClick={() => setCollapse(v => !v)}>
                <BsList className="w-6 h-6" />
            </div>
            <div style={{ display: (size !== State.sm || collapse) ? "flex" : "none" }}
                className="flex-shrink-0 flex-wrap sm:bg-transparent w-full sm:w-fit shadow-md sm:shadow-none bg-opacity-30 backdrop-blur-md sm:backdrop-blur-0 items-center h-fit sm:h-full overflow-hidden"  >
                <NavButton Icon={AiOutlineHome} title="Home" href="/" />
                <NavButton Icon={IoMdAdd} title="Host your place" href="/house" />
                <NavButton Icon={VscListSelection} title="Houses list" href="/house/list" />
                <AuthNavItem />
            </div>
        </React.Fragment>
    );
}


export default ToolsBar;