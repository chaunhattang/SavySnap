'use client';

import SnapList from '@/components/snap/SnapList';

import DashboardSummary from '@/components/dashboard/DashboardSummary';

export default function Page() {
    return (
        <>
            <DashboardSummary />
            <SnapList />
        </>
    );
}
