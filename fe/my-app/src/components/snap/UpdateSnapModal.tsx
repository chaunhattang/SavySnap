'use client';

import { Modal, Input, InputNumber, Button, Select, Typography, App } from 'antd';

import styles from './UpdateSnapModal.module.css';

import Dragger from 'antd/es/upload/Dragger';

import { InboxOutlined } from '@ant-design/icons';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { useSnapCrud } from '@/hooks/useSnapCrud';

import { useFileUpload } from '@/hooks/useFileUpload';

import { buildFormData } from '@/hooks/useFormData';

const { Text } = Typography;

export default function UpdateSnapModal({ open, onClose, snap }: any) {
    const t = useTranslations('snap.update');

    const { update, loading } = useSnapCrud();

    const { file, fileList, beforeUpload, setFileList, resetFile } = useFileUpload();

    const [title, setTitle] = useState('');

    const [amount, setAmount] = useState<number | null>(null);

    const [category, setCategory] = useState('NEED');

    const { message } = App.useApp();

    // load dữ liệu khi mở modal

    useEffect(() => {
        if (!snap) return;

        setTitle(snap.title ?? '');

        setAmount(snap.amount ?? null);

        setCategory(snap.category ?? 'NEED');

        const currentImageUrl = snap.imageUrl || snap.image;

        if (currentImageUrl) {
            setFileList([
                {
                    uid: '-1',
                    name: 'current-image',
                    status: 'done',
                    url: currentImageUrl,
                },
            ]);
        }
    }, [snap]);

    const handleUpdate = async () => {
        if (!snap?.id) return;

        if (!title || !amount) return;

        const formData = buildFormData({
            title,
            amount,
            category,
            description: title,
        });

        if (file) {
            formData.append('file', file);
        }

        await update(snap.id, formData);

        message.success(t('submit'));

        resetFile();

        onClose?.();
    };

    if (!snap) return null;

    return (
        <Modal open={open} onCancel={onClose} footer={null} title={t('title')} destroyOnHidden>
            {/* Upload */}

            <Dragger
                beforeUpload={beforeUpload}
                maxCount={1}
                showUploadList
                fileList={fileList}
                className={styles.uploadBox}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined className={`${styles.icon} ${styles.largeIcon}`} />
                </p>

                <Text strong>{t('uploadTitle')}</Text>

                <br />

                <Text type="secondary" className={styles.smallHint}>
                    {t('uploadHint')}
                </Text>
            </Dragger>

            {/* Title */}

            <div className={styles.section}>
                <Text className={styles.label}>{t('noteLabel')}</Text>

                <Input
                    placeholder={t('notePlaceholder')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="large"
                    className={styles.inputField}
                />
            </div>

            {/* Amount + Category */}

            <div className={styles.grid}>
                <div>
                    <Text className={styles.label}>{t('amountLabel')}</Text>

                    <InputNumber
                        className={styles.inputNumber}
                        placeholder={t('amountPlaceholder')}
                        value={amount}
                        onChange={(v) => setAmount(v)}
                        size="large"
                    />
                </div>

                <div>
                    <Text className={styles.label}>{t('categoryLabel')}</Text>

                    <Select
                        value={category}
                        onChange={setCategory}
                        size="large"
                        className={styles.selectField}
                        options={[
                            {
                                value: 'NEED',
                                label: t('category.need'),
                            },
                            {
                                value: 'WANT',
                                label: t('category.want'),
                            },
                            {
                                value: 'SAVING',
                                label: t('category.saving'),
                            },
                        ]}
                    />
                </div>
            </div>

            {/* Button */}

            <Button
                type="primary"
                block
                loading={loading}
                onClick={handleUpdate}
                size="large"
                className={styles.submitButton}
            >
                {t('submit')}
            </Button>
        </Modal>
    );
}
