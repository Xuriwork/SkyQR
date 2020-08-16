import React, { useState } from 'react';

import Home from './components/Home';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';

import './App.scss';
import 'notyf/notyf.min.css';

const App = () => {
	const [showSavedSkylinks, setShowSavedSkylinks] = useState(false);
	const viewSavedSkylinks = () => setShowSavedSkylinks(true);
	const viewHome = () => setShowSavedSkylinks(false);

	return (
		<UserProvider>
			<Navbar viewSavedSkylinks={viewSavedSkylinks} />
			<Home showSavedSkylinks={showSavedSkylinks} viewHome={viewHome} />
		</UserProvider>
	);
};

export default App;
