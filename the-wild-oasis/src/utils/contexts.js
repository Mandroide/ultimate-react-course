import {createContext} from "react";

export const ModalContext = createContext({});

export const TableContext = createContext({});

export const MenusContext = createContext({});

// TODO 2025-05-008 Add default contextValue to infer type
export const DarkModeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => {}
});