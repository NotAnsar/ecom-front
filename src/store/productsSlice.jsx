import { createSlice } from '@reduxjs/toolkit';
import url from './url';
export const fetchData = () => {
	return async (dispatch) => {
		async function fetchData() {
			const res = await fetch(`${url}/products`);
			const data = (await res.json()).data;

			const { products, brands, categories } = data;

			return { products, brands, categories, error: false };
		}

		try {
			dispatch(products.actions.getproducts(await fetchData()));
		} catch (error) {
			console.log(error);
			return { error: true };
		}
	};
};

const initialState = {
	product: {},
	products: [],
	brands: [],
	categories: [],
	trendingItems: [],
	shopAll: [],
	error: false,
};

export const products = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getproducts: (state, action) => {
			state.products = action.payload.products;
			state.brands = action.payload.brands;
			state.categories = action.payload.categories;
			state.error = action.payload.error;
			state.shopAll = state.products.slice(0, 6);
			state.trendingItems = state.products.slice(6, 9);
		},
		getCategorie: (state, action) => {
			state.categories = action.payload;
		},
		getBrand: (state, action) => {
			state.brands = action.payload;
		},
		findProduct: (state, action) => {
			state.product = state.products.find((p) => {
				p.product_id === +action.payload.id;
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const { getproducts, findProduct, getBrand, getCategorie } =
	products.actions;

export default products.reducer;
