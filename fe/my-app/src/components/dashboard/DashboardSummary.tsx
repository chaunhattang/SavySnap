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
    const a = useTranslations('headerBar');

    const screens = useBreakpoint();

    const isMobile = !screens.md;

    const setSearch = useSnapCrud((s) => s.setSearch);

    const totalExpense = snaps.reduce((sum, snap) => sum + Number(snap.amount || 0), 0);

    const totalSaving = snaps
        .filter((snap) => snap.category === 'SAVING')
        .reduce((sum, snap) => sum + Number(snap.amount || 0), 0);

    return (
        <Row gutter={[16, 16]} className={styles.rowMargin}>
            {/* SEARCH MOBILE */}

            {isMobile && (
                <Col span={24}>
                    <Input
                        className={styles.search}
                        placeholder={a('placeholder')}
                        prefix={<SearchOutlined />}
                        allowClear
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            )}

            {/* TOTAL EXPENSE */}

            <Col xs={24} md={16}>
                <Card className={styles.totalFeeCard}>
                    <div style={{ fontSize: '25px', fontWeight: 'bold' }}>{t('totalFee')}</div>

                    <h1 className={styles.bigNumber}>{totalExpense.toLocaleString()} đ</h1>
                </Card>
            </Col>

            {/* TOTAL SAVING */}

            <Col xs={24} md={8}>
                <Card className={styles.normalCard}>
                    <div style={{ fontSize: '25px', fontWeight: 'bold', color: '#ec4899' }}>
                        {t('totalSaving')}
                    </div>

                    <h1 className={styles.smallNumber}>{totalSaving.toLocaleString()} đ</h1>
                </Card>
            </Col>
        </Row>
    );
}
