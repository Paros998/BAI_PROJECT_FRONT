import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import Axios from 'axios';

import { BookModel } from '../../interfaces/models/Api';

interface HomeBookProps {
	book: BookModel;
}

const HomeBookXssUnsafe: FC<HomeBookProps> = ({ book }) => {
	const { title, photoId, author, description, genre, onStock } = book;
	const photoUrl = Axios.defaults.baseURL + `/files/${photoId}`;

	return (
		<Card bg={'dark'} text={'light'} className={`d-flex flex-row border-light border-1 height-300`}>
			{photoId && (
				<div className={`d-flex w-30`}>
					<img src={photoUrl} alt={'No preview available'} className={`px-2 py-4 w-100 h-auto rounded-card-10`} />
				</div>
			)}

			<div className={`d-flex flex-column w-70`}>
				<Card.Body>
					<Card.Title className={`text-truncate`}>
						<span dangerouslySetInnerHTML={{ __html: `Title: ${title || 'Unknown'}` }}></span>
					</Card.Title>
					<Card.Text className={`text-truncate`}>
						<span dangerouslySetInnerHTML={{ __html: `Genre: ${genre || 'Unknown'}` }}></span>
					</Card.Text>
					<Card.Text className={`text-truncate`}>
						<span dangerouslySetInnerHTML={{ __html: `Author: ${author || 'Unknown'}` }}></span>
					</Card.Text>
					<Card.Text className={`text-trunc-4`}>
						<span dangerouslySetInnerHTML={{ __html: `Description: ${description || 'Unknown'}` }}></span>
					</Card.Text>
				</Card.Body>
				{onStock > 0 ? (
					<Card.Footer className={`d-flex justify-content-between align-items-center`}>
						<span className={`text-success fs-5`}>OnStock: {onStock}</span>
						<Button variant="success">Lend book</Button>
					</Card.Footer>
				) : (
					<Card.Footer className={`d-flex justify-content-start`}>
						<span className={`text-warning fs-5`}>Unavailable currently.</span>
					</Card.Footer>
				)}
			</div>
		</Card>
	);
};

export default HomeBookXssUnsafe;
