import React, { useEffect, useState } from 'react';
import Brand from './Brand';
import classes from './ShopItem.module.scss';
import { FiRefreshCw } from 'react-icons/fi';

const Filter = ({
	brands,
	categories,
	getFilter,
	reset,
	reseted,
	setReseted,
}) => {
	const [brandSelected, setBrandSelected] = useState('');
	const [categorieSelected, setCategorieSelected] = useState('');

	useEffect(() => {
		getFilter(brandSelected, categorieSelected);
	}, [brandSelected, categorieSelected]);

	function uncheckAll() {
		setBrandSelected('');
		setCategorieSelected('');
		reset();
	}

	return (
		<div className={classes.filter}>
			<div className={classes.filterTitle}>
				<h2>Filter Products</h2>
				<FiRefreshCw onClick={uncheckAll} />
			</div>

			<Brand
				selected={setBrandSelected}
				title='Brand'
				data={brands}
				reseted={reseted}
				setReseted={setReseted}
			/>
			<Brand
				selected={setCategorieSelected}
				title='Categorie'
				data={categories}
				reseted={reseted}
				setReseted={setReseted}
			/>
		</div>
	);
};

export default Filter;
