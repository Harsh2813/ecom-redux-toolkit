import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      existingItem.quantity--;
      existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      state.items = state.items.filter((item) => item.quantity > 0);//mtlb jo bhi particular item hua items array me uski quantity -- hote hote 0 ho jayegi to items array me filter lga diye jiski bhi quantity 0 se badi ho wo bs show ho cart me
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
