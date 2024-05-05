import React from 'react';

import Pending from '../../components/Pending/Pending';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import UserLends from '../Users/UserLends';

const MyLends = () => {
	const { currentUser, isPending } = useCurrentUser();

	if (isPending) return <Pending />;

	return <UserLends userId={currentUser?.userId as string} />;
};

export default MyLends;
