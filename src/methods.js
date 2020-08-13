export const saveSkylink = async (userSession, tasks, isPublic) => {
    await userSession.putFile(TASKS_FILENAME, JSON.stringify({ tasks, isPublic }), {
      encrypt: !isPublic,
    });
};

export const fetchSkylinks = async (userSession, username) => {
    const tasksJSON = await userSession.getFile(TASKS_FILENAME, {
        decrypt: false,
        username: username || undefined,
    });
};