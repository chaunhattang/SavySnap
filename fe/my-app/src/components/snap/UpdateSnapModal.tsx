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
