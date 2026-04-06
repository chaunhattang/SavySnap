import React from 'react';
import { Row, Col } from 'antd';
import Terms from '@/app/[locale]/(auth)/terms/components/Terms';
import LoginCard from '@/app/[locale]/(auth)/login/_components/LoginCard';
import styles from '@/app/[locale]/(auth)/terms/styles/terms.module.css';

const TermsPage = () => {
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
                        <Terms />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TermsPage;
