import React, { useState } from 'react';

import Home from './components/Home';
import Navbar from './components/Navbar';

import './App.scss';
import 'notyf/notyf.min.css';

const App = () => {
	const [showSavedSkylinks, setShowSavedSkylinks] = useState(true);
	const viewSavedSkylinks = () => setShowSavedSkylinks(true);
	const viewHome = () => setShowSavedSkylinks(false);

	return (
		<>
			🇧🇾
			<Navbar viewSavedSkylinks={viewSavedSkylinks} />
			<Home showSavedSkylinks={showSavedSkylinks} viewHome={viewHome} />
		</>
	);
};

export default App;
