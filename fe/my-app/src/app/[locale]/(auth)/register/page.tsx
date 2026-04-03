import React from 'react';
import styles from '@/app/[locale]/(auth)/register/styles/register.module.css';
import { Row, Col } from 'antd';
import RegisterCard from '@/app/[locale]/(auth)/register/_components/RegisterCard';
import RegisterForm from '@/app/[locale]/(auth)/register/_components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <Row className={styles.loginCardContainer} align="stretch">
                <Col xs={0} md={12}>
                    <div className={styles.leftPanel}>
                        <RegisterForm />
                    </div>
                </Col>

                <Col xs={24} md={12} className={styles.rightCol}>
                    <div className={styles.rightPanel}>
                        <RegisterCard />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default RegisterPage;
