'use client';
import React from 'react';
import { Select } from 'antd';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
    const t = useTranslations('common');
    
    const handleChange = (value: string) => {
        // Logic to change locale (usually involves router.replace)
        console.log('Language changed to:', value);
    };

    return (
        <Select 
            defaultValue="vi" 
            onChange={handleChange} 
            style={{ width: 120 }}
            variant="filled"
        >
            <Select.Option value="vi">🇻🇳 Tiếng Việt</Select.Option>
            <Select.Option value="en">🇺🇸 English</Select.Option>
        </Select>
    );
}
