"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { generateBusinessList } from "@/utils/generator";

interface BananaTemplateProps {
    region: string; // "전주시 완산구 삼천동3가" (Full Name)
    keyword: string;
    lat?: number;
    lng?: number;
}

export default function BananaTemplate({ region, keyword, lat = 37.5665, lng = 126.9780 }: BananaTemplateProps) {
    const allImages = [
        "IMG_2653.JPG", "IMG_2669.JPG", "IMG_2678.JPG", "IMG_3061.JPG", "IMG_3135.JPG",
        "IMG_3158.JPG", "IMG_3196.JPG", "IMG_3216.JPG", "IMG_3228.JPG", "mosa0Y8lYT.jpeg"
    ];

    const [galleryImages] = useState<string[]>(() =>
        [...allImages].sort(() => 0.5 - Math.random()).slice(0, 7)
    );

    const businesses = useMemo(() =>
        generateBusinessList(region, lat, lng, keyword),
        [region, lat, lng, keyword]
    );

    const videoId = "DL-zlugGLvg";

    return (
        <div className="flex flex-col w-full bg-white pb-20">

            {/* SECTION: GALLERY (TOP) */}
            <section className="w-full bg-black py-2 overflow-hidden">
                <div className="flex flex-wrap justify-center gap-1 px-1">
                    {/* Brand Logo added */}
                    <div className="relative w-[50px] h-[35px] shrink-0 rounded overflow-hidden bg-white flex items-center justify-center">
                        <Image src="/images/brand_logo.png" alt="Banana Brand" width={40} height={40} className="object-contain" />
                    </div>
                    {galleryImages.map((img, idx) => (
                        <div key={idx} className="relative w-[50px] h-[35px] shrink-0 rounded overflow-hidden opacity-80 hover:opacity-100 transition">
                            <Image src={`/images/gallery/${img}`} alt={`작업${idx}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-1">
                    <span className="text-[10px] text-banana-yellow font-mono">#{region} #{keyword} #배관청소 #24시출동</span>
                </div>
            </section>

            {/* SECTION 1: HERO */}
            <section className="relative w-full">
                <Image
                    src="/images/fixed/1.png"
                    alt={`${region} ${keyword} 전문 바나나배관`}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                />
                <div className="absolute bottom-5 left-0 right-0 text-center">
                    <a href="tel:010-8184-3496" className="sr-only">전화 상담하기</a>
                </div>
            </section>

            {/* SECTION: BUSINESS LIST */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-xl font-black text-center mb-6">
                        <span className="text-banana-red">{region}</span> {keyword} 우수 업체
                    </h2>

                    <div className="space-y-3">
                        {businesses.map((biz, index) => (
                            <div key={biz.id}>
                                {/* 업체 카드 (이미지 제거, 심플형) */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:border-banana-yellow transition">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                            {biz.name}
                                        </h3>
                                        <span className="text-xs text-gray-400">{biz.distance}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{biz.address}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 font-mono">
                                        {biz.lat.toFixed(4)}, {biz.lng.toFixed(4)}
                                    </p>
                                </div>

                                {/* Coupang Ads (Index 2 and 6) - Iframe */}
                                {(index === 2 || index === 6) && (
                                    <div className="mt-3 mb-3 flex justify-center">
                                        <iframe
                                            src="https://coupa.ng/clcdI4"
                                            width="120"
                                            height="240"
                                            frameBorder="0"
                                            scrolling="no"
                                            referrerPolicy="unsafe-url"
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION: YOUTUBE (RANDOM) */}
            <section className="py-8 bg-white container mx-auto px-4">
                <div className="text-center mb-4">
                    <span className="text-sm font-bold bg-black text-white px-3 py-1 rounded-full">
                        #{region} #{keyword} #현장영상
                    </span>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="video"
                        className="absolute"
                        allowFullScreen
                    />
                </div>
            </section>

            {/* FIXED SECTIONS */}
            <section className="relative w-full"><Image src="/images/fixed/2.png" alt="문제 공감" width={800} height={600} className="w-full h-auto" /></section>
            <section className="relative w-full"><Image src="/images/fixed/3.png" alt="신뢰 포인트" width={800} height={600} className="w-full h-auto" /></section>
            <section className="relative w-full"><Image src="/images/fixed/4.png" alt="진행 과정" width={800} height={600} className="w-full h-auto" /></section>
            <section className="relative w-full"><Image src="/images/fixed/5.png" alt="고객 후기" width={800} height={600} className="w-full h-auto" /></section>
            <section className="relative w-full text-center bg-black"><Image src="/images/fixed/6.png" alt="고객센터" width={800} height={600} className="w-full h-auto" /></section>
        </div>
    );
}
