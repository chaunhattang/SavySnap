'use client';
import { Card, Button, Popconfirm, Tag } from 'antd';
import { useDeleteSnap } from '@/hooks/useDeleteSnap';
import UpdateSnapModal from './UpdateSnapModal';
import { useState } from 'react';
import dayjs from 'dayjs';
import styles from './SnapCard.module.css';
import { useTranslations } from 'next-intl';
export default function SnapCard({ snap }: any) {
    const [open, setOpen] = useState(false);
    const { handleDelete, loading } = useDeleteSnap();

    const t = useTranslations('snap.update');

    const categoryMap: Record<string, string> = {
        NEED: t('category.need'),
        WANT: t('category.want'),
        SAVING: t('category.saving'),
    };

    return (
        <>
            <Card
                className={styles.card}
                title={
                    <Button type="text" onClick={() => setOpen(true)}>
                        {t('edit')}
                    </Button>
                }
                extra={
                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(snap.id)}>
                        <Button danger type="text" loading={loading}>
                            {t('delete')}
                        </Button>
                    </Popconfirm>
                }
            >
                <div className={styles.containerImg}>
                    {/* IMAGE */}
                    <img src={snap.imageUrl} alt={snap.title} className={styles.img} />

                    {/* BADGE */}
                    <Tag color="orange" className={styles.category}>
                        {categoryMap[snap.category]}
                    </Tag>

                    {/* GRADIENT OVERLAY */}
                    <div className={styles.overlay}>
                        <div className={styles.date}>
                            {dayjs(snap.createdAt).format('YYYY-MM-DD')}
                        </div>

                        <div className={styles.title}>{snap.title}</div>
                    </div>
                </div>
                {/* PRICE */}
                <div className={styles.price}>{Number(snap.amount).toLocaleString()} đ</div>
            </Card>
            <UpdateSnapModal open={open} snap={snap} onClose={() => setOpen(false)} />{' '}
        </>
    );
}
