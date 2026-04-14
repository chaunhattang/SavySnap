'use client';

import { Row, Col, Card, Input, Grid } from 'antd';
import { useSnapCrud } from '@/hooks/useSnapCrud';
import { useTranslations } from 'next-intl';
import styles from './DashboardSummary.module.css';
import { SearchOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

export default function DashboardSummary() {
    const { data: snaps } = useSnapCrud();

    const t = useTranslations('dashboard');

    const totalExpense = snaps.reduce(
        (sum, snap) => sum + (snap.amount ? Number(snap.amount) : 0),
        0
    );

    const totalSaving = snaps
        .filter((snap) => snap.category === 'SAVING')
        .reduce((sum, snap) => sum + (snap.amount ? Number(snap.amount) : 0), 0);

    const screens = useBreakpoint();

    const isMobile = !screens.md;

    const setSearch = useSnapCrud((s) => s.setSearch);

    return (
        <Row gutter={[16, 16]} className={styles.rowMargin}>
            {isMobile && (
                <Col xs={24} sm={24} md={16}>
                    <Input
                        className={styles.search}
                        placeholder={t('placeholder')}
                        prefix={<SearchOutlined />}
                        allowClear
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            )}
            <Col xs={24} sm={24} md={16}>
                <Card className={styles.totalFeeCard}>
                    <div>{t('totalFee')}</div>

                    <h1 className={styles.bigNumber}>{totalExpense.toLocaleString()} đ</h1>
                </Card>
            </Col>

            <Col xs={24} sm={24} md={8}>
                <Card className={styles.normalCard}>
                    <div>{t('totalSaving')}</div>

                    <h2 className={styles.smallNumber}>{totalSaving.toLocaleString()} đ</h2>
                </Card>
            </Col>
        </Row>
    );
}
