'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Table, Button, Space, Tag } from 'antd';
import {
    TeamOutlined,
    PictureOutlined,
    DollarOutlined,
    LineChartOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { snapService } from '@/services/apis/snap.service';
import { userService } from '@/services/apis/user.service';
import styles from '../admin.module.css';

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

const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export default function DashboardTab() {
    const t = useTranslations('admin');

    const [recentSnaps, setRecentSnaps] = useState<RecentSnap[]>([]);
    const [loading, setLoading] = useState(true);
    const [userCount, setUserCount] = useState<number>(0);

    useEffect(() => {
        const fetchSnaps = async () => {
            try {
                const snaps = await snapService.getDashboardSnaps();
                setRecentSnaps(snaps);
            } catch (error) {
                console.error('Failed to fetch snaps', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserCount = async () => {
            try {
                const data = await userService.getAllUsers();
                if (Array.isArray(data)) {
                    setUserCount(data.length);
                }
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchSnaps();
        fetchUserCount();
    }, []);

    const columns: ColumnsType<RecentSnap> = [
        {
            title: t('recentSnaps.columns.user'),
            key: 'user',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{record.user}</Text>
                    <Text type="secondary" className={styles.usernameText}>
                        {record.email}
                    </Text>
                </Space>
            ),
        },
        {
            title: t('recentSnaps.columns.goalAndSpend'),
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <Text strong type="secondary">
                    {text}
                </Text>
            ),
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
            render: (status) => {
                let color = 'default';
                let label = status;
                if (status === 'Duyệt') {
                    color = 'success';
                    label = t('recentSnaps.columns.statusTypes.approved');
                }
                if (status === 'Chờ') {
                    color = 'warning';
                    label = t('recentSnaps.columns.statusTypes.pending');
                }
                if (status === 'Từ chối') {
                    color = 'error';
                    label = t('recentSnaps.columns.statusTypes.rejected');
                }

                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: '',
            key: 'action',
            render: () => <Button type="text" icon={<MoreOutlined />} />,
        },
    ];

    const stats = [
        {
            label: t('stats.totalUsers'),
            value: userCount.toString(),
            change: '+12%',
            icon: TeamOutlined,
            color: '#1677ff',
            bg: '#e6f4ff',
        },
        {
            label: t('stats.createdSnaps'),
            value: (recentSnaps || []).length.toString(),
            change: '+24%',
            icon: PictureOutlined,
            color: '#52c41a',
            bg: '#f6ffed',
        },
        {
            label: t('stats.totalTrackingValue'),
            value: '12.4 Tỷ',
            change: '+8%',
            icon: DollarOutlined,
            color: '#faad14',
            bg: '#fffbe6',
        },
        {
            label: t('stats.dailyVisits'),
            value: '2,845',
            change: '-3%',
            icon: LineChartOutlined,
            color: '#722ed1',
            bg: '#f9f0ff',
        },
    ];

    return (
        <>
            <div className={styles.dashboardHeader}>
                <Title level={2} className={styles.dashboardTitle}>
                    {t('dashboardTitle')}
                </Title>
                <Text type="secondary" className={styles.dashboardDesc}>
                    {t('dashboardDesc')}
                </Text>
            </div>

            <Row gutter={[24, 24]} className={styles.statsRow}>
                {stats.map((stat, idx) => (
                    <Col xs={24} sm={12} xl={6} key={idx}>
                        <Card variant="borderless" className={styles.statCard}>
                            <div className={styles.statContent}>
                                <div>
                                    <div className={styles.statLabel}>{stat.label}</div>
                                    <div className={styles.statValue}>{stat.value}</div>
                                    <div
                                        className={styles.statChange}
                                        style={{
                                            color: stat.change.startsWith('+')
                                                ? '#52c41a'
                                                : '#ff4d4f',
                                        }}
                                    >
                                        {stat.change}{' '}
                                        <Text type="secondary" className={styles.statVsText}>
                                            {t('stats.vsLastMonth')}
                                        </Text>
                                    </div>
                                </div>
                                <div
                                    className={styles.statIconWrapper}
                                    style={{ background: stat.bg, color: stat.color }}
                                >
                                    <stat.icon className={styles.statIcon} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card
                variant="borderless"
                className={styles.tableCard}
                styles={{ body: { padding: 0 } }}
            >
                <div className={styles.tableCardHeader}>
                    <Text strong className={styles.tableCardTitle}>
                        {t('recentSnaps.title')}
                    </Text>
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
                />
            </Card>
        </>
    );
}
