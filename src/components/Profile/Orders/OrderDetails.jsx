import React, { useEffect, useState } from 'react';
import classes from '../Profile.module.scss';
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../../axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const OrderDetails = () => {
	const { id } = useParams();
	const [order, setOrder] = useState({});
	const [loading, setLoading] = useState([]);
	function getTotal() {
		let total = 0;
		order.products.forEach((p) => {
			total += p.quantity * p.product.price;
		});
		return total.toFixed(2);
	}
	function formatDateToDDMMYYYY(inputDate) {
		const date = new Date(inputDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	useEffect(() => {
		getOrder();
		async function getOrder() {
			try {
				setLoading(true);
				const res = await makeRequest.get(`/order/${id}`);
				console.log(res.data);

				setOrder(res.data.data);
				setLoading(false);
			} catch (error) {
				setOrder(null);
				setLoading(false);
			}
		}
	}, []);

	return (
		<div className={classes.right}>
			{loading && (
				<div style={{ height: '450px' }}>
					<div className='load'>
						<AiOutlineLoading3Quarters />
					</div>
				</div>
			)}
			{!loading && order && (
				<>
					<div className={classes.orderTitle}>
						<h1>Order {order._id.slice(0, 10) + '...'}</h1>
						<span>
							Ordered At : <b>{formatDateToDDMMYYYY(order.createdAt)}</b>
						</span>
						<span>
							Status : <b>{order.status}</b>
						</span>
						<span>
							Total : <b>{getTotal()}$</b>
						</span>
					</div>

					<div className={classes.OrderHeader}>
						<h3>Product</h3>
						<h3>Quantity</h3>
						<h3>Price</h3>
					</div>
					<div className={classes.myOrder}>
						{order.products.map((p) => (
							<div key={p._id} className={classes.productContainer}>
								<div className={classes.product}>
									{/* <img
										src={`http://localhost:3000/images/${p?.product.image}`}
									/> */}
									<img
										src={'/images/' + encodeURIComponent(p.product.image)}
										alt={p.product.name}
									/>
									<div className={classes.productInfo}>
										<div className={classes.top}>
											<h4>{p.product.name}</h4>
											<p>Article: {p.product._id}</p>
										</div>
										<div className={classes.bottom}>
											<p>
												Category : <b>{p?.product.category?.name}</b>
											</p>
											<p>
												Brand : <b>{p?.product.brand?.name}</b>
											</p>
										</div>
									</div>
								</div>

								<div className={classes.quantity}>{p.quantity}</div>
								<div className={classes.price}>
									{(p.quantity * p.product.price).toFixed(2)}$
									<span>{p.product.price.toFixed(2)}$ each</span>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default OrderDetails;
