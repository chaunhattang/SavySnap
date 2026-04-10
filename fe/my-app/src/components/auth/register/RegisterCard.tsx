'use client';

import { CameraOutlined } from '@ant-design/icons';
import styles from './register.module.css';
import { Typography } from 'antd';
import { useTranslations } from 'next-intl';
function RegisterCard() {
    const t = useTranslations('auth.register');
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.logoBox}>
                    <div className={styles.logoIcon}>
                        <CameraOutlined className={styles.largeCameraIcon} />
                    </div>
                    <Typography.Text className={styles.brandNameText}>
                        {t('brandName')}
                    </Typography.Text>
                </div>
                <Typography.Title level={2} className={styles.rightTitle}>
                    {t('bannerTitle')}
                </Typography.Title>
                <Typography.Paragraph className={styles.rightSubtitle}>
                    {t('bannerSubtitle')}
                </Typography.Paragraph>
            </div>

            <div className={styles.trustGroup}>
                <Typography.Text className={styles.whiteText}>{t('testimonial')}</Typography.Text>
            </div>

            <div className={styles.shapeTopRight}></div>
            <div className={styles.shapeBottomLeft}></div>
        </div>
    );
}

export default RegisterCard;
