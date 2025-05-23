import Sidebar from "../components/Sidebar.jsx";
import styles from "./AppLayout.module.css";
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";


export default function AppLayout() {

    return (
        <div className={styles.app}>
            <Sidebar/>
            <Map/>
            <User/>
        </div>
    )
}