import React from "react";
import { useLocation } from "react-router-dom";
import Text from "../elements/Text";

const ErrorScreen = ({ error }) => {
    const { search } = useLocation();
    const qu = React.useMemo(() => new URLSearchParams(search), [search]);


    return (
        <div className="fixed w-screen h-screen z-50 flex flex-col justify-center items-center bg-slate-800">
            <Text type="h1">{qu.get("status")}</Text>
            <Text type="h2">{qu.get("text")}</Text>
        </div>
    );
}



export default ErrorScreen;