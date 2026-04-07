'use client';

import React from 'react';
import styles from './styles.module.css';

import {
    CameraOutlined,
    WalletOutlined,
    PieChartOutlined,
    BellOutlined,
    UserOutlined,
} from '@ant-design/icons';

<<<<<<< Updated upstream
import { Avatar, Layout, Menu } from "antd";
=======
import { Avatar, Layout, Menu } from 'antd';
import { Link } from '@/locales/routing';
>>>>>>> Stashed changes

const { Sider } = Layout;

const items = [CameraOutlined, WalletOutlined, PieChartOutlined, BellOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
    })
);

export default function Sidebar() {
<<<<<<< Updated upstream
  return (
    <Sider
      width={100}
      breakpoint="lg"
      collapsedWidth={90}
      className={styles.sidebar}
    >
      <Avatar
        size={64}
        icon={<UserOutlined />}
        style={{ cursor: "pointer" }}
      ></Avatar>
=======
    return (
        <Sider width={100} breakpoint="lg" collapsedWidth={90} className={styles.sidebar}>
            <Link href="/login">
                <Avatar size={64} icon={<UserOutlined />} style={{ cursor: 'pointer' }}></Avatar>
            </Link>
>>>>>>> Stashed changes

            <Menu
                className={styles.menuSidebar}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    );
}
