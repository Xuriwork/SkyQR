import React, { useContext, useEffect, useState } from 'react';
import { fetchSkylinks, saveSkylinks } from '../blockstack/methods';
import { UserContext } from '../context/UserContext';
import ArrowLeft from '../assets/arrow-left-circle.svg';

const SavedSkyLinks = ({ viewHome }) => {
    const [loading, setLoading] = useState(true);
    const [skylinks, setSkylinks] = useState([]);
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const { userSession, user } = useContext(UserContext);

    const handleSaveSkylink = async (e) => {
        e.preventDefault();
        if (!link.trim() || !name.trim()) return;
        console.log(name, link);
        saveSkylinks(userSession, skylinks.concat([{ name, link }]));
    };

    useEffect(() => {
        const getSkylinks = async () => {
            const response = await fetchSkylinks(userSession, user.username);
            console.log(response);

            if (response.skylinks === null) {
                console.log('Not found');
            } else {
                console.log(response.skylinks);
                setSkylinks(response.skylinks)
            };
            setLoading(false);
        }
        if (user) getSkylinks();

    }, [user, userSession]);

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
                    <input type='text' name='name' onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Skylink</label>
                    <input type='text' name='skylink' onChange={(e) => setLink(e.target.value)} />
                </div>
                <button onClick={handleSaveSkylink}>Save</button>
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
