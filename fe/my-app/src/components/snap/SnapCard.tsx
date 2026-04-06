'use client';
import { Card, Button, Popconfirm, Tag } from 'antd';
import { useDeleteSnap } from '@/lib/hook/useDeleteSnap';
import UpdateSnapModal from './UpdateSnapModal';
import { useState } from 'react';
import dayjs from 'dayjs';
import styles from './SnapCard.module.css';
export default function SnapCard({ snap }: any) {
    const [open, setOpen] = useState(false);
    const { handleDelete } = useDeleteSnap();

    return (
        <>
            <Card
                className={styles.card}
                title={
                    <Button type="text" onClick={() => setOpen(true)}>
                        Edit
                    </Button>
                }
                extra={
                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(snap.id)}>
                        <Button danger type="text">
                            delete
                        </Button>
                    </Popconfirm>
                }
            >
                <div className={styles.containerImg}>
                    {/* IMAGE */}
                    <img src={snap.image} alt={snap.title} className={styles.img} />

                    {/* BADGE */}
                    <Tag color="orange" className={styles.category}>
                        {snap.category}
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
