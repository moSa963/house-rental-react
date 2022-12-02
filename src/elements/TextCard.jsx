import React from "react";


const TextCard = ({ text, error }) => {


    return (
        <div className="p-2 text-center border-2 border-primary rounded-lg"  style={{ backgroundColor: error ? "#ff333388" : "#3333ff88" }}>
            <Text type="h4">{text}</Text>
        </div>
    );
}


export default TextCard;