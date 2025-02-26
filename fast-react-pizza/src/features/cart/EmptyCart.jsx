import { Link } from 'react-router';
import {PATHS} from "../../utils/enums.js";

function EmptyCart() {
  return (
    <div>
      <Link to={PATHS.MENU}>&larr; Back to menu</Link>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
