import React, { useCallback, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import HomeBook from '../../components/Book/HomeBook';
import HomeBookXssUnsafe from '../../components/Book/HomeBookXssUnsafe';
import Pending from '../../components/Pending/Pending';
import { useFetchData } from '../../hooks/useFetchData';
import emptyResult from '../../images/empty.jpg';
import { BookModel } from '../../interfaces/models/Api';

const refreshBooksInterval = 45000;

const Books = () => {
	const [books, fetchBooks, isPending] = useFetchData<BookModel[]>(`/books/find`);
	// const [userLentBooks, ,isPendingLent] = useFetchData<LentBookModel[]>(`/book-lends/find/${userId}`);

	const refresh = useCallback(async () => {
		await fetchBooks();
	}, [fetchBooks]);

	useEffect(() => {
		const interval = setInterval(refresh, refreshBooksInterval);
		return () => clearInterval(interval);
	}, []);

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

			<Row className={'row-gap-3 pb-4'}>
				{books?.map((book, k) => (
					<Col key={k} xs={24} sm={12} md={6} xxl={4}>
						{process.env.REACT_APP_APP_SECURE === 'true' ? <HomeBook book={book} /> : <HomeBookXssUnsafe book={book} />}
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Books;
