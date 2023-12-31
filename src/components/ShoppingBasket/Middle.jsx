import React, { useState } from 'react';
import classes from './ShoppingBasket.module.scss';

import Item from './Item';

const Middle = ({ cart }) => {
	return (
		<div className={classes.middle}>
			{cart.length === 0 ? (
				<p className={classes.empty}>Your cart is currently empty.</p>
			) : (
				cart.map((p) => (
					<Item
						key={String(p._id)}
						id={p._id}
						image={p.image}
						name={p.name}
						price={p.price}
						qte={p.qte}
						brand={p.brand}
						categorie={p.categorie}
					/>
				))
			)}
		</div>
	);
};

export default Middle;
