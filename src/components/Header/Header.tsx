import React, { FC, ReactNode } from 'react';
import { Button } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';

interface HeaderProps {
	children: ReactNode;
	disableLogoutButton?: boolean;
}

const Header: FC<HeaderProps> = ({ children, disableLogoutButton }) => {
	const { currentUser, onLogOut } = useCurrentUser();

	return (
		<header>
			<div className="h-100 d-inline-flex container-fluid align-items-center justify-content-between px-4 py-2 bg-dark text-light">
				{children}

				{currentUser && !disableLogoutButton && (
					<Button variant={'success'} onClick={() => onLogOut()}>
						Logout
					</Button>
				)}
			</div>
		</header>
	);
};

export default Header;
