'use client';

import { Row, Col } from 'antd';
import LoginForm from '@/components/auth/login/LoginForm';
import LoginCard from '@/components/auth/login/LoginCard';
import styles from '@/components/auth/login/login.module.css';

const LoginPage = () => {
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
                        <LoginForm />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
