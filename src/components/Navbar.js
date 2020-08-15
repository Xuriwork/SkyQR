import { useConnect } from '@blockstack/connect';
import React, { useState, useRef, useContext } from 'react';
import MoreIcon from '../assets/more.svg';
import { UserContext } from '../context/UserContext';

const Navbar = ({ viewSavedSkylinks }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { user, handleSignOut } = useContext(UserContext);
	const { doOpenAuth } = useConnect();
	const moreButtonRef = useRef();
	
	const handleSignIn = () => doOpenAuth();
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	
	window.onclick = (event) => {
		if (!moreButtonRef.current.contains(event.target)) {
			setDropdownOpen(false);
		}
	};

	return (
		<nav className='navbar-component'>
			{user && <span className='username'>{user.username.split('.')[0]}</span>}
			<div className='more-button-container'>
				<button ref={moreButtonRef} onClick={toggleDropdown}>
					<img src={MoreIcon} alt='' />
				</button>
			</div>
			{dropdownOpen && (
				<div className='more-items-dropdown'>
					<ul>
						{user ? (
							<li onClick={handleSignOut}>Sign out</li>
						) : (
							<li onClick={handleSignIn}>Sign In</li>
						)}
						<li onClick={viewSavedSkylinks}>Saved Skylinks</li>
					</ul>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
