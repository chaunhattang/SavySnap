'use client';

import { Layout } from 'antd';
import Sidebar from '@/components/layout/SideBar/SideBar';
import HeaderBar from '@/components/layout/HeaderBar/HeaderBar';
import styles from './layout.module.css';
import { useState } from 'react';

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={styles.dashboardLayout}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <HeaderBar setCollapsed={setCollapsed} />

                <Content className={styles.dashboardContent}>{children}</Content>
            </Layout>
        </Layout>
    );
}
