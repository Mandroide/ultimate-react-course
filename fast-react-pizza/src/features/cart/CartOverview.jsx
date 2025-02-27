import {Link} from "react-router";
import {PATHS} from "../../utils/enums.js";

function CartOverview() {
  return (
    <div className="bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
        <Link to={PATHS.CART}>Open Cart</Link>
    </div>
  );
}

export default CartOverview;
