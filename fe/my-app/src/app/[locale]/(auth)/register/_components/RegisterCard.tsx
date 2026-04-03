'use client';
import React from 'react';
import { CameraOutlined } from '@ant-design/icons';
import styles from '@/app/[locale]/(auth)/register/styles/register.module.css';
import { Typography } from 'antd';
import { useTranslations } from 'next-intl';
function RegisterCard() {
    const t = useTranslations('auth.register');
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.logoBox}>
                    <div className={styles.logoIcon}>
                        <CameraOutlined style={{ fontSize: 24 }} />
                    </div>
                    <Typography.Text style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                        {t('brandName')}
                    </Typography.Text>
                </div>
                <Typography.Title level={2}>{t('bannerTitle')}</Typography.Title>
                <Typography.Paragraph>{t('bannerSubtitle')}</Typography.Paragraph>
            </div>

            <div className={styles.trustGroup}>
                <Typography.Text>{t('testimonial')}</Typography.Text>
            </div>

            <div className={styles.shapeTopRight}></div>
            <div className={styles.shapeBottomLeft}></div>
        </div>
    );
}

export default RegisterCard;
