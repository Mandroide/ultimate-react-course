import React from 'react';
import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineMoon} from "react-icons/hi";
import useDarkMode from "../hooks/useDarkMode.js";
import {HiOutlineSun} from "react-icons/hi2";

function DarkModeToggle() {
    const {isDarkMode, toggleDarkMode} = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon/>}
        </ButtonIcon>
    );
}

export default DarkModeToggle;