import React from 'react'

const ConfirmDeleteModal = ({ skylinks, skylinkToRemove, setSkylinkToRemove, setSkylinks }) => {
    const nameOfItem = skylinkToRemove.name;
    const handleRemoveItem = () => {
        const filteredSkylinks = skylinks.filter((skylink) => skylink !== skylinkToRemove);
        setSkylinks(filteredSkylinks);
        setSkylinkToRemove(null);
    };

    const handleCloseModal = () => setSkylinkToRemove(null);

    return (
			<div className='confirm-delete-modal-overlay' id='modal-overlay'>
				<div className='modal'>
					<p>
						Are you sure you want to delete{' '}
						<span style={{ color: '#82d88a', marginRight: '2px' }}>{nameOfItem}</span>?
					</p>
					<div className='buttons-container'>
						<button onClick={handleRemoveItem}>Yes, I'm sure</button>
						<button onClick={handleCloseModal}>No, cancel</button>
					</div>
				</div>
			</div>
		);
}

export default ConfirmDeleteModal;
