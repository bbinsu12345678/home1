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

interface FaqItem {
    question: string;
    answer: string;
}

const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-bold text-gray-800 text-sm md:text-base pr-4">
                            Q. {item.question}
                        </span>
                        <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </button>
                    {openIndex === index && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

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
                            <Image src={`/images/gallery/${img}`} alt={`작업${idx}`} fill className="object-cover" sizes="50px" />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-1">
                    <span className="text-[10px] text-banana-yellow font-mono">#{region} #{keyword} #배관청소 #24시출동</span>
                </div>
            </section>

            {/* SECTION: TITLE & BADGES (NEW) */}
            <section className="bg-white pt-6 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-wrap gap-1 mb-2">
                        <span className="bg-banana-red text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">TOP 10</span>
                        <span className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">추천업체</span>
                        <span className="bg-banana-yellow text-black text-[10px] px-2 py-0.5 rounded-sm font-bold">24시출동</span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                        {region} <span className="text-banana-red">{keyword}</span> 뚫는곳 10곳 견적 비교
                    </h1>
                    <p className="text-xs text-gray-400 mt-2">
                        최적화된 장비와 전문 인력이 상주하여 신속하게 해결해 드립니다.
                    </p>
                </div>
            </section>

            {/* SECTION: INTRO INFO (NEW) */}
            <section className="px-4 py-4">
                <div className="max-w-3xl mx-auto bg-gray-50 border-l-4 border-banana-yellow p-4 rounded-r-lg">
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        📣 <span className="text-banana-red font-bold">{region}</span> 주위 <span className="font-bold">{keyword}</span> 업체를 찾고 계신가요?
                        검색 엔진 데이터를 기반으로 엄선된 우수 업체들의 위치와 평가를 한눈에 확인해 보세요.
                        출장비 무료부터 당일 해결까지 안심하고 맡길 수 있는 곳들을 정리했습니다.
                    </p>
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
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                />
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

                                { /* Naver Shopping Ad (Index 2 and 6) - Link Banner */}
                                {(index === 2 || index === 6) && (
                                    <div className="mt-4 mb-4">
                                        <a
                                            href="https://mkt.shopping.naver.com/link/6950f9989ee9dc532374bf99"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-banana-yellow border border-banana-yellow/30 rounded-lg p-4 text-center hover:opacity-90 transition shadow-sm group"
                                        >
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs font-bold text-black/60 uppercase tracking-wider">Editor's Pick</span>
                                                <p className="text-gray-900 font-black text-base md:text-lg leading-tight">
                                                    배관 관리의 핵심! <span className="text-banana-red underline decoration-2 underline-offset-4">전문가용 세정제</span> 보러가기
                                                </p>
                                                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-white bg-black px-3 py-1 rounded-full group-hover:translate-x-1 transition-transform">
                                                    네이버 쇼핑에서 확인하기
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </a>
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
                        loading="lazy"
                        allowFullScreen
                    />
                </div>
            </section>

            {/* FIXED SECTIONS */}
            <section className="relative w-full"><Image src="/images/fixed/2.png" alt="문제 공감" width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
            <section className="relative w-full"><Image src="/images/fixed/3.png" alt="신뢰 포인트" width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
            <section className="relative w-full"><Image src="/images/fixed/4.png" alt="진행 과정" width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
            <section className="relative w-full"><Image src="/images/fixed/5.png" alt="고객 후기" width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>

            {/* SECTION: FAQ (NEW) */}
            <section className="py-12 bg-white px-4 border-y border-gray-100">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <span className="text-banana-red font-bold text-sm tracking-widest uppercase">FAQ</span>
                        <h2 className="text-2xl font-black text-gray-900 mt-2">자주 묻는 질문</h2>
                    </div>
                    <FaqAccordion items={[
                        {
                            question: `${region} ${keyword} 관련 업체를 한 번에 확인할 수 있는 곳이 있나요?`,
                            answer: `${region} 지역 ${keyword} 등 관련 업종 업체를 한 곳에 모아 소개해 드리는 상담·안내 페이지입니다. 소개해 드리는 지역에서 검색되는 업종은 본문에 정리된 각 업체 정보와 연락처를 통해 직접 확인해 주세요.`
                        },
                        {
                            question: "싱크대 막힘을 방지하기 위해 정기적으로 해야 할 것은 무엇인가요?",
                            answer: "싱크대 막힘을 방지하기 위해서는 설거지 전에 식기에 묻은 기름기와 음식물 찌꺼기를 휴지로 닦아내거나 음식물 쓰레기통에 따로 버리는 것을 정기적으로 해야 합니다.\n주기적으로 베이킹소다와 식초를 이용한 자연적인 배관 청소를 하고, 뜨겁지 않은 물을 충분히 흘려보내 배관 내벽에 찌꺼기가 쌓이는 것을 막아야 합니다."
                        },
                        {
                            question: "하수구 막힘 뚫음 작업 후 물이 완전히 내려가지 않는 이유는?",
                            answer: "하수구 뚫음 작업 후에도 물이 완전히 내려가지 않는다면, 이는 막힘의 원인이 완전히 제거되지 않았거나 혹은 배관 구조 자체에 문제가 있다는 의미일 수 있습니다.\n배관 내부 슬러지가 다시 뭉쳤거나, 배관 노후화로 내부가 좁아진 상태일 수 있으므로 내시경 검사를 통한 정확한 진단이 필요합니다."
                        },
                        {
                            question: "변기 막힘을 유발하는 가장 흔한 원인은 무엇인가요?",
                            answer: "가장 흔한 원인은 물티슈, 과도한 양의 화장지, 이물질입니다. 특히 물티슈는 물에 녹지 않아 배관 내에서 엉겨 붙기 쉬우니 반드시 휴지통에 버려주세요."
                        },
                        {
                            question: "출장비는 정말 무료인가요?",
                            answer: "네, 바나나배관 올케어는 예약 후 현장 방문까지의 출장비가 0원입니다. 부담 없이 전문가의 진단을 받아보세요."
                        }
                    ]} />
                </div>
            </section>

            <section className="relative w-full text-center bg-black"><Image src="/images/fixed/6.png" alt="고객센터" width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
        </div>
    );
}
