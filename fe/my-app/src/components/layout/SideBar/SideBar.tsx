'use client';

import SidebarView from './SidebarView';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
    const { loggedIn, email, handleLogout } = useAuth();

    return <SidebarView loggedIn={loggedIn} email={email} onLogout={handleLogout} />;
}
