import classes from '../Profile/Profile.module.scss';
const NewPaymentForm = () => {
	return (
		<div>
			<form className={classes.checkoutForm}>
				<h5>Card DETAILS</h5>
				<div className={classes.inputSplit2}>
					<div className={classes.inputContainer}>
						<input required type='text' />
						<label>NAME OF CARDHOLFER</label>
					</div>
					<div className={classes.inputContainer}>
						<input required type='text' />
						<label>CARD NUMBER</label>
					</div>
				</div>
				<div className={classes.inputSplit2}>
					<div className={classes.inputContainer}>
						<input required type='text' />
						<label>EXPIRY DATE</label>
					</div>
					<div className={classes.inputContainer}>
						<input required type='text' />
						<label>EXPIRY DATE</label>
					</div>
				</div>
			</form>
		</div>
	);
};

export default NewPaymentForm;
