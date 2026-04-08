'use client';
import React from 'react';
import { Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from '@/app/[locale]/(auth)/terms/styles/terms.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Terms: React.FC = () => {
    const t = useTranslations('auth.terms');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 className={styles.headerText}>{t('headerText')}</h3>
                <p className={styles.subHeaderText}>{t('subHeaderText')}</p>
            </div>

            <div className={styles.termsContainer}>
                <div className={styles.termItem}>
                    <div className={styles.termTitle}>
                        <span className={styles.termNumber}>1</span>
                        {t('term1Title')}
                    </div>
                    <div className={styles.termContent}>{t('term1Content')}</div>
                </div>

                <div className={styles.termItem}>
                    <div className={styles.termTitle}>
                        <span className={styles.termNumber}>2</span>
                        {t('term2Title')}
                    </div>
                    <div className={styles.termContent}>{t('term2Content')}</div>
                </div>

                <div className={styles.termItem}>
                    <div className={styles.termTitle}>
                        <span className={styles.termNumber}>3</span>
                        {t('term3Title')}
                    </div>
                    <div className={styles.termContent}>{t('term3Content')}</div>
                </div>
            </div>

            <div className={styles.backBtnContainer}>
                <Link href="/register" className={styles.backBtn}>
                    <ArrowLeftOutlined />
                    <span>{t('backToRegister')}</span>
                </Link>
            </div>
        </div>
    );
};

export default Terms;
