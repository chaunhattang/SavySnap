'use client';
import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

const StandaloneForgotPassword = () => {
    const t = useTranslations('auth.forgotPassword');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            console.log('Success:', values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            notification.success({
                message: t('submit'),
                description: t('subHeaderText')
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-rose-100">
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white">
                    <div className="mb-8 text-center">
                        <h3 className="text-3xl font-black text-pink-600 mb-2">{t('headerText')}</h3>
                        <p className="text-pink-500/70 font-bold text-sm">{t('subHeaderText')}</p>
                    </div>

                    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: t('emailRequired') },
                                { type: 'email', message: t('emailInvalid') },
                            ]}
                        >
                            <Input
                                prefix={<Mail className="text-pink-400" size={20} />}
                                placeholder={t('emailPlaceholder')}
                                className="py-3"
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            className="py-6 mt-4 bg-pink-500 hover:bg-pink-600 border-0 rounded-xl font-bold"
                        >
                            {t('submit')}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default StandaloneForgotPassword;