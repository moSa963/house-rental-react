import React, {createContext, useContext} from "react";

const Context = createContext();

export const State = {
    sm: 0,
    md: 1,
    lg: 2,
}

const match = (setSize, setWidth) => {
    setWidth(window.innerWidth);

    if (window.matchMedia("(max-width: 640px)").matches){
        setSize(State.sm);
    } else if (window.matchMedia("(max-width: 768px)").matches){
        setSize(State.md);
    } else {
        setSize(State.lg);
    }
}

const ScreenProvider = ({ children }) => {
    const [size, setSize] = React.useState(State.sm);
    const [width, setWidth] = React.useState(0);

    React.useLayoutEffect(()=>{
        const callback = () => match(setSize, setWidth);

        callback();

        window.addEventListener("resize", callback);
        return ()=> window.removeEventListener("resize", callback);
    }, []);

    return (
        <Context.Provider value={{ size, width }}>
            {children}
        </Context.Provider>
    );
}

export default ScreenProvider;

export const useScreenSize = () => useContext(Context);