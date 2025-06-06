import styled from "styled-components";
import Logout from "../features/authentication/Logout.jsx";
import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineUser} from "react-icons/hi2";
import {useNavigate} from "react-router";
import {PATHS} from "../utils/enums.js";
import DarkModeToggle from "./DarkModeToggle.jsx";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem`;

function HeaderMenu() {
    const navigate = useNavigate();
    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate(PATHS.ACCOUNT)}>
                    <HiOutlineUser/>
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle/>
            </li>
            <li>
                <Logout/>
            </li>
        </StyledHeaderMenu>
    );
}

export default HeaderMenu;