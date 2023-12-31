import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartIsShowing: null,
	wishIsShowing: null,
	menuIsShowing: null,
	checkoutDone: false,
	cartdisabled: false,
};

export const wishListSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setCheckoutDone: (state) => {
			state.checkoutDone = true;
		},
		unDoneCheckout: (state) => {
			state.checkoutDone = false;
		},
		showCart: (state) => {
			if (state.cartdisabled) {
				state.cartIsShowing = false;
			} else {
				state.cartIsShowing = true;
			}
		},
		disableCart: (state) => {
			state.cartdisabled = true;
		},
		enableCart: (state) => {
			state.cartdisabled = false;
		},
		hideCart: (state) => {
			state.cartIsShowing = false;
		},
		toggleCart: (state) => {
			state.cartIsShowing = !state.isShowing;
		},
		showMenu: (state) => {
			state.menuIsShowing = true;
		},
		hideMenu: (state) => {
			state.menuIsShowing = false;
		},
		toggleMenu: (state) => {
			state.menuIsShowing = !state.isShowing;
		},
		showWish: (state) => {
			state.wishIsShowing = true;
		},
		hideWish: (state) => {
			state.wishIsShowing = false;
		},
		toggleWish: (state) => {
			state.wishIsShowing = !state.isShowing;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	showCart,
	hideCart,
	toggleCart,
	showWish,
	hideWish,
	toggleWish,
	showMenu,
	hideMenu,
	toggleMenu,
	setCheckoutDone,
	unDoneCheckout,
	enableCart,
	disableCart,
} = wishListSlice.actions;

export default wishListSlice.reducer;
