'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';

import {
    CameraOutlined,
    WalletOutlined,
    PieChartOutlined,
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

import { Avatar, Layout, Menu, Tooltip, Dropdown, Modal, Form, Input, Button } from 'antd';

import Link from 'next/link';

const { Sider } = Layout;

const items = [CameraOutlined, WalletOutlined, PieChartOutlined, BellOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
    })
);

interface Props {
    loggedIn: boolean;
    email: string | null;
    onLogout: () => void;
}

export default function SidebarView({ loggedIn, email, onLogout }: Props) {
    const [openProfile, setOpenProfile] = useState(false);

    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        localStorage.setItem('email', values.email);

        Modal.success({
            title: 'Updated successfully',
        });

        setOpenProfile(false);

        window.location.reload();
    };

    const menu = [
        {
            key: 'profile',
            label: 'Edit Profile',
            onClick: () => setOpenProfile(true),
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: onLogout,
        },
    ];

    return (
        <Sider width={100} breakpoint="lg" collapsedWidth={90} className={styles.sidebar}>
            {/* USER AREA */}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 16,
                    gap: 8,
                }}
            >
                {loggedIn ? (
                    <>
                        <Dropdown menu={{ items: menu }} placement="bottom">
                            <Avatar
                                size={64}
                                icon={<UserOutlined />}
                                style={{
                                    backgroundColor: '#1677ff',
                                    cursor: 'pointer',
                                }}
                            />
                        </Dropdown>

                        {email && (
                            <span
                                style={{
                                    fontSize: 12,
                                    color: '#666',
                                    textAlign: 'center',
                                    padding: '0 8px',
                                }}
                            >
                                {email}
                            </span>
                        )}
                    </>
                ) : (
                    <Link href="/login">
                        <Avatar
                            size={64}
                            icon={<UserOutlined />}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: '#d9d9d9',
                            }}
                        />
                    </Link>
                )}
            </div>

            <Menu
                className={styles.menuSidebar}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />

            {/* PROFILE MODAL */}

            <Modal
                title="Edit Profile"
                open={openProfile}
                onCancel={() => setOpenProfile(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        email: email,
                    }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Sider>
    );
}
