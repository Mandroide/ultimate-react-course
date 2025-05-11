import {useContext} from "react";
import {DarkModeContext} from "../utils/contexts.js";

export default function useDarkMode() {
    const contextValue = useContext(DarkModeContext);
    if (contextValue === undefined) {
        throw new Error(`useDarkMode must be used within ${Object.keys({DarkModeContext})[0]}`);
    }
    return contextValue;
}