'use client';

import { InboxOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Modal, Select } from 'antd';
import Dragger from 'antd/es/upload/Dragger';

import styles from './CreateSnapModal.module.css';
import { useCreateSnap } from '@/lib/hook/useCreateSnap';

export default function CreateSnapModal({ open, onClose }: any) {
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
        <Modal open={open} footer={null} onCancel={onClose} title="Chụp khoảnh khắc" width={420}>
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
                color="green"
                type="primary"
                block
                loading={loading}
                onClick={handleSubmit}
                size="large"
                className={styles.submitButton}
            >
                Xác nhận lưu Snap
            </Button>
        </Modal>
    );
}
