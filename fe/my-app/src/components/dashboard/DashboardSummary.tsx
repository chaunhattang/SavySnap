'use client';

import { Row, Col, Card } from 'antd';
import { useSnaps } from '@/hooks/useSnaps';
import { useTranslations } from 'next-intl';
import styles from './DashboardSummary.module.css';

export default function DashboardSummary() {
    const { snaps } = useSnaps();
    const totalExpense = snaps.reduce(
        (sum, snap) => sum + (snap.amount ? Number(snap.amount) : 0),
        0
    );

    const totalSaving = snaps
        .filter((snap) => snap.category === 'SAVING')
        .reduce((sum, snap) => sum + (snap.amount ? Number(snap.amount) : 0), 0);

    const t = useTranslations('dashboard');

    return (
        <Row gutter={16} className={styles.rowMargin}>
            <Col span={16}>
                <Card className={styles.totalFeeCard}>
                    <div>{t('totalFee')}</div>

                    <h1>{totalExpense.toLocaleString()} đ</h1>
                </Card>
            </Col>

            <Col span={8}>
                <Card className={styles.normalCard}>
                    <div>{t('totalSaving')}</div>

                    <h2>{totalSaving.toLocaleString()} đ</h2>
                </Card>
            </Col>
        </Row>
    );
}
