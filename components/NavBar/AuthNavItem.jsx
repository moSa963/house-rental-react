import React from "react";
import Avatar from "../../elements/Avatar";
import NavButton from "./NavButton";

const AuthNavItem = ({ nav }) => {
    const { auth } = { auth: { user: { username: "mo.sa" } } }

    //if (!auth.user) return <NavButton to="login" Icon={BiLogIn} title="Register"/>;

    return (
        <NavButton title={auth.user.username} onClick={()=>nav && nav()}>
            <Avatar size="small" src={APP_URL + `api/user/${auth.user.username}/image`} />
        </NavButton>
    )
}

export default AuthNavItem;