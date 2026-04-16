'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Card, Table, Button, Space, Tag } from 'antd';
import {
    TeamOutlined,
    PictureOutlined,
    DollarOutlined,
    LineChartOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { Sparkles, TrendingUp } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { snapService } from '@/services/apis/snap.service';
import { userService } from '@/services/apis/user.service';
import styles from '@/app/[locale]/admin/admin.module.css';

const { Title, Text } = Typography;

interface RecentSnap {
    id: string;
    user: string;
    email: string;
    title: string;
    amount: number;
    date: string;
    status: 'Duyệt' | 'Chờ' | 'Từ chối';
}

const formatVND = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const STATUS_CONFIG: Record<RecentSnap['status'], { color: string; i18nKey: string }> = {
    'Duyệt':    { color: 'success', i18nKey: 'recentSnaps.columns.statusTypes.approved' },
    'Chờ':      { color: 'warning', i18nKey: 'recentSnaps.columns.statusTypes.pending'  },
    'Từ chối':  { color: 'error',   i18nKey: 'recentSnaps.columns.statusTypes.rejected' },
};

// ─── Cinematic Stat Card with 3D Tilt ───────────────────────────────────
const StatCard = ({ stat }: { stat: any }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setTilt({ x: (y - centerY) / 20, y: (centerX - x) / 20 });
    };

    const IconComponent = stat.icon;

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setTilt({ x: 0, y: 0 });
                if(cardRef.current) {
                    cardRef.current.style.setProperty('--mouse-x', `-1000px`);
                    cardRef.current.style.setProperty('--mouse-y', `-1000px`);
                }
            }}
            className={`${styles.cinematicCard} ${styles.statCardBounce}`}
            style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`, padding: '24px', borderRadius: '2rem', cursor: 'pointer' }}
        >
            <div className="flex justify-between items-start relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <div>
                    <p className={styles.statLabel}>{stat.labelKey}</p>
                    <h3 className={styles.statValue}>{stat.value}</h3>
                </div>
                <div 
                    className="p-3.5 rounded-[1.25rem] bg-white border border-white backdrop-blur-md" 
                    style={{ color: stat.color, boxShadow: `0 8px 16px ${stat.bg}, inset 0 0 10px rgba(255,255,255,1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <IconComponent size={24} strokeWidth={2.5} />
                </div>
            </div>
            <div className="mt-5 flex items-center gap-2 relative z-10" style={{ transform: 'translateZ(20px)', fontSize: '12px', fontWeight: 'bold' }}>
                <span className="text-emerald-600 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-xl shadow-sm">
                    {stat.change}
                </span>
                <span className="text-pink-400/70">tháng này nha ~</span>
            </div>
        </div>
    );
};

