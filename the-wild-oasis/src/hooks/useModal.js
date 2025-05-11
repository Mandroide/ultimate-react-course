import {useContext} from "react";
import {ModalContext} from "../utils/contexts.js";

export default function useModal() {
    return useContext(ModalContext);
}
