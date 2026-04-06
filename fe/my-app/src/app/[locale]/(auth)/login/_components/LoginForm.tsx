'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Divider, Row, Col, Flex, Typography } from 'antd';
import {
    MailOutlined,
    LockOutlined,
    ArrowRightOutlined,
    GoogleOutlined,
    GithubOutlined,
} from '@ant-design/icons';
import styles from '@/app/[locale]/(auth)/login/styles/login.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const LoginForm: React.FC<any> = () => {
    const t = useTranslations('auth.login');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            console.log('Success:', values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <h3 className={styles.headerText}>{t('headerText')}</h3>
                <p className={styles.subHeaderText}>{t('subHeaderText')}</p>
            </div>
            <Form name="login" layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Form.Item
                    label={
                        <Typography.Text className={styles.inputLabel}>
                            {t('emailLabel')}
                        </Typography.Text>
                    }
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: (
                                <Typography.Text style={{ color: 'inherit' }}>
                                    {t('emailRequired')}
                                </Typography.Text>
                            ),
                        },
                        {
                            type: 'email',
                            message: (
                                <Typography.Text style={{ color: 'inherit' }}>
                                    {t('emailInvalid')}
                                </Typography.Text>
                            ),
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined style={{ color: '#94a3b8', marginRight: 8 }} />}
                        placeholder={t('emailPlaceholder')}
                        variant="filled"
                        className={styles.customInput}
                    />
                </Form.Item>

                <Form.Item
                    className={styles.fullWidthLabel}
                    label={
                        <div className={styles.labelContainer}>
                            <Typography.Text className={styles.inputLabel}>
                                {t('passwordLabel')}
                            </Typography.Text>
                            <Link href="/forgot-password" className={styles.forgotLink}>
                                <Typography.Text style={{ color: 'inherit' }}>
                                    {t('forgotPassword')}
                                </Typography.Text>
                            </Link>
                        </div>
                    }
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: (
                                <Typography.Text style={{ color: 'inherit' }}>
                                    {t('passwordRequired')}
                                </Typography.Text>
                            ),
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#94a3b8', marginRight: 8 }} />}
                        placeholder={t('passwordPlaceholder')}
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
                        <Typography.Text style={{ color: 'white' }}>{t('submit')}</Typography.Text>
                    </Button>
                </Form.Item>
            </Form>
            <Divider style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 'bold' }}>
                <Typography.Text
                    style={{ color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
                >
                    {t('divider')}
                </Typography.Text>
            </Divider>
            <Row gutter={16}>
                <Col span={12}>
                    <Button block className={styles.socialBtn} icon={<GoogleOutlined />}>
                        <Typography.Text style={{ color: 'inherit', fontWeight: 'inherit' }}>
                            {t('loginWithGoogle')}
                        </Typography.Text>
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block className={styles.socialBtn} icon={<GithubOutlined />}>
                        <Typography.Text style={{ color: 'inherit', fontWeight: 'inherit' }}>
                            {t('loginWithGithub')}
                        </Typography.Text>
                    </Button>
                </Col>
            </Row>
            <p
                style={{
                    marginTop: 40,
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#64748b',
                }}
            >
                <Typography.Text style={{ color: 'inherit' }}>{t('noAccount')}</Typography.Text>?{' '}
                <Link
                    href="/register"
                    style={{
                        fontWeight: 'bold',
                        color: '#059669',
                        textDecoration: 'none',
                    }}
                >
                    <Typography.Text style={{ color: 'inherit', fontWeight: 'inherit' }}>
                        {t('register')}
                    </Typography.Text>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
