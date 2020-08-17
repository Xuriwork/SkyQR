import React, { useState, useRef } from 'react';

import { SkynetClient } from 'skynet-js';
import QRCode from 'qrcode.react';
import { Notyf } from 'notyf';

import SavedSkyLinks from './SavedSkyLinks';

import UploadIcon from '../assets/upload.svg';
import SkyQRLogo from '../assets/skyqr_logo.svg';
import FolderIcon from '../assets/folder.svg';


const notyf = new Notyf({
	position: {
		x: 'right',
		y: 'top',
	},
});

const client = new SkynetClient('https://siasky.net');

const options = {
	body: 'Your skylink and QR Code are ready!',
	icon: 'https://skyqrcode.web.app/logo192.png',
};

const Home = ({ showSavedSkylinks, viewHome }) => {
	const [skylink, setSkylink] = useState(null);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const fileInputRef = useRef(null);
	const _skylink = `https://siasky.net/${skylink}`;

	const handleGetPermissionToReceiveNotifications = () => {
		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission();
		}
	};

	const sendNotification = () => {
		if (!('Notification' in window)) {
			return alert('This browser does not support desktop notification');
		}
		new Notification('SkyQR', options);
	};

	const handleOnFileChanged = (e) => setFile(e.target.files[0]);
	const handleChooseFile = () => fileInputRef.current.click();
	const allowDrop = (e) => e.preventDefault();

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		setFile(file);
	};

	const uploadFile = async () => {
		if (!file) return notyf.error('Upload a file');
		setLoading(true);
		await client
			.upload(file)
			.then((result) => {
				setSkylink(result.skylink);
				setLoading(false);
				sendNotification();
			})
			.catch((error) => console.error(error));
	};

	const backToUpload = () => {
		setFile(null);
		setSkylink(null);
	};

	return (
		<div className='home-component'>
			{showSavedSkylinks ? (
				<SavedSkyLinks viewHome={viewHome} />
			) : (
				<>
					<span className='header'>
						<img src={SkyQRLogo} alt='logo' className='logo' />
						<h1>SkyQR</h1>
					</span>
					<h2>
						QR in the Sky<span style={{ color: '#57b560' }}>link</span>
					</h2>
					{skylink ? (
						<div className='qrcode-container'>
							<QRCode value={_skylink} className='qrcode' fgColor='#57b560' />
							<button onClick={backToUpload} className='back-to-upload-button'>
								Back
							</button>
						</div>
					) : loading ? (
						<div className='loading-container'>
							<h2>This could take a while...</h2>
							<p>
								In the meanwhile, do some exercise{' '}
								<span role='img' aria-label='muscle'>
									💪
								</span>
							</p>
							<button
								onClick={handleGetPermissionToReceiveNotifications}
								className='notify-button'
							>
								Notify meh
							</button>
							<div className='loader'></div>
						</div>
					) : (
						<div
							className='upload-file-container'
							onDrop={handleDrop}
							onDragOver={allowDrop}
							onClick={handleChooseFile}
						>
							<div className='droparea'></div>
							<p
								style={{
									marginBottom: '10px',
									zIndex: 2,
									textAlign: 'center',
									color: '#5174537e',
								}}
							>
								Upload any media file by dragging it into the dropzone
							</p>
							<div className='file-input-container'>
								<input
									type='file'
									ref={fileInputRef}
									accept='image/*,audio/*,video/*,.pdf'
									onChange={handleOnFileChanged}
									style={{ display: 'none' }}
								/>
								<button onClick={handleChooseFile} className='browse-button'>
									<img src={FolderIcon} alt='' /> Browse
								</button>
								<button onClick={uploadFile} className='upload-button'>
									<img src={UploadIcon} alt='' />
									Upload
								</button>
							</div>

							{file && <span className='filename'>Filename: {file.name}</span>}
						</div>
					)}
					{skylink && (
						<a
							className='skylink'
							href={_skylink}
							target='_blank'
							rel='noopener noreferrer'
						>
							Skylink: {_skylink}
						</a>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
