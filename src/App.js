import React, { useState, useRef } from 'react';
import './App.scss';

import { SkynetClient } from 'skynet-js';
import QRCode from 'qrcode.react';

import UploadIcon from './assets/upload.svg';
import SkyQRLogo from './assets/skyqr_logo.svg';
import FolderIcon from './assets/folder.svg';

const App = () => {
	const [skylink, setSkylink] = useState(null);
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const [progress, setProgress] = useState(null);
	const fileInputRef = useRef(null);

	const handleOnFileChanged = (e) => setFile(e.target.files[0]);
	const handleChooseFile = () => fileInputRef.current.click();
	const onUploadProgress = (progress, { loaded, total }) =>
		setProgress(Math.round(progress * 100));
	const backToUpload = () => setSkylink(null);

	const uploadFile = async () => {
		try {
			const client = new SkynetClient();
			const { skylink: _skylink } = await client.upload(file, {
				onUploadProgress,
			});
			setSkylink(_skylink);
			console.log(_skylink);
		} catch (_error) {
			setError(_error);
			console.log(error);
		}
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
					<QRCode value={skylink} className='qrcode' fgColor='#57b560' />
					<button onClick={backToUpload} className='back-to-upload-button'>
						Back
					</button>
				</div>
			) : (
				<div className='upload-file-container'>
					<div className='file-input-container'>
						<input
							type='file'
							ref={fileInputRef}
							accept='image/*'
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
					{progress && <span className='progress'>Progress: {progress}</span>}
				</div>
			)}
			{skylink && <span className='skylink'>Skylink: {skylink}</span>}
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
