'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

/**
 * Hook xử lý đăng xuất.
 * Dùng chung ở AdminSidebar và AdminHeader để tránh duplicate code.
 */
export function useLogout() {
    const router = useRouter();

    const logout = () => {
        // Xoá token và role khỏi cookie
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('role', { path: '/' });

        // Chuyển về trang đăng nhập
        router.push('/login');
    };

    return logout;
}
