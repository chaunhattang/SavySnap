'use client';

import { InboxOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Modal, Select, Typography } from 'antd';

import Dragger from 'antd/es/upload/Dragger';

import styles from './CreateSnapModal.module.css';
import { useCreateSnap } from '@/hooks/useCreateSnap';

import { useTranslations } from 'next-intl';

const { Text } = Typography;

export default function CreateSnapModal({ open, onClose }: any) {
    const t = useTranslations('snap.create');

    const {
        title,
        setTitle,
        amount,
        setAmount,
        category,
        setCategory,
        loading,
        beforeUpload,
        handleSubmit,
    } = useCreateSnap(onClose);

    return (
        <Modal open={open} footer={null} onCancel={onClose} title={t('title')} width={420}>
            {/* Upload box */}

            <Dragger
                beforeUpload={beforeUpload}
                maxCount={1}
                showUploadList
                className={styles.uploadBox}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ fontSize: 32 }} className={styles.icon} />
                </p>

                <Text strong>{t('uploadTitle')}</Text>

                <br />

                <Text type="secondary" style={{ fontSize: 12 }}>
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
                    style={{ marginTop: 6 }}
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
                        style={{
                            width: '100%',
                            marginTop: 6,
                        }}
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
