import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'qrcode.react';
import ArrowLeft from '../assets/arrow-left-circle.svg';
import TrashIcon from '../assets/trash.svg';
import QRCodeIcon from '../assets/qr-code-icon.svg';

const SavedSkyLinks = ({ viewHome }) => {
	const [skylinks, setSkylinks] = useState(
		JSON.parse(localStorage.getItem('savedSkylinks')) || []
    );
    const [skylinkQR, setSkylinkQR] = useState(null);
    
    const { register, handleSubmit, errors, reset } = useForm();
    
	useEffect(() => {
		localStorage.setItem('savedSkylinks', JSON.stringify(skylinks));
    }, [skylinks]);
    
    const handleSaveSkylink = handleSubmit(({ name, skylink }) => {
		const newSkylinks = skylinks.concat([{ name, skylink }]);
		setSkylinks(newSkylinks);
		localStorage.setItem('savedSkylinks', JSON.stringify(newSkylinks));
		reset();
	});

	const handleRemoveItem = (item) => {
		const filteredSkylinks = skylinks.filter((skylink) => skylink !== item);
		setSkylinks(filteredSkylinks);
    };
    
    const handleShowAQRCode = (item) => setSkylinkQR(item.skylink);
    const handleCloseAQRCode = () => setSkylinkQR(null);

	return (
		<div className='saved-skylinks-component'>
			<div className='title-container'>
				<button onClick={viewHome}>
					<img src={ArrowLeft} alt='left arrow' />
				</button>
				<h1>Saved Skylinks</h1>
			</div>
			<form>
				<div>
					<label>Name</label>
					<input
						type='text'
						name='name'
						ref={register({
							required: true,
						})}
					/>
				</div>
				<div>
					<label>Skylink</label>
					<input
						type='text'
						name='skylink'
						ref={register({
							required: true,
							pattern: {
								value: /https:\/\/siasky.net\/.*/gi,
								message: 'The link should be prefixed by https://siasky.net/',
							},
						})}
					/>
					{errors.skylink && (
						<p style={{ color: '#db5753', marginBottom: '10px' }}>
							{errors.skylink.message}
						</p>
					)}
				</div>
				<button onClick={handleSaveSkylink}>Add</button>
			</form>
			{skylinkQR && (
				<div className='skylink-qr-code-preview'>
                    <span className='close-button' onClick={handleCloseAQRCode}></span>
					<QRCode value={skylinkQR} fgColor='#57b560' />
				</div>
			)}
			{skylinks.length === 0 ? (
				<p style={{ marginTop: '5px', color: '#363636' }}>
					You haven't saved any skylinks
				</p>
			) : (
				<ul>
					{skylinks.map((skylink, index) => (
						<li key={index}>
							<a
								href={skylink.skylink}
								target='_blank'
								rel='noopener noreferrer'
							>
								{skylink.name}
							</a>
                            <span>
                                <button onClick={() => handleRemoveItem(skylink)}>
                                    <img src={TrashIcon} alt='trash' />
                                </button>
                                <button onClick={() => handleShowAQRCode(skylink)}>
                                    <img src={QRCodeIcon} alt='qr code icon' style={{ width: '18px' }} />
                                </button>
                            </span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SavedSkyLinks;
