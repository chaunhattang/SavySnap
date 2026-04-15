'use client';

import { useState } from 'react';
import styles from './styles.module.css';

import { SearchOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';

import { Button, Input, Layout, Grid } from 'antd';
import CreateSnapModal from '@/components/snap/CreateSnapModal';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useSnapCrud } from '@/hooks/useSnapCrud';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface Props {
    setCollapsed: (v: boolean) => void;
}

export default function HeaderBar({ setCollapsed }: Props) {
    const [open, setOpen] = useState(false);

    const screens = useBreakpoint();

    const isMobile = !screens.md;

    const setSearch = useSnapCrud((s) => s.setSearch);

    const t = useTranslations('headerBar');

    return (
        <Header className={styles.headerContainer}>
            {/* LEFT */}

            <div className={styles.leftSection}>
                <span className={styles.brand}>SavySnap</span>
            </div>

            {/* RIGHT */}

            <div className={styles.actions}>
                <LanguageSwitcher />

                {!isMobile && (
                    <Input
                        className={styles.search}
                        placeholder={t('placeholder')}
                        prefix={<SearchOutlined />}
                        allowClear
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}

                <Button
                    type="primary"
                    icon={isMobile ? <PlusOutlined /> : undefined}
                    size={isMobile ? 'middle' : 'large'}
                    className={styles.addButton}
                    onClick={() => setOpen(true)}
                >
                    {isMobile ? '' : t('addNew')}
                </Button>

                <CreateSnapModal open={open} onClose={() => setOpen(false)} />
            </div>
        </Header>
    );
}
