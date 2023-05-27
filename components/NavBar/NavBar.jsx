import React from "react";
import NavBarBase from "./NavBarBase";
import Link from "next/link";
import AppIcon from "../AppIcon";
import {BsList} from "react-icons/bs";
import { State, useScreenSize } from "@/contexts/ScreenContext";
import { useTheme } from "@/contexts/ThemeContext";
import NavButton from "./NavButton";
import ToolsBar from "./ToolsBar";
import {AiOutlineHome} from "react-icons/ai";
import {IoMdAdd} from "react-icons/io";
import {VscListSelection} from "react-icons/vsc";
import { useRouter } from "next/navigation";
import AuthNavItem from "./AuthNavItem";
import ThemeButton from "./ThemeButton";


const NavBar = () => {
    const [collapse, setCollapse] = React.useState(false);
    const { size } = useScreenSize();

    React.useEffect(()=>{
        setCollapse(size !== State.sm);
    }, [size]);

    return (
        <NavBarBase>
            <Link className="h-full flex-grow flex" href="/">
                <AppIcon className="text-blue-500"/>
            </Link>

            <ThemeButton />

            <div className="h-full aspect-square justify-center items-center flex sm:hidden cursor-pointer" onClick={() => setCollapse(!collapse)}>
                <BsList className="w-6 h-6"/>
            </div>

            <ToolsBar collapse={collapse} size={size}>
                <NavButton Icon={AiOutlineHome} title="Home" href="/" />
                <NavButton Icon={IoMdAdd} title="Host your place" href="/house" />
                <NavButton Icon={VscListSelection} title="Houses list" href="/house/list" />
                <AuthNavItem />
            </ToolsBar>
        </NavBarBase>
    );
}


export default NavBar;