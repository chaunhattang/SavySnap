<<<<<<< Updated upstream
import "./globals.css";
=======
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { AntdRegistry } from '@ant-design/nextjs-registry';
>>>>>>> Stashed changes

export const metadata = {
    title: 'SavvySnap',
    description: 'Capture photo and save notes',
};

<<<<<<< Updated upstream
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
=======
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <AntdRegistry>{children}</AntdRegistry>
                </NextIntlClientProvider>
            </body>
        </html>
    );
>>>>>>> Stashed changes
}
