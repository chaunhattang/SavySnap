'use client';

import { InboxOutlined } from '@ant-design/icons';
import { App, Button, Input, InputNumber, Modal, Select, Typography } from 'antd';

import Dragger from 'antd/es/upload/Dragger';

import styles from './CreateSnapModal.module.css';
import { useSnapCrud } from '@/hooks/useSnapCrud';

import { useTranslations } from 'next-intl';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useState } from 'react';
import { buildFormData } from '@/hooks/useFormData';

const { Text } = Typography;

export default function CreateSnapModal({ open, onClose }: any) {
    const t = useTranslations('snap.create');

    const { create, loading } = useSnapCrud();

    const { file, beforeUpload, resetFile } = useFileUpload();

    const [title, setTitle] = useState('');

    const [amount, setAmount] = useState<number | null>(null);

    const [category, setCategory] = useState('NEED');

    const { message } = App.useApp();

    const handleSubmit = async () => {
        if (!title.trim()) {
            message.error(t('titleRequired'));
            return;
        }

        if (amount === null || amount <= 0) {
            message.error(t('amountInvalid'));
            return;
        }

        if (!file) {
            message.error(t('fileRequired'));
            return;
        }

        if (!Number.isInteger(amount)) {
            message.error(t('amountMustBeInteger'));
            return;
        }

        const formData = buildFormData({
            title,
            amount,
            category,
            description: title,
        });

        formData.append('file', file);

        await create(formData);

        setTitle('');
        setAmount(null);
        setCategory('NEED');
        resetFile();

        message.success(t('submit'));

        onClose?.();
    };
    return (
        <Modal open={open} footer={null} onCancel={onClose} title={`💖 ${t('title')}`} width={420}>
            {/* Upload box */}

            <Dragger
                beforeUpload={beforeUpload}
                maxCount={1}
                showUploadList
                className={styles.uploadBox}
                accept="image/*"
                capture="environment"
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
                        min={0}
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
                color="green"
                type="primary"
                block
                loading={loading}
                onClick={handleSubmit}
                size="large"
                className={styles.submitButton}
            >
                {t('submit')}
            </Button>
        </Modal>
    );
}
