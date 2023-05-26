import React from "react";



const Text = ({ children, type = "p", className = "" }) => {

    if (!children) return <div className="bg-slate-600 w-full rounded-sm h-2 mb-1 animate-pulse">{children}</div>;

    return <p className={`transition-all ${type} ${className}`}>{children}</p>
}


export default Text;