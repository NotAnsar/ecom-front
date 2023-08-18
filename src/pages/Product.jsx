import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ProductPage from '../components/ProductPage/ProductPage';
import url from '../store/url';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Product = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	useEffect(() => {
		async function getData() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
			try {
				setLoading(true);
				const res = await fetch(`${url}/products?_id=${id}`);

				const data = await res.json();
				setData(data.data.products[0]);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setData(null);
				setLoading(false);
			}
		}
		getData();
	}, []);

	return (
		<>
			{loading && (
				<div style={{ height: '600px' }}>
					<div className='load'>
						<AiOutlineLoading3Quarters />
					</div>
				</div>
			)}

			{!loading && data && <ProductPage data={data} />}
		</>
	);
};

export default Product;
