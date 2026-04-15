'use client';

import { Grid, Layout } from 'antd';
import Sidebar from '@/components/layout/SideBar/SideBar';
import HeaderBar from '@/components/layout/HeaderBar/HeaderBar';
import styles from './layout.module.css';
import { useEffect, useState } from 'react';
import SakuraFalling from '@/components/ui/SakuraFalling';
import MobileBottomBar from '@/components/layout/MobileBottom/MobileBottomBar';
import Cookies from 'js-cookie';
import { User } from '@/types/user.td';
import { userService } from '@/services/apis/user.service';

const { Content } = Layout;

const { useBreakpoint } = Grid;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const screens = useBreakpoint();
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const isMobile = !screens.md;
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

    /* 👇 logout */
    const handleLogout = () => {
        localStorage.clear();

        Cookies.remove('accessToken', { path: '/' });

        Cookies.remove('role', { path: '/' });

        window.location.href = '/login';
    };

    return (
        <Layout className={styles.dashboardLayout}>
            <SakuraFalling />
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <HeaderBar
                    setCollapsed={setCollapsed}
                    loggedIn={loggedIn}
                    user={user}
                    onLogout={handleLogout}
                />

                <Content className={styles.dashboardContent}>{children}</Content>
            </Layout>
            {isMobile && <MobileBottomBar />}
        </Layout>
    );
}
