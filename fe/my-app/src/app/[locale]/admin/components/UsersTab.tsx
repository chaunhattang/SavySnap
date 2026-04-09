'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Table, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user.td';
import styles from '../admin.module.css';

const { Text } = Typography;

const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export default function UsersTab() {
    const t = useTranslations('admin');
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                setUsers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch users', error);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (username: string) => {
        try {
            await userService.deleteByUsername(username);
            message.success(t('users.deleteSuccess'));
            setUsers(users.filter((u) => u.username !== username));
        } catch (error) {
            message.error(t('users.deleteFail'));
        }
    };

    const userColumns: ColumnsType<User> = [
        {
            title: t('users.columns.id'),
            dataIndex: 'id',
            key: 'id',
            render: (text) => (
                <Text type="secondary" className={styles.usernameText}>
                    {text?.substring(0, 8)}...
                </Text>
            ),
        },
        {
            title: t('users.columns.username'),
            dataIndex: 'username',
            key: 'username',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: t('users.columns.email'),
            dataIndex: 'email',
            key: 'email',
            render: (text) => <Text type="secondary">{text}</Text>,
        },
        {
            title: t('users.columns.totalPayment'),
            dataIndex: 'totalPayment',
            key: 'totalPayment',
            render: (val) => <Text strong>{formatVND(val || 0)}</Text>,
        },
        {
            title: t('users.columns.action'),
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={t('users.deleteConfirm')}
                    onConfirm={() => handleDeleteUser(record.username)}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                >
                    <Button danger type="text" className={styles.deleteBtn}>
                        {t('users.delete')}
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Card variant="borderless" className={styles.tableCard} styles={{ body: { padding: 0 } }}>
            <div className={styles.tableCardHeader}>
                <div>
                    <Text strong className={styles.tableCardTitle}>
                        {t('users.title')}
                    </Text>
                    <Text type="secondary" className={styles.tableCardDesc}>
                        {t('users.desc')}
                    </Text>
                </div>
            </div>

            <Table<User>
                columns={userColumns}
                dataSource={users}
                loading={loadingUsers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );
}
