import React, { useEffect } from 'react';
import classes from '../Profile/Profile.module.scss';

const Error = ({ msg, setError, color = '' }) => {
	useEffect(() => {
		const clearErrorAfterDelay = () => {
			setTimeout(() => {
				setError('');
			}, 3000);
		};

		clearErrorAfterDelay();

		return () => {
			clearTimeout(clearErrorAfterDelay);
		};
	}, [msg, setError]);

	return (
		<div
			className={`${classes.error} ${color === 'green' ? classes.green : ''}`}
		>
			{msg}
		</div>
	);
};

export default Error;
