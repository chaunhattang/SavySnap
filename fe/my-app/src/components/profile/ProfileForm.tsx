'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Form, Input, Typography, message } from 'antd';
import { Camera, User, Mail, Lock, ArrowLeft, Sparkles, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { userService } from '@/services/apis/user.service';
import { User as UserType } from '@/types/user';

const { Title, Text } = Typography;

export default function ProfileForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<UserType | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (!token) {
            router.push('/login');
            return;
        }

        userService
            .getMyInfo()
            .then((info) => {
                setUser(info);
                setAvatarPreview(info.avatarUrl || null);
                form.setFieldsValue({
                    username: info.username,
                    email: info.email,
                    fullName: info.fullName,
                });
            })
            .catch(() => message.error('Không thể tải thông tin người dùng'));
    }, [form, router]);

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            message.error('Chỉ chấp nhận file ảnh!');
            return;
        }
        if (file.size / 1024 / 1024 > 3) {
            message.error('Ảnh phải nhỏ hơn 3MB!');
            return;
        }
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    // Mật khẩu giờ đây là tùy chọn (optional)
    const onFinish = async (values: {
        oldPassword?: string;
        newPassword?: string;
        fullName: string;
    }) => {
        if (!user?.username) return;

        // Validation tự chế nho nhỏ: Nếu nhập mật khẩu mới mà quên mật khẩu cũ thì nhắc nhở
        if (values.newPassword && !values.oldPassword) {
            message.warning('Vui lòng nhập mật khẩu hiện tại để xác nhận đổi mật khẩu!');
            return;
        }

        setSaving(true);

        try {
            const formData = new FormData();

            // 1. Gửi fullName (Bắt buộc)
            formData.append('fullName', values.fullName);

            // 2. Chỉ gửi mật khẩu nếu người dùng thực sự có nhập
            if (values.newPassword) {
                formData.append('rawPassword', values.newPassword);
            }
            if (values.oldPassword) {
                formData.append('confirmPassword', values.oldPassword);
            }

            // 3. Gửi file ảnh nếu có thay đổi
            if (avatarFile) {
                formData.append('file', avatarFile);
            }
            console.log('FormData to be sent:', {
                fullName: values.fullName,
                newPassword: values.newPassword,
                oldPassword: values.oldPassword,
                avatarFile: avatarFile ? avatarFile.name : '(no change)',
            });

            await userService.updateProfile(user.username, formData);

            message.success('Cập nhật hồ sơ thành công!');

            // Xóa rỗng các ô mật khẩu sau khi lưu thành công để bảo mật
            form.setFieldsValue({ oldPassword: '', newPassword: '' });
            setAvatarFile(null); // Reset file trạng thái

            // Optional: Có thể không cần router.push nếu muốn giữ user ở lại trang chỉnh sửa
            router.push('/user');
        } catch (err: any) {
            console.error('Update Error:', err);
            // Bắt lỗi sai mật khẩu từ backend nếu có
            if (err?.response?.data?.code === 'WRONG_PASSWORD' || err?.response?.status === 400) {
                message.error('Mật khẩu hiện tại không chính xác!');
            } else {
                message.error('Cập nhật thất bại. Vui lòng thử lại sau!');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-artistic p-4 sm:p-8">
            <div className="w-full max-w-4xl bg-white/60 backdrop-blur-2xl border-4 border-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(244,114,182,0.3)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-700">
                {/* ── Khối Banner bên trái ── */}
                <div className="hidden md:flex md:w-80 shrink-0 bg-gradient-to-br from-pink-100 to-pink-200 p-10 flex-col justify-between relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="bg-white/60 p-2.5 rounded-2xl backdrop-blur-md shadow-sm border border-white/50 transform transition-transform group-hover:rotate-12">
                                <Camera size={24} className="text-pink-600" />
                            </div>
                            <span className="text-xl font-black text-pink-600 tracking-tighter">
                                SavySnap
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-pink-600 leading-tight mb-4 drop-shadow-sm">
                            Cá nhân hoá
                            <br />
                            tài khoản.
                        </h2>
                        <p className="text-pink-600 font-bold text-sm leading-relaxed opacity-80">
                            Cập nhật ảnh đại diện, họ tên và mật khẩu để bảo mật tốt nhất cho ví của
                            bạn.
                        </p>
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl" />
                    <Sparkles
                        className="absolute bottom-10 right-10 text-pink-400 opacity-40 animate-pulse"
                        size={48}
                    />
                </div>

                {/* ── Khối Form nhập liệu bên phải ── */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-pink-400 hover:text-pink-600 font-bold mb-8 transition-all hover:-translate-x-1 w-fit"
                    >
                        <ArrowLeft size={18} />
                        <span>Quay lại</span>
                    </button>

                    <h1 className="text-3xl font-black text-pink-600 mb-1 drop-shadow-sm">
                        Chỉnh sửa hồ sơ
                    </h1>
                    <p className="text-pink-400/70 font-bold text-sm mb-10">
                        Nhấn vào ảnh để thay đổi ảnh đại diện
                    </p>

                    {/* Avatar Section */}
                    <div className="flex items-center gap-5 p-5 bg-white/40 rounded-[2rem] border border-white mb-8 group hover:bg-white/60 transition-all shadow-sm">
                        <div
                            className="relative cursor-pointer shrink-0"
                            onClick={handleAvatarClick}
                        >
                            <Avatar
                                size={80}
                                src={avatarPreview}
                                className="border-4 border-white shadow-md bg-pink-100 text-pink-500 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105"
                                icon={!avatarPreview && <User size={40} />}
                            />
                            <div className="absolute inset-0 bg-pink-400/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white border-4 border-white">
                                <Camera size={24} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-pink-600 truncate max-w-[180px]">
                                {user?.username ?? '—'}
                            </span>
                            <span className="text-xs font-bold text-pink-400 italic">
                                {avatarFile ? `📎 ${avatarFile.name}` : 'Tối đa 3 MB • JPG, PNG'}
                            </span>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        className="space-y-1"
                    >
                        {/* FULL NAME */}
                        <Form.Item
                            label={
                                <span className="text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                                    Họ và Tên
                                </span>
                            }
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input
                                prefix={<UserCircle size={20} className="text-pink-300 mr-2" />}
                                className="cute-input rounded-3xl py-3.5 text-lg bg-white/90 focus:ring-pink-400"
                                placeholder="Nhập họ và tên đầy đủ của bạn"
                                variant="borderless"
                            />
                        </Form.Item>

                        {/* Username & Email (Disabled) */}
                        <div className="flex gap-4">
                            <Form.Item
                                className="flex-1"
                                label={
                                    <span className="text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                                        Tên đăng nhập
                                    </span>
                                }
                                name="username"
                            >
                                <Input
                                    prefix={<User size={20} className="text-pink-300 mr-2" />}
                                    className="cute-input rounded-3xl py-3.5 text-lg bg-white/10 border-transparent cursor-not-allowed opacity-60"
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                className="flex-1"
                                label={
                                    <span className="text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                                        Email
                                    </span>
                                }
                                name="email"
                            >
                                <Input
                                    prefix={<Mail size={20} className="text-pink-300 mr-2" />}
                                    className="cute-input rounded-3xl py-3.5 text-lg bg-white/10 border-transparent cursor-not-allowed opacity-60"
                                    disabled
                                />
                            </Form.Item>
                        </div>

                        {/* Thay đổi nhỏ: Hiển thị thêm dòng hướng dẫn bằng cách dùng thuộc tính extra */}
                        {/* Mật khẩu cũ */}
                        <Form.Item
                            label={
                                <span className="text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                                    Mật khẩu hiện tại
                                </span>
                            }
                            name="oldPassword"
                            extra={
                                <span className="text-[10px] text-pink-400/80 ml-4 font-semibold italic">
                                    Chỉ điền nếu bạn muốn thay đổi mật khẩu
                                </span>
                            }
                        >
                            <Input.Password
                                prefix={<Lock size={20} className="text-pink-300 mr-2" />}
                                className="cute-input rounded-3xl py-3.5 text-lg bg-white/90 focus:ring-pink-400"
                                placeholder="Để trống nếu không muốn đổi"
                                variant="borderless"
                            />
                        </Form.Item>

                        {/* Mật khẩu mới */}
                        <Form.Item
                            label={
                                <span className="text-xs font-black uppercase tracking-widest text-pink-600/70 ml-2">
                                    Mật khẩu mới
                                </span>
                            }
                            name="newPassword"
                        >
                            <Input.Password
                                prefix={<Sparkles size={20} className="text-pink-300 mr-2" />}
                                className="cute-input rounded-3xl py-3.5 text-lg bg-white/90 focus:ring-pink-400"
                                placeholder="Để trống nếu không muốn đổi"
                                variant="borderless"
                            />
                        </Form.Item>

                        <Form.Item className="pt-4">
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={saving}
                                className="w-full py-3.5 mt-2 btn-pink rounded-3xl font-black text-lg text-white border-0 shadow-[0_6px_15px_rgba(244,114,182,0.3)] transition-all hover:-translate-y-1 h-auto flex items-center justify-center gap-2"
                            >
                                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
