import React from "react";

const Skeleton = ({ size }) => {

    return (
        <div className="rounded-full overflow-hidden bg-slate-500 animate-pulse aspect-square" style={{ width: size }}></div>
    );
}


export default Skeleton;