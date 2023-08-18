import classes from '../Profile/Profile.module.scss';

const PersonalDetails = ({ handleChange, userData }) => {
	return (
		<>
			<div className={classes.inputSplit2}>
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
						name='lastName'
						onChange={handleChange}
						value={userData.lastName}
					/>
					<label>Last Name</label>
				</div>
			</div>
			<div className={classes.inputSplit2}>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						name='email'
						onChange={handleChange}
						value={userData.email}
					/>
					<label>Email Adresse</label>
				</div>
				<div className={classes.inputContainer}>
					<input
						required
						type='text'
						name='tel'
						onChange={handleChange}
						value={userData.tel}
					/>
					<label>Mobile Number</label>
				</div>
			</div>
		</>
	);
};

export default PersonalDetails;
