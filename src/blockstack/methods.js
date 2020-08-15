import { SKYLINKS_FILENAME } from './constants';

export const saveSkylinks = async (userSession, skylinks, isPublic = false) => {
	console.log(skylinks);
	await userSession.putFile(
		SKYLINKS_FILENAME,
		JSON.stringify({ skylinks, isPublic })
	);
};

export const fetchSkylinks = async (userSession, username) => {
	try {
		const skylinksJSON = await userSession.getFile(SKYLINKS_FILENAME, {
			username,
		});

		if (skylinksJSON) {
			const json = JSON.parse(skylinksJSON);
			return json.skylinks;
		}
	} catch (error) {
		if (username) {
			return {
				skylinks: null,
			};
		}
	}
};
