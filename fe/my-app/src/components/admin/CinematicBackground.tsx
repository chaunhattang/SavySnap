'use client';

import React, { useState, useEffect } from 'react';
import { Stars } from 'lucide-react';
import styles from '@/app/[locale]/admin/admin.module.css';

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

export default function CinematicBackground() {
    const [petals, setPetals] = useState<Petal[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const generatedPetals = Array.from({ length: 35 }).map((_, i) => {
            const depth = Math.random();
            const zIndex = depth > 0.85 ? 100 : depth > 0.3 ? 5 : 0;
            return {
                id: i,
                left: `${Math.random() * 100}%`,
                animationDuration: `${(Math.random() * 8 + 8) / (depth > 0.85 ? 2.5 : depth > 0.3 ? 1 : 0.5)}s`,
                animationDelay: `-${Math.random() * 10}s`,
                width: `${(Math.random() * 12 + 10) * (depth > 0.85 ? 3 : depth > 0.3 ? 1 : 0.6)}px`,
                height: `${(Math.random() * 12 + 10) * (depth > 0.85 ? 3 : depth > 0.3 ? 1 : 0.6)}px`,
                rotate: Math.random() * 360,
                zIndex,
                filter: depth > 0.85 ? 'blur(6px)' : depth < 0.3 ? 'blur(2px)' : 'drop-shadow(0 2px 4px rgba(255,182,193,0.4))',
                opacity: depth > 0.85 ? 0.9 : depth < 0.3 ? 0.4 : 0.8
            };
        });
        setPetals(generatedPetals);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <div className={styles.filmGrain}></div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`${styles.orb} ${styles.orb1}`}></div>
                <div className={`${styles.orb} ${styles.orb2}`}></div>
                <div className={`${styles.orb} ${styles.orb3}`}></div>
                
                <Stars size={45} className="absolute top-[10%] left-[20%] text-white animate-[pulse_3s_infinite] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                <Stars size={30} className="absolute bottom-[25%] right-[25%] text-pink-300 animate-[pulse_4s_infinite] drop-shadow-[0_0_10px_rgba(255,182,193,0.8)]" />
                
                {petals.map((petal) => (
                    <div 
                        key={petal.id} 
                        className={styles.petal} 
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
                            '--target-opacity': petal.opacity
                        } as any} 
                    />
                ))}
            </div>
        </>
    );
}
