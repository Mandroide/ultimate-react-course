import { Form, useNavigation, useActionData } from "react-router";
import Button from "../../ui/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, selectUser } from "../user/userSlice.js";
import { getCart, selectTotalsOfCart } from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username, status: addressStatus, position, address,
  error: errorAddress} = useSelector(selectUser);
  const isLoadingAddress = addressStatus === "loading";
  const cart = useSelector(getCart);
  const { totalPrice } = useSelector(selectTotalsOfCart);
  const priorityPrice = withPriority ? 0.2 : 0;
  const finalPrice = totalPrice + priorityPrice;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&#39;s go!</h2>
      <Form method="post">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label
            className={`sm:basis-40 ${formErrors?.phone ? "sm:mb-10" : ""}`}
          >Phone number</label>
          <div className="flex-grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500 md:pl-6">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full"
                   type="text" name="address" required defaultValue={address} />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500 md:pl-6">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude &&
            <span className="absolute right-[3px] z-50 top-[3px] md:right-[5px] md:top-[5px]">
            <Button disabled={isLoadingAddress} type="small" onClick={() => dispatch(fetchAddress())}>
              {isLoadingAddress ? "Loading..." : "Get Position"}
            </Button>
          </span>
          }
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            disabled={isLoadingAddress}
            onChange={() => setWithPriority(!withPriority)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ?
            `${position.latitude},${position.longitude}` : ''} />
          <Button btnType="submit" type="primary"
                  disabled={isSubmitting || isLoadingAddress}>{isSubmitting ? "Placing order..." : `Order now for ${formatCurrency(finalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
