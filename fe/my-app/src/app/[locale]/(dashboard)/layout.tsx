'use client';

import { Layout } from 'antd';
import Sidebar from '@/components/layout/SideBar/SideBar';
import HeaderBar from '@/components/layout/HeaderBar/HeaderBar';

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />

            <Layout>
                <HeaderBar />

                <Content style={{ padding: 24 }}>{children}</Content>
            </Layout>
        </Layout>
    );
}
