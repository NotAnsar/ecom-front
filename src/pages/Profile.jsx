import React, { useEffect } from 'react';

// import ProfilePage from '../components/Profile/ProfilePage';
import NewProfile from '../components/Profile/NewProfile';

const Profile = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	return <NewProfile />;
};

export default Profile;
