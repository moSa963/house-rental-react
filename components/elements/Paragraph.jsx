import React from "react";


const Skeleton = () => {

    return (
        <>
            <div className="bg-slate-600 w-full rounded-sm h-2 mb-1 animate-pulse"></div>
            <div className="bg-slate-600 w-full rounded-sm h-2 mb-1 animate-pulse"></div>
            <div className="bg-slate-600 w-full rounded-sm h-2 mb-1 animate-pulse"></div>
            <div className="bg-slate-600 w-3/4 rounded-sm h-2 mb-5 animate-pulse"></div>
        </>
    );
}

const Paragraph = ({ text }) => {

    if (!text || text === ""){
        return (
            <div className="w-full pl-5">
                <Skeleton />
                <Skeleton />
            </div>
        );
    }

    return (
        <div className="w-full pl-5">
            {
                text.split("\n").map((e, i) => <p className="my-2" key={i}>{e}</p>)
            }
        </div>
    );
}


export default Paragraph;