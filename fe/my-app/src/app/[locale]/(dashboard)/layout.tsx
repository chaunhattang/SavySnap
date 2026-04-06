/** @format */

import HeaderComponent from '@/components/shared/header/HeaderComponent';
import { locales } from '@/locales';
import { App, ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export async function generateStaticParams() {
    return locales.map((l) => ({ locale: l }));
}

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages(); // có messages/vi.json & en.json
    return (
        <NextIntlClientProvider messages={messages}>
            <ConfigProvider
                button={{ className: 'my-button' }}
                checkbox={{ className: 'my-checkbox' }}
                divider={{ className: 'my-divider' }}
            >
                <HeaderComponent />
                <div className="main-container">
                    <div className="container-fluid mt-5">
                        <App>{children}</App>
                    </div>
                </div>
            </ConfigProvider>
        </NextIntlClientProvider>
    );
}
