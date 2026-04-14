'use client';

import { Row, Col, Card } from 'antd';
import { useSnaps } from '@/hooks/useSnaps';
import { useTranslations } from 'next-intl';

import { calculateSnapStats } from '@/utils/snapStats';

import styles from './DashboardSummary.module.css';

export default function DashboardSummary() {
    const { snaps } = useSnaps();

    const { totalExpense, totalSaving } = calculateSnapStats(snaps);

    const t = useTranslations('dashboard');

    return (
        <Row gutter={[16, 16]} className={styles.rowMargin}>
            <Col xs={24} sm={24} md={16}>
                <Card className={styles.totalFeeCard}>
                    <div>{t('totalFee')}</div>

                    <h1 className={styles.bigNumber}>{totalExpense.toLocaleString()}đ</h1>
                </Card>
            </Col>

            <Col xs={24} sm={24} md={8}>
                <Card className={styles.normalCard}>
                    <div>{t('totalSaving')}</div>

                    <h2 className={styles.smallNumber}>{totalSaving.toLocaleString()}đ</h2>
                </Card>
            </Col>
        </Row>
    );
}
