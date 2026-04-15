'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import styles from './admin.module.css';
import { TAB, TabKey } from './constants';

// Các tab trong trang admin
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardTab from '@/components/admin/DashboardTab';
import UsersTab from '@/components/admin/UsersTab';
import SettingsTab from '@/components/admin/SettingsTab';
import SnapsTab from '@/components/admin/SnapsTab';
import CinematicBackground from '@/components/admin/CinematicBackground';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<TabKey>(TAB.DASHBOARD);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#db2777',
                    borderRadius: 12,
                },
            }}
        >
            <div className={styles.layout}>
                <CinematicBackground />
                
                <div className={`mainContainer ${isLoaded ? styles.cinematicReveal : 'opacity-0'}`}>
                    <div className={`${styles.glassDashboard} ${styles.dynamicBorder}`}>
                        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                        <div className={styles.content}>
                            <AdminHeader />

                            <div className={styles.dashboardInner}>
                                <div key={activeTab} className={styles.tabTransition}>
                                    {activeTab === TAB.DASHBOARD && <DashboardTab />}
                                    {activeTab === TAB.USERS && <UsersTab />}
                                    {activeTab === TAB.SNAPS && <SnapsTab />}
                                    {activeTab === TAB.SETTINGS && <SettingsTab />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
