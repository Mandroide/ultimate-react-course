import {Link} from "react-router";
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header() {
    return (
        <header>
            <Link to="/">Fast React Pizza Co.</Link>
            <SearchOrder/>
            <p>TEST</p>
        </header>
    );
}

export default Header;