import React, { useState } from 'react';
import classes from '../Profile/Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';

import CheckoutAdress from './CheckoutAdress';
import DeliveryDetails from './DeliveryDetails';
import PersonalDetails from './PersonalDetails';
import { setMyUser } from '../../store/authentication';
import Error from '../Authentication/Error';
import { makeRequest } from '../../axios';
import { setCheckoutDone } from '../../store/wishListSlice';
import { clearCarts } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const NewCheckoutForm = ({ setStepOneDone }) => {
	const [adresseData, setadresseData] = useState({
		city: '',
		adress: '',
		country: '',
		zipCode: '',
	});
	const { user } = useSelector((state) => state.auth);
	const [newAdress, setnewAdress] = useState(user?.adresse?.length === 0);
	const dispatch = useDispatch();
	const [error, setError] = useState(false);

	const [userData, setUserData] = useState({
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		tel: user.tel,
	});

	const [checked, setChecked] = useState('');

	const handleAddressChange = (event) => {
		const { name, value } = event.target;
		setadresseData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const getOrderAddress = () => {
		if (newAdress) {
			if (
				!adresseData.adress ||
				!adresseData.country ||
				!adresseData.city ||
				!/^\d{5}$/.test(adresseData.zipCode)
			) {
				if (!/^\d{5}$/.test(adresseData.zipCode)) {
					setError('Zip Code not valid');
				} else setError('Please fill in all address fields');
				return null; // Invalid address
			}
			return adresseData;
		} else {
			if (checked) {
				const { _id, ...foundAddress } = user.adresse.find(
					(a) => a._id === checked
				);
				return foundAddress;
			} else {
				setError('Provide an address');
				return null; // No address selected
			}
		}
	};
	const updateUserDetails = async () => {
		const detailsChanged =
			userData.email !== user.email ||
			userData.firstName !== user.firstName ||
			userData.lastName !== user.lastName ||
			userData.tel !== user.tel;

		if (detailsChanged) {
			const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
			const isValidTel = /^[\d]{10}$/.test(userData.tel);

			if (!isValidEmail || !isValidTel) {
				setError('Email or Mobile Number is not valid');
				return false;
			}

			try {
				const res = await makeRequest.patch('/users', userData);
				console.log('updated');
				dispatch(setMyUser(res.data));
				return true; // User details updated successfully
			} catch (error) {
				console.log(error);
				setError(error?.response?.data?.message || 'Server Error');
				return false; // Failed to update user details
			}
		}

		return true; // No details changed
	};

	const formHandler = async (e) => {
		e.preventDefault();
		// 1. Update User Information
		const userUpdated = await updateUserDetails();
		if (!userUpdated) return; // Don't proceed if user details update failed or not needed

		// 2. get the adresse value
		const adresse = getOrderAddress();
		if (adresse === null) return; // Don't proceed if there's an invalid address

		// do the request
		console.log('done');
		setStepOneDone(adresse);
	};
	return (
		<div>
			{error && <Error msg={error} setError={setError} />}
			<form className={classes.checkoutForm} onSubmit={formHandler}>
				<h5>PERSONAL DETAILS</h5>
				<PersonalDetails handleChange={handleChange} userData={userData} />

				<h5 className={classes.delivery}>
					DELIVERY DETAILS
					{newAdress && <BiArrowBack onClick={() => setnewAdress(false)} />}
				</h5>

				{/* if user clicked on add new adresse */}
				{newAdress && user?.adresse?.length > 0 && (
					<DeliveryDetails
						handleAddressChange={handleAddressChange}
						adresseData={adresseData}
					/>
				)}
				{/* if user have no adresse we will show the adresse form  */}
				{user?.adresse?.length === 0 && (
					<DeliveryDetails
						handleAddressChange={handleAddressChange}
						adresseData={adresseData}
					/>
				)}
				{/* if user have adresses we will show the adresses and add new address button*/}
				{!newAdress && user?.adresse?.length > 0 && (
					<div className={classes.adresseContainer}>
						{user?.adresse.map((a) => (
							<CheckoutAdress
								key={a._id}
								city={a.city}
								id={a._id}
								adress={a.adress}
								country={a.country}
								zipCode={a.zipCode}
								checked={checked}
								setChecked={setChecked}
							/>
						))}

						{/* add new address button */}
						<CheckoutAdress newAdresse={true} setnewAdress={setnewAdress} />
					</div>
				)}

				<input type='submit' value='PROCEED TO PAYMENT' />
			</form>
		</div>
	);
};

export default NewCheckoutForm;
