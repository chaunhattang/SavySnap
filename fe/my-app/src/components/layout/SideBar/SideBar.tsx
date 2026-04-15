'use client';

import SidebarView from './SidebarView';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user.td';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

interface Props {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: Props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const screens = useBreakpoint();

    const isMobile = !screens.md;

    /* AUTO COLLAPSE WHEN MOBILE */

    useEffect(() => {
        if (isMobile) {
            setCollapsed(false);
        }
    }, [isMobile]);

    useEffect(() => {
        const token = Cookies.get('accessToken');

        if (!token) return;

        const fetchUser = async () => {
            try {
                setLoggedIn(true);

                const info = await userService.getMyInfo();

                setUser(info);
            } catch {
                Cookies.remove('accessToken', { path: '/' });
                Cookies.remove('role', { path: '/' });
            }
        };

        fetchUser();
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
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isMobile={isMobile}
        />
    );
}
