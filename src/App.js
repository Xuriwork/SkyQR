import React, { useState, useRef } from 'react';

import { SkynetClient } from 'skynet-js';
import QRCode from 'qrcode.react';
import { Notyf } from 'notyf';

import UploadIcon from './assets/upload.svg';
import SkyQRLogo from './assets/skyqr_logo.svg';
import FolderIcon from './assets/folder.svg';

import './App.scss';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
	position: {
		x: 'right',
		y: 'top',
	},
});
const client = new SkynetClient('https://siasky.net');

const App = () => {
	const [skylink, setSkylink] = useState(null);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const fileInputRef = useRef(null);

	const handleOnFileChanged = (e) => setFile(e.target.files[0]);
	const handleChooseFile = () => fileInputRef.current.click();
	const backToUpload = () => {
		setFile(null);
		setSkylink(null);
	};

	const uploadFile = async () => {
		if (!file) return notyf.error('Upload a file');
		setLoading(true);
		await client
			.upload(file)
			.then((result) => {
				setSkylink(result.skylink);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className='app-component'>
			<span className='header'>
				<img src={SkyQRLogo} alt='logo' className='logo' />
				<h1>SkyQR</h1>
			</span>
			<h2>
				QR in the Sky<span style={{ color: '#57b560' }}>link</span>
			</h2>
			{skylink ? (
				<div className='qrcode-container'>
					<QRCode
						value={`https://siasky.net/${skylink}`}
						className='qrcode'
						fgColor='#57b560'
					/>
					<button onClick={backToUpload} className='back-to-upload-button'>
						Back
					</button>
				</div> ) : loading ? (
					<div className='loading-container'>
						<h2>This could take a while...</h2>
						<p>In the meanwhile, do some exercise <span role='img' aria-label='muscle'>💪</span></p>
						<div className='loader'></div>
					</div>
				)
			: (
				<div className='upload-file-container'>
					<div className='file-input-container'>
						<input
							type='file'
							ref={fileInputRef}
							accept='image/*,audio/*,/video/*,.pdf'
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
					href={`https://siasky.net/${skylink}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					Skylink: https://siasky.net/{skylink}
				</a>
			)}
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
		</div>
	);
};

export default App;
