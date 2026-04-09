'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            setLoggedIn(true);

            setEmail(localStorage.getItem('email'));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return {
        loggedIn,

        email,
        handleLogout,
    };
}
