import { App } from 'antd';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata = {
    title: 'SavvySnap',
    description: 'Capture photo and save notes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <AntdRegistry>
                    <App>{children}</App>
                </AntdRegistry>
            </body>
        </html>
    );
}
