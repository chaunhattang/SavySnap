'use client';
import React, { useState, useEffect, useRef } from 'react';

const TrackingPet = ({ type = 'cat', isClosed = false, delay = '0s', zIndex = 'z-10' }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Server-safe initial state
    const leftEyeRef = useRef<SVGCircleElement>(null);
    const rightEyeRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        // Initialize position on mount so we don't get hydration mismatch from window.innerWidth
        setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const calculateOffset = (eyeRef: React.RefObject<SVGCircleElement | null>) => {
        if (!eyeRef.current || isClosed) return { x: 0, y: 0 };
        const rect = eyeRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(mousePos.y - cy, mousePos.x - cx);
        const dist = Math.min(2.5, Math.hypot(mousePos.x - cx, mousePos.y - cy) / 20);
        return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    };

    const lOffset = calculateOffset(leftEyeRef);
    const rOffset = calculateOffset(rightEyeRef);

    return (
        <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative ${zIndex}`}>
            {/* Hào quang phát sáng - dùng box-shadow thay vì bg */}
            <div className="absolute inset-0 rounded-full blur-[25px] animate-pulse" style={{ 
                animationDelay: delay,
                boxShadow: '0 0 30px 10px rgba(244, 114, 182, 0.12)'
            }}></div>
            
            {/* SVG Thú Cưng */}
            <svg viewBox="0 0 50 50" className="w-full h-full overflow-visible pet-highlight transition-transform hover:scale-[1.3] cursor-pointer relative z-10" style={{ animationDelay: delay, filter: 'drop-shadow(0px 6px 8px rgba(244, 114, 182, 0.45))' }}>
                
                {/* --- CÁC PHẦN DÀNH RIÊNG TỪNG CON --- */}
                {type === 'cat' && (
                    <>
                        {/* Tai Mèo */}
                        <path d="M 8 22 L 4 4 L 22 12 Z" fill="#fff" stroke="#fbcfe8" strokeWidth="1"/>
                        <path d="M 42 22 L 46 4 L 28 12 Z" fill="#fff" stroke="#fbcfe8" strokeWidth="1"/>
                        <path d="M 9 18 L 6 7 L 18 13 Z" fill="#fbcfe8" />
                        <path d="M 41 18 L 44 7 L 32 13 Z" fill="#fbcfe8" />
                        {/* Mặt Mèo */}
                        <ellipse cx="25" cy="27" rx="22" ry="18" fill="#fff" stroke="#fbcfe8" strokeWidth="1"/>
                        <ellipse cx="11" cy="29" rx="3" ry="1.5" fill="#fbcfe8" opacity="0.8"/>
                        <ellipse cx="39" cy="29" rx="3" ry="1.5" fill="#fbcfe8" opacity="0.8"/>
                        {/* Mũi miệng */}
                        <path d="M 24 29 Q 25 30 26 29" stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        <path d="M 25 29 L 25 31" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M 21 33 Q 25 35 29 33" stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </>
                )}

                {type === 'dog' && (
                    <>
                        {/* Tai Chó */}
                        <path d="M 12 22 L 4 10 L 22 14 Z" fill="#fbd38d" stroke="#f6ad55" strokeWidth="1"/>
                        <path d="M 38 22 L 46 10 L 28 14 Z" fill="#fbd38d" stroke="#f6ad55" strokeWidth="1"/>
                        <path d="M 13 20 L 7 12 L 20 15 Z" fill="#fefcbf" />
                        <path d="M 37 20 L 43 12 L 30 15 Z" fill="#fefcbf" />
                        {/* Mặt Chó */}
                        <ellipse cx="25" cy="27" rx="22" ry="18" fill="#fbd38d" stroke="#f6ad55" strokeWidth="1"/>
                        <ellipse cx="25" cy="32" rx="12" ry="9" fill="#fff"/>
                        <ellipse cx="25" cy="28" rx="3.5" ry="2.5" fill="#4a5568"/>
                        {/* Miệng */}
                        <path d="M 25 30 L 25 33" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M 21 34 Q 25 36 29 34" stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </>
                )}

                {type === 'bunny' && (
                    <>
                        {/* Tai Thỏ */}
                        <ellipse cx="15" cy="8" rx="5" ry="16" fill="#fff" stroke="#fbcfe8" strokeWidth="1" transform="rotate(-20 15 8)"/>
                        <ellipse cx="15" cy="8" rx="2" ry="12" fill="#fbcfe8" transform="rotate(-20 15 8)"/>
                        <ellipse cx="35" cy="8" rx="5" ry="16" fill="#fff" stroke="#fbcfe8" strokeWidth="1" transform="rotate(20 35 8)"/>
                        <ellipse cx="35" cy="8" rx="2" ry="12" fill="#fbcfe8" transform="rotate(20 35 8)"/>
                        {/* Mặt Thỏ */}
                        <ellipse cx="25" cy="27" rx="20" ry="18" fill="#fff" stroke="#fbcfe8" strokeWidth="1"/>
                        <ellipse cx="11" cy="29" rx="3" ry="1.5" fill="#fbcfe8" opacity="0.8"/>
                        <ellipse cx="39" cy="29" rx="3" ry="1.5" fill="#fbcfe8" opacity="0.8"/>
                        <ellipse cx="25" cy="30" rx="2" ry="1.5" fill="#fbcfe8"/>
                        {/* Miệng */}
                        <path d="M 25 31.5 L 25 34" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M 22 35 Q 25 37 28 35" stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </>
                )}

                {/* --- ĐÔI MẮT --- */}
                {!isClosed ? (
                    <g>
                        <circle ref={leftEyeRef} cx="16" cy="24" r="4.5" fill="#fff" stroke="#e2e8f0" strokeWidth="0.5"/>
                        <circle ref={rightEyeRef} cx="34" cy="24" r="4.5" fill="#fff" stroke="#e2e8f0" strokeWidth="0.5"/>
                        <circle cx="16" cy="24" r="2.5" fill="#1e293b" style={{ transform: `translate(${lOffset.x}px, ${lOffset.y}px)` }} />
                        <circle cx="34" cy="24" r="2.5" fill="#1e293b" style={{ transform: `translate(${rOffset.x}px, ${rOffset.y}px)` }} />
                        <circle cx="15" cy="23" r="1" fill="#fff" style={{ transform: `translate(${lOffset.x}px, ${lOffset.y}px)` }} />
                        <circle cx="33" cy="23" r="1" fill="#fff" style={{ transform: `translate(${rOffset.x}px, ${rOffset.y}px)` }} />
                    </g>
                ) : (
                    <g>
                        <path d="M 12 24 L 16 26 L 12 28" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <path d="M 38 24 L 34 26 L 38 28" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </g>
                )}
            </svg>
        </div>
    );
};

export default function PetSquad({ isClosed = false }: { isClosed?: boolean }) {
    return (
        <div className="flex items-center -space-x-3 md:-space-x-4 ml-1 md:ml-3">
            <TrackingPet type="bunny" isClosed={isClosed} delay="0s" zIndex="z-10" />
            <TrackingPet type="cat" isClosed={isClosed} delay="0.5s" zIndex="z-20" />
            <TrackingPet type="dog" isClosed={isClosed} delay="1s" zIndex="z-30" />
        </div>
    );
}
