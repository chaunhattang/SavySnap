'use client';
import React from 'react';
import { Row, Col } from 'antd';
import LoginForm from '@/app/[locale]/(auth)/login/_components/LoginForm';
import LoginCard from '@/app/[locale]/(auth)/login/_components/LoginCard';
import styles from './loginPage.module.css';

const LoginPage: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Row className={styles.loginCardContainer} align="stretch">
                <Col xs={0} md={12} className={styles.leftCol}>
                    <div className={styles.leftPanel}>
                        <LoginCard />
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <div className={styles.rightPanel}>
                        <div>
                            <h3 className={styles.headerText}>Chào mừng trở lại!</h3>
                            <p className={styles.subHeaderText}>
                                Vui lòng đăng nhập để tiếp tục quản lý các Snap của bạn.
                            </p>
                        </div>
                        <LoginForm />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
