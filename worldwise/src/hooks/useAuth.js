import {useContext} from "react";
import {AuthContext} from "../constants/contexts.js";

function useAuth() {
    const contextValue = useContext(AuthContext);
    if (contextValue === undefined) {
        throw new Error(`useAuth must be used within ${Object.keys({AuthContext})[0]}`);
    }
    return contextValue;
}

export default useAuth;