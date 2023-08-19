import { Navigate, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import { Header } from './components/Header/Header';
import { CheckOut } from './pages/CheckOut';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Error } from './pages/Error';
import { ShoppingBasket } from './components/ShoppingBasket/ShoppingBasket';
import { Menu } from './components/ShoppingBasket/Menu';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import { WishList } from './components/Wishlist/WishList';
import { useEffect } from 'react';
import { fetchData } from './store/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Product from './pages/Product';
import { Payement } from './pages/Payement';
import Dashboard from './pages/Dashboard';
import { OrderConfirm } from './pages/OrderConfirm';
import { makeRequest } from './axios';
import url from './store/url';

function App() {
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.storageSlice);
	const { token, user } = useSelector((state) => state.auth);
	makeRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const { checkoutDone } = useSelector((state) => state.wishCard);

	console.log(url);

	useEffect(() => {
		dispatch(fetchData());
	}, []);

	return (
		<Fragment>
			<Header />
			<ShoppingBasket />
			<WishList />
			<Menu />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/product/:id' element={<Product />} />

				{checkoutDone && (
					<Route path='/order-confirmation' element={<OrderConfirm />} />
				)}

				{!user && (
					<>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/profile' element={<Navigate to='/login' />} />
						{cart.length > 0 && (
							<Route path='/checkout' element={<Navigate to='/login' />} />
						)}
					</>
				)}

				{user && user?.role === 'user' && (
					<>
						<Route path='/profile/*' element={<Profile />} />
						<Route path='/login' element={<Navigate to='/profile' />} />
						<Route path='/register' element={<Navigate to='/profile' />} />
						{cart.length > 0 && (
							<Route path='/checkout' element={<CheckOut />} />
						)}
					</>
				)}

				{user && user?.role === 'admin' && (
					<>
						<Route path='/dashboard/*' element={<Dashboard />} />
						<Route path='/login' element={<Navigate to='/dashboard' />} />
						<Route path='/register' element={<Navigate to='/dashboard' />} />
					</>
				)}

				<Route path='*' element={<Error />} />
			</Routes>
			<Footer />
		</Fragment>
	);
}

export default App;
