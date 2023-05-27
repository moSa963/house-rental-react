import React from "react";
import NavBarBase from "./NavBarBase";
import Link from "next/link";
import AppIcon from "../AppIcon";
import ToolsBar from "./ToolsBar";
import ThemeButton from "./ThemeButton";


const NavBar = () => {


    return (
        <NavBarBase>
            <Link className="h-full flex-grow flex" href="/">
                <AppIcon className="text-blue-500"/>
            </Link>

            <ThemeButton />

            <ToolsBar />
        </NavBarBase>
    );
}


export default NavBar;