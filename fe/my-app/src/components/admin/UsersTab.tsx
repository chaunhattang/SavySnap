'use client';

import React, { useState, useEffect } from 'react';
import {
    Typography,
    Card,
    Table,
    Button,
    Popconfirm,
    message,
    Space,
    Tag,
    Avatar,
    Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user';
import styles from '@/app/[locale]/admin/admin.module.css';
import UserFormModal from './UserFormModal';

const { Text } = Typography;

// ─── Helper: định dạng tiền VND ──────────────────────────────────────
const formatVND = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

// ─── Component quản lý người dùng ────────────────────────────────────
export default function UsersTab() {
    const t = useTranslations('admin');

    // Danh sách người dùng và trạng thái loading
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    // Trạng thái modal: đang mở không, mode nào, user nào đang sửa
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // ─── Lấy danh sách người dùng từ API ─────────────────────────────
    const fetchUsers = async () => {
        try {
            setLoadingUsers(true);
            const data = await userService.getAllUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Lỗi khi tải danh sách người dùng:', error);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ─── Mở modal thêm người dùng mới ────────────────────────────────
    const openAdd = () => {
        setModalMode('add');
        setSelectedUser(null);
        setModalOpen(true);
    };

    // ─── Mở modal sửa thông tin người dùng ───────────────────────────
    const openEdit = (user: User) => {
        setModalMode('edit');
        setSelectedUser(user);
        setModalOpen(true);
    };

    // ─── Xoá người dùng sau khi xác nhận ─────────────────────────────
    const handleDelete = async (username: string) => {
        try {
            await userService.deleteByUsername(username);
            message.success(t('users.deleteSuccess'));
            // Xoá khỏi state ngay, không cần gọi lại API
            setUsers((prev) => prev.filter((u) => u.username !== username));
        } catch {
            message.error(t('users.deleteFail'));
        }
    };

    // ─── Cấu hình cột bảng người dùng ────────────────────────────────
    const userColumns: ColumnsType<User> = [
        {
            title: t('users.columns.id'),
            dataIndex: 'id',
            key: 'id',
            width: 110,
            render: (text) => (
                // Rút gọn ID dài, hover để xem đầy đủ
                <Tooltip title={text}>
                    <Text type="secondary" className={styles.usernameText}>
                        {text?.substring(0, 8)}...
                    </Text>
                </Tooltip>
            ),
        },
        {
            title: 'Avatar',
            key: 'avatar',
            width: 70,
            render: (_, record) => (
                <Avatar
                    size={36}
                    src={record.avatarUrl}
                    icon={!record.avatarUrl && <UserOutlined />}
                    style={{ backgroundColor: '#059669' }}
                />
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
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 110,
            render: (role) => (
                <Tag
                    color={role === 'ADMIN' ? 'volcano' : 'green'}
                    style={{ fontWeight: 700, borderRadius: 8 }}
                >
                    {role ?? 'USER'}
                </Tag>
            ),
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
            width: 120,
            render: (_, record) => (
                <Space>
                    <Tooltip title="Sửa thông tin">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => openEdit(record)}
                            style={{ color: '#059669' }}
                        />
                    </Tooltip>
                    <Popconfirm
                        title={t('users.deleteConfirm')}
                        onConfirm={() => handleDelete(record.username)}
                        okText="Xoá"
                        cancelText="Huỷ"
                        placement="left"
                    >
                        <Tooltip title="Xoá người dùng">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card
                variant="borderless"
                className={`${styles.tableCard} ${styles.cinematicCard}`}
                styles={{ body: { padding: 0 } }}
            >
                {/* Tiêu đề và nút thêm mới */}
                <div className={styles.tableCardHeader}>
                    <div>
                        <Text strong className={styles.tableCardTitle}>
                            {t('users.title')}
                        </Text>
                        <Text type="secondary" className={styles.tableCardDesc}>
                            {t('users.desc')}
                        </Text>
                    </div>

                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={openAdd}
                        style={{
                            backgroundColor: '#059669',
                            borderColor: '#059669',
                            borderRadius: 10,
                            fontWeight: 700,
                            height: 40,
                        }}
                    >
                        Thêm người dùng
                    </Button>
                </div>

                {/* Bảng hiển thị danh sách người dùng */}
                <Table<User>
                    columns={userColumns}
                    dataSource={users}
                    loading={loadingUsers}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            {/* Modal tạo mới / sửa người dùng (tách riêng để gọn) */}
            <UserFormModal
                open={modalOpen}
                mode={modalMode}
                user={selectedUser}
                onClose={() => setModalOpen(false)}
                onSuccess={fetchUsers}
            />
        </>
    );
}
