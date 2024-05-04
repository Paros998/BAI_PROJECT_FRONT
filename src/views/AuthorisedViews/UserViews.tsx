import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import Pending from '../../components/Pending/Pending';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import Home from '../../sites/Home/Home';

const UserViews = () => {
	const { isPending } = useCurrentUser();

	if (isPending) return <Pending />;

	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default UserViews;
