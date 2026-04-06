import React from 'react';
import { CameraOutlined } from '@ant-design/icons';
import styles from '@/app/[locale]/(auth)/login/styles/login.module.css';
import { useTranslations } from 'next-intl';
import { Typography } from 'antd';
const LoginCard: React.FC<any> = () => {
    const t = useTranslations('auth.login');
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.logoBox}>
                    <div className={styles.logoIcon}>
                        <CameraOutlined style={{ fontSize: 24 }} />
                    </div>
                    <Typography.Text
                        style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}
                    >
                        {t('brandName')}
                    </Typography.Text>
                </div>
                <Typography.Title level={2} className={styles.leftTitle}>
                    {t('title')}
                </Typography.Title>
                <Typography.Paragraph className={styles.leftSubtitle}>
                    {t('subtitle')}
                </Typography.Paragraph>
            </div>

            <div className={styles.trustGroup}>
                <div>
                    {[1, 2, 3].map((i) => (
                        <span key={i} className={styles.avatar}></span>
                    ))}
                </div>
                <Typography.Text style={{ color: 'white' }}>{t('trustedUsers')}</Typography.Text>
            </div>

            <div className={styles.shapeTopRight}></div>
            <div className={styles.shapeBottomLeft}></div>
        </div>
    );
};

export default LoginCard;
