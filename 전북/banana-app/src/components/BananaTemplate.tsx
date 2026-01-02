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
        "IMG_2653.JPG", "IMG_2657.7.3.JPG", "IMG_2659K7.17.JPG", "IMG_2660K7.19.JPG", "IMG_2663K7.19.JPG",
        "IMG_2665L7.19.JPG", "IMG_2667.G7.19.JPG", "IMG_2669.JPG", "IMG_2670.JPG", "IMG_2672.6.24.JPG",
        "IMG_2673.7.3.JPG", "IMG_2674.7.3.JPG", "IMG_2676J7.19.JPG", "IMG_2678.JPG", "IMG_2679.JPG",
        "IMG_2681.JPG", "IMG_2682.6.24.JPG", "IMG_2683..JPG", "IMG_2684.JPG", "IMG_2685.JPG",
        "IMG_3061.JPG", "IMG_3062f.7.2.JPG", "IMG_3063.7.2.JPG", "IMG_3065.7.1.JPG", "IMG_3067.p7.31.JPG",
        "IMG_3069.JPG", "IMG_3071.JPG", "IMG_3072.7.1.JPG", "IMG_3074.7.1.JPG", "IMG_3075.7.1.JPG",
        "IMG_3076.7.1.JPG", "IMG_3078.JPG", "IMG_3080.7.2.JPG", "IMG_3081.7.2.JPG", "IMG_3104.JPG",
        "IMG_3127.M7.19.JPG", "IMG_3128.JPG", "IMG_3131.7.19.JPG", "IMG_3132.7.19.JPG", "IMG_3134.JPG",
        "IMG_3135.JPG", "IMG_3139.8.5.JPG", "IMG_3143.7.19.JPG", "IMG_3146.7.19.JPG", "IMG_3149.JPG",
        "IMG_3152.7.8.JPG", "IMG_3153.JPG", "IMG_3158.JPG", "IMG_3194.U24.8.5.JPG", "IMG_3196.JPG",
        "IMG_3197.7.9.JPG", "IMG_3198.8.5.JPG", "IMG_3200.24.7.9.JPG", "IMG_3202.24,7,9.JPG", "IMG_3203.24.7.9.JPG",
        "IMG_3205.24.7.8.jpg", "IMG_3216.JPG", "IMG_3217.JPG", "IMG_3218.JPG", "IMG_3220.JPG",
        "IMG_3222.JPG", "IMG_3224.7.9.JPG", "IMG_3228.JPG", "KakaoTalk_20250805_175000921.jpg", "KakaoTalk_20250805_175000921_01.jpg",
        "KakaoTalk_20250805_175000921_02.jpg", "KakaoTalk_20250805_175000921_03.jpg", "KakaoTalk_20250805_175000921_04.jpg", "KakaoTalk_20250805_175000921_05.jpg", "KakaoTalk_20250805_175000921_06.jpg",
        "KakaoTalk_20250805_175000921_07.jpg", "KakaoTalk_20250805_175000921_08.jpg", "KakaoTalk_20250805_175000921_09.jpg", "KakaoTalk_20250805_175000921_10.jpg", "KakaoTalk_20250805_175000921_11.jpg",
        "KakaoTalk_20250805_175000921_12.jpg", "KakaoTalk_20250805_175000921_13.jpg", "KakaoTalk_20250805_175000921_14.jpg", "KakaoTalk_20250805_175000921_15.jpg", "KakaoTalk_20250805_175000921_16.jpg",
        "KakaoTalk_20250805_175000921_18.jpg", "KakaoTalk_20250805_175000921_19.jpg", "KakaoTalk_20250805_175000921_20.jpg", "KakaoTalk_20250805_175000921_21.jpg", "KakaoTalk_20250805_175000921_22.jpg",
        "KakaoTalk_20250805_175000921_23.jpg", "KakaoTalk_20250805_175000921_24.jpg", "KakaoTalk_20250805_175000921_25.jpg", "KakaoTalk_20250805_175000921_26.jpg", "KakaoTalk_20250805_175000921_28.jpg",
        "KakaoTalk_20250805_175000921_29.jpg", "KakaoTalk_20250805_175056769.jpg", "KakaoTalk_20250805_175056769_01.jpg", "KakaoTalk_20250805_175056769_02.jpg", "KakaoTalk_20250805_175056769_03.jpg",
        "KakaoTalk_20250805_175056769_04.jpg", "KakaoTalk_20250805_175056769_05.jpg", "KakaoTalk_20250805_175056769_06.jpg", "KakaoTalk_20250805_175056769_07.jpg", "KakaoTalk_20250805_175056769_08.jpg",
        "KakaoTalk_20250805_175056769_09.jpg", "KakaoTalk_20250805_175056769_10.jpg", "KakaoTalk_20250805_175056769_11.jpg", "KakaoTalk_20250805_175056769_12.jpg", "KakaoTalk_20250805_175056769_13.jpg",
        "KakaoTalk_20250805_175056769_14.jpg", "KakaoTalk_20250805_175056769_15.jpg", "KakaoTalk_20250805_175056769_16.jpg", "KakaoTalk_20250805_175056769_17.jpg", "KakaoTalk_20250805_175056769_18.jpg",
        "KakaoTalk_20250805_175056769_19.jpg", "KakaoTalk_20250805_175056769_20.jpg", "KakaoTalk_20250805_175056769_21.jpg", "KakaoTalk_20250805_175056769_22.jpg", "KakaoTalk_20250805_175056769_23.jpg",
        "KakaoTalk_20250805_175056769_24.jpg", "KakaoTalk_20250805_175056769_25.jpg", "KakaoTalk_20250805_175056769_26.jpg", "KakaoTalk_20250805_175056769_27.jpg", "KakaoTalk_20250805_175056769_28.jpg",
        "KakaoTalk_20250805_175056769_29.jpg", "KakaoTalk_20250805_190844639.jpg", "KakaoTalk_20250805_190844639_01.jpg", "KakaoTalk_20250805_190844639_02.jpg", "KakaoTalk_20250805_190844639_03.jpg",
        "KakaoTalk_20250805_190844639_04.jpg", "KakaoTalk_20250805_190844639_05.jpg", "KakaoTalk_20250805_190844639_06.jpg", "KakaoTalk_20250805_190844639_07.jpg", "KakaoTalk_20250805_190844639_08.jpg",
        "KakaoTalk_20250805_190844639_09.jpg", "KakaoTalk_20250805_190844639_10.jpg", "KakaoTalk_20250805_190844639_11.jpg", "KakaoTalk_20250805_190844639_12.jpg", "KakaoTalk_20250805_190844639_13.jpg",
        "KakaoTalk_20250805_190844639_14.jpg", "KakaoTalk_20250805_190844639_15.jpg", "KakaoTalk_20250805_190844639_16.jpg", "KakaoTalk_20250805_190844639_17.jpg", "KakaoTalk_20250805_190844639_18.jpg",
        "KakaoTalk_20250805_190844639_19.jpg", "KakaoTalk_20250805_190844639_20.jpg", "KakaoTalk_20250805_190844639_21.jpg", "KakaoTalk_20250805_190844639_22.jpg", "KakaoTalk_20250805_190844639_23.jpg",
        "KakaoTalk_20250805_190844639_24.jpg", "KakaoTalk_20250805_190844639_25.jpg", "KakaoTalk_20250805_190844639_26.jpg", "KakaoTalk_20250805_190844639_27.jpg", "KakaoTalk_20250805_190844639_28.jpg",
        "KakaoTalk_20250805_190844639_29.jpg", "mosa0Y8lYT.jpeg", "mosa2gPbHX.jpeg", "mosa3D8Gab.6.2.jpeg", "mosa8spaNb.jpeg",
        "mosa9dnYZs.jpeg", "mosaB3IvNk.jpeg", "mosaB3QObb.jpeg", "mosabHYILN.jpeg", "mosadLfcMh.jpeg",
        "mosafCgw5S.jpeg", "mosafJz54o (1).jpeg", "mosafJz54o.jpeg", "mosafL01FA.jpeg", "mosagIETul.jpeg",
        "mosaJpDpZb.jpeg", "mosaKPQYdr.jpeg", "mosakVv0h6.jpeg", "mosalUquvU.jpeg", "mosaM7CH6v.jpeg",
        "mosamq09Ao.jpeg", "mosaObRZud.jpeg", "mosaOjUE3R.jpeg", "mosaq4e7id.4.24.jpeg", "mosaTJFa9v.jpeg",
        "mosaTs7udR.jpeg", "mosauARsUn.jpeg", "mosaVSOo76.jpeg", "mosaxhVHYI.jpeg", "mosaY4eUs8.jpeg",
        "mosaym1mh0 (1).jpeg", "mosayO3qdw.jpeg", "mosaZtCFWi.jpeg"
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
                        <Image src="/images/brand_logo.png" alt="바나나배관 로고" width={40} height={40} className="object-contain" />
                    </div>
                    {galleryImages.map((img, idx) => {
                        const textPatterns = [
                            keyword,
                            `${keyword} 해결`,
                            '24시 출동',
                            region.split(' ').pop() || region,
                            '전문가',
                            '긴급 출동',
                            '당일 완료'
                        ];
                        const altTexts = [
                            `${region} ${keyword} 전문 시공 사진`,
                            `${region} ${keyword} 현장 작업 이미지`,
                            `${region} 배관 청소 실제 케이스`,
                            `${keyword} 해결 전문가 작업 현장`,
                            `${region} 긴급 출동 서비스 사진`,
                            `${keyword} 24시간 출동 이미지`,
                            `${region} 배관 전문 업체 작업 사진`
                        ];
                        return (
                            <div key={idx} className="relative w-[50px] h-[35px] shrink-0 rounded overflow-hidden group">
                                <Image
                                    src={`/images/gallery/${img}`}
                                    alt={altTexts[idx % altTexts.length]}
                                    title={altTexts[idx % altTexts.length]}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition"
                                    sizes="50px"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-1 py-0.5">
                                    <p className="text-white text-[7px] font-bold truncate leading-tight">
                                        {textPatterns[idx % textPatterns.length]}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
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

                                { /* Coupang Partners Ad (Index 2 and 6) - 2 Column Iframe (Total 4) */}
                                {(index === 2 || index === 6) && (
                                    <div className="mt-6 mb-6 flex justify-center gap-4 flex-wrap">
                                        <iframe
                                            src="https://coupa.ng/clcxsV"
                                            width="120"
                                            height="240"
                                            frameBorder="0"
                                            scrolling="no"
                                            referrerPolicy="unsafe-url"
                                            // @ts-expect-error -- nonstandard iframe attribute
                                            browsingtopics="true"
                                        ></iframe>
                                        <iframe
                                            src="https://coupa.ng/clcxsV"
                                            width="120"
                                            height="240"
                                            frameBorder="0"
                                            scrolling="no"
                                            referrerPolicy="unsafe-url"
                                            // @ts-expect-error -- nonstandard iframe attribute
                                            browsingtopics="true"
                                        ></iframe>
                                        <iframe
                                            src="https://coupa.ng/clcxsV"
                                            width="120"
                                            height="240"
                                            frameBorder="0"
                                            scrolling="no"
                                            referrerPolicy="unsafe-url"
                                            // @ts-expect-error -- nonstandard iframe attribute
                                            browsingtopics="true"
                                        ></iframe>
                                        <iframe
                                            src="https://coupa.ng/clcxsV"
                                            width="120"
                                            height="240"
                                            frameBorder="0"
                                            scrolling="no"
                                            referrerPolicy="unsafe-url"
                                            // @ts-expect-error -- nonstandard iframe attribute
                                            browsingtopics="true"
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
                        title={`${region} ${keyword} 현장 영상 - 바나나배관 실제 작업 케이스`}
                        className="absolute"
                        loading="lazy"
                        allowFullScreen
                    />
                </div>
            </section>

            {/* FIXED SECTIONS */}
            <section className="relative w-full"><Image src="/images/fixed/2.png" alt={`${region} ${keyword} 고객 고민 해결 방법`} width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
            <section className="relative w-full"><Image src="/images/fixed/3.png" alt={`${region} 배관 서비스 신뢰 포인트`} width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
            <section className="relative w-full"><Image src="/images/fixed/4.png" alt={`${region} ${keyword} 작업 진행 과정 안내`} width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
            <section className="relative w-full"><Image src="/images/fixed/5.png" alt={`${region} 배관 청소 고객 후기 모음`} width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>

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

            <section className="relative w-full text-center bg-black"><Image src="/images/fixed/6.png" alt={`${region} ${keyword} 24시간 고객센터 연락처`} width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" /></section>
        </div>
    );
}
