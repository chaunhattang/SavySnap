'use client';

import { useState } from 'react';
import styles from './styles.module.css';

import { SearchOutlined } from '@ant-design/icons';

import { Button, Input, Layout } from 'antd';
import CreateSnapModal from '@/components/snap/CreateSnapModal';

const { Header } = Layout;

export default function HeaderBar() {
    const [open, setOpen] = useState(false);

    return (
        <Header className={styles.headerCotainer}>
            {/* LEFT */}
            <div className={styles.logoText}>
                <span className={styles.brand}>SavySnap</span>

                <span className={styles.subtitle}>DASHBOARD TIẾT KIỆM</span>
            </div>

            {/* RIGHT */}
            <div className={styles.actions}>
                <Input
                    className={styles.search}
                    placeholder="Tìm kiếm ghi chú..."
                    prefix={<SearchOutlined />}
                    allowClear
                />

                <Button
                    type="primary"
                    size="large"
                    className={styles.addButton}
                    onClick={() => setOpen(true)}
                >
                    + Thêm mới
                </Button>
                <CreateSnapModal open={open} onClose={() => setOpen(false)} />
            </div>
        </Header>
    );
}
