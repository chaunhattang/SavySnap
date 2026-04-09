'use client';

import { useState } from 'react';
import styles from './styles.module.css';

import { SearchOutlined } from '@ant-design/icons';

import { Button, Input, Layout } from 'antd';
import CreateSnapModal from '@/components/snap/CreateSnapModal';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslations } from 'next-intl';

const { Header } = Layout;

export default function HeaderBar() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('headerBar');

    return (
        <Header className={styles.headerCotainer}>
            {/* LEFT */}
            <div className={styles.logoText}>
                <span className={styles.brand}>SavySnap</span>
            </div>

            {/* RIGHT */}
            <div className={styles.actions}>
                <LanguageSwitcher />
                <Input
                    className={styles.search}
                    placeholder={t('placeholder')}
                    prefix={<SearchOutlined />}
                    allowClear
                />

                <Button
                    type="primary"
                    size="large"
                    className={styles.addButton}
                    onClick={() => setOpen(true)}
                >
                    {t('addNew')}
                </Button>
                <CreateSnapModal open={open} onClose={() => setOpen(false)} />
            </div>
        </Header>
    );
}
