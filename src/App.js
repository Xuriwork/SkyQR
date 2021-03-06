import React, { useState } from 'react';

import Home from './components/Home';
import Navbar from './components/Navbar';

import './App.scss';
import 'notyf/notyf.min.css';

const LinkToSkynet = () => (
	<a
		className='skynet-link'
		href='https://siasky.net'
		target='_blank'
		rel='noopener noreferrer'
	>
		POWERED BY SIA SKYNET{' '}
		<span role='img' aria-label='Green heart'>
			💚
		</span>
	</a>
);

const App = () => {
	const [showSavedSkylinks, setShowSavedSkylinks] = useState(false);
	const viewSavedSkylinks = () => setShowSavedSkylinks(true);
	const viewHome = () => setShowSavedSkylinks(false);

	return (
		<>
			<Navbar viewSavedSkylinks={viewSavedSkylinks} />
			<Home showSavedSkylinks={showSavedSkylinks} viewHome={viewHome} />
			<LinkToSkynet />
		</>
	);
};

export default App;
