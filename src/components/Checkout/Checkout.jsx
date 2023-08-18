import React, { useEffect, useState } from 'react';

import { IoIosArrowUp } from 'react-icons/io';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './Checkout.module.scss';
import CheckoutForm from './CheckoutForm';
import PayementForm from './PayementForm';
import Summary from './Summary';

import NewCheckoutForm from './NewCheckoutForm';
import NewPaymentForm from './NewPaymentForm';

const Checkout = () => {
	return (
		<div className={classes.container}>
			<div className={classes.stepContainer}>
				<span className={classes.selected}>
					<h2>Your Information</h2>
				</span>
				<div className={`${classes.steptwo} ${classes.selected}`}>
					<IoIosArrowUp />
					<span>1. Details</span>
					{/* <span>2. Payement</span> */}
				</div>
			</div>
			<div className={classes.grid}>
				<NewCheckoutForm />

				<div>
					<Summary />
				</div>
			</div>
		</div>
	);
};

export default Checkout;
