// Test ID: IIDSAT

import {useLoaderData} from "react-router";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import CartItem from "../cart/CartItem.jsx";
import OrderItem from "./OrderItem.jsx";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-red-50 tracking-wide">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="bg-stone-200 py-5 px-6 gap-2 items-center justify-between flex-wrap">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-y divide-stone-200 border-y">
        {cart.map((item) => (<OrderItem key={item.id} item={item} />))}
      </ul>
      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export default Order;
