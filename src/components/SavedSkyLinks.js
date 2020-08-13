import React from 'react';
import ArrowLeft from '../assets/arrow-left-circle.svg';

const SavedSkyLinks = ({ viewHome }) => {
    return (
        <div className='saved-skylinks-component'>  
            <div>
                <button onClick={viewHome}>
                    <img src={ArrowLeft} alt='left arrow' />
                </button>
                <h1>Saved Skylinks</h1>
            </div>
            <ul>
                <li>Test</li>
            </ul>
        </div>
    )
}

export default SavedSkyLinks;
