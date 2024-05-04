import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import Pending from '../../components/Pending/Pending';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';

const AdminViews = () => {
	const { isPending } = useCurrentUser();

	if (isPending) return <Pending />;

	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AdminViews;
