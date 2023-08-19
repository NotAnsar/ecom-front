import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './ProductPage.module.scss';
import { FiHeart } from 'react-icons/fi';
import ProductNotFound from './ProductNotFound/ProductNotFound';
import { addCart, addWish } from '../../store/cartSlice';
import { showCart, showWish } from '../../store/wishListSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ProductPage = ({ data }) => {
	const [quantity, setQte] = useState(1);

	let brand = data.brand,
		categorie = data.category;

	const dispatch = useDispatch();

	if (data === undefined) return <ProductNotFound />;

	return (
		<div className={classes.container}>
			<div className={classes.grid}>
				<div className={classes.img}>
					{/* <img
						src={`http://localhost:3000/images/${data.image}`}
						alt={data.name}
					/> */}
					<img
						src={'/images/' + encodeURIComponent(data.image)}
						alt={data.name}
					/>
				</div>
				<div className={classes.details}>
					<div className={classes.titleContainer}>
						<h1>{data.name}</h1>
						<p>{data.price.toFixed(2)}$</p>
					</div>
					<div className={classes.BrandContainer}>
						<div className={classes.Brand}>
							<h4>Brand</h4>
							<h5>
								{brand.name.charAt(0).toUpperCase() +
									brand.name.slice(1).toLowerCase()}
							</h5>
						</div>
						<div className={classes.Categorie}>
							<h4>Categorie</h4>
							<h5>
								{categorie.name.charAt(0).toUpperCase() +
									categorie.name.slice(1).toLowerCase()}
							</h5>
						</div>
						<div className={classes.quantityContainer}>
							<h4>Quantity</h4>
							<div className={classes.quantity}>
								<span
									className={classes.span}
									onClick={() => {
										if (quantity > 1) {
											setQte((p) => p - 1);
										}
									}}
								>
									-
								</span>
								<input
									min='1'
									onChange={() => console.log('a')}
									value={quantity}
									type='tel'
								/>
								<span
									className={classes.span}
									onClick={() => {
										setQte((p) => p + 1);
									}}
								>
									+
								</span>
							</div>
						</div>
						<div className={classes.btnContainer}>
							<button
								className={classes.button}
								onClick={() => {
									dispatch(showCart());
									dispatch(
										addCart({
											image: data.image,
											name: data.name,
											price: data.price,
											_id: data._id,
											qte: +quantity,
											brand,
											categorie,
										})
									);
								}}
							>
								Add to cart
							</button>
							<button
								className={`${classes.button} ${classes.heart}`}
								onClick={() => {
									dispatch(showWish());
									dispatch(
										addWish({
											image: data.image,
											name: data.name,
											price: data.price,
											_id: data._id,
										})
									);
								}}
							>
								<FiHeart />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.Description}>
				<h4>Description</h4>
				<p>{data.description}</p>
			</div>
		</div>
	);
};

export default ProductPage;
