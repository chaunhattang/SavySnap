import React from 'react';
import { Row, Col } from 'antd';
import ForgotPassword from '@/app/[locale]/(auth)/forgotPassword/components/ForgotPassword';
import LoginCard from '@/components/auth/login/LoginCard';
import styles from '@/app/[locale]/(auth)/forgotPassword/styles/forgotPassword.module.css';

const ForgotPasswordPage = () => {
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
                        <ForgotPassword />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ForgotPasswordPage;
