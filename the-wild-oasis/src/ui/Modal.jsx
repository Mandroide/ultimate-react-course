import styled from "styled-components";
import {HiXMark} from "react-icons/hi2";
import {createPortal} from "react-dom";
import {useState} from "react";
import useModal from "../hooks/useModal.js";
import {ModalContext} from "../utils/contexts.js";
import useOutsideClick from "../hooks/useOutsideClick.js";
import Menus from "./Menus.jsx";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
    max-height: 90vh;
    overflow: scroll;

    &::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
        stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

function Modal({children, isOpen = false}) {
    const [isOpenModal, setIsOpenModal] = useState(isOpen);
    const openModal  = () => setIsOpenModal(true);
    const closeModal  = () => setIsOpenModal(false);
    return (
        <ModalContext.Provider value={{isOpenModal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

function Window({children}) {
    const { isOpenModal, closeModal } = useModal();
    const ref = useOutsideClick(closeModal);

    if (!isOpenModal) return null;

    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button type="button" onClick={closeModal}><HiXMark/></Button>
                <div>{children}</div>
            </StyledModal>
        </Overlay>, document.body);
}

function Open({icon, children, onClick = null}) {
    const {openModal } = useModal();
    return <Menus.Button icon={icon} onClick={() => onClick ? onClick() : openModal}>{children}</Menus.Button>
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;