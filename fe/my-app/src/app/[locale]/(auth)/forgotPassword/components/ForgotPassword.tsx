'use client';
import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import authStyles from '@/components/auth/register/authAnimations.module.css';
import { useTranslations } from 'next-intl';

interface ForgotPasswordProps {
    onViewChange: (view: 'login' | 'register' | 'forgot-password') => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onViewChange }) => {
    const t = useTranslations('auth.forgotPassword');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            console.log('Success:', values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            notification.success({
                message: 'Thành công',
                description: 'Đã gửi liên kết khôi phục mật khẩu đến email của bạn.'
            });
            onViewChange('login');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-8 w-full max-w-md mx-auto">
                <h3 className={`text-3xl font-black ${authStyles.textPrimary} mb-2 flex items-center gap-2`}>Tìm lại khóa 🗝️</h3>
                <p className={`${authStyles.textSecondary} font-bold text-sm uppercase tracking-widest`}>Nhập email để nhận hướng dẫn</p>
            </div>

            <Form name="forgotPassword" layout="vertical" onFinish={onFinish} requiredMark={false} className="space-y-4">
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: t('emailRequired') },
                        { type: 'email', message: t('emailInvalid') },
                    ]}
                    style={{ marginBottom: '1rem' }}
                >
                    <div className="relative">
                        <label className={`block text-xs font-black uppercase tracking-[0.1em] ${authStyles.textSecondary} mb-2 ml-2 text-left`}>
                            Email tinh tú
                        </label>
                        <Input
                            prefix={<Mail className={`text-primary opacity-60 mr-2 ${authStyles.textPrimary}`} size={20} />}
                            placeholder="email@moonlight.com"
                            variant="filled"
                            className={`w-full py-3 ${authStyles.glassInput} rounded-2xl text-lg`}
                        />
                    </div>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        className={`w-full py-6 mt-2 ${authStyles.btnPrimary} rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all group`}
                    >
                        Gửi chìa khóa
                        {!loading && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                    </Button>
                </Form.Item>
            </Form>

            <div className="w-full max-w-md mx-auto mt-8">
               <div className={`mt-8 text-center ${authStyles.textSecondary} font-bold flex items-center justify-center gap-2`}>
                   <button onClick={() => onViewChange('login')} className={`flex items-center gap-1 font-black ${authStyles.textPrimary} hover:underline decoration-2 underline-offset-4 transition-all`}>
                       <ArrowLeft size={16} /> Nhớ ra rồi? Trở về nhà
                   </button>
               </div>
           </div>
        </div>
    );
};

export default ForgotPassword;
