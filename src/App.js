import React from 'react';

import Home from './components/Home';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserProvider';

import './App.scss';
import 'notyf/notyf.min.css';

const App = () => {
	return (
		<UserProvider>
			<Navbar />
			<Home />
		</UserProvider>
	);
};

export default App;
