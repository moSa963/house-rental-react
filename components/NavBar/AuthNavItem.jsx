import React from "react";
import Avatar from "../elements/Avatar/Avatar";
import NavButton from "./NavButton";
import { useAuth } from "@/contexts/AuthContext";
import { BiLogIn } from "react-icons/bi";

const AuthNavItem = () => {
    const { user } = useAuth();

    if (!user) return <NavButton href="/login" Icon={BiLogIn} title="Register" />;

    return (
        <NavButton title={user.username} href="/profile">
            <Avatar size="small" src={`${process.env.api_url}api/user/${user.username}/image`} />
        </NavButton>
    )
}

export default AuthNavItem;