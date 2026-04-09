'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
    const [loggedIn, setLoggedIn] = useState(false);

    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            setLoggedIn(true);

            const storedEmail = localStorage.getItem('email');

            setEmail(storedEmail);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');

        localStorage.removeItem('email');

        window.location.href = '/login';
    };

    return {
        loggedIn,
        email,
        handleLogout,
    };
}
