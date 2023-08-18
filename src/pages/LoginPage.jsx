import React, { useEffect } from 'react';

import Login from '../components/Authentication/Login';

const LoginPage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	return <Login />;
};

export default LoginPage;
