import React, { useEffect, useState } from 'react';
import classes from './ShopItem.module.scss';

const ShopHeader = ({ getSort, reseted }) => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleChange = (e) => {
		let value = e.target.value;
		setSelectedOption(value);
		getSort(value);
	};
	useEffect(() => {
		if (reseted) {
			setSelectedOption('');
		}
	}, [reseted]);

	return (
		<div className={classes.shopAll}>
			<h1>Shop All</h1>
			<div className={classes.sortBy}>
				<div className={classes.sortBy}>
					<select
						onChange={handleChange}
						className={classes.sort}
						value={selectedOption}
					>
						<option value=''>Sort</option>
						<option value='name'>Name A-Z</option>
						<option value='-name'>Name Z-A</option>
						<option value='price'>Price (Low to High)</option>
						<option value='-price'>Price (High to Low)</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ShopHeader;
