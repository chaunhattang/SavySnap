'use client';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { MailOutlined, LockOutlined, ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import styles from './register.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/apis/auth.service';

const RegisterForm: React.FC = () => {
    const t = useTranslations('auth.register');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            await authService.register(values);

            router.push('/login');
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
            <Form name="register" layout="vertical" onFinish={onFinish} requiredMark={false}>
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
                                <Typography.Text className={styles.inheritColorText}>
                                    {t('usernameRequired')}
                                </Typography.Text>
                            ),
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: '#94a3b8', marginRight: 8 }} />}
                        autoComplete="username"
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
                                <Typography.Text className={styles.inheritColorText}>
                                    {t('emailInvalid')}
                                </Typography.Text>
                            ),
                        },
                        {
                            required: true,
                            message: (
                                <Typography.Text className={styles.inheritColorText}>
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
                                <Typography.Text className={styles.inheritColorText}>
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
                        <Typography.Text className={styles.whiteText}>
                            {t('submit')}
                        </Typography.Text>
                    </Button>
                </Form.Item>
            </Form>

            <p style={{ marginTop: 20 }} className={styles.footerText}>
                <Typography.Text className={styles.inheritColorText}>
                    {t('hasAccount')}
                </Typography.Text>{' '}
                <Link href="/login" className={styles.loginLink}>
                    <Typography.Text className={styles.inheritWeightText}>
                        {t('loginUrlText')}
                    </Typography.Text>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
