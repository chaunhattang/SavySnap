'use client';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, Row, Col, Flex, Typography } from 'antd';
import {
    MailOutlined,
    LockOutlined,
    ArrowRightOutlined,
    GoogleOutlined,
    GithubOutlined,
} from '@ant-design/icons';
import styles from './login.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/apis/auth.service';

const LoginForm: React.FC<any> = () => {
    const t = useTranslations('auth.login');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const [form] = Form.useForm();

    useEffect(() => {
        const email = localStorage.getItem('registeredEmail');
        const password = localStorage.getItem('registeredPassword');

        if (email && password) {
            form.setFieldsValue({
                email: email,
                password: password,
            });
        }
    }, []);

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            console.log('Success:', values);
            const { isAdmin, token } = await authService.login(values);

            if (token) {
                console.log('Login success');
                router.push(isAdmin ? '/admin' : '/');
            }
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
            <Form
                form={form}
                name="login"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
            >
                <Form.Item
                    label={
                        <Typography.Text className={styles.inputLabel}>
                            {t('emailLabel')}
                        </Typography.Text>
                    }
                    name="accountName"
                    rules={[
                        {
                            required: true,
                            message: (
                                <Typography.Text className={styles.inheritColorText}>
                                    {t('emailRequired')}
                                </Typography.Text>
                            ),
                        },
                        {
                            type: 'string',
                            message: (
                                <Typography.Text className={styles.inheritColorText}>
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
                        autoComplete="email"
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
                                <Typography.Text className={styles.inheritColorText}>
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
                        <Typography.Text className={styles.whiteText}>
                            {t('submit')}
                        </Typography.Text>
                    </Button>
                </Form.Item>
            </Form>
            <Divider className={styles.customDivider}>
                <Typography.Text className={styles.inheritAllText}>{t('divider')}</Typography.Text>
            </Divider>
            <Row gutter={16}>
                <Col span={12}>
                    <Button block className={styles.socialBtn} icon={<GoogleOutlined />}>
                        <Typography.Text className={styles.inheritWeightText}>
                            {t('loginWithGoogle')}
                        </Typography.Text>
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block className={styles.socialBtn} icon={<GithubOutlined />}>
                        <Typography.Text className={styles.inheritWeightText}>
                            {t('loginWithGithub')}
                        </Typography.Text>
                    </Button>
                </Col>
            </Row>
            <p className={styles.footerText}>
                <Typography.Text className={styles.inheritColorText}>
                    {t('noAccount')}
                </Typography.Text>
                ?{' '}
                <Link href="/register" className={styles.registerLink}>
                    <Typography.Text className={styles.inheritWeightText}>
                        {t('register')}
                    </Typography.Text>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
