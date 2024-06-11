import { Roles } from '../enums/Roles';

export interface UserModel {
	userId: string;
	username: string;
	roles: Roles[];
	enabled: boolean;
}

export interface BookModel {
	bookId: string;
	title: string;
	description: string;
	genre: string;
	author: string;
	releasedOn: string;
	photoId?: string;
	onStock: number;
}

export interface LentBookModel {
	lendId: string;
	userId: string;
	bookId: string;
	bookStockId: string;
	lentOn: string;
	lentTill: string;
	isOverLent: boolean;
	overLent: number;
	isActive: boolean;
}
