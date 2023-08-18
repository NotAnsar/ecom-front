import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Profile.module.scss';
import { makeRequest } from '../../axios';
import { setMyUser } from '../../store/authentication';
import Error from '../Authentication/Error';

export const ProfileInfo = () => {
	const { user } = useSelector((state) => state.auth);
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		tel: user.tel,
	});

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
		const isValidTel = /^[\d]{10}$/.test(userData.tel);

		if (!isValidEmail || !isValidTel) {
			setError('Email Or Mobile Number Are not valid');
			return;
		}

		updateUser();
		async function updateUser() {
			try {
				const res = await makeRequest.patch('/users', userData);

				dispatch(setMyUser(res.data));
				setError('User Update Successfully');
			} catch (error) {
				console.log(error);
				setError(error?.response?.data?.message || 'Server Error');
			}
		}
	};

	return (
		<div className={classes.right}>
			{error && (
				<Error
					msg={error}
					setError={setError}
					color={`${error === 'User Update Successfully' ? 'green' : ''}`}
				/>
			)}
			<h1>Profile</h1>
			<form onSubmit={formHandler}>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						name='firstName'
						onChange={handleChange}
						value={userData.firstName}
					/>
					<label>First Name</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						value={userData.lastName}
						name='lastName'
						onChange={handleChange}
					/>
					<label>Last Name</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						type='text'
						required
						value={userData.email}
						name='email'
						onChange={handleChange}
					/>
					<label>Email Adresse</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						type='text'
						required
						value={userData.tel}
						name='tel'
						onChange={handleChange}
					/>
					<label>Mobile Number</label>
				</div>
				<input type='submit' value='Save' />
			</form>
		</div>
	);
};
