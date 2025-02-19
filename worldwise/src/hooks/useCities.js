import {useContext} from "react";
import {CitiesContext} from "../constants/contexts.js";

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error('useCities must be used within CitiesProvider');
    }
    return context;
}

export default useCities;