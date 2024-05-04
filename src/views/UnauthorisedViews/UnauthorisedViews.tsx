import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import Login from '../../sites/Login/Login';
import Register from '../../sites/Register/Register';

const UnauthorisedViews = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />} />

			<Route path="/login" element={<Login />} />

			<Route path="/register" element={<Register />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default UnauthorisedViews;
