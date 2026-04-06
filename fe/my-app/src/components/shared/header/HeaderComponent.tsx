/** @format */
'use client';

import { Select } from 'antd';
import { useLocale } from 'next-intl';
import { useLanguageChange } from '@/hooks';

interface HeaderComponentProps {}

const HeaderComponent: React.FC<HeaderComponentProps> = () => {
    const locale = useLocale();
    const handleLanguageChange = useLanguageChange();

    return (
        <nav className="navbar navbar-expand-lg p-2 navbar-light bg-white fixed-top d-flex justify-content-between">
            <a className="navbar-brand text-muted font-weight-bold" href="#">
                Header
            </a>
            <Select
                value={locale}
                style={{ width: 120 }}
                onChange={handleLanguageChange}
                options={[
                    { value: 'vi', label: 'Tiếng Việt' },
                    { value: 'en', label: 'English' },
                ]}
            />
        </nav>
    );
};

export default HeaderComponent;
