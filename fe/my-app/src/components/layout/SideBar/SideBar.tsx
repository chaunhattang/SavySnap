"use client";

import React from "react";
import styles from "./styles.module.css";

import {
  CameraOutlined,
  WalletOutlined,
  PieChartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Avatar, Layout, Menu } from "antd";
import { Link } from '@/locales/routing';

const { Sider } = Layout;

const items = [
  CameraOutlined,
  WalletOutlined,
  PieChartOutlined,
  BellOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
}));

export default function Sidebar() {
  return (
    <Sider
      width={100}
      breakpoint="lg"
      collapsedWidth={90}
      className={styles.sidebar}
    >
      <Link href="/login">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
        ></Avatar>
      </Link>

      <Menu
        className={styles.menuSidebar}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
  );
}
