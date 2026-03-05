"use client";

import { useEffect, useState, useRef } from "react";

interface StatItem {
    value: number;
    suffix: string;
    label: string;
    icon: React.ReactNode;
}

const stats: StatItem[] = [
    {
        value: 15,
        suffix: "년+",
        label: "업력 경력",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
    },
    {
        value: 50000,
        suffix: "+",
        label: "누적 시공 건수",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        value: 98,
        suffix: "%",
        label: "고객 만족도",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        value: 24,
        suffix: "시간",
        label: "긴급 출동",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

// 숫자 카운트업 애니메이션
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        const startValue = 0;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // easeOutQuart 이징
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(startValue + (end - startValue) * easeProgress));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, start]);

    return count;
}

const StatCard = ({ stat, index, isVisible }: { stat: StatItem; index: number; isVisible: boolean }) => {
    const count = useCountUp(stat.value, 2000, isVisible);

    // 숫자 포맷팅 (천 단위 콤마)
    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <div
            className="group relative bg-white rounded-3xl p-8 text-center border border-gray-100 hover:border-banana-yellow hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-banana-yellow/10 text-banana-red rounded-2xl mb-4 group-hover:bg-banana-yellow group-hover:text-black transition-colors">
                {stat.icon}
            </div>
            <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                {formatNumber(count)}
                <span className="text-banana-red">{stat.suffix}</span>
            </div>
            <p className="text-gray-500 font-medium">{stat.label}</p>
        </div>
    );
};

const StatsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-banana-red font-bold text-sm tracking-widest uppercase mb-2">
                        Trust & Experience
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                        <span className="text-banana-yellow">바나나배관</span>을 믿을 수 있는 이유
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            stat={stat}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
