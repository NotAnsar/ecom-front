// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { Login } from '../../store/authentication';

// import classes from './Form.module.scss';
// const LoginForm = () => {
// 	const [formData, setFormData] = useState({ email: '', password: '' });
// 	const { loggedIn, role, error, errorMsg } = useSelector(
// 		(state) => state.auth
// 	);
// 	const [errorr, setError] = useState({ error: false, message: '' });
// 	const dispatch = useDispatch();
// 	let navigate = useNavigate();

// 	useEffect(() => {
// 		if (loggedIn) {
// 			if (role === 'user') {
// 				navigate('/profile');
// 			}
// 			if (role === 'admin') {
// 				navigate('/dashboard');
// 			}
// 		}
// 		if (error) {
// 			setError({ error: error, message: errorMsg });
// 		}
// 	}, [loggedIn, error, errorMsg]);

// 	const formHandler = (e) => {
// 		e.preventDefault();
// 		if (!formData.email.includes('@') || !formData.password.length > 4) return;

// 		dispatch(Login(formData.email, formData.password));
// 	};
// 	const handleChange = (e) => {
// 		let value = e.target.value;
// 		let name = e.target.name;

// 		setFormData((prev) => ({ ...prev, [name]: value }));
// 	};
// 	return (
// 		<div className={classes.login}>
// 			<div className={classes.container}>
// 				{errorr.error && <p className={classes.alert}>{errorr.message}.</p>}
// 				<div className={classes.form}>
// 					<form onSubmit={formHandler}>
// 						<label htmlFor='email'>Email</label>
// 						<input
// 							type='text'
// 							name='email'
// 							onChange={handleChange}
// 							value={formData.email}
// 							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
// 							required
// 						/>
// 						<label htmlFor='password'>Password</label>
// 						<input
// 							type='password'
// 							name='password'
// 							minLength='6'
// 							value={formData.password}
// 							onChange={handleChange}
// 							required
// 						/>
// 						<input type='Submit' placeholder='Login Now' />
// 					</form>
// 					<div className={classes.newUser}>
// 						<Link to='/register'>New User ?</Link>
// 					</div>
// </div>
// 			</div>
// 		</div>
// 	);
// };

// export default LoginForm;
