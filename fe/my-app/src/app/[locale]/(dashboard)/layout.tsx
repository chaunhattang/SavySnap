'use client';

import { Layout } from 'antd';
import Sidebar from '@/components/layout/SideBar/SideBar';
import HeaderBar from '@/components/layout/HeaderBar/HeaderBar';
import styles from './layout.module.css';

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout className={styles.dashboardLayout}>
            <Sidebar />

            <Layout>
                <HeaderBar />

                <Content className={styles.dashboardContent}>{children}</Content>
            </Layout>
        </Layout>
    );
}
