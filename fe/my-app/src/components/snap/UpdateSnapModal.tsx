'use client';

import { Modal, Input, InputNumber, Button, Select } from 'antd';
import { useUpdateSnap } from '@/lib/hook/useUpdateSnap';
import styles from './UpdateSnapModal.module.css';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

export default function UpdateSnapModal({ open, onClose, snap }: any) {
    if (!snap) return null;

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
        <Modal open={open} onCancel={onClose} footer={null} title="Cập nhật Snap" destroyOnHidden>
            {/* Upload box */}
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

                <p style={{ fontWeight: 500 }}>Tải ảnh hóa đơn hoặc món đồ</p>

                <p style={{ fontSize: 12, color: '#999' }}>JPG, PNG LÊN ĐẾN 5MB</p>
            </Dragger>

            {/* Title */}
            <div className={styles.section}>
                <label className={styles.label}>TIÊU ĐỀ GHI CHÚ</label>

                <Input
                    placeholder="VD: Cà phê sáng, Giày mới..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="large"
                    style={{ marginTop: 6 }}
                />
            </div>

            {/* Amount + Category */}
            <div className={styles.grid}>
                <div>
                    <label className={styles.label}>$ SỐ TIỀN</label>

                    <InputNumber
                        className={styles.inputNumber}
                        placeholder="Số tiền..."
                        value={amount}
                        onChange={(v) => setAmount(v)}
                        size="large"
                    />
                </div>

                <div>
                    <label className={styles.label}>DANH MỤC</label>

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
                                value: 'Thiết yếu',
                                label: 'Thiết yếu',
                            },
                            {
                                value: 'Ăn uống',
                                label: 'Ăn uống',
                            },
                            {
                                value: 'Giải trí',
                                label: 'Giải trí',
                            },
                            {
                                value: 'Mua sắm',
                                label: 'Mua sắm',
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
                Cập nhật Snap
            </Button>
        </Modal>
    );
}
