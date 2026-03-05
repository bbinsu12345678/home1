"use client";

import { SITE_NAME } from "@/utils/siteConfig";
import Image from "next/image";
import Link from "next/link";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

// Components
const StatsSection = dynamic(() => import("./StatsSection"), { ssr: false });
const RandomGallerySection = dynamic(() => import("./RandomGallerySection"), {
    ssr: false,
    loading: () => <GalleryFallback />
});
const RegionGrid = dynamic(() => import("./RegionGrid"), { ssr: false });
const FaqSection = dynamic(() => import("./FaqSection"), { ssr: false });

const GalleryFallback = () => (
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
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="aspect-square bg-slate-800 rounded-2xl animate-pulse"
                    />
                ))}
            </div>
        </div>
    </section>
);

// 메인 페이지용 FAQ 데이터 (Fallback)
const mainFaqs = [
    {
        question: "어느 지역까지 출장 가능한가요?",
        answer: "전북(전주, 군산, 익산, 정읍, 남원, 김제), 전남(목포, 여수, 순천, 나주, 광양 등), 광주광역시 전 지역 24시간 출장 가능합니다. 심야, 주말, 공휴일 상관없이 긴급 출동 서비스를 제공합니다.",
    },
    {
        question: "출장비는 정말 무료인가요?",
        answer: "네, 바나나배관은 출장비 무료입니다. 현장 방문 후 정확한 상태를 확인하고 투명한 견적을 안내해 드립니다. 견적에 동의하신 경우에만 작업이 진행됩니다.",
    },
    {
        question: "배관막힘 외에 다른 서비스도 제공하나요?",
        answer: "배관막힘, 변기막힘, 하수구막힘, 싱크대막힘, 욕조막힘, 세면대막힘, 세탁기배수막힘, 정화조막힘 등 각종 막힘 해결은 물론, 배관 청소, 고압세척, 누수탐지 서비스도 제공합니다.",
    },
    {
        question: "야간에도 상담이 가능한가요?",
        answer: "24시간 연중무휴로 상담 가능합니다. 긴급한 상황이시라면 언제든 전화 주세요. 가장 빠른 시간 내에 전문 기술진이 출동합니다.",
    },
    {
        question: "작업 후 재발하면 어떻게 하나요?",
        answer: "바나나배관은 작업 후 일정 기간 A/S를 보장합니다. 동일 증상 재발 시 무상으로 재방문하여 처리해 드립니다. 고객님의 만족이 저희의 최우선입니다.",
    },
];

// 시도별 지역 데이터 (2026년 최신 행정구역 기준)
const regionGroups = [
    {
        sido: "전북",
        sidoFull: "전북특별자치도",
        regions: [
            { name: "전주시", count: 35, subText: "완산구·덕진구 전역" },
            { name: "군산시", count: 27 },
            { name: "익산시", count: 29 },
            { name: "남원시", count: 23 },
            { name: "정읍시", count: 23 },
            { name: "김제시", count: 19 },
        ],
    },
    {
        sido: "전남",
        sidoFull: "전라남도",
        regions: [
            // 5개 시
            { name: "목포시", count: 23, subText: "용당·연동·산정 등 전역" },
            { name: "여수시", count: 27, subText: "돌산·소라·율촌 등 전역" },
            { name: "순천시", count: 24, subText: "승주·해룡·서면 등 전역" },
            { name: "나주시", count: 20, subText: "남평·세지·왕곡 등 전역" },
            { name: "광양시", count: 12, subText: "봉강·옥룡·옥곡 등 전역" },
            // 17개 군 (주요 군 위주 표출 및 전체 포함)
            { name: "담양군", count: 12 },
            { name: "곡성군", count: 11 },
            { name: "구례군", count: 8 },
            { name: "고흥군", count: 16 },
            { name: "보성군", count: 12 },
            { name: "화순군", count: 13 },
            { name: "장흥군", count: 10 },
            { name: "강진군", count: 11 },
            { name: "해남군", count: 14 },
            { name: "영암군", count: 11 },
            { name: "무안군", count: 9 },
            { name: "함평군", count: 9 },
            { name: "영광군", count: 10 },
            { name: "장성군", count: 11 },
            { name: "완도군", count: 12 },
            { name: "진도군", count: 7 },
            { name: "신안군", count: 14 },
        ],
    },
    {
        sido: "광주",
        sidoFull: "광주광역시",
        regions: [
            { name: "광주시", count: 97, subText: "동구·서구·남구·북구·광산구" },
        ],
    },
];

interface MainPageProps {
    faqs?: any[];
}

