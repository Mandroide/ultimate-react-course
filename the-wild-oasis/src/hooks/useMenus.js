import {useContext} from "react";
import {MenusContext} from "../utils/contexts.js";

export default function useMenus() {
    return useContext(MenusContext);
}