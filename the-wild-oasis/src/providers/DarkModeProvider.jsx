import React, {useEffect} from 'react';
import {useLocalStorageState} from "../hooks/useLocalStorageState.js";
import {DarkModeContext} from "../utils/contexts.js";

function DarkModeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme: dark)").matches, 'isDarkMode');
    useEffect(() => {
        const modes = ['light-mode', 'dark-mode'];
        document.documentElement.classList.remove(modes[+!isDarkMode]);
        document.documentElement.classList.add(modes[+isDarkMode]);
    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode((isDark) => !isDark);
    }

    return (
        <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
}

export default DarkModeProvider;