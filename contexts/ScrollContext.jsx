"use client"
import React, {createContext, useContext} from "react";

const Context = createContext();

const ScrollProvider = ({ children }) => {
    const [scroll, setScroll] = React.useState(0);
    const ref = React.useRef();

    const scrollTo = React.useCallback((x, y) => ref.current && ref.current.scrollTo(x, y), [ref]);

    const handleScroll = (e) => {
        setScroll(e.currentTarget.scrollTop);
    }
 
    return (
        <Context.Provider value={{ scroll, scrollTo }}>
            <div className="block h-screen w-screen overflow-y-auto overflow-x-hidden bg-level1" onScroll={handleScroll} ref={ref}>
                {children}
            </div>
        </Context.Provider>
    );
}

export default ScrollProvider;

export const useScroll = () => useContext(Context);