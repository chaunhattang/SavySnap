'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
    Card,
    Col,
    Row,
    Typography,
    Input,
    Select,
    Tag,
    Image,
    Spin,
    Empty,
    Modal,
    Avatar,
    Divider,
    Tooltip,
    Badge,
    Statistic,
} from 'antd';
import {
    SearchOutlined,
    CalendarOutlined,
    UserOutlined,
    DollarOutlined,
    FileTextOutlined,
    PictureOutlined,
    AppstoreOutlined,
    BarsOutlined,
} from '@ant-design/icons';
import { snapService } from '@/services/apis/snap.service';
import { Snap } from '@/types/snap.td';
import styles from './SnapsTab.module.css';

const { Title, Text, Paragraph } = Typography;

// ─── Category config ─────────────────────────────────────────────────
const CATEGORIES: Record<string, { label: string; color: string }> = {
    essential:     { label: 'Thiết yếu',  color: 'blue'    },
    food:          { label: 'Ăn uống',    color: 'orange'  },
    entertainment: { label: 'Giải trí',   color: 'purple'  },
    saving:        { label: 'Tiết kiệm',  color: 'green'   },
    other:         { label: 'Khác',       color: 'default' },
};

function getCat(key: string) {
    return CATEGORIES[key?.toLowerCase()] ?? { label: key, color: 'default' };
}

