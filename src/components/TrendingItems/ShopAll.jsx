import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingItem from './ShoppingItem';

import classes from './TrendingItems.module.scss';
import { FiArrowRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ShopAll = () => {
	const shopAll = useSelector((state) => state.products.shopAll);

	return (
		<div className={classes.trendingSection}>
			<div className={classes.container}>
				<div className={classes.shopAll}>
					<h1>Shop All</h1>
					<Link to='/shop' className={classes.viewAll}>
						View All
						<FiArrowRight />
					</Link>
				</div>
				{shopAll.length === 0 && (
					<div style={{ height: '400px' }}>
						<div className='load'>
							{/* <FiLoader /> */}
							<AiOutlineLoading3Quarters />
						</div>
					</div>
				)}
				{shopAll && (
					<div className={classes.itemContainer}>
						{shopAll &&
							shopAll.map((p) => (
								<ShoppingItem
									key={p._id}
									id={p._id}
									image={p.image}
									name={p.name}
									price={p.price}
								/>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ShopAll;
