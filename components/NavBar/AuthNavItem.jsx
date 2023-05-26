import React from "react";
import Avatar from "../elements/Avatar/Avatar";
import NavButton from "./NavButton";
import { useAuth } from "@/contexts/AuthContext";
import { BiLogIn } from "react-icons/bi";
import { APP_URL } from "@/utils/Request";

const AuthNavItem = () => {
    const { user } = useAuth();

    if (!user) return <NavButton href="/register" Icon={BiLogIn} title="Register" />;

    return (
        <NavButton title={user.username} href="/profile">
            <Avatar size="small" src={`${APP_URL}api/user/${user.username}/image`} />
        </NavButton>
    )
}

export default AuthNavItem;