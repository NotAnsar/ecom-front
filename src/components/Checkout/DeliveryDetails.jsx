import React from 'react';
import classes from '../Profile/Profile.module.scss';

const DeliveryDetails = ({ handleAddressChange, adresseData }) => {
	console.log(adresseData);
	return (
		<>
			<div className={classes.inputSplit2}>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						name='adress'
						value={adresseData.adress}
						onChange={handleAddressChange}
					/>
					<label>Adresse</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						name='country'
						value={adresseData.country}
						onChange={handleAddressChange}
					/>
					<label>Country</label>
				</div>
			</div>
			<div className={classes.inputSplit2}>
				<div className={classes.inputContainer}>
					<input
						type='text'
						required
						name='city'
						value={adresseData.city}
						onChange={handleAddressChange}
					/>
					<label>City</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						type='text'
						required
						name='zipCode'
						value={adresseData.zipCode}
						onChange={handleAddressChange}
					/>
					<label>Zip Code</label>
				</div>
			</div>
		</>
	);
};

export default DeliveryDetails;
