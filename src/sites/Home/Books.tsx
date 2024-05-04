import React from 'react';
import { Col, Row } from 'react-bootstrap';

import HomeBook from '../../components/Book/HomeBook';
import Pending from '../../components/Pending/Pending';
import { useFetchData } from '../../hooks/useFetchData';
import emptyResult from '../../images/empty.jpg';
import { BookModel } from '../../interfaces/models/Api';

const Books = () => {
	const [books, , isPending] = useFetchData<BookModel[]>(`/books/find`, { shouldFetch: true });
	// const [userLentBooks, ,isPendingLent] = useFetchData<LentBookModel[]>(`/book-lends/find/${userId}`);

	if (isPending)
		return (
			<Row>
				<Col>
					<Pending />
				</Col>
			</Row>
		);

	if (books?.length === 0)
		return (
			<div className={`d-flex mh-100 w-50 justify-content-center align-items-center p-2 bg-dark rounded-card-10`}>
				<span className={'fw-bold fs-3 text-light text-center w-50'}>Books not found. Try again later.</span>
				<img src={emptyResult} className={`ms-2 my-4 rounded-card-10 w-25 h-auto`} alt={'Empty Result'} />
			</div>
		);

	return (
		<div className={`w-100 h-100 justify-content-start`}>
			<h3 className={'w-100 text-light text-center pt-1'}>Available Books</h3>

			<Row>
				{books?.map((book, k) => (
					<Col key={k} xs={12} sm={6} lg={4} xxl={3} className={'m-2'}>
						<HomeBook book={book} />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Books;
