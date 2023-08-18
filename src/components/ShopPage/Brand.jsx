import React, { useEffect, useState } from 'react';

import classes from './ShopItem.module.scss';
import { IoIosArrowUp } from 'react-icons/io';

const Brand = ({ title, data, selected, reseted, setReseted }) => {
	const [isOpen, setIsOpen] = useState(false);

	const [isChecked, setIsChecked] = useState('');

	useEffect(() => {
		if (reseted) {
			setIsChecked('');
			setReseted(false);
		}
	}, [reseted]);

	const handleOnChange = (id) => {
		selected(id);
		setIsChecked(id);
	};

	return (
		<div className={classes.brand}>
			<div className={classes.brandTitle}>
				<h4>{title}</h4>
				<div
					className={`${classes.arrow} ${
						isOpen ? classes.arrowOpen : classes.arrowClose
					} `}
					onClick={() => {
						setIsOpen((p) => !p);
					}}
				>
					<IoIosArrowUp />
				</div>
			</div>
			{isOpen && (
				<ul>
					{data.map((d, i) => (
						<li key={i} className={classes.brandItem}>
							<p> {d.name}</p>
							<input
								type='radio'
								name={title}
								value={d._id}
								checked={isChecked === d._id}
								onChange={() => handleOnChange(d._id)}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Brand;
