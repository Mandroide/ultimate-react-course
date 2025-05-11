import React from 'react';
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {useLogout} from "./useLogout.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function Logout() {
    const {isSigningOut, logout} = useLogout();
    return (
        <ButtonIcon disabled={isSigningOut} onClick={logout}>
            {isSigningOut ? <SpinnerMini/> : <HiArrowRightOnRectangle/>}
        </ButtonIcon>
    );
}

export default Logout;