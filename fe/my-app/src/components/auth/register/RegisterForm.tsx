'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/apis/auth.service';
import styles from './authAnimations.module.css';

export default function RegisterForm({ onViewChange }: { onViewChange: (view: any) => void }) {
    const t = useTranslations('auth.register');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await authService.register(values);
            router.push('/user');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-2xl font-bold text-pink-600">{t('headerText') || 'Đăng ký tài khoản'}</h3>
                <p className="text-gray-500">{t('subHeaderText') || 'Tham gia cùng SavySnap ngay hôm nay'}</p>
            </div>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading} className="bg-pink-600 border-pink-600">
                    Đăng ký
                </Button>
            </Form>
            <p className="text-center">
                Đã có tài khoản? <a href="#" onClick={() => onViewChange('login')} className="text-pink-600 font-bold">Đăng nhập</a>
            </p>
        </div>
    );
}
