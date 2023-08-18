import React, { useState } from 'react';
import classes from '../Profile/Profile.module.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticate } from '../../store/authentication';
import { makeRequest } from '../../axios';
import Error from './Error';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		cpassword: '',
		firstName: '',
		lastName: '',
	});
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const formHandler = (e) => {
		e.preventDefault();
		console.log(formData);
		if (
			!formData.email.includes('@') ||
			!formData.password.length > 6 ||
			formData.firstName.trim() === '' ||
			formData.lastName.trim() === '' ||
			formData.cpassword !== formData.password
		) {
			if (formData.cpassword !== formData.password)
				setError('Passwords must match');
			if (!formData.email.includes('@')) setError('Email not valid');

			return;
		}

		registerUser();
		async function registerUser() {
			try {
				const res = await makeRequest.post('/auth/register', formData);

				dispatch(authenticate(res.data));
			} catch (error) {
				setError(error?.response?.data?.message || 'Server Error');
			}
		}
	};
	return (
		<div className={classes.formContainer}>
			<form onSubmit={formHandler}>
				<div>
					<p>Register</p>
					<hr />
				</div>
				{error && <Error msg={error} setError={setError} />}
				<div className={classes.inputSplit2}>
					<div className={classes.inputContainer}>
						<input
							required
							type='text'
							value={formData.firstName}
							name='firstName'
							onChange={handleChange}
						/>
						<label>First Name</label>
					</div>
					<div className={classes.inputContainer}>
						<input
							required
							type='text'
							value={formData.lastName}
							name='lastName'
							onChange={handleChange}
						/>
						<label>Last Name</label>
					</div>
				</div>

				<div className={classes.inputContainer}>
					<input
						type='text'
						name='email'
						onChange={handleChange}
						value={formData.email}
						required
					/>

					<label>Email Adresse</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						type='password'
						name='password'
						minLength='8'
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<label>Password</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						type='password'
						name='cpassword'
						minLength='8'
						value={formData.cpassword}
						onChange={handleChange}
						required
					/>
					<label>Confirm Password</label>
				</div>
				<div className={classes.newUser}>
					<input type='submit' value='Submit' />

					<Link to='/login'>Already have an account ?</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;
