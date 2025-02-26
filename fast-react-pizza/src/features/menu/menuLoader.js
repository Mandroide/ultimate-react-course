import {getMenu} from "../../services/apiRestaurant.js";

export default async function loader() {
    return await getMenu();
}