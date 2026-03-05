"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryImages, shuffleArray, getImagePath } from "@/utils/galleryImages";

interface RandomGallerySectionProps {
    count?: number;
    region?: string;
    keyword?: string;
}

// 워터마크용 키워드 배열
const watermarkKeywords = [
    "배관막힘 해결",
    "변기막힘 전문",
    "하수구 청소",
    "싱크대막힘",
    "24시간 출동",
    "고압세척",
    "바나나배관",
    "출장비 무료",
    "욕조막힘",
    "배관청소",
    "긴급출동",
    "전문 시공",
];

const RandomGallerySection = ({ count = 4, region, keyword }: RandomGallerySectionProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 이미지별 워터마크 키워드 할당
    const imageKeywords = useMemo(() => {
        return images.map((_, idx) => {
            // region이나 keyword가 있으면 그것을 기반으로, 없으면 배열에서 순환
            if (region && keyword) {
                const variations = [
                    `${region} ${keyword}`,
                    keyword,
                    "바나나배관",
                    `${region} 전문`,
                ];
                return variations[idx % variations.length];
            }
            return watermarkKeywords[idx % watermarkKeywords.length];
        });
    }, [images, region, keyword]);

    useEffect(() => {
        // 클라이언트에서만 랜덤 이미지 선택
        const randomImages = shuffleArray(galleryImages).slice(0, count);
        setImages(randomImages);
        setIsLoaded(true);
    }, [count]);

    if (!isLoaded) {
        // 로딩 스켈레톤
        return (
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <span className="inline-block text-banana-yellow font-semibold text-sm tracking-wide mb-3">
                            실시간 갤러리
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            실시간 <span className="text-banana-yellow">작업 현장</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Array.from({ length: count }).map((_, idx) => (
                            <div
                                key={idx}
                                className="aspect-square bg-gray-800 rounded-xl animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <span className="inline-block text-banana-yellow font-semibold text-sm tracking-wide mb-3">
                        실시간 갤러리
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        실시간 <span className="text-banana-yellow">작업 현장</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                        바나나배관의 전문 기술진이 직접 수행한 실제 작업 사례입니다.
                        매일 새로운 시공 현장이 업데이트됩니다.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={getImagePath(img)}
                                alt={`${region || "전북 전남 광주"} ${keyword || "배관막힘"} 작업 현장 ${idx + 1} - 바나나배관`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />

                            {/* 워터마크 오버레이 */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                                <span className="text-white text-xs font-semibold drop-shadow-lg">
                                    {imageKeywords[idx]}
                                </span>
                            </div>

                            {/* 호버 효과 */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-banana-red/90 px-3 py-1 rounded-full">
                                    시공 완료
                                </span>
                            </div>

                            {/* 상단 배지 */}
                            <div className="absolute top-2 left-2">
                                <span className="bg-banana-yellow text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    REAL
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 bg-banana-yellow text-black font-semibold px-8 py-4 rounded-full hover:bg-white transition-colors"
                    >
                        <span>더 많은 작업 사례 보기</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RandomGallerySection;
