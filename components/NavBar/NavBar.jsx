import React from "react";
import NavBarBase from "./NavBarBase";
import Link from "next/link";
import AppIcon from "../AppIcon";
import {BsList} from "react-icons/bs";
import {MdNightlight} from "react-icons/md";
import {MdLightMode} from "react-icons/md";
import { State, useScreenSize } from "@/contexts/ScreenContext";
import { useTheme } from "@/contexts/ThemeContext";
import NavButton from "./NavButton";
import ToolsBar from "./ToolsBar";
import {AiOutlineHome} from "react-icons/ai";
import {IoMdAdd} from "react-icons/io";
import {VscListSelection} from "react-icons/vsc";
import { useRouter } from "next/navigation";


const NavBar = () => {
    const [collapse, setCollapse] = React.useState(false);
    const { size } = useScreenSize();
    const {theme, toggleTheme} = useTheme();
    const router = useRouter();


    React.useEffect(()=>{
        setCollapse(size !== State.sm);
    }, [size]);

    const handleNavigate = (to)=>{
        setCollapse(false);
        router.push(to)
    }

    return (
        <NavBarBase>
            <Link className="h-full flex-grow flex" href="/">
                <AppIcon className="text-blue-500"/>
            </Link>

            <div className="h-full aspect-square justify-center items-center flex cursor-pointer" onClick={toggleTheme}>
                {theme === "" ? <MdNightlight className="w-6 h-6"/> : <MdLightMode className="w-6 h-6"/>}
            </div>

            <div className="h-full aspect-square justify-center items-center flex sm:hidden cursor-pointer" onClick={() => setCollapse(!collapse)}>
                <BsList className="w-6 h-6"/>
            </div>

            <ToolsBar collapse={collapse} size={size}>
                <NavButton Icon={AiOutlineHome} title="Home" onClick={() => handleNavigate("/")}/>
                <NavButton Icon={IoMdAdd} title="Host your place" onClick={() => handleNavigate("/house")}/>
                <NavButton Icon={VscListSelection} title="Houses list" onClick={() => handleNavigate("/house/list")}/>
            </ToolsBar>
        </NavBarBase>
    );
}


export default NavBar;