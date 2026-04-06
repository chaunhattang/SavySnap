'use client';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { MailOutlined, LockOutlined, ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import styles from '@/app/[locale]/(auth)/register/styles/register.module.css';
import Link from 'next/link';
import axios from '@/lib/api/axios';

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const t = useTranslations('auth.register');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            console.log('Received values of form: ', values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await axios.post('http://localhost:8080/api/auth/register', values);
            console.log('Register success');
        } catch (error) {
            console.error(error);
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
            <Form
                form={form}
                name="register"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{}}
                requiredMark={false}
            >
                <Form.Item
                    name="username"
                    label={
                        <Typography.Text className={styles.inputLabel}>
                            {t('usernameLabel')}
                        </Typography.Text>
                    }
                    rules={[
                        {
                            required: true,
                            message: (
                                <Typography.Text style={{ color: 'inherit' }}>
                                    {t('usernameRequired')}
                                </Typography.Text>
                            ),
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: '#94a3b8', marginRight: 8 }} />}
                        placeholder={t('usernamePlaceholder')}
                        variant="filled"
                        className={styles.customInput}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label={
                        <Typography.Text className={styles.inputLabel}>
                            {t('emailLabel')}
                        </Typography.Text>
                    }
                    rules={[
                        {
                            type: 'email',
                            message: (
                                <Typography.Text style={{ color: 'inherit' }}>
                                    {t('emailInvalid')}
                                </Typography.Text>
                            ),
                        },
                        {
                            required: true,
                            message: (
                                <Typography.Text style={{ color: 'inherit' }}>
                                    {t('emailRequired')}
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
                    name="password"
                    label={
                        <Typography.Text className={styles.inputLabel}>
                            {t('passwordLabel')}
                        </Typography.Text>
                    }
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
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#94a3b8', marginRight: 8 }} />}
                        placeholder={t('passwordPlaceholder')}
                        variant="filled"
                        className={styles.customInput}
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
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

            <p
                style={{
                    marginTop: 20,
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#64748b',
                }}
            >
                <Typography.Text style={{ color: 'inherit' }}>{t('hasAccount')}</Typography.Text>{' '}
                <Link
                    href="/login"
                    style={{
                        fontWeight: 'bold',
                        color: '#059669',
                        textDecoration: 'none',
                    }}
                >
                    <Typography.Text style={{ color: 'inherit', fontWeight: 'inherit' }}>
                        {t('loginUrlText')}
                    </Typography.Text>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