export default function MainPage({ faqs }: MainPageProps) {
    return (
        <div className="flex flex-col w-full bg-white">
            <h1 className="sr-only">전북 전남 광주 배관막힘 24시간 긴급출동 전문 - 바나나배관</h1>

            {/* 1. 히어로 섹션 */}
            <section className="relative w-full bg-black">
                <div className="relative w-full max-w-3xl mx-auto px-4 py-8">
                    <div className="relative aspect-[860/1100] w-full h-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10">
                        <Image
                            src="/images/fixed/1.webp"
                            alt={`${SITE_NAME} - 전북 전남 광주 배관막힘 전문 24시간 긴급출동`}
                            fill
                            className="object-cover"
                            quality={75}
                            priority
                        />
                    </div>
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
                        <a
                            href="tel:010-2115-3496"
                            className="flex items-center justify-center gap-3 bg-banana-red text-white text-lg md:text-xl font-bold px-8 py-4 rounded-full hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-2xl animate-pulse"
                        >
                            <PhoneIcon className="h-6 w-6" />
                            지금 바로 상담하기
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. 신뢰 통계 섹션 */}
            <StatsSection />

            {/* 3. 실시간 작업현장 갤러리 */}
            <RandomGallerySection count={8} />

            {/* 4. 서비스 소개 */}
            <section className="py-16 bg-white">
                <div className="w-full max-w-2xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <span className="inline-block text-banana-red font-semibold text-sm tracking-wide mb-3">
                            서비스 안내
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            각종 <span className="text-banana-yellow">막힘</span> 걱정 끝!
                        </h2>
                    </div>
                    <Image
                        src="/images/fixed/2.webp"
                        alt="바나나배관 서비스 소개 - 배관막힘, 하수구막힘, 변기막힘, 싱크대막힘 전문 해결"
                        width={860}
                        height={1100}
                        className="w-full h-auto rounded-3xl shadow-lg"
                        quality={75}
                    />
                </div>
            </section>

            {/* 5. 지역 퀵링크 */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="inline-block text-banana-red font-semibold text-sm tracking-wide mb-3">
                            서비스 지역
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <span className="text-banana-yellow">전북 · 전남 · 광주</span> 전 지역 출동
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            원하시는 지역을 선택하시면 해당 지역의 상세 서비스 정보와 실제 작업 사례를 확인하실 수 있습니다.
                        </p>
                    </div>

                    <div className="space-y-12 max-w-5xl mx-auto">
                        {regionGroups.map((group) => (
                            <div key={group.sido}>
                                <h3 className="text-lg font-semibold text-slate-700 mb-5 border-l-4 border-banana-yellow pl-4 font-outfit">
                                    {group.sidoFull}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {group.regions.map((region) => (
                                        <Link
                                            key={region.name}
                                            href={`/gallery?si=${encodeURIComponent(region.name)}`}
                                            className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-banana-yellow hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-br from-banana-yellow/20 to-banana-red/10 rounded-xl flex items-center justify-center mb-3">
                                                <MapPinIcon className="w-5 h-5 text-banana-red" />
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-banana-red transition-colors font-outfit">
                                                {region.name}
                                            </h4>
                                            {(region as any).subText ? (
                                                <p className="text-xs text-gray-400 mb-2">{(region as any).subText}</p>
                                            ) : (
                                                <p className="text-sm text-gray-500 mb-2">{region.count}개 지역</p>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. 선택 이유 */}
            <section className="py-16 bg-white">
                <div className="w-full max-w-2xl mx-auto px-4">
                    <Image
                        src="/images/fixed/3.webp"
                        alt="바나나배관 선택 이유"
                        width={860}
                        height={1100}
                        className="w-full h-auto rounded-3xl shadow-lg"
                        quality={75}
                    />
                </div>
            </section>

            {/* 7. 진행 과정 */}
            <section className="py-16 bg-gray-50">
                <div className="w-full max-w-2xl mx-auto px-4">
                    <Image
                        src="/images/fixed/4.webp"
                        alt="바나나배관 진행 과정"
                        width={860}
                        height={1100}
                        className="w-full h-auto rounded-3xl shadow-lg"
                        quality={75}
                    />
                </div>
            </section>

            {/* 8. 지역 그리드 상세 */}
            <RegionGrid />

            {/* 9. 고객 리뷰 */}
            <section className="py-16 bg-white">
                <div className="w-full max-w-2xl mx-auto px-4">
                    <Image
                        src="/images/fixed/5.webp"
                        alt="바나나배관 실제 고객 후기"
                        width={860}
                        height={1100}
                        className="w-full h-auto rounded-3xl shadow-lg"
                        quality={75}
                    />
                </div>
            </section>

            {/* 10. FAQ 섹션 */}
            <FaqSection faqs={faqs || mainFaqs} />

            {/* 11. 연락처 */}
            <section className="py-16 bg-gray-900">
                <div className="w-full max-w-2xl mx-auto px-4">
                    <Image
                        src="/images/fixed/6.webp"
                        alt="바나나배관 고객센터"
                        width={860}
                        height={1100}
                        className="w-full h-auto rounded-3xl"
                        quality={75}
                    />
                </div>
            </section>

            {/* 12. 최종 CTA */}
            <section className="py-20 bg-banana-yellow text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">지금 바로 연락하세요!</h2>
                <a href="tel:010-2115-3496" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl">
                    <PhoneIcon className="h-7 w-7" />
                    010-2115-3496
                </a>
            </section>
        </div>
    );
}
