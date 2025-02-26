import {useLoaderData} from "react-router"
import MenuItem from "./MenuItem.jsx";

function Menu() {
    const menu = useLoaderData();
    return (
        <ul>
            {menu.map((pizza) => <MenuItem key={pizza.id} pizza={pizza}/>)}
        </ul>
    )
}

export default Menu;
