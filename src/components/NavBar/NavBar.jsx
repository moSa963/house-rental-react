import React from "react";
import NavButton from "./NavButton";
import {BsList} from "react-icons/bs";
import { useScreenSize, State } from "../../contexts/ScreenContext";
import AppIcon from "../../icons/AppIcon";
import {AiOutlineHome} from "react-icons/ai";
import {MdNightlight} from "react-icons/md";
import {MdLightMode} from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import AuthNavItem from "./AuthNavItem";
import {IoMdAdd} from "react-icons/io";
import {VscListSelection} from "react-icons/vsc";
import NavBarBase from "./NavBarBase";
import ToolsBar from "./ToolsBar";

const NavBar = () => {
    const [collapse, setCollapse] = React.useState(false);
    const { size } = useScreenSize();
    const {theme, toggleTheme} = useTheme();
    const nav = useNavigate();

    React.useEffect(()=>{
        setCollapse(size !== State.sm);
    }, [size]);

    const handleNavigate = (to)=>{
        setCollapse(false);
        nav(to);
    }

    return (
        <NavBarBase>
            <Link className="h-full flex-grow flex" to="/">
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
                <AuthNavItem nav={(to) => handleNavigate(to)}/>
            </ToolsBar>
        </NavBarBase>
    );
}


export default NavBar;