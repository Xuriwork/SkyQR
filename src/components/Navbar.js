import React, { useState, useRef } from 'react';
import MoreIcon from '../assets/more.svg';

const Navbar = ({ viewSavedSkylinks }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const moreButtonRef = useRef();

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	
	window.onclick = (event) => {
		if (!moreButtonRef.current.contains(event.target)) {
			setDropdownOpen(false);
		}
	};

	return (
		<nav className='navbar-component'>
			<div className='more-button-container'>
				<button ref={moreButtonRef} onClick={toggleDropdown}>
					<img src={MoreIcon} alt='' />
				</button>
			</div>
			{dropdownOpen && (
				<div className='more-items-dropdown'>
					<ul>
						<li onClick={viewSavedSkylinks}>Saved Skylinks</li>
					</ul>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
