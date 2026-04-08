'use client';

import { Segmented } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const changeLanguage = (value: string) => {
        const segments = pathname.split('/');

        segments[1] = value;

        const newPath = segments.join('/');

        router.push(newPath);
    };

    return (
        <Segmented
            value={locale}
            onChange={(value) => changeLanguage(value as string)}
            options={[
                {
                    label: '🇻🇳 VI',
                    value: 'vi',
                },
                {
                    label: '🇺🇸 EN',
                    value: 'en',
                },
            ]}
        />
    );
}
