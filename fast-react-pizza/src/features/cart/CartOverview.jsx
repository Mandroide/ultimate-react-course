import {Link} from "react-router";
import {PATHS} from "../../utils/enums.js";

function CartOverview() {
  return (
    <div>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
        <Link to={PATHS.CART}>Open Cart</Link>
    </div>
  );
}

export default CartOverview;
