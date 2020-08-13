import React, { useEffect, useState } from 'react';
import { AppConfig, UserSession } from 'blockstack';
import { Connect } from '@blockstack/connect';

export const UserContext = React.createContext();

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

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
		<UserContext.Provider value={{ user, handleSignOut }}>
			<Connect authOptions={authOptions}>
				{children}
			</Connect>
		</UserContext.Provider>
	);
};

export default UserContext;
