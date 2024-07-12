import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';
import cartSlice, { CART_PERSISTENT_STATE } from './cart.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice
	}
});
store.subscribe(() => {
	saveState(JWT_PERSISTENT_STATE, { jwt: store.getState().user.jwt });
	saveState(CART_PERSISTENT_STATE, store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
