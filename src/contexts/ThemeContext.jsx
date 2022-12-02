import React, {createContext, useContext} from "react";

const Context = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState(localStorage.getItem("theme") === "dark" ? "dark" : "light");

    const toggleTheme = () => {
        setTheme(t => {
            const newTheme = t === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    }

    return (
        <Context.Provider value={{theme, toggleTheme}}>
            <div className={`${theme} h-screen w-screen text-primary border-primary shadow-primary`}>
                {children}
            </div>
        </Context.Provider>
    );
}

export default ThemeProvider;

export const useTheme = () => useContext(Context);