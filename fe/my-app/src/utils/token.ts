import Cookies from 'js-cookie';

export const token = {
    set: (accessToken: string) => {
        Cookies.set('accessToken', accessToken, {
            expires: 7,
            path: '/',
        });
    },

    setRole: (role: string) => {
        Cookies.set('role', role, {
            expires: 7,
            path: '/',
        });
    },

    clear: () => {
        Cookies.remove('accessToken');

        Cookies.remove('role');
    },
};
