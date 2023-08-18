import React, { Fragment, useEffect } from 'react';
import classes from './Profile.module.scss';
import {
	Link,
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { ProfileInfo } from './ProfileInfo';

import { Orders } from './Orders/Orders';
import { Payments } from './Payments';
import { Adresses } from './Adresse/Adresses';
import OrderDetails from './Orders/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authentication';
import { clearCarts } from '../../store/cartSlice';

const NewProfile = () => {
	const location = useLocation();
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	return (
		<Fragment>
			<div className={classes.wrapper}>
				<div className={`${classes.header} ${classes.container}`}>
					<h1>
						Hi, {user.lastName} {user.firstName}
					</h1>

					<Link to='/login' className={classes.logOut}>
						<div
							onClick={() => {
								dispatch(logout());
								dispatch(clearCarts());
							}}
						>
							Sign Out
						</div>
					</Link>
				</div>
			</div>

			<main className={`${classes.container}`}>
				<nav>
					<ul>
						<li
							className={`${
								!location.pathname.split('/')[2] && classes.clicked
							}`}
						>
							<Link to=''>Profile</Link>
						</li>
						<li
							className={`${
								location.pathname.split('/')[2] === 'orders' && classes.clicked
							}`}
						>
							<Link to='orders'>Orders</Link>
						</li>
						<li
							className={`${
								location.pathname.split('/')[2] === 'adresses' &&
								classes.clicked
							}`}
						>
							<Link to='adresses'>Adresses</Link>
						</li>
						<li
							className={`${
								location.pathname.split('/')[2] === 'payments' &&
								classes.clicked
							}`}
						>
							<Link to='payments'>Payments</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path='' element={<ProfileInfo />} />
					<Route path='adresses/*' element={<Adresses />} />

					<Route path='orders' element={<Orders />} />
					<Route path='orders/:id' element={<OrderDetails />} />

					<Route path='payments' element={<Payments />} />
					<Route path='*' element={<Navigate to='' />} />
				</Routes>
			</main>
		</Fragment>
	);
};

export default NewProfile;
