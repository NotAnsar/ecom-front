import React, { useEffect } from 'react';

import Register from '../components/Authentication/Register';

const RegisterPage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	return <Register />;
};

export default RegisterPage;
