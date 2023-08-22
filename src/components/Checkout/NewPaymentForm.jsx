import classes from '../Profile/Profile.module.scss';
import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { makeRequest } from '../../axios';
import { enableCart, setCheckoutDone } from '../../store/wishListSlice';
import { clearCarts } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';
import Error from '../Authentication/Error';
import { useNavigate } from 'react-router-dom';

const NewPaymentForm = ({ checkoutdata }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	async function checkCardPayment() {
		try {
			setLoading(true);

			const res = await makeRequest.post('/order/payment', {
				products: checkoutdata.products,
			});

			const { data: products, client_secret } = res.data;

			// Confirm the payment with the Stripe instance
			const { error, paymentIntent } = await stripe.confirmCardPayment(
				client_secret,
				{
					payment_method: { card: elements.getElement(CardElement) },
				}
			);

			setLoading(false);
			return [error, products];
		} catch (error) {
			setLoading(false);
			return [error, undefined];
		}
	}
	const handleOrderSubmit = async () => {
		const [paymentError, products] = await checkCardPayment();

		if (paymentError) {
			setError(
				`Payment error: ${paymentError?.message || 'something went Wrong'}`
			);
		} else {
			try {
				setLoading(true);
				const res = await makeRequest.post('/order', {
					adresse: checkoutdata.adresse,
					products,
				});

				console.log('Order created:', res.data);
				dispatch(setCheckoutDone());
				dispatch(clearCarts());
				dispatch(enableCart());
				navigate('/order-confirmation', {
					state: { id: res.data.data._id },
				});
			} catch (error) {
				setLoading(false);
				setError(error?.response?.data?.message || 'Server Error');
			}
		}
	};
	const cardElementOptions = {
		style: {
			base: {
				fontSize: '16px',
				color: '#424770',
				'::placeholder': {
					color: '#aab7c4',
				},
				margin: '1rem 0', // Apply margin 1rem vertically and 0 horizontally
			},
			invalid: {
				color: '#9e2146',
			},
		},
	};

	return (
		<div>
			{error && <Error msg={error} setError={setError} />}
			<CardElement options={cardElementOptions} />
			<input
				type='submit'
				onClick={handleOrderSubmit}
				disabled={!stripe || loading}
				value={loading ? 'Processing...' : 'Place Order'}
				style={{ padding: '12px', marginTop: '1rem' }}
			/>
		</div>
	);
};

export default NewPaymentForm;
