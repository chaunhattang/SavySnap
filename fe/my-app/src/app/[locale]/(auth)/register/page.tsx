import styles from '@/components/auth/register/register.module.css';
import { Row, Col } from 'antd';
import RegisterCard from '@/components/auth/register/RegisterCard';
import RegisterForm from '@/components/auth/register/RegisterForm';

const RegisterPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <Row className={styles.loginCardContainer} align="stretch">
                <Col xs={24} md={12}>
                    <div className={styles.leftPanel}>
                        <RegisterForm />
                    </div>
                </Col>

                <Col xs={0} md={12} className={styles.rightCol}>
                    <div className={styles.rightPanel}>
                        <RegisterCard />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default RegisterPage;
