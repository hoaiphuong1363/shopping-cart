import { createSlice } from '@reduxjs/toolkit';
import store from '.';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0, changed: false },

    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            console.log(state.items);
            let existingItem = state.items.find((item) => item.id === newItem.id);
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
                console.log(12);
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
                console.log(11);
            }
        },
        removeItemToCart(state, action) {
            state.changed = true;
            const id = action.payload;
            let existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
