import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/App/Footer";
import NavBar from "../components/NavBar/NavBar";

const AppLayout = () => {

    return (
        <React.Fragment>
            <NavBar />

            <div className="w-full bg-inherit flex justify-center">
                <Outlet />
            </div>

            <Footer />
        </React.Fragment>
    );
}


export default AppLayout;