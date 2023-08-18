import React, { useEffect, useState } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import classes from '../Profile.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '../../../axios';
import { useDispatch } from 'react-redux';
import { setMyUser } from '../../../store/authentication';

const MyAdress = ({ city, adress, country, zipCode, id }) => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function deleteAddress(_id) {
		console.log(_id);
		deleteAdr();
		async function deleteAdr() {
			try {
				const res = await makeRequest.delete(`/users/address/${_id}`);

				dispatch(setMyUser(res.data));
				console.log(res.data.message);
				navigate('/profile/adresses', {
					state: { alertMsg: res.data.message },
				});
			} catch (error) {
				console.log(error);
			}
		}
	}
	return (
		<div className={classes.adresse}>
			<div>
				<p>{adress}</p>
				<p>
					{city} / {zipCode}
				</p>
				<p>{country}</p>
			</div>

			<div className={classes.icons}>
				<AiOutlineEllipsis onClick={() => setShow((a) => !a)} />
				{show && (
					<ul className={classes.edit}>
						<Link to={`edit/${id}`}>
							<li>Edit</li>
						</Link>

						<li onClick={() => deleteAddress(id)}>Delete</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default MyAdress;
