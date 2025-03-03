import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.pizzaId === action.payload);
      item.totalPrice = item.unitPrice * ++item.quantity;
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.pizzaId === action.payload);
      if (--item.quantity > 0) {
        item.totalPrice = item.unitPrice * item.quantity;
      } else {
        cartSlice.caseReducers.deleteItem(state, action)
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions;

export const getCart = state => state.cart.cartItems;

export const selectTotalsOfCart = createSelector(getCart, (cartItems) =>
  cartItems.reduce(
    (acc, curr) => {
      return {
        totalQuantity: curr.quantity + acc.totalQuantity,
        totalPrice: curr.unitPrice * curr.quantity + acc.totalPrice,
      };
    },
    { totalQuantity: 0, totalPrice: 0 },
  )
);

export const getQuantityById = id => state =>
  state.cart.cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;