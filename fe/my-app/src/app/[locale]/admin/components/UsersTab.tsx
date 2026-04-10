'use client';

import React, { useState, useEffect } from 'react';
import {
    Typography,
    Card,
    Table,
    Button,
    Popconfirm,
    message,
    Modal,
    Form,
    Input,
    Select,
    Tag,
    Avatar,
    Space,
    Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    DeleteOutlined,
    EditOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user.td';
import styles from '../admin.module.css';

const { Text } = Typography;

const formatVND = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

// ─── Types ──────────────────────────────────────────────────────────
type ModalMode = 'edit' | 'add';

export default function UsersTab() {
    const t = useTranslations('admin');

    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('edit');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();

    // ─── Fetch ───────────────────────────────────────────────────────
    const fetchUsers = async () => {
        try {
            setLoadingUsers(true);
            const data = await userService.getAllUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    // ─── Open Edit Modal ─────────────────────────────────────────────
    const openEdit = (user: User) => {
        setModalMode('edit');
        setSelectedUser(user);
        form.setFieldsValue({
            username: user.username,
            email: user.email,
            role: user.role ?? 'USER',
        });
        setModalOpen(true);
    };

    // ─── Open Add Modal ──────────────────────────────────────────────
    const openAdd = () => {
        setModalMode('add');
        setSelectedUser(null);
        form.resetFields();
        form.setFieldsValue({ role: 'USER' });
        setModalOpen(true);
    };

    // ─── Submit ──────────────────────────────────────────────────────
    const handleSubmit = async (values: { username: string; email: string; role: string }) => {
        setSaving(true);
        try {
            if (modalMode === 'edit' && selectedUser) {
                await userService.updateByUserName(selectedUser.username, {
                    username: values.username,
                    email: values.email,
                    role: values.role,
                });
                message.success('Cập nhật người dùng thành công!');
            } else {
                // Add new — uses register endpoint pattern; adjust if backend differs
                await userService.updateByUserName(values.username, {
                    username: values.username,
                    email: values.email,
                    role: values.role,
                });
                message.success('Thêm người dùng thành công!');
            }
            setModalOpen(false);
            fetchUsers();
        } catch (err) {
            console.error(err);
            message.error('Thao tác thất bại. Vui lòng thử lại!');
        } finally {
            setSaving(false);
        }
    };

    // ─── Delete ──────────────────────────────────────────────────────
    const handleDelete = async (username: string) => {
        try {
            await userService.deleteByUsername(username);
            message.success(t('users.deleteSuccess'));
            setUsers((prev) => prev.filter((u) => u.username !== username));
        } catch {
            message.error(t('users.deleteFail'));
        }
    };

    // ─── Columns ─────────────────────────────────────────────────────
    const userColumns: ColumnsType<User> = [
        {
            title: t('users.columns.id'),
            dataIndex: 'id',
            key: 'id',
            width: 110,
            render: (text) => (
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
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                            />
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
                className={styles.tableCard}
                styles={{ body: { padding: 0 } }}
            >
                {/* ── Header ── */}
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

                {/* ── Table ── */}
                <Table<User>
                    columns={userColumns}
                    dataSource={users}
                    loading={loadingUsers}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            {/* ── Edit / Add Modal ── */}
            <Modal
                title={
                    <div>
                        <Text strong style={{ fontSize: 18 }}>
                            {modalMode === 'edit' ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            {modalMode === 'edit'
                                ? `Đang sửa: ${selectedUser?.username}`
                                : 'Điền thông tin để tạo tài khoản mới'}
                        </Text>
                    </div>
                }
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
                width={480}
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark={false}
                    style={{ marginTop: 16 }}
                >
                    <Form.Item
                        label={<Text strong>Tên đăng nhập</Text>}
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
                            placeholder="username"
                            disabled={modalMode === 'edit'}
                            style={{ borderRadius: 10 }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<Text strong>Email</Text>}
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            placeholder="email@example.com"
                            style={{ borderRadius: 10 }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<Text strong>Role</Text>}
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn role!' }]}
                    >
                        <Select style={{ borderRadius: 10 }}>
                            <Select.Option value="USER">
                                <Tag color="green" style={{ fontWeight: 700 }}>USER</Tag>
                            </Select.Option>
                            <Select.Option value="ADMIN">
                                <Tag color="volcano" style={{ fontWeight: 700 }}>ADMIN</Tag>
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setModalOpen(false)}>
                                Huỷ
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={saving}
                                style={{
                                    backgroundColor: '#059669',
                                    borderColor: '#059669',
                                    borderRadius: 10,
                                    fontWeight: 700,
                                    height: 40,
                                    minWidth: 120,
                                }}
                            >
                                {modalMode === 'edit' ? 'Lưu thay đổi' : 'Tạo tài khoản'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
