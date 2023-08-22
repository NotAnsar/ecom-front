import React, { Fragment, useEffect, useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import classes from '../Profile.module.scss';
import Order from './Order';
import { makeRequest } from '../../../axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState({
		currentPage: 1,
		pageSize: 6,
		pageTotal: NaN,
		totalProducts: NaN,
		totalpages: NaN,
	});

	useEffect(() => {
		getOrders();
		async function getOrders() {
			try {
				setLoading(true);
				const res = await makeRequest.get(
					`/order?page=${page.currentPage}&limit=3`
				);

				setPage(res.data.page);
				setOrders(res.data.data);
				setLoading(false);
			} catch (error) {
				setOrders(null);
				setLoading(false);
			}
		}
	}, [page.currentPage]);

	return (
		<div className={classes.right}>
			<h1>Orders</h1>
			{!isNaN(page.totalProducts) && <p>{page.totalProducts} orders</p>}

			<div className={classes.ordersContainer}>
				{loading && (
					<div style={{ height: '450px' }}>
						<div className='load'>
							<AiOutlineLoading3Quarters />
						</div>
					</div>
				)}

				{orders && !loading && orders.length === 0 && (
					<p> You have No Orders Yet</p>
				)}
				{orders &&
					!loading &&
					orders.length > 0 &&
					orders.map((o) => <Order order={o} key={o._id} />)}
			</div>

			{!loading && orders && orders.length > 0 && (
				<div className={classes.pagination}>
					<div
						onClick={() => {
							if (page.currentPage !== 1)
								return setPage((page) => ({
									...page,
									currentPage: page.currentPage - 1,
								}));
						}}
					>
						<BsArrowLeftShort />
					</div>
					{/* <div className={classes.clicked}>{page.currentPage}</div> */}
					<div className={classes.clicked}>
						{page.currentPage} <b> of {page.totalpages}</b>
					</div>
					{/* <span>of {page.totalpages}</span> */}

					<div
						onClick={() => {
							if (page.currentPage < page.totalpages)
								return setPage((page) => ({
									...page,
									currentPage: page.currentPage + 1,
								}));
						}}
					>
						<BsArrowRightShort />
					</div>
				</div>
			)}
		</div>
	);
};
