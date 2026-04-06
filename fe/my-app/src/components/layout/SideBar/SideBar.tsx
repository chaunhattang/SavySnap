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
      <Avatar
        size={64}
        icon={<UserOutlined />}
        style={{ cursor: "pointer" }}
      ></Avatar>

      <Menu
        className={styles.menuSidebar}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
  );
}
