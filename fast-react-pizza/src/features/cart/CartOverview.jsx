import { Link } from "react-router";
import { PATHS } from "../../utils/enums.js";
import { useSelector } from "react-redux";
import { selectTotalsOfCart } from "./cartSlice.js";
import { formatCurrency } from "../../utils/helpers.js";

function CartOverview() {
  const { totalQuantity, totalPrice } = useSelector(selectTotalsOfCart);

  if (!totalQuantity) {
    return null;
  }
  return (
    <div
      className="bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
        <Link to={PATHS.CART}>Open Cart</Link>
    </div>
  );
}

export default CartOverview;
