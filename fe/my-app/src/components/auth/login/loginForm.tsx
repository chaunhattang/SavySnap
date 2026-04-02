"use client";
import React, { useState } from "react";
import { Form, Input, Button, Divider, Row, Col, Flex } from "antd";
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import styles from "./loginForm.module.css";
import Link from "next/link";

interface LoginFormValues {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      console.log("Success:", values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        name="login"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label={<span className={styles.inputLabel}>Địa chỉ Email</span>}
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ email!" },
            { type: "email", message: "Email không đúng định dạng!" },
          ]}
        >
          <Input
            prefix={
              <MailOutlined style={{ color: "#94a3b8", marginRight: 8 }} />
            }
            placeholder="name@example.com"
            variant="filled"
            className={styles.customInput}
          />
        </Form.Item>

        <Form.Item
          className={styles.fullWidthLabel}
          label={
            <div className={styles.labelContainer}>
              <span className={styles.inputLabel}>Mật khẩu</span>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Quên mật khẩu?
              </Link>
            </div>
          }
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            prefix={
              <LockOutlined style={{ color: "#94a3b8", marginRight: 8 }} />
            }
            placeholder="••••••••"
            variant="filled"
            className={styles.customInput}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 32 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className={styles.submitBtn}
            icon={!loading && <ArrowRightOutlined />}
            iconPosition="end"
          >
            Đăng nhập ngay
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{ fontSize: 12, color: "#cbd5e1", fontWeight: "bold" }}>
        HOẶC
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Button block className={styles.socialBtn} icon={<GoogleOutlined />}>
            Google
          </Button>
        </Col>
        <Col span={12}>
          <Button block className={styles.socialBtn} icon={<GithubOutlined />}>
            Github
          </Button>
        </Col>
      </Row>

      <p
        style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 14,
          color: "#64748b",
        }}
      >
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          style={{
            fontWeight: "bold",
            color: "#059669",
            textDecoration: "none",
          }}
        >
          Đăng ký miễn phí
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
