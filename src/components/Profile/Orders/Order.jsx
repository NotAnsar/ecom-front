import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import classes from '../Profile.module.scss';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
	return (
		<div className={classes.order}>
			<div className={classes.orderDetails}>
				<h2>Order {order._id.slice(0, 6) + '...'}</h2>
				<span>
					<Link to={order._id}>
						<p>view Order</p>

						<BsArrowRightShort />
					</Link>
				</span>
			</div>
			<div className={classes.orderShipped}>
				<span className={classes.pending}></span>
				<p>{order.status}</p>
			</div>

			<div className={classes.imgs}>
				{order.products.slice(0, 3).map((p) => (
					// <img
					// 	key={p._id}
					// 	src={`http://localhost:3000/images/${p.product.image}`}
					// />
					<img
						key={p._id}
						src={'/images/' + encodeURIComponent(p.product.image)}
						alt={p.product.name}
					/>
				))}
			</div>
		</div>
	);
};

export default Order;
