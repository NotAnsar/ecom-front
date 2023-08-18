import classes from '../Profile/Profile.module.scss';
import { VscAdd } from 'react-icons/vsc';

const CheckoutAdress = ({
	city,
	adress,
	country,
	zipCode,
	id,
	newAdresse = false,
	checked,
	setChecked,
	setnewAdress,
}) => {
	return (
		<div
			className={`${classes.adresse} ${classes.radio}`}
			style={{ cursor: newAdresse && 'pointer' }}
			onClick={() => {
				if (newAdresse) setnewAdress(true);
			}}
		>
			{newAdresse ? (
				<p className={classes.addAdresse}>
					<VscAdd /> Add New Adresse
				</p>
			) : (
				<>
					<input
						type='radio'
						name='adresse'
						value={id}
						checked={checked === id}
						onChange={() => setChecked(id)}
					/>
					<div>
						<p>{adress}</p>
						<p>
							{city} / {zipCode}
						</p>
						<p>{country}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default CheckoutAdress;
