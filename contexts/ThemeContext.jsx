"use client"
import React, {createContext, useContext} from "react";

const Context = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState("dark");

    const toggleTheme = React.useCallback(() => {
        setTheme(t => t === "dark" ? "light" : "dark");
    }, []);

    return (
        <Context.Provider value={{theme, toggleTheme}}>
            <div className={`${theme} text-primary border-primary shadow-primary`}>
                {children}
            </div>
        </Context.Provider>
    );
}

export default ThemeProvider;

export const useTheme = () => useContext(Context);