'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, Heart, Stars, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './authAnimations.module.css';
import { useRouter } from 'next/navigation';

// We will import the refactored forms here later
import LoginForm from '../login/LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPassword from '@/app/[locale]/(auth)/forgotPassword/components/ForgotPassword';

interface Petal {
    id: number;
    left: string;
    animationDuration: string;
    animationDelay: string;
    width: string;
    height: string;
    rotate: number;
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
        // Fix hydration mismatch by generating random variables only on the client
        const generatedPetals = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `-${Math.random() * 5}s`,
            width: `${Math.random() * 10 + 8}px`,
            height: `${Math.random() * 10 + 8}px`,
            rotate: Math.random() * 360,
        }));
        setPetals(generatedPetals);
    }, []);

    // Determine which class to apply for the sliding door
    const currentViewClass = view === 'register' ? styles.viewRegister : styles.viewLogin;

    const handleViewChange = (newView: 'login' | 'register' | 'forgot-password') => {
        setView(newView);
        // Shallow update the URL to maintain Next.js deep linking without a full reload
        window.history.pushState(null, '', `/${newView === 'forgot-password' ? 'forgotPassword' : newView}`);
    };

    return (
        <div className={`min-h-screen ${styles.bgArtistic} relative flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans`}>
            {/* --- NỀN PASTEL VÀ HOA ANH ĐÀO --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`${styles.orb} ${styles.orb1}`}></div>
                <div className={`${styles.orb} ${styles.orb2}`}></div>
                <div className={`${styles.orb} ${styles.orb3}`}></div>
                <Stars size={40} className="absolute top-[15%] left-[8%] text-pink-300 animate-pulse" />
                <Heart size={30} className="absolute bottom-[20%] right-[10%] text-pink-400 animate-bounce" fill="currentColor" />
                {petals.map((petal) => (
                    <div
                        key={petal.id}
                        className={styles.petal}
                        style={{
                            left: petal.left,
                            width: petal.width,
                            height: petal.height,
                            animation: `${styles.fall} ${petal.animationDuration} linear infinite`,
                            animationDelay: petal.animationDelay,
                            transform: `rotate(${petal.rotate}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* --- KHUNG KÍNH CHÍNH --- */}
            <div className={`${styles.glassBase} rounded-[2.5rem] md:rounded-[3rem] relative z-10 w-full max-w-[1050px] shadow-2xl ${currentViewClass}`}>
                
                {/* CÁC THỰC THỂ WOW (BAY LƯỢN NGOÀI KHUNG KÍNH) */}
                <div className={`${styles.animalWrapper} ${styles.catRun}`}>
                    <div style={{ transform: 'scaleX(-1)' }}>
                        <div className={`${styles.catJump} drop-shadow-sm`}>🐈</div>
                    </div>
                </div>

                <div className={`${styles.animalWrapper} ${styles.dogRun}`}>
                    <div style={{ transform: 'scaleX(-1)' }}>
                        <div className={`${styles.dogJump} drop-shadow-sm`}>🐕</div>
                    </div>
                </div>

                <div className={`${styles.animalWrapper} ${styles.rabbitRun}`}>
                    <div style={{ transform: 'scaleX(-1)' }}>
                        <div className={`${styles.rabbitJump} drop-shadow-sm`}>🐇</div>
                    </div>
                </div>

                <div className={`${styles.animalWrapper} ${styles.turtleRun}`}>
                    <div style={{ transform: 'scaleX(-1)' }}>
                        <div className={`${styles.turtleJump} drop-shadow-sm`}>🐢</div>
                    </div>
                </div>

                {/* LỚP CẮT TRONG SUỐT CHO CỬA TRƯỢT KÍNH */}
                <div className="relative w-full min-h-[650px] flex flex-col md:flex-row overflow-hidden rounded-[inherit]">
                    
                    {/* TẤM KÍNH TRƯỢT (ART OVERLAY) */}
                    <div className={`${styles.artOverlay} relative md:absolute`}>
                        {/* Nội dung khi Login */}
                        <div className={`${styles.artContent} ${styles.artContentLogin}`}>
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                     <div className="bg-white/60 p-3 rounded-2xl shadow-sm border border-white">
                                         <Camera size={28} className={styles.textPrimary} />
                                     </div>
                                     <span className={`text-2xl tracking-widest ${styles.textPrimary} font-black uppercase drop-shadow-sm`}>{tLogin('brandName')}</span>
                                 </div>
                                 <h2 className={`text-4xl lg:text-5xl mb-6 leading-tight ${styles.textPrimary} font-black drop-shadow-sm`}>
                                     {tLogin('artTitle')}
                                 </h2>
                                 <p className={`${styles.textSecondary} font-medium text-lg max-w-sm`}>
                                     {tLogin('artSubtitle')}
                                 </p>
                             </div>
                             <div className={`mt-10 p-5 bg-white/40 rounded-3xl border border-white ${styles.textSecondary} shadow-sm`}>
                                 <Sparkles size={24} className={`mb-2 ${styles.textPrimary}`} />
                                 <p className="text-sm font-bold italic leading-relaxed">
                                     {tLogin('artQuote')}
                                 </p>
                             </div>
                        </div>

                        {/* Nội dung khi Register */}
                        <div className={`${styles.artContent} ${styles.artContentRegister}`}>
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                     <div className="bg-white/60 p-3 rounded-2xl shadow-sm border border-white">
                                         <Leaf size={28} className={styles.textPrimary} />
                                     </div>
                                     <span className={`text-2xl tracking-widest ${styles.textPrimary} font-black uppercase drop-shadow-sm`}>{tRegister('brandName')}</span>
                                 </div>
                                 <h2 className={`text-4xl lg:text-5xl mb-6 leading-tight ${styles.textPrimary} font-black drop-shadow-sm`}>
                                     {tRegister('artTitle')}
                                 </h2>
                                 <p className={`${styles.textSecondary} font-medium text-lg max-w-sm`}>
                                     {tRegister('artSubtitle')}
                                 </p>
                             </div>
                             <div className={`mt-10 p-5 bg-white/40 rounded-3xl border border-white ${styles.textSecondary} shadow-sm`}>
                                 <Heart size={24} className={`mb-2 ${styles.textPrimary}`} fill="currentColor" />
                                 <p className="text-sm font-bold italic leading-relaxed">
                                     {tRegister('artQuote')}
                                 </p>
                             </div>
                        </div>
                    </div>

                    {/* FORM ĐĂNG NHẬP / QUÊN MẬT KHẨU */}
                    <div className={`${styles.formWrapper} ${styles.formLogin} flex flex-col justify-center p-8 md:p-14`}>
                        {view === 'forgot-password' ? (
                            <ForgotPassword onViewChange={() => handleViewChange('login')} />
                        ) : (
                            <LoginForm onViewChange={handleViewChange} />
                        )}
                    </div>

                    {/* FORM ĐĂNG KÝ */}
                    <div className={`${styles.formWrapper} ${styles.formRegister} flex flex-col justify-center p-8 md:p-14`}>
                        <RegisterForm 
                            onViewChange={handleViewChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
