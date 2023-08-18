import { useEffect, useState } from 'react';
import classes from '../Profile.module.scss';
import MyAdress from './myAdress';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Error from '../../Authentication/Error';
import { useSelector } from 'react-redux';

const Adresse = () => {
	const { user } = useSelector((state) => state.auth);

	const location = useLocation();
	const [error, setError] = useState(false);

	const alertMsg = location.state && location.state.alertMsg;

	useEffect(() => {
		if (alertMsg) setError(alertMsg);
	}, [alertMsg]);

	return (
		<>
			{error && <Error msg={error} setError={setError} color={'green'} />}
			<div className={classes.adresseTitle}>
				<h1>Adresses</h1>
				{location.pathname === '/profile/adresses' && (
					<Link to='add'>
						<span>ADD address</span>
					</Link>
				)}
			</div>

			<div className={classes.adresseContainer}>
				{user?.adresse?.length === 0 && <p>No Address is available</p>}
				{user?.adresse?.length !== 0 &&
					user?.adresse.map((a) => (
						<MyAdress
							key={a._id}
							city={a.city}
							id={a._id}
							adress={a.adress}
							country={a.country}
							zipCode={a.zipCode}
						/>
					))}
			</div>
		</>
	);
};

export default Adresse;
