import React, { useEffect, useState } from 'react';
import { Connect } from '@blockstack/connect';
import { userSession } from '../blockstack/constants';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
				window.history.replaceState({}, document.title, '/');
				setUser(userData);
			});
		} else if (userSession.isUserSignedIn()) {
			const userData = userSession.loadUserData();
			setUser(userData);
		}
	}, []);

	const authOptions = {
		redirectTo: '/',
		finished: ({ userSession }) => {
			const userData = userSession.loadUserData();
			setUser(userData);
		},
		appDetails: {
			name: 'SkyQR',
			icon: `${window.location.origin}/logo192.png`,
		},
	};

	const handleSignOut = () => {
		userSession.signUserOut();
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, userSession, handleSignOut }}>
			<Connect authOptions={authOptions}>
				{children}
			</Connect>
		</UserContext.Provider>
	);
};

export default UserContext;
