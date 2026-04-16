'use client';
import React, { useState } from 'react';
import { Form, Input, Button, App } from 'antd';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/apis/auth.service';
import styles from './authAnimations.module.css';

export default function RegisterForm({ onViewChange }: { onViewChange: (view: any) => void }) {
    const t = useTranslations('auth.register');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { message } = App.useApp();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await authService.register(values);
            //router.push('/login');
            message.success(t('sucess'));
            onViewChange('login');
        } catch (error) {
            console.error('Registration error:', error);
            message.error(t('fail'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto relative z-20">
            <h3 className="text-3xl font-black text-pink-600 mb-2">{t('welcomeTitle')}</h3>
            <p className="text-pink-500/70 font-bold text-sm uppercase tracking-widest mb-8">
                {t('welcomeSubtitle')}
            </p>
            <Form layout="vertical" onFinish={onFinish} requiredMark={false} className="space-y-4">
                <Form.Item
                    label={
                        <span className="block text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                            {t('usernameLabel')}
                        </span>
                    }
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: (
                                <span className="text-pink-500 font-bold">
                                    {t('usernameRequired')}
                                </span>
                            ),
                        },
                    ]}
                >
                    <Input
                        prefix={<User className="text-pink-400 mr-2" size={22} />}
                        placeholder={t('usernamePlaceholder')}
                        className="py-3.5 cute-input rounded-3xl text-lg"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <span className="block text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                            {t('emailLabel')}
                        </span>
                    }
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: (
                                <span className="text-pink-500 font-bold">
                                    {t('emailRequired')}
                                </span>
                            ),
                        },
                        {
                            type: 'email',
                            message: (
                                <span className="text-pink-500 font-bold">{t('emailInvalid')}</span>
                            ),
                        },
                    ]}
                >
                    <Input
                        prefix={<Mail className="text-pink-400 mr-2" size={22} />}
                        placeholder={t('emailPlaceholder')}
                        className="py-3.5 cute-input rounded-3xl text-lg"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <span className="block text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                            {t('passwordLabel')}
                        </span>
                    }
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: (
                                <span className="text-pink-500 font-bold">
                                    {t('passwordRequired')}
                                </span>
                            ),
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<Lock className="text-pink-400 mr-2" size={22} />}
                        placeholder={t('passwordPlaceholder')}
                        className="py-3.5 cute-input rounded-3xl text-lg"
                        iconRender={(visible) =>
                            visible ? (
                                <Eye className="text-pink-400" size={22} />
                            ) : (
                                <EyeOff className="text-pink-400" size={22} />
                            )
                        }
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                    <Button
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-auto py-3.5 mt-2 btn-pink rounded-3xl font-black text-xl flex items-center justify-center gap-3 group border-0 text-white shadow-[0_6px_15px_rgba(244,114,182,0.3)] transition-transform hover:-translate-y-1"
                    >
                        {t('submit')}{' '}
                        {!loading && (
                            <ArrowRight
                                size={22}
                                className="group-hover:translate-x-2 transition-transform"
                            />
                        )}
                    </Button>
                </Form.Item>
            </Form>

            <div className="mt-8 text-center text-pink-600/80 font-bold">
                {t('hasAccount')}
                <button
                    onClick={() => onViewChange('login')}
                    className="ml-2 font-black text-pink-500 hover:text-pink-600 underline decoration-2 underline-offset-4 cursor-pointer focus:outline-none"
                >
                    {t('loginBtn')}
                </button>
            </div>

            {/* --- OLD CODE COMMENTED OUT FOR REFERENCE ---
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-pink-600">{t('headerText') || 'Đăng ký tài khoản'}</h3>
                    <p className="text-gray-500">{t('subHeaderText') || 'Tham gia cùng SavySnap ngay hôm nay'}</p>
                </div>
                ...
            </div>
            */}
        </div>
    );
}
