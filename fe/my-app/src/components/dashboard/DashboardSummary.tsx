'use client';

import { Row, Col, Card } from 'antd';
import { useSnaps } from '@/lib/hook/useSnaps';
import { useMemo } from 'react';
export default function DashboardSummary() {
    const { snaps } = useSnaps();
    const totalExpense = snaps.reduce(
        (sum, snap) => sum + (snap.amount ? Number(snap.amount) : 0),
        0
    );
    return (
        <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={16}>
                <Card
                    style={{
                        background: 'linear-gradient(135deg, #0f172a, #065f46)',
                        color: 'white',
                        borderRadius: 20,
                    }}
                >
                    <div>Tổng chi tiêu</div>

                    <h1>{totalExpense.toLocaleString()} đ</h1>
                </Card>
            </Col>

            <Col span={8}>
                <Card
                    style={{
                        borderRadius: 20,
                    }}
                >
                    <div>Chi tiêu</div>

                    <h2>5.050.000 đ</h2>
                </Card>
            </Col>
        </Row>
    );
}
