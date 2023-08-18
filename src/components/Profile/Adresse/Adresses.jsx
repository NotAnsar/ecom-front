import React, { Fragment, useState } from 'react';

import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import classes from '../Profile.module.scss';
import AdressForm from './AdressForm';
import Adresse from './Adresse';
import { useSelector } from 'react-redux';

export const Adresses = () => {
	return (
		<div className={classes.right}>
			<Routes>
				<Route path={''} element={<Adresse />} />
				<Route path='add' element={<AdressForm />} />
				<Route path='edit/:id' element={<AdressForm type='edit' />} />
				<Route path='*' element={<Navigate to='' />} />
			</Routes>
		</div>
	);
};
