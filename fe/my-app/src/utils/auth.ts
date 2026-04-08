export const getToken = () => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('accessToken');
};

export const isLoggedIn = () => {
    return !!getToken();
};

export const logout = () => {
    localStorage.removeItem('accessToken');

    window.location.href = '/login';
};
