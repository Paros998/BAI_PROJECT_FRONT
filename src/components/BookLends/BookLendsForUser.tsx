import React, { FC } from 'react';

import { useFetchData } from '../../hooks/useFetchData';
import { LentBookModel } from '../../interfaces/models/Api';
import Pending from '../Pending/Pending';

interface BookLendsForUserProps {
	userId: string;
}

const BookLendsForUser: FC<BookLendsForUserProps> = ({ userId }) => {
	const [lends, , isPending] = useFetchData<LentBookModel[]>(`/book-lends/find/${userId}`);

	if (isPending) return <Pending />;

	return <div></div>;
};

export default BookLendsForUser;
