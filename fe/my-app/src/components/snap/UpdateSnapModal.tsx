'use client';

import { Modal, Input, InputNumber, Button, Select, Typography } from 'antd';

import { useUpdateSnap } from '@/hooks/useUpdateSnap';
import styles from './UpdateSnapModal.module.css';

import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

import { useTranslations } from 'next-intl';

const { Text } = Typography;

export default function UpdateSnapModal({ open, onClose, snap }: any) {
    if (!snap) return null;

    const t = useTranslations('snap.update');

    const {
        title,
        setTitle,
        amount,
        setAmount,
        category,
        setCategory,
        loading,
        handleUpdate,
        beforeUpload,
        fileList,
    } = useUpdateSnap(snap, onClose);

    return (
        <Modal open={open} onCancel={onClose} footer={null} title={t('title')} destroyOnHidden>
            {/* Upload */}

            <Dragger
                beforeUpload={beforeUpload}
                maxCount={1}
                showUploadList
                className={styles.uploadBox}
                fileList={fileList}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ fontSize: 32 }} />
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