const formatVND = (n: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

// ─── Main component ───────────────────────────────────────────────────
export default function SnapsTab() {
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState<string>('all');
    const [selected, setSelected] = useState<Snap | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        snapService.getAll()
            .then((data) => setSnaps(Array.isArray(data) ? data : []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // ── Filters ───────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        return snaps.filter((s) => {
            const matchesSearch =
                s.title?.toLowerCase().includes(search.toLowerCase()) ||
                s.description?.toLowerCase().includes(search.toLowerCase());
            const matchesCat = catFilter === 'all' || s.category?.toLowerCase() === catFilter;
            return matchesSearch && matchesCat;
        });
    }, [snaps, search, catFilter]);

    // ── Summary stats ─────────────────────────────────────────────────
    const totalAmount = filtered.reduce((sum, s) => sum + (s.amount || 0), 0);

    return (
        <div>
            {/* ── Page heading ── */}
            <div className={styles.header}>
                <div>
                    <Title level={3} className={styles.title}>Thư viện Snaps</Title>
                    <Text type="secondary">Tất cả hình ảnh & giao dịch từ mọi người dùng</Text>
                </div>

                {/* Summary badges */}
                <div className={styles.summaryBadges}>
                    <Card className={styles.statMini}>
                        <Statistic
                            title="Tổng Snap"
                            value={filtered.length}
                            prefix={<PictureOutlined />}
                            valueStyle={{ fontSize: 20, fontWeight: 800, color: '#059669' }}
                        />
                    </Card>
                    <Card className={styles.statMini}>
                        <Statistic
                            title="Tổng chi tiêu"
                            value={formatVND(totalAmount)}
                            valueStyle={{ fontSize: 16, fontWeight: 800, color: '#dc2626' }}
                        />
                    </Card>
                </div>
            </div>

            {/* ── Toolbar ── */}
            <div className={styles.toolbar}>
                <Input
                    prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
                    placeholder="Tìm theo tiêu đề, ghi chú..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                    allowClear
                />

                <Select
                    value={catFilter}
                    onChange={setCatFilter}
                    className={styles.catSelect}
                >
                    <Select.Option value="all">📋 Tất cả danh mục</Select.Option>
                    {Object.entries(CATEGORIES).map(([key, { label }]) => (
                        <Select.Option key={key} value={key}>{label}</Select.Option>
                    ))}
                </Select>

                {/* View toggle */}
                <div className={styles.viewToggle}>
                    <Tooltip title="Dạng lưới">
                        <button
                            className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleActive : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <AppstoreOutlined />
                        </button>
                    </Tooltip>
                    <Tooltip title="Dạng danh sách">
                        <button
                            className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <BarsOutlined />
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* ── Content ── */}
            {loading ? (
                <div className={styles.spinWrapper}>
                    <Spin size="large" />
                </div>
            ) : filtered.length === 0 ? (
                <Empty description="Không tìm thấy Snap nào" style={{ marginTop: 60 }} />
            ) : viewMode === 'grid' ? (
                /* ── GRID VIEW ── */
                <Row gutter={[20, 20]}>
                    {filtered.map((snap) => {
                        const cat = getCat(snap.category);
                        return (
                            <Col key={snap.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                                <Card
                                    className={styles.snapCard}
                                    onClick={() => setSelected(snap)}
                                    cover={
                                        snap.imageUrl ? (
                                            <div className={styles.imgContainer}>
                                                <img
                                                    src={snap.imageUrl}
                                                    alt={snap.title}
                                                    className={styles.snapImg}
                                                />
                                                <div className={styles.imgOverlay}>
                                                    <PictureOutlined style={{ fontSize: 28, color: 'white' }} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.noImg}>
                                                <FileTextOutlined style={{ fontSize: 36, color: '#cbd5e1' }} />
                                            </div>
                                        )
                                    }
                                    styles={{ body: { padding: '12px 14px' } }}
                                >
                                    <div className={styles.cardMeta}>
                                        <Tag color={cat.color} style={{ borderRadius: 6, fontSize: 11, marginBottom: 6 }}>
                                            {cat.label}
                                        </Tag>
                                        <Text strong className={styles.cardTitle} ellipsis>
                                            {snap.title || 'Không có tiêu đề'}
                                        </Text>
                                        <Text className={styles.cardAmount}>
                                            {formatVND(snap.amount || 0)}
                                        </Text>
                                        <Text type="secondary" className={styles.cardDate}>
                                            <CalendarOutlined style={{ marginRight: 4 }} />
                                            {snap.createdAt
                                                ? new Date(snap.createdAt).toLocaleDateString('vi-VN')
                                                : '—'}
                                        </Text>
                                    </div>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                /* ── LIST VIEW ── */
                <div className={styles.listWrapper}>
                    {filtered.map((snap) => {
                        const cat = getCat(snap.category);
                        return (
                            <div
                                key={snap.id}
                                className={styles.listRow}
                                onClick={() => setSelected(snap)}
                            >
                                {/* Thumbnail */}
                                <div className={styles.listThumb}>
                                    {snap.imageUrl ? (
                                        <img src={snap.imageUrl} alt={snap.title} className={styles.listThumbImg} />
                                    ) : (
                                        <div className={styles.listThumbEmpty}>
                                            <FileTextOutlined style={{ color: '#94a3b8' }} />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className={styles.listInfo}>
                                    <Text strong>{snap.title || 'Không có tiêu đề'}</Text>
                                    <Text type="secondary" style={{ fontSize: 12 }} ellipsis>
                                        {snap.description || '—'}
                                    </Text>
                                </div>

                                <Tag color={cat.color} style={{ borderRadius: 6 }}>{cat.label}</Tag>

                                <Text strong style={{ color: '#dc2626', minWidth: 110, textAlign: 'right' }}>
                                    {formatVND(snap.amount || 0)}
                                </Text>

                                <Text type="secondary" style={{ fontSize: 12, minWidth: 90, textAlign: 'right' }}>
                                    {snap.createdAt ? new Date(snap.createdAt).toLocaleDateString('vi-VN') : '—'}
                                </Text>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Detail Modal ── */}
            <Modal
                open={!!selected}
                onCancel={() => setSelected(null)}
                footer={null}
                width={560}
                centered
                styles={{ body: { padding: 0 } }}
            >
                {selected && (
                    <div className={styles.modalBody}>
                        {/* Image */}
                        {selected.imageUrl ? (
                            <div className={styles.modalImgWrap}>
                                <Image
                                    src={selected.imageUrl}
                                    alt={selected.title}
                                    style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
                                    preview={{ mask: 'Xem ảnh đầy đủ' }}
                                />
                            </div>
                        ) : (
                            <div className={styles.modalNoImg}>
                                <FileTextOutlined style={{ fontSize: 48, color: '#cbd5e1' }} />
                                <Text type="secondary">Không có ảnh đính kèm</Text>
                            </div>
                        )}

                        {/* Content */}
                        <div className={styles.modalContent}>
                            {/* Category tag */}
                            <Tag
                                color={getCat(selected.category).color}
                                style={{ borderRadius: 8, marginBottom: 8 }}
                            >
                                {getCat(selected.category).label}
                            </Tag>

                            <Title level={4} style={{ margin: '0 0 4px' }}>
                                {selected.title || 'Không có tiêu đề'}
                            </Title>

                            <Divider style={{ margin: '16px 0' }} />

                            {/* Details grid */}
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <div className={styles.detailItem}>
                                        <DollarOutlined className={styles.detailIcon} />
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>Số tiền</Text>
                                            <Text strong style={{ fontSize: 18, color: '#dc2626' }}>
                                                {formatVND(selected.amount || 0)}
                                            </Text>
                                        </div>
                                    </div>
                                </Col>

                                <Col span={12}>
                                    <div className={styles.detailItem}>
                                        <CalendarOutlined className={styles.detailIcon} />
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>Ngày tạo</Text>
                                            <Text strong>
                                                {selected.createdAt
                                                    ? new Date(selected.createdAt).toLocaleString('vi-VN')
                                                    : '—'}
                                            </Text>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {selected.description && (
                                <div className={styles.descBox}>
                                    <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 6 }}>
                                        GHI CHÚ
                                    </Text>
                                    <Paragraph style={{ margin: 0 }}>{selected.description}</Paragraph>
                                </div>
                            )}

                            <div className={styles.idBox}>
                                <Text type="secondary" style={{ fontSize: 11 }}>ID: {selected.id}</Text>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
