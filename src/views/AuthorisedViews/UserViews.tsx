import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import Pending from '../../components/Pending/Pending';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { HomeRoute, MyLendsRoute } from '../../routes/Routes';
import Home from '../../sites/Home/Home';
import MyLends from '../../sites/Lends/MyLends';

const UserViews = () => {
	const { isPending } = useCurrentUser();

	if (isPending) return <Pending />;

	return (
		<Routes>
			<Route path={HomeRoute} element={<Home />} />

			<Route path={MyLendsRoute} element={<MyLends />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default UserViews;
