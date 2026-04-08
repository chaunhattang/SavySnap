'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styles from '@/app/[locale]/(auth)/forgotPassword/styles/forgotPassword.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ForgotPassword: React.FC<any> = () => {
    const t = useTranslations('auth.forgotPassword');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            console.log('Success:', values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (error) {
            console.error('Error:', error);
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
            <Form name="forgotPassword" layout="vertical" onFinish={onFinish} requiredMark={false}>
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

            <p
                style={{
                    marginTop: 40,
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#64748b',
                }}
            >
                <Link
                    href="/login"
                    style={{
                        fontWeight: 'bold',
                        color: '#059669',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}
                >
                    <ArrowLeftOutlined />
                    <Typography.Text style={{ color: 'inherit', fontWeight: 'inherit' }}>
                        {t('backToLogin')}
                    </Typography.Text>
                </Link>
            </p>
        </>
    );
};

export default ForgotPassword;
