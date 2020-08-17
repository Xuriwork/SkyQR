import React, { useEffect, useState } from 'react';
import ArrowLeft from '../assets/arrow-left-circle.svg';
import { useForm } from "react-hook-form";

const SavedSkyLinks = ({ viewHome }) => {
    const [loading, setLoading] = useState(true);
    const [skylinks, setSkylinks] = useState([]);
    const { register, handleSubmit } = useForm();

    const handleSaveSkylink = handleSubmit(({ name, link }) => {
        const newSkylinks = skylinks.concat[{ name, link }];
        localStorage.setItem('savedSkylinks', JSON.stringify(newSkylinks));
    });

    useEffect(() => {
        const savedSkylinks = localStorage.getItem('savedSkylinks');
        setSkylinks(JSON.parse(savedSkylinks));
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

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
                    <input type='text' name='name' ref={register({ required: true })} />
                </div>
                <div>
                    <label>Skylink</label>
                    <input type='text' name='skylink' ref={register({ required: true })} />
                </div>
                <button onClick={handleSaveSkylink}>Add</button>
            </form>
            <ul>
                {skylinks.map((skylink, index) => (
                    <li key={index}>
                        <a href={skylink.link} target='_blank' rel='noopener noreferrer'>{skylink.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SavedSkyLinks;
