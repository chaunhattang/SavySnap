'use client';

import React from 'react';
import { App, ConfigProvider } from 'antd';

interface AntdProviderProps {
    children: React.ReactNode;
}

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
    return (
        <ConfigProvider>
            <App>
                {children}
            </App>
        </ConfigProvider>
    );
};

export default AntdProvider;
