import React, { useEffect, useState } from 'react';

import ShopItem from '../TrendingItems/ShoppingItem';

import classes from './ShopItem.module.scss';
import url from '../../store/url';

import ShopHeader from './ShopHeader';
import Filter from './Filter';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ShopAll = () => {
	const [reseted, setReseted] = useState(false);
	const [products, setProducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState({
		currentPage: 1,
		pageSize: 6,
		pageTotal: NaN,
		totalProducts: NaN,
		totalpages: NaN,
	});
	const [sortBy, setSortBy] = useState('');
	const [brandid, setBrandid] = useState('');
	const [categorieid, setCategorieid] = useState('');

	function reset() {
		setPage({
			currentPage: 1,
			pageSize: 6,
			pageTotal: NaN,
			totalProducts: NaN,
			totalpages: NaN,
		});
		setBrandid('');
		setCategorieid('');
		setSortBy('');
		setReseted(true);
	}

	useEffect(() => {
		async function getData() {
			try {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
				setLoading(true);

				const res = await fetch(
					`${url}/products?page=${page.currentPage}&limit=${page.pageSize}${
						sortBy ? '&sort=' + sortBy : ''
					}${brandid ? '&brand=' + brandid : ''}${
						categorieid ? '&category=' + categorieid : ''
					}`
				);

				const data = await res.json();

				setProducts(data.data.products);
				setBrands(data.data.brands);
				setCategories(data.data.categories);
				setLoading(false);
				setPage(data.page);
			} catch (error) {
				console.log(error);
				setProducts(null);
				setBrands(null);
				setCategories(null);
				setLoading(false);
			}
		}
		getData();
	}, [page.currentPage, sortBy, brandid, categorieid]);

	const getFilter = (brandid, categorieid) => {
		setBrandid(brandid);
		setCategorieid(categorieid);
		setPage((page) => ({ ...page, currentPage: 1 }));
	};

	const getSort = (sort) => {
		setSortBy(sort);
		setPage((page) => ({ ...page, currentPage: 1 }));
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	return (
		<div className={classes.trendingSection}>
			<div className={classes.container}>
				<ShopHeader
					getSort={getSort}
					reseted={reseted}
					// setReseted={setReseted}
				/>
				<div className={classes.shopContainer}>
					<Filter
						getFilter={getFilter}
						reset={reset}
						brands={brands}
						categories={categories}
						reseted={reseted}
						setReseted={setReseted}
					/>
					{loading && (
						<div style={{ height: '600px' }}>
							<div className='load'>
								<AiOutlineLoading3Quarters />
							</div>
						</div>
					)}

					{products && !loading && products.length === 0 && (
						<h1>Product Not found</h1>
					)}

					{products && !loading && products.length > 0 && (
						<div>
							<div className={classes.itemContainer}>
								{products &&
									products?.map((p) => (
										<ShopItem
											key={p._id}
											id={p._id}
											image={p.image}
											name={p.name}
											price={p.price}
										/>
									))}
							</div>
							<div className={classes.pagination}>
								{products && !isNaN(page.totalpages) && page.totalpages > 0 && (
									<span className={classes.page}>
										<FiChevronLeft
											onClick={() => {
												if (page.currentPage !== 1)
													return setPage((page) => ({
														...page,
														currentPage: page.currentPage - 1,
													}));
											}}
										/>
										<p
											className={classes.pagenum}
										>{`${page.currentPage}/${page.totalpages}`}</p>
										<FiChevronRight
											onClick={() => {
												if (page.currentPage < page.totalpages)
													return setPage((page) => ({
														...page,
														currentPage: page.currentPage + 1,
													}));
											}}
										/>
									</span>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShopAll;
