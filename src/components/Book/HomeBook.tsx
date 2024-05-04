import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import Axios from 'axios';

import { BookModel } from '../../interfaces/models/Api';

interface HomeBookProps {
	book: BookModel;
}

const HomeBook: FC<HomeBookProps> = ({ book }) => {
	const { title, photoId, author, description, genre, onStock } = book;
	const photoUrl = Axios.defaults.baseURL + `/files/${photoId}`;

	return (
		<Card bg={'dark'} text={'light'} className={`d-flex flex-row border-light border-1`}>
			{photoId && <img src={photoUrl} alt={'No preview available'} className={`ps-1 w-40 h-100`} />}
			<div className={`d-flex flex-column w-100`}>
				<Card.Body>
					<Card.Title>Title: {title ? title : 'Unknown'}</Card.Title>
					<Card.Text>Genre: {genre ? genre : 'Unknown'}</Card.Text>
					<Card.Text>Author: {author ? author : 'Unknown'}</Card.Text>
					<Card.Text>Description: {description ? description : 'Unknown'}</Card.Text>
				</Card.Body>
				{onStock > 0 ? (
					<Card.Footer className={`d-flex justify-content-between`}>
						<span className={`text-success fs-4`}>OnStock: {onStock}</span>
						<Button variant="success">Lend book</Button>
					</Card.Footer>
				) : (
					<Card.Footer className={`d-flex justify-content-start`}>
						<span className={`text-warning fs-4`}>Unavailable currently. Check later.</span>
					</Card.Footer>
				)}
			</div>
		</Card>
	);
};

export default HomeBook;
