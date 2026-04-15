'use client';

import { useState } from 'react';
import { App, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';

interface Options {
    maxSizeMB?: number;
}

export const useFileUpload = (options?: Options) => {
    const { message } = App.useApp();

    const maxSize = options?.maxSizeMB ?? 15;

    const [file, setFile] = useState<RcFile | null>(null);

    const [fileList, setFileList] = useState<any[]>([]);

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith('image/');

        if (!isImage) {
            message.error('Chỉ hỗ trợ file ảnh');
            return Upload.LIST_IGNORE;
        }

        const isLtSize = file.size / 1024 / 1024 < maxSize;

        if (!isLtSize) {
            message.error(`Ảnh phải nhỏ hơn ${maxSize}MB`);

            return Upload.LIST_IGNORE;
        }

        setFile(file);

        setFileList([
            {
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: URL.createObjectURL(file),
            },
        ]);

        return false;
    };

    const resetFile = () => {
        setFile(null);
        setFileList([]);
    };

    return {
        file,
        fileList,
        beforeUpload,
        setFileList,
        resetFile,
    };
};
