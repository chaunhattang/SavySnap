'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider, Drawer } from 'antd';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#db2777',
                    borderRadius: 12,
                },
            }}
        >
            {/* THẺ CONTAINER NGOÀI CÙNG (không dùng backdrop-blur ở đây) */}
            <div className="flex h-screen w-full overflow-hidden bg-slate-50 relative z-0">
                <CinematicBackground />

                {/* KHỐI SIDEBAR BÊN TRÁI (Fix cứng kích thước, chỉ blur ở đây) */}
                <div className="hidden md:flex flex-col w-64 shrink-0 h-full bg-white/30 backdrop-blur-md border-r border-white/20 relative z-20 shadow-[5px_0_15px_rgba(255,182,193,0.1)]">
                    <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Sidebar Mobile (Drawer) */}
                <Drawer 
                    placement="left" 
                    onClose={() => setIsMobileMenuOpen(false)} 
                    open={isMobileMenuOpen}
                    closable={false}
                    styles={{ body: { padding: 0 } }}
                    width={280}
                    className="md:hidden"
                >
                    <div className="h-full w-full relative bg-slate-50">
                        <AdminSidebar activeTab={activeTab} setActiveTab={(key) => { setActiveTab(key); setIsMobileMenuOpen(false); }} />
                    </div>
                </Drawer>

                {/* KHỐI MAIN CONTENT BÊN PHẢI */}
                <div className="flex-1 h-full flex flex-col overflow-hidden relative z-10">
                    <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

                    {/* Vùng nội dung cuộn */}
                    <main className="flex-1 overflow-y-auto w-full p-4 md:p-6 bg-transparent">
                        <div key={activeTab} className="h-full w-full animate-in fade-in zoom-in-95 duration-500">
                            {activeTab === TAB.DASHBOARD && <DashboardTab />}
                            {activeTab === TAB.USERS && <UsersTab />}
                            {activeTab === TAB.SNAPS && <SnapsTab />}
                            {activeTab === TAB.SETTINGS && <SettingsTab />}
                        </div>
                    </main>
                </div>
            </div>
        </ConfigProvider>
    );
}
