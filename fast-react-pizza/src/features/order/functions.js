import { createOrder, getOrder } from "../../services/apiRestaurant.js";
import { redirect } from "react-router";
import { PATHS } from "../../utils/enums.js";
import { clearCart } from "../cart/cartSlice.js";
import updateOrder from "./UpdateOrder.jsx";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export async function orderLoader({ params }) {
  return await getOrder(params.orderId);
}

export async function createOrderAction(request, store) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on"
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give us your correct phone number. We might need it to contact you.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);
  // DO not overuse
  store.dispatch(clearCart());


  return redirect(`${PATHS.ORDER.split(":")[0]}${newOrder.id}`);
}

export async function updateOrderAction({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}