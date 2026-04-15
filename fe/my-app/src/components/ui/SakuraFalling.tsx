'use client';

import { useMemo } from 'react';
import styles from './SakuraFalling.module.css';

export default function SakuraFalling() {
    const petals = useMemo(
        () =>
            Array.from({ length: 60 }).map((_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                duration: `${Math.random() * 4 + 4}s`,
                delay: `-${Math.random() * 10}s`,
                size: `${Math.random() * 20 + 24}px`,
                rotate: Math.random() * 360,
            })),
        []
    );

    return (
        <div className={styles.container}>
            {petals.map((p) => (
                <div
                    key={p.id}
                    className={styles.petal}
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        transform: `rotate(${p.rotate}deg)`,
                    }}
                />
            ))}
        </div>
    );
}
