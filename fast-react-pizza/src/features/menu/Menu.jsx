import {useLoaderData} from "react-router"
import MenuItem from "./MenuItem.jsx";

function Menu() {
    const menu = useLoaderData();
    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menu.map((pizza) => <MenuItem key={pizza.id} pizza={pizza}/>)}
        </ul>
    )
}

export default Menu;
