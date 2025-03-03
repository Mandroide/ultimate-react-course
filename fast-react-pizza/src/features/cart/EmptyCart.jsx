import { PATHS } from "../../utils/enums.js";
import LinkButton from "../../ui/LinkButton.jsx";

function EmptyCart() {
  return (
    <div className="py-3 px-4">
      <LinkButton to={PATHS.MENU}>&larr; Back to menu</LinkButton>

      <p className="font-semibold mt-7">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
