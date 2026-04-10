'use client';

import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import styles from './admin.module.css';

// Admin Components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import DashboardTab from './components/DashboardTab';
import UsersTab from './components/UsersTab';
import SettingsTab from './components/SettingsTab';
import SnapsTab from './components/SnapsTab';

const { Content } = Layout;

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<string>('1');

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#10b981',
                    borderRadius: 8,
                },
            }}
        >
            <Layout className={styles.layout}>
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <Layout className={styles.mainLayout}>
                    <AdminHeader />

                    <Content className={styles.content}>
                        {activeTab === '1' && <DashboardTab />}
                        {activeTab === '2' && <UsersTab />}
                        {activeTab === '3' && <SnapsTab />}
                        {activeTab === '4' && <SettingsTab />}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
