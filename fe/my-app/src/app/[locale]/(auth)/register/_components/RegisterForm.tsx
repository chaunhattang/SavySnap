'use client';
import React, { useState } from 'react';
import type { CascaderProps, FormItemProps, FormProps, Typography } from 'antd';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
} from 'antd';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'antd/es/select';

interface FormCascaderOption {
    value: string;
    label: string;
    children?: FormCascaderOption[];
}

const formItemLayout: FormProps = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout: FormItemProps = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

interface PhoneValue {
    prefix?: string;
    phone?: string;
}

interface PhoneInputProps {
    id?: string;
    value?: PhoneValue;
    onChange?: (value: PhoneValue) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ id, value = {}, onChange }) => {
    const [prefix, setPrefix] = useState('86');
    const [phone, setPhone] = useState('');

    const triggerChange = (changedValue: PhoneValue) => {
        onChange?.({ ...value, ...changedValue });
    };

    const onPrefixChange = (newPrefix: string) => {
        if (!('prefix' in value)) {
            setPrefix(newPrefix);
        }
        triggerChange({ prefix: newPrefix });
    };

    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        if (!('phone' in value)) {
            setPhone(newPhone);
        }
        triggerChange({ phone: newPhone });
    };

    return (
        <span id={id}>
            <Space.Compact block>
                <Select
                    value={value.prefix || prefix}
                    onChange={onPrefixChange}
                    style={{ width: 70 }}
                    options={[{ label: '+84', value: '84' }]}
                />
                <Input
                    value={value.phone || phone}
                    onChange={onPhoneChange}
                    style={{ width: '100%' }}
                />
            </Space.Compact>
        </span>
    );
};

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const t = useTranslations('auth.register');

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                phone: { prefix: '84' },
                gender: 'male',
            }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label={t('emailLabel')}
                rules={[
                    {
                        type: 'email',
                        message: t('emailInvalid'),
                    },
                    {
                        required: true,
                        message: t('emailRequired'),
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label={t('passwordLabel')}
                rules={[
                    {
                        required: true,
                        message: t('passwordRequired'),
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label={t('confirmPasswordLabel')}
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: t('confirmPasswordRequired'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('confirmPasswordNotMatch')));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="phone"
                label={t('phoneLabel')}
                rules={[{ required: true, message: t('phoneRequired') }]}
            >
                <PhoneInput />
            </Form.Item>

            <Form.Item
                name="gender"
                label={t('genderLabel')}
                rules={[{ required: true, message: t('genderRequired') }]}
            >
                <Select
                    placeholder={t('genderLabel')}
                    options={[
                        { label: t('genderOptions.male'), value: 'male' },
                        { label: t('genderOptions.female'), value: 'female' },
                        { label: t('genderOptions.other'), value: 'other' },
                    ]}
                />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error(t('agreementRequired'))),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>{t('agreement')}</Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    {t('submit')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
