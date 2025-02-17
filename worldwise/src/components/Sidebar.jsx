import styles from "./Sidebar.module.css"
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <Footer publishYear={2025} author="WorldWise Inc."/>
        </div>
    )
}

export default Sidebar;