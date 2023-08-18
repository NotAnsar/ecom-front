import React from 'react';
import classes from './WishList.module.scss';

import ItemWish from './ItemWish';
import { useSelector } from 'react-redux';
const Middle = () => {
	const wish = useSelector((state) => state.storageSlice.wish);

	return (
		<div className={classes.middle}>
			{wish.length === 0 ? (
				<p className={classes.empty}>Your WishList is currently empty.</p>
			) : (
				wish.map((p) => (
					<ItemWish
						key={p._id}
						id={p._id}
						image={p.image}
						name={p.name}
						price={p.price}
					/>
				))
			)}
		</div>
	);
};

export default Middle;
