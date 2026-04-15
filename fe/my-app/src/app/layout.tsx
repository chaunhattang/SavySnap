import { App } from 'antd';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
    title: 'SavvySnap',
    description: 'Capture photo and save notes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                    <AntdRegistry>
                        <App>{children}</App>
                    </AntdRegistry>
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
