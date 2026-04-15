'use client';

import { Grid, Layout } from 'antd';
import Sidebar from '@/components/layout/SideBar/SideBar';
import HeaderBar from '@/components/layout/HeaderBar/HeaderBar';
import styles from './layout.module.css';
import { useState } from 'react';
import SakuraFalling from '@/components/ui/SakuraFalling';
import MobileBottomBar from '@/components/layout/MobileBottom/MobileBottomBar';

const { Content } = Layout;

const { useBreakpoint } = Grid;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const screens = useBreakpoint();

    const isMobile = !screens.md;

    return (
        <Layout className={styles.dashboardLayout}>
            <SakuraFalling />
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <HeaderBar setCollapsed={setCollapsed} />

                <Content className={styles.dashboardContent}>{children}</Content>
            </Layout>
            {isMobile && <MobileBottomBar />}
        </Layout>
    );
}
