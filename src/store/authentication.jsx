import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: localStorage.getItem('token') || null,
	user: JSON.parse(localStorage.getItem('user')) || null,
};

export const authSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem('token', action.payload);
			makeRequest.defaults.headers.common[
				'Authorization'
			] = `Bearer ${state.token}`;
		},
		setMyUser: (state, action) => {
			const { data } = action.payload;
			state.user = data;
			localStorage.setItem('user', JSON.stringify(data));
		},
		removeToken: (state) => {
			state.token = null;
			localStorage.removeItem('token');
		},
		removeUser: (state) => {
			state.user = null;
			localStorage.removeItem('user');
		},
		authenticate: (state, action) => {
			const { token, data } = action.payload;
			console.log(data, token);
			state.token = token;
			state.user = data;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(data));
		},

		logout: (state) => {
			state.token = null;
			state.user = null;
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	logout,
	authenticate,
	removeUser,
	removeToken,
	setMyUser,
	setToken,
} = authSlice.actions;

export default authSlice.reducer;
