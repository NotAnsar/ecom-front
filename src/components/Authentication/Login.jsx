import React, { useState } from 'react';
import classes from '../Profile/Profile.module.scss';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/authentication';
import Error from './Error';

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });

	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		if (!formData.email.includes('@') || !formData.password.length > 8) {
			setError('Email not valid');
			return;
		}

		loginUser();
		async function loginUser() {
			try {
				const res = await makeRequest.post('/auth/login', formData);

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
					<p>Login</p>
					<hr />
				</div>

				{error && <Error msg={error} setError={setError} />}
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
						min={8}
						required
					/>
					<label>Password</label>
				</div>
				<div className={classes.newUser}>
					<input type='submit' value='Submit' />
					<Link to='/register'>New User ?</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
