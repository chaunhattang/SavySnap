'use client';

import SidebarView from './SidebarView';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user.td';

export default function Sidebar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get('accessToken');

        if (token) {
            setLoggedIn(true);
            userService
                .getMyInfo()
                .then((info) => {
                    setUser(info);
                })
                .catch(() => {
                    Cookies.remove('accessToken', { path: '/' });
                    Cookies.remove('role', { path: '/' });
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('role', { path: '/' });
        window.location.href = '/login';
    };

    const refreshUser = async () => {
        try {
            const info = await userService.getMyInfo();
            setUser(info);
        } catch (error) {
            console.error('Failed to refresh user info', error);
        }
    };

    return (
        <SidebarView
            loggedIn={loggedIn}
            user={user}
            onLogout={handleLogout}
            onRefreshUser={refreshUser}
        />
    );
}