export default function DashboardTab() {
    const t = useTranslations('admin');
    const [recentSnaps, setRecentSnaps] = useState<RecentSnap[]>([]);
    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [snaps, users] = await Promise.allSettled([
                    snapService.getDashboardSnaps(),
                    userService.getAllUsers(),
                ]);
                if (snaps.status === 'fulfilled') setRecentSnaps(snaps.value);
                if (users.status === 'fulfilled' && Array.isArray(users.value)) {
                    setUserCount(users.value.length);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const columns: ColumnsType<RecentSnap> = [
        {
            title: t('recentSnaps.columns.user'),
            key: 'user',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{record.user}</Text>
                    <Text type="secondary" className={styles.usernameText}>{record.email}</Text>
                </Space>
            ),
        },
        {
            title: t('recentSnaps.columns.goalAndSpend'),
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text strong type="secondary">{text}</Text>,
        },
        {
            title: t('recentSnaps.columns.amount'),
            dataIndex: 'amount',
            key: 'amount',
            render: (val) => <Text strong>{formatVND(val)}</Text>,
        },
        {
            title: t('recentSnaps.columns.date'),
            dataIndex: 'date',
            key: 'date',
            render: (text) => <Text type="secondary">{text}</Text>,
        },
        {
            title: t('recentSnaps.columns.status'),
            dataIndex: 'status',
            key: 'status',
            render: (status: RecentSnap['status']) => {
                const cfg = STATUS_CONFIG[status] ?? { color: 'default', i18nKey: '' };
                return <Tag color={cfg.color}>{cfg.i18nKey ? t(cfg.i18nKey as any) : status}</Tag>;
            },
        },
        {
            title: '',
            key: 'action',
            render: () => <Button type="text" icon={<MoreOutlined />} />,
        },
    ];

    const stats = [
        { labelKey: t('stats.totalUsers'), value: userCount.toString(), change: '+12%', icon: TeamOutlined, color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.3)' },
        { labelKey: t('stats.createdSnaps'), value: recentSnaps.length.toString(), change: '+24%', icon: PictureOutlined, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.3)' },
        { labelKey: t('stats.totalTrackingValue'), value: '12.4 Tỷ', change: '+18%', icon: DollarOutlined, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.3)' },
        { labelKey: t('stats.dailyVisits'), value: '1.2 Tr', change: '+42%', icon: LineChartOutlined, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.3)' },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div className={`${styles.dashboardHeader} ${styles.fadeStagger}`} style={{ '--delay': '0.1s' } as any}>
                <Title level={2} className={styles.dashboardTitle}>
                    {t('dashboardTitle')}
                </Title>
                <Text type="secondary" className={styles.dashboardDesc}>
                    {t('dashboardDesc')}
                </Text>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${styles.statsRow}`}>
                {stats.map((stat, idx) => (
                    <div key={idx} className={styles.fadeStagger} style={{ '--delay': `${0.2 + idx * 0.1}s` } as any}>
                        <StatCard stat={stat} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card
                    variant="borderless"
                    className={`${styles.tableCard} ${styles.fadeStagger} ${styles.shimmerEffect}`}
                    style={{ '--delay': '0.6s' } as any}
                    styles={{ body: { padding: 0 } }}
                >
                    <div className={styles.tableCardHeader}>
                        <div className="flex items-center gap-2">
                            <Sparkles size={22} className="text-pink-400" />
                            <Text strong className={styles.tableCardTitle}>{t('recentSnaps.title')}</Text>
                        </div>
                        <Button type="text" className={styles.viewAllBtn}>
                            {t('recentSnaps.viewAll')}
                        </Button>
                    </div>
                    <Table<RecentSnap>
                        columns={columns}
                        dataSource={recentSnaps}
                        loading={loading}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                        rowClassName={() => styles.cinematicTableRow}
                    />
                </Card>

                <div className={`${styles.cinematicCard} ${styles.fadeStagger} ${styles.shimmerEffect} p-6 lg:p-8 flex flex-col relative overflow-hidden`} style={{ '--delay': '0.7s' } as any}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-pink-200/50 rounded-full blur-[40px] mix-blend-multiply"></div>
                    <h3 className="text-xl font-black text-pink-900 flex items-center gap-2 mb-6 relative z-10 drop-shadow-sm">
                        <TrendingUp size={22} className="text-pink-400" /> Nhịp đập thả tim
                    </h3>
                    
                    <div className="flex-1 flex flex-col justify-center gap-6 relative z-10">
                        <div className="flex items-end justify-between h-40 gap-2">
                            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                                <div key={i} className="w-full bg-white/50 rounded-[1rem] relative group cursor-pointer border border-white shadow-sm hover:scale-105 transition-transform duration-300">
                                    <div 
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-pink-400 via-pink-300 to-pink-200 rounded-[1rem] transition-all duration-700 group-hover:from-pink-500 group-hover:to-pink-300 shadow-[0_5px_15px_rgba(255,182,193,0.5)]"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/60 rounded-t-lg"></div>
                                    </div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border border-pink-100 text-pink-600 font-black text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_5px_15px_rgba(255,182,193,0.3)] pointer-events-none transform translate-y-2 group-hover:translate-y-0 duration-300">
                                        {h}%
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] font-black text-pink-400/60 uppercase tracking-widest">
                            <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t-2 border-white/60 relative z-10">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-pink-900/60">Cục pin máy chủ 🔋</span>
                            <span className="text-sm font-black text-pink-600 bg-white px-2 py-0.5 rounded-lg shadow-sm">72%</span>
                        </div>
                        <div className="w-full h-3 bg-pink-100/50 rounded-full overflow-hidden border border-white shadow-inner p-0.5">
                            <div className="w-[72%] h-full bg-gradient-to-r from-pink-400 to-pink-300 rounded-full relative shadow-[0_0_10px_rgba(255,182,193,0.8)]">
                                <div className="absolute inset-0 bg-white/50 w-full h-full animate-[pulse_1.5s_ease-in-out_infinite] mix-blend-overlay"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 rounded-full blur-[1px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
