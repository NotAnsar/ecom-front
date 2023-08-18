import React, { useState } from 'react';
import classes from '../Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../../axios';
import { setMyUser } from '../../../store/authentication';
import Error from '../../Authentication/Error';
import { useNavigate, useParams } from 'react-router-dom';

const AdressForm = ({ type = 'add' }) => {
	const { user } = useSelector((state) => state.auth);
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let adresse = undefined;

	if (type !== 'add') {
		const { id } = useParams();
		adresse = user.adresse.find((a) => a._id === id);
	}

	const [adresseData, setadresseData] = useState({
		city: adresse ? adresse.city : '',
		adress: adresse ? adresse.adress : '',
		country: adresse ? adresse.country : '',
		zipCode: adresse ? adresse.zipCode : '',
	});

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setadresseData((prev) => ({ ...prev, [name]: value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		if (
			!adresseData.adress ||
			!adresseData.country ||
			!adresseData.city ||
			!/^\d{5}$/.test(adresseData.zipCode)
		) {
			if (!/^\d{5}$/.test(adresseData.zipCode)) {
				setError('Zip Code not valid');
			} else setError('Please fill in all address fields');

			return;
		}

		addAdresse();
		async function addAdresse() {
			try {
				let res;
				if (type === 'add')
					res = await makeRequest.post('/users/address', adresseData);
				else
					res = await makeRequest.patch(
						`/users/address/${adresse._id}`,
						adresseData
					);

				dispatch(setMyUser(res.data));

				navigate('/profile/adresses', {
					state: { alertMsg: res.data.message },
				});
			} catch (error) {
				console.log(error);
				setError(error?.response?.data?.message || 'Server Error');
			}
		}
	};

	return (
		<>
			{error && <Error msg={error} setError={setError} />}
			<h1>{type === 'add' ? 'New address' : 'Edit address'}</h1>

			<form onSubmit={formHandler}>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						name='adress'
						value={adresseData.adress}
						onChange={handleChange}
					/>

					<label>Adresse</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						name='country'
						value={adresseData.country}
						onChange={handleChange}
					/>
					<label>Country</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						type='text'
						required
						name='city'
						value={adresseData.city}
						onChange={handleChange}
					/>
					<label>City</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						type='text'
						required
						name='zipCode'
						value={adresseData.zipCode}
						onChange={handleChange}
					/>
					<label>Zip Code</label>
				</div>
				<input type='submit' value='Save' />
			</form>
		</>
	);
};

export default AdressForm;
