'use client';

import React, { useState } from 'react';
import {
    Card,
    Col,
    Row,
    Typography,
    Form,
    Input,
    Button,
    Switch,
    Select,
    Divider,
    Tag,
    message,
    Space,
    InputNumber,
} from 'antd';
import {
    GlobalOutlined,
    LockOutlined,
    BellOutlined,
    DatabaseOutlined,
    SaveOutlined,
    ReloadOutlined,
    ApiOutlined,
    CloudUploadOutlined,
} from '@ant-design/icons';
import styles from '../admin.module.css';

const { Title, Text, Paragraph } = Typography;

// ─── Section card wrapper ─────────────────────────────────────────────
function SettingSection({
    icon,
    title,
    desc,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    children: React.ReactNode;
}) {
    return (
        <Card
            className={styles.settingCard}
            styles={{ body: { padding: '24px 28px' } }}
        >
            <div className={styles.settingCardHeader}>
                <div className={styles.settingIconBox}>{icon}</div>
                <div>
                    <Text strong className={styles.settingCardTitle}>{title}</Text>
                    <Text type="secondary" className={styles.settingCardDesc}>{desc}</Text>
                </div>
            </div>
            <Divider style={{ margin: '20px 0 24px' }} />
            {children}
        </Card>
    );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function SettingsTab() {
    const [generalForm] = Form.useForm();
    const [securityForm] = Form.useForm();
    const [savingGeneral, setSavingGeneral] = useState(false);
    const [savingSecurity, setSavingSecurity] = useState(false);

    // ── Notification toggles ──────────────────────────────────────────
    const [notifSnap, setNotifSnap]       = useState(true);
    const [notifUser, setNotifUser]       = useState(true);
    const [notifSystem, setNotifSystem]   = useState(false);

    // ── General settings submit ───────────────────────────────────────
    const handleSaveGeneral = async (values: any) => {
        setSavingGeneral(true);
        // Simulate API call — replace with real endpoint when available
        await new Promise((r) => setTimeout(r, 800));
        console.log('General settings saved:', values);
        message.success('Cài đặt chung đã được lưu!');
        setSavingGeneral(false);
    };

    // ── Security settings submit ──────────────────────────────────────
    const handleSaveSecurity = async (values: any) => {
        setSavingSecurity(true);
        await new Promise((r) => setTimeout(r, 800));
        console.log('Security settings saved:', values);
        message.success('Cài đặt bảo mật đã được lưu!');
        setSavingSecurity(false);
    };

    return (
        <div className={styles.settingsWrapper}>
            {/* Page heading */}
            <div className={styles.dashboardHeader}>
                <Title level={3} className={styles.dashboardTitle}>
                    Cài đặt hệ thống
                </Title>
                <Paragraph className={styles.dashboardDesc}>
                    Quản lý cấu hình, bảo mật và thông báo cho toàn bộ hệ thống SavySnap.
                </Paragraph>
            </div>

            <Row gutter={[24, 24]}>

                {/* ── 1. General ─────────────────────────────────────── */}
                <Col xs={24} xl={12}>
                    <SettingSection
                        icon={<GlobalOutlined style={{ fontSize: 20, color: '#059669' }} />}
                        title="Cài đặt chung"
                        desc="Tên ứng dụng, múi giờ và ngôn ngữ mặc định"
                    >
                        <Form
                            form={generalForm}
                            layout="vertical"
                            requiredMark={false}
                            initialValues={{
                                appName: 'SavySnap',
                                timezone: 'Asia/Ho_Chi_Minh',
                                defaultLocale: 'vi',
                                maxUploadMb: 5,
                            }}
                            onFinish={handleSaveGeneral}
                        >
                            <Form.Item
                                label={<Text strong>Tên ứng dụng</Text>}
                                name="appName"
                                rules={[{ required: true }]}
                            >
                                <Input className={styles.settingInput} prefix={<ApiOutlined style={{ color: '#94a3b8' }} />} />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label={<Text strong>Múi giờ</Text>} name="timezone">
                                        <Select className={styles.settingSelect}>
                                            <Select.Option value="Asia/Ho_Chi_Minh">🇻🇳 Hà Nội / TP.HCM</Select.Option>
                                            <Select.Option value="Asia/Bangkok">🇹🇭 Bangkok</Select.Option>
                                            <Select.Option value="UTC">🌐 UTC</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={<Text strong>Ngôn ngữ mặc định</Text>} name="defaultLocale">
                                        <Select className={styles.settingSelect}>
                                            <Select.Option value="vi">🇻🇳 Tiếng Việt</Select.Option>
                                            <Select.Option value="en">🇺🇸 English</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label={<Text strong>Giới hạn upload ảnh (MB)</Text>} name="maxUploadMb">
                                <InputNumber min={1} max={50} style={{ width: '100%', borderRadius: 10 }} />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={savingGeneral}
                                    className={styles.settingSaveBtn}
                                >
                                    Lưu cài đặt chung
                                </Button>
                            </Form.Item>
                        </Form>
                    </SettingSection>
                </Col>

                {/* ── 2. Security ────────────────────────────────────── */}
                <Col xs={24} xl={12}>
                    <SettingSection
                        icon={<LockOutlined style={{ fontSize: 20, color: '#2563eb' }} />}
                        title="Bảo mật"
                        desc="Chính sách mật khẩu và phiên đăng nhập"
                    >
                        <Form
                            form={securityForm}
                            layout="vertical"
                            requiredMark={false}
                            initialValues={{
                                sessionTimeout: 60,
                                minPasswordLength: 8,
                                jwtSecret: '••••••••••••••••••••',
                            }}
                            onFinish={handleSaveSecurity}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Text strong>Timeout phiên (phút)</Text>}
                                        name="sessionTimeout"
                                    >
                                        <InputNumber min={5} max={1440} style={{ width: '100%', borderRadius: 10 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Text strong>Độ dài mật khẩu tối thiểu</Text>}
                                        name="minPasswordLength"
                                    >
                                        <InputNumber min={6} max={32} style={{ width: '100%', borderRadius: 10 }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label={<Text strong>JWT Secret Key</Text>} name="jwtSecret">
                                <Input.Password
                                    className={styles.settingInput}
                                    prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
                                    placeholder="••••••••••••••••"
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={savingSecurity}
                                    className={styles.settingSaveBtn}
                                    style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}
                                >
                                    Lưu cài đặt bảo mật
                                </Button>
                            </Form.Item>
                        </Form>
                    </SettingSection>
                </Col>

                {/* ── 3. Notification toggles ────────────────────────── */}
                <Col xs={24} xl={12}>
                    <SettingSection
                        icon={<BellOutlined style={{ fontSize: 20, color: '#d97706' }} />}
                        title="Thông báo hệ thống"
                        desc="Bật/tắt các loại thông báo được gửi đến admin"
                    >
                        <Space direction="vertical" style={{ width: '100%' }} size={20}>
                            {[
                                {
                                    label: 'Thông báo khi có Snap mới',
                                    desc: 'Nhận thông báo mỗi khi người dùng tạo Snap',
                                    value: notifSnap,
                                    onChange: setNotifSnap,
                                    color: '#059669',
                                },
                                {
                                    label: 'Thông báo người dùng mới',
                                    desc: 'Nhận thông báo khi có tài khoản mới đăng ký',
                                    value: notifUser,
                                    onChange: setNotifUser,
                                    color: '#2563eb',
                                },
                                {
                                    label: 'Cảnh báo hệ thống',
                                    desc: 'Nhận thông báo khi có lỗi hoặc cảnh báo nghiêm trọng',
                                    value: notifSystem,
                                    onChange: setNotifSystem,
                                    color: '#dc2626',
                                },
                            ].map((item) => (
                                <div key={item.label} className={styles.notifRow}>
                                    <div>
                                        <Text strong style={{ display: 'block' }}>{item.label}</Text>
                                        <Text type="secondary" style={{ fontSize: 12 }}>{item.desc}</Text>
                                    </div>
                                    <Switch
                                        checked={item.value}
                                        onChange={item.onChange}
                                        style={{ backgroundColor: item.value ? item.color : undefined }}
                                    />
                                </div>
                            ))}
                        </Space>
                    </SettingSection>
                </Col>

                {/* ── 4. Database / Storage status ──────────────────── */}
                <Col xs={24} xl={12}>
                    <SettingSection
                        icon={<DatabaseOutlined style={{ fontSize: 20, color: '#7c3aed' }} />}
                        title="Hệ thống & Lưu trữ"
                        desc="Trạng thái kết nối và thông tin phiên bản"
                    >
                        <Space direction="vertical" style={{ width: '100%' }} size={16}>
                            {[
                                { label: 'Trạng thái API',       value: 'Đang hoạt động',  ok: true  },
                                { label: 'Kết nối Database',     value: 'Đã kết nối',       ok: true  },
                                { label: 'Cloudinary Storage',   value: 'Đã kết nối',       ok: true  },
                                { label: 'Phiên bản Backend',    value: 'v1.0.0',           ok: null  },
                                { label: 'Phiên bản Frontend',   value: 'Next.js 14',       ok: null  },
                            ].map((row) => (
                                <div key={row.label} className={styles.statusRow}>
                                    <Text type="secondary" style={{ fontSize: 13 }}>{row.label}</Text>
                                    <Tag
                                        color={row.ok === null ? 'default' : row.ok ? 'success' : 'error'}
                                        style={{ borderRadius: 8, fontWeight: 600 }}
                                    >
                                        {row.value}
                                    </Tag>
                                </div>
                            ))}
                        </Space>

                        <Divider style={{ margin: '20px 0 16px' }} />

                        <Space>
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={() => message.info('Đã làm mới trạng thái hệ thống')}
                                style={{ borderRadius: 10 }}
                            >
                                Làm mới trạng thái
                            </Button>
                            <Button
                                icon={<CloudUploadOutlined />}
                                onClick={() => message.success('Đã kích hoạt sao lưu thủ công')}
                                style={{ borderRadius: 10 }}
                            >
                                Sao lưu ngay
                            </Button>
                        </Space>
                    </SettingSection>
                </Col>

            </Row>
        </div>
    );
}
