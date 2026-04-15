// ─── Hằng số cho key của từng tab ────────────────────────────────────
// Tách ra file riêng để tránh circular dependency giữa page.tsx và các component
export const TAB = {
    DASHBOARD: '1',
    USERS: '2',
    SNAPS: '3',
    SETTINGS: '4',
} as const;

export type TabKey = (typeof TAB)[keyof typeof TAB];
