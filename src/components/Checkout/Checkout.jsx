import React, { useState } from 'react';

import { IoIosArrowUp } from 'react-icons/io';

import classes from './Checkout.module.scss';

import Summary from './Summary';

import NewCheckoutForm from './NewCheckoutForm';
import NewPaymentForm from './NewPaymentForm';
import { useDispatch, useSelector } from 'react-redux';
import { disableCart } from '../../store/wishListSlice';

const Checkout = () => {
	const [stepOneDone, setStepOneDone] = useState(false);
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.storageSlice);

	const [checkoutdata, setCheckoutdata] = useState({
		products: null,
		adresse: null,
	});

	function stepOneisDone(adresse) {
		const products = cart.map((c) => ({ product: c._id, quantity: c.qte }));

		setCheckoutdata((prevData) => ({
			...prevData,
			products,
			adresse: adresse,
		}));

		dispatch(disableCart());

		setStepOneDone(true);
	}

	return (
		<div className={classes.container}>
			<div className={classes.stepContainer}>
				<span className={classes.selected}>
					<h2>Your Information</h2>
				</span>
				<div className={`${classes.steptwo} ${classes.selected}`}>
					<IoIosArrowUp />
					{stepOneDone ? <span>2. Payement</span> : <span>1. Details</span>}
				</div>
			</div>
			<div className={classes.grid}>
				{stepOneDone ? (
					<NewPaymentForm checkoutdata={checkoutdata} />
				) : (
					<NewCheckoutForm setStepOneDone={stepOneisDone} />
				)}

				<div>
					<Summary />
				</div>
			</div>
		</div>
	);
};

export default Checkout;
