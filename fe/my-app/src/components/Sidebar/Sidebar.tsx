"use client";

import styles from "./styles.module.css";
import React from "react";
import {
  CameraOutlined,
  WalletOutlined,
  PieChartOutlined,
  BellOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  CameraOutlined,
  WalletOutlined,
  PieChartOutlined,
  BellOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={100}
        breakpoint="lg"
        collapsedWidth={90}
        className={styles.sidebar}
      >
        <Avatar size={64} icon={<UserOutlined />} className={styles.avatar} />

        <Menu
          className={styles.menuSidebar}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header className={styles.headerCotainer}>
          {/* LEFT: Logo */}
          <div className={styles.logoText}>
            <span className={styles.brand}>SavySnap</span>
            <span className={styles.subtitle}>DASHBOARD TIẾT KIỆM</span>
          </div>

          {/* RIGHT: Search + Button */}
          <div className={styles.actions}>
            <Input
              className={styles.search}
              placeholder="Tìm kiếm ghi chú..."
              prefix={<SearchOutlined />}
              allowClear
            />

            <Button type="primary" size="large" className={styles.addButton}>
              + Thêm mới
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
