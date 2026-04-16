'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, Heart, Stars, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import LoginForm from '../login/LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPassword from '@/app/[locale]/(auth)/forgotPassword/components/ForgotPassword';
import PetSquad from './PetSquad';

interface Petal {
    id: number;
    left: string;
    animationDuration: string;
    animationDelay: string;
    width: string;
    height: string;
    rotate: number;
    zIndex: number;
    filter: string;
    opacity: number;
}

interface UnifiedAuthContainerProps {
    defaultView: 'login' | 'register' | 'forgot-password';
}

export default function UnifiedAuthContainer({ defaultView }: UnifiedAuthContainerProps) {
    const tLogin = useTranslations('auth.login');
    const tRegister = useTranslations('auth.register');
    const [view, setView] = useState<'login' | 'register' | 'forgot-password'>(defaultView);
    const [petals, setPetals] = useState<Petal[]>([]);
    const router = useRouter();

    useEffect(() => {
        const generatedPetals = Array.from({ length: 25 }).map((_, i) => {
            const depth = Math.random();
            const zIndex = depth > 0.85 ? 100 : depth > 0.3 ? 5 : 0;
            return {
                id: i,
                left: `${Math.random() * 100}%`,
                animationDuration: `${(Math.random() * 6 + 6) / (depth > 0.85 ? 2 : depth > 0.3 ? 1 : 0.6)}s`,
                animationDelay: `-${Math.random() * 5}s`,
                width: `${(Math.random() * 10 + 8) * (depth > 0.85 ? 2.5 : depth > 0.3 ? 1 : 0.6)}px`,
                height: `${(Math.random() * 10 + 8) * (depth > 0.85 ? 2.5 : depth > 0.3 ? 1 : 0.6)}px`,
                rotate: Math.random() * 360,
                zIndex,
                filter: depth > 0.85 ? 'blur(4px)' : depth < 0.3 ? 'blur(1px)' : 'drop-shadow(0 2px 4px rgba(255,182,193,0.4))',
                opacity: depth > 0.85 ? 0.9 : depth < 0.3 ? 0.5 : 0.8
            };
        });
        setPetals(generatedPetals);
    }, []);

    const handleViewChange = (newView: 'login' | 'register' | 'forgot-password') => {
        setView(newView);
        window.history.pushState(null, '', `/${newView === 'forgot-password' ? 'forgotPassword' : newView}`);
    };

    return (
        <div className="font-sans text-slate-800 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-artistic">
            {/* Hiệu ứng Nền Của Bạn Cung Cấp */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
                <Stars size={40} className="absolute top-[10%] left-[10%] text-pink-300 animate-pulse" />
                <Heart size={30} className="absolute bottom-[20%] right-[10%] text-pink-400 animate-bounce" fill="currentColor" />
                {petals.map((petal) => (
                    <div
                        key={petal.id}
                        className="petal"
                        style={{
                            left: petal.left,
                            width: petal.width,
                            height: petal.height,
                            animation: `fall ${petal.animationDuration} linear infinite`,
                            animationDelay: petal.animationDelay,
                            transform: `rotate(${petal.rotate}deg)`,
                            zIndex: petal.zIndex,
                            filter: petal.filter,
                            opacity: petal.opacity,
                            // @ts-ignore
                            '--target-opacity': petal.opacity,
                        }}
                    />
                ))}
            </div>

            {/* Khung Auth Chính Của Bạn Cung Cấp */}
            <div className="relative z-10 w-full max-w-5xl md:h-[650px] glass-panel rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-700">
                
                {/* 📱 MOBILE ONLY */}
                <div className="md:hidden flex flex-col w-full h-full p-4 sm:p-8 space-y-4 overflow-y-auto">
                    <div className="flex flex-col items-center text-center mt-2">
                        <div className="bg-white/80 px-4 py-2 rounded-2xl shadow-sm mb-4 flex items-center justify-center border border-white gap-3">
                            <span className="text-2xl font-black text-pink-600 drop-shadow-sm">{tLogin('brandName')}</span>
                            <PetSquad isClosed={false} />
                        </div>
                        <h2 className="text-3xl font-black text-pink-600 drop-shadow-sm mb-2">
                            {view === 'login' && tLogin('artTitle')}
                            {view === 'register' && tRegister('artTitle')}
                            {view === 'forgot-password' && 'Quên mật khẩu?'}
                        </h2>
                        <p className="text-pink-500/80 font-bold text-sm">Quản lý tài chính siêu dễ thương</p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white relative z-20">
                        {view === 'forgot-password' ? (
                            <ForgotPassword onViewChange={() => handleViewChange('login')} />
                        ) : view === 'login' ? (
                            <LoginForm onViewChange={handleViewChange} />
                        ) : (
                            <RegisterForm onViewChange={handleViewChange} />
                        )}
                    </div>
                </div>

                {/* 💻 DESKTOP ONLY: Cửa trượt ma thuật */}
                <div className="hidden md:flex relative w-full h-full">
                    <div 
                        className={`absolute top-0 w-5/12 h-full z-50 transition-transform duration-1000 ease-in-out rounded-3xl overflow-hidden overflow-hidden ${view === 'register' ? 'translate-x-[140%]' : 'translate-x-0'}`} 
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,230,240,0.6) 100%)', 
                            backdropFilter: 'blur(30px)', 
                            border: '1px solid rgba(255,255,255,0.9)', 
                            boxShadow: '0 0 40px rgba(255,182,193,0.3)'
                        }}
                    >
                        <div className={`absolute inset-0 p-10 flex flex-col justify-center items-center text-center transition-opacity duration-500 ${(view === 'login') ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                            <div className="bg-white/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl shadow-sm border border-white w-fit flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                                <Camera size={28} className="text-pink-500" />
                                <span className="text-3xl tracking-widest text-pink-500 font-black uppercase drop-shadow-sm mr-1">{tLogin('brandName')}</span>
                                <PetSquad isClosed={false} />
                            </div>
                            <h2 className="text-5xl font-black text-pink-500 drop-shadow-sm mb-6 leading-[1.4]" dangerouslySetInnerHTML={{__html: tLogin('artTitle').replace(' ', '<br/>')}}></h2>
                            <p className="text-pink-800/80 font-bold text-lg mb-10">{tLogin('artSubtitle')}</p>
                            <div className="p-5 bg-white/50 rounded-2xl border border-white shadow-sm text-pink-900/80 font-bold italic text-sm w-full">
                                <Sparkles size={20} className="mb-2 text-pink-500 mx-auto" />"{tLogin('artQuote')}"
                            </div>
                        </div>

                        <div className={`absolute inset-0 p-10 flex flex-col justify-center items-center text-center transition-opacity duration-500 ${(view === 'register' || view === 'forgot-password') ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                            <div className="bg-white/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl shadow-sm border border-white w-fit flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                                <Leaf size={28} className="text-pink-500" />
                                <span className="text-3xl tracking-widest text-pink-500 font-black uppercase drop-shadow-sm mr-1">{tRegister('brandName')}</span>
                                <PetSquad isClosed={false} />
                            </div>
                            <h2 className="text-5xl font-black text-pink-500 drop-shadow-sm mb-6 leading-[1.4]" dangerouslySetInnerHTML={{__html: tRegister('artTitle').replace(' ', '<br/>')}}></h2>
                            <p className="text-pink-800/80 font-bold text-lg mb-10">{tRegister('artSubtitle')}</p>
                            <div className="p-5 bg-white/50 rounded-2xl border border-white shadow-sm text-pink-900/80 font-bold italic text-sm w-full">
                                <Heart size={20} className="mb-2 text-pink-500 mx-auto" />"{tRegister('artQuote')}"
                            </div>
                        </div>
                    </div>

                    {/* Form Đăng ký (Trái) */}
                    <div className={`absolute left-0 w-7/12 h-full flex flex-col justify-center p-16 transition-all duration-700 pointer-events-auto ${view === 'register' ? 'opacity-100 z-20 translate-x-0' : 'opacity-0 z-0 -translate-x-10 pointer-events-none'}`}>
                        <div className="max-w-md w-full mx-auto">
                            <RegisterForm onViewChange={handleViewChange} />
                        </div>
                    </div>

                    {/* Form Đăng Nhập / Quên Mật Khẩu (Phải) */}
                    <div className={`absolute right-0 w-7/12 h-full flex flex-col justify-center p-16 transition-all duration-700 pointer-events-auto ${(view === 'login' || view === 'forgot-password') ? 'opacity-100 z-20 translate-x-0' : 'opacity-0 z-0 translate-x-10 pointer-events-none'}`}>
                        <div className="max-w-md w-full mx-auto">
                            {view === 'forgot-password' ? (
                                <ForgotPassword onViewChange={() => handleViewChange('login')} />
                            ) : (
                                <LoginForm onViewChange={handleViewChange} />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

/*
 =========================================================================
 OLD COMPONENT CODE (COMMENTED OUT TO PRESERVE FOR ROLLBACK)
 =========================================================================
 
import styles from './authAnimations.module.css';

export function OldUnifiedAuthContainer({ defaultView }: UnifiedAuthContainerProps) {
    ... (Nội dung cũ của file đã bị loại bỏ để ưu tiên giao diện Tailwind Glassmorphism mới. Xem lại từ git header nếu cần).
}
*/
