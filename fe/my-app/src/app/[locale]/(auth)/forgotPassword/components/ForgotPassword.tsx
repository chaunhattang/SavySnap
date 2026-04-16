'use client';
import React, { useState } from 'react';
import { Form, Input, Button, notification, Typography } from 'antd';
import { Mail, ArrowRight, ArrowLeft, KeyRound, Lock } from 'lucide-react';
import authStyles from '@/components/auth/register/authAnimations.module.css';
import { useTranslations } from 'next-intl';

interface ForgotPasswordProps {
    onViewChange: (view: 'login' | 'register' | 'forgot-password') => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onViewChange }) => {
    const t = useTranslations('auth.forgotPassword');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3>(1);
    
    // States for payloads
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');

    const handleSendEmail = async (values: any) => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: values.email })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to send OTP');
            }
            
            setEmail(values.email);
            notification.success({
                message: 'Thành công',
                description: 'Mã OTP đã được gửi đến email của bạn.'
            });
            setStep(2);
        } catch (error: any) {
            notification.error({
                message: 'Lỗi',
                description: error.message || 'Không thể gửi email. Vui lòng kiểm tra lại.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (values: any) => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: values.otp })
            });
            
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Invalid OTP. Please try again.');
            }

            const data = await res.json();
            
            const token = data?.result?.resetToken || data?.resetToken || data?.token;
            if (!token) throw new Error('No reset token received from server');
            
            setResetToken(token);
            notification.success({
                message: 'Xác thực thành công',
                description: 'Vui lòng nhập mật khẩu mới.'
            });
            setStep(3);
        } catch (error: any) {
            notification.error({
                message: 'Lỗi xác thực',
                description: error.message || 'Mã OTP không hợp lệ hoặc đã hết hạn.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (values: any) => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resetToken, newPasswords: values.newPasswords })
            });
            
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to change password');
            }
            
            notification.success({
                message: 'Thành công',
                description: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại!'
            });
            onViewChange('login');
        } catch (error: any) {
            notification.error({
                message: 'Lỗi đổi mật khẩu',
                description: error.message || 'Thao tác thất bại.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => (prev - 1) as 1 | 2);
        } else {
            onViewChange('login');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative z-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-8 w-full max-w-md mx-auto">
                <h3 className={`text-3xl font-black text-pink-600 mb-2 flex items-center gap-2`}>
                    {step === 1 ? t('headerText') : step === 2 ? 'Xác thực OTP' : 'Mật khẩu mới'}
                </h3>
                <p className={`text-pink-500/70 font-bold text-sm uppercase tracking-widest`}>
                    {step === 1 ? t('subHeaderText') : step === 2 ? 'Nhập mã 6 chữ số gửi qua email' : 'Bảo vệ tài khoản của bạn'}
                </p>
            </div>

            {step === 1 && (
                <Form layout="vertical" onFinish={handleSendEmail} requiredMark={false} className="space-y-4">
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: <Typography.Text className="text-pink-600 font-bold">{t('emailRequired')}</Typography.Text> },
                            { type: 'email', message: <Typography.Text className="text-pink-600 font-bold">{t('emailInvalid')}</Typography.Text> },
                        ]}
                    >
                        <div className="relative">
                            <label className={`block text-xs font-black uppercase tracking-[0.1em] text-pink-800 flex mb-2 ml-2 text-left`}>
                                {t('emailLabel')}
                            </label>
                            <Input
                                prefix={<Mail className={`text-pink-500 mr-2`} size={22} />}
                                placeholder="email@moonlight.com"
                                className={`w-full py-5 cute-input rounded-3xl text-lg bg-white/90`}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className={`w-full h-auto py-3.5 mt-2 btn-pink rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 group border-0 text-white shadow-[0_6px_15px_rgba(244,114,182,0.3)]`}
                        >
                            Gửi OTP {!loading && <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />}
                        </Button>
                    </Form.Item>
                </Form>
            )}

            {step === 2 && (
                <Form layout="vertical" onFinish={handleVerifyOtp} requiredMark={false} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Form.Item
                        name="otp"
                        rules={[{ required: true, message: <Typography.Text className="text-pink-600 font-bold">Vui lòng nhập OTP</Typography.Text> }]}
                    >
                        <div className="relative">
                            <label className={`block text-xs font-black uppercase tracking-[0.1em] text-pink-800 flex mb-2 ml-2 text-left`}>
                                Mã OTP
                            </label>
                            <Input
                                prefix={<KeyRound className={`text-pink-500 mr-2`} size={22} />}
                                placeholder="123456"
                                className={`w-full py-5 cute-input rounded-3xl text-lg bg-white/90`}
                                maxLength={6}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className={`w-full h-auto py-3.5 mt-2 btn-pink rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 group border-0 text-white shadow-[0_6px_15px_rgba(244,114,182,0.3)]`}
                        >
                            Xác thực {!loading && <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />}
                        </Button>
                    </Form.Item>
                </Form>
            )}

            {step === 3 && (
                <Form layout="vertical" onFinish={handleChangePassword} requiredMark={false} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Form.Item
                        name="newPasswords"
                        rules={[{ required: true, message: <Typography.Text className="text-pink-600 font-bold">Vui lòng nhập mật khẩu mới</Typography.Text> }]}
                    >
                        <div className="relative">
                            <label className={`block text-xs font-black uppercase tracking-[0.1em] text-pink-800 flex mb-2 ml-2 text-left`}>
                                Mật khẩu mới
                            </label>
                            <Input.Password
                                prefix={<Lock className={`text-pink-500 mr-2`} size={22} />}
                                placeholder="Mật khẩu mới..."
                                className={`w-full py-5 cute-input rounded-3xl text-lg bg-white/90`}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className={`w-full h-auto py-3.5 mt-2 btn-pink rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 group border-0 text-white shadow-[0_6px_15px_rgba(244,114,182,0.3)]`}
                        >
                            Cập nhật {!loading && <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />}
                        </Button>
                    </Form.Item>
                </Form>
            )}

            <div className="w-full max-w-md mx-auto mt-8">
                <div className={`mt-8 text-center text-pink-500/80 font-bold flex items-center justify-center gap-2`}>
                    <button onClick={handleBack} className={`flex items-center gap-1 font-black text-pink-500 hover:text-pink-600 hover:underline decoration-2 underline-offset-4 transition-all focus:outline-none cursor-pointer`}>
                        <ArrowLeft size={16} /> {step > 1 ? 'Quay lại' : t('backToLogin')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
