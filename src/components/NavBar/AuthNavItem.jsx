import React from "react";
import Avatar from "../../elements/Avatar";
import NavButton from "./NavButton";
import { BiLogIn } from "react-icons/bi";
import { useAuth } from "../../contexts/AuthContext";
import { APP_URL } from "../../utils/Request";

const AuthNavItem = ({ nav }) => {
    const {auth} = useAuth();

    if (!auth.user) return <NavButton to="login" Icon={BiLogIn} title="Register"/>;

    return (
        <NavButton title={auth.user.username} onClick={()=>nav && nav()}>
            <Avatar size="small" src={APP_URL + `api/user/${auth.user.username}/image`} />
        </NavButton>
    )
}

export default AuthNavItem;