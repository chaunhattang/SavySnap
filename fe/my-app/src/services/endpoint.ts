export const ENDPOINT = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        PROFILE: '/auth/profile',
    },

    NOTES: {
        GET_ALL: '/notes',
        CREATE: '/notes',
        UPDATE: (id: string) => `/notes/${id}`,
        DELETE: (id: string) => `/notes/${id}`,
    },

    USERS: {
        GET_BY_USERNAME: (username: string) => `/users/${username}`,
    },
};
