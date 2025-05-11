import {useContext} from "react";
import {TableContext} from "../utils/contexts.js";

export default function useTable() {
    return useContext(TableContext);
}