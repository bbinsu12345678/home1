import MainPage from "../components/MainPage";
import type { Metadata } from "next";
import { generateNaverSeo } from "../utils/seoGenerator";
import { SITE_NAME, SITE_URL } from "../utils/siteConfig";

const MAIN_REGION = "전주 광주";
const MAIN_KEYWORD = "배관막힘";
const FAQ_SOURCE_ID = "1";

const homeTitle = `전주 광주 변기막힘 하수구막힘 싱크대막힘 24시간 긴급출동 | 바나나배관`;
const homeDescription = `전주, 광주, 전북, 전남 변기막힘·하수구막힘·싱크대막힘 24시간 긴급출동. 출장비 무료, 선견적 후시공 원칙.`;
const homeKeywords = [
    "전주 변기막힘",
    "전주 하수구막힘",
    "전주 싱크대막힘",
    "전주 배관막힘",
    "광주 변기막힘",
    "광주 하수구막힘",
    "광주 싱크대막힘",
    "광주 배관막힘",
    "전북 배관막힘",
    "전남 배관막힘",
    "에어컨배관막힘",
    "에어컨배관청소",
    "정화조막힘",
    "정화조뚫기",
    "배관막힘 24시간",
    "변기막힘 긴급출동",
];

const ogImageUrl = `${SITE_URL}/images/og-image.png`;

export const metadata: Metadata = {
    title: homeTitle,
    description: homeDescription,
    keywords: homeKeywords,
    openGraph: {
        title: homeTitle,
        description: homeDescription,
        url: `${SITE_URL}/`,
        siteName: SITE_NAME,
        type: "website",
        locale: "ko_KR",
        images: [
            {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: "전주 광주 변기막힘 하수구막힘 싱크대막힘 전문 바나나배관",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: homeTitle,
        description: homeDescription,
        images: [
            {
                url: ogImageUrl,
                alt: "전주 광주 변기막힘 하수구막힘 싱크대막힘 전문 바나나배관",
            },
        ],
    },
    alternates: {
        canonical: `${SITE_URL}/`,
    },
    robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
    },
};

export default function Home() {
    const { faqs } = generateNaverSeo(MAIN_REGION, MAIN_KEYWORD, FAQ_SOURCE_ID);

    const plumberSchema = {
        "@context": "https://schema.org",
        "@type": "Plumber",
        name: SITE_NAME,
        description: homeDescription,
        url: `${SITE_URL}/`,
        telephone: "010-2115-3496",
        image: ogImageUrl,
        logo: `${SITE_URL}/images/brand_logo.png`,
        priceRange: "₩₩",
        address: {
            "@type": "PostalAddress",
            addressLocality: "전주시",
            addressRegion: "전북특별자치도",
            addressCountry: "KR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 35.82419,
            longitude: 127.14802,
        },
        areaServed: [
            { "@type": "City", name: "전주시" },
            { "@type": "City", name: "광주광역시" },
            { "@type": "City", name: "익산시" },
            { "@type": "City", name: "군산시" },
            { "@type": "City", name: "정읍시" },
            { "@type": "City", name: "남원시" },
            { "@type": "City", name: "김제시" },
            { "@type": "City", name: "목포시" },
            { "@type": "City", name: "여수시" },
            { "@type": "City", name: "순천시" },
        ],
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "342",
            bestRating: "5",
            worstRating: "1",
        },
        review: [
            {
                "@type": "Review",
                author: { "@type": "Person", name: "김민수" },
                datePublished: "2025-11-20",
                reviewBody: "새벽에 변기가 막혀서 급하게 전화했는데 30분 만에 오셔서 바로 해결해주셨어요. 가격도 합리적이고 친절했습니다.",
                reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            },
            {
                "@type": "Review",
                author: { "@type": "Person", name: "박지영" },
                datePublished: "2025-10-15",
                reviewBody: "싱크대 역류가 심했는데 고압세척으로 깔끔하게 처리해주셨어요. 작업 후 내시경으로 확인까지 시켜주셔서 믿음이 갔습니다.",
                reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            },
            {
                "@type": "Review",
                author: { "@type": "Person", name: "이승호" },
                datePublished: "2025-09-08",
                reviewBody: "하수구 막힘으로 연락드렸는데 견적부터 먼저 설명해주시고 작업도 빠르게 끝났습니다. 6개월 AS 보장도 좋네요.",
                reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            },
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "배관 서비스",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "변기막힘 해결",
                        description: "가정용·상업용 변기 막힘 진단 및 고압세척, 내시경 점검. 현장 상황에 따라 추가 비용이 발생할 수 있습니다.",
                    },
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        priceCurrency: "KRW",
                        minPrice: "50000",
                        maxPrice: "300000",
                        description: "단순 막힘 5만원~, 배관 해체·교체 시 10~30만원 (현장 상황에 따라 추가 비용 발생 가능)",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "하수구막힘 해결",
                        description: "주방·욕실·외부 하수구 막힘 고압세척 및 배관 청소. 현장 상황에 따라 추가 비용이 발생할 수 있습니다.",
                    },
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        priceCurrency: "KRW",
                        minPrice: "50000",
                        maxPrice: "350000",
                        description: "단순 막힘 5만원~, 고압세척 시 15~35만원 (현장 상황에 따라 추가 비용 발생 가능)",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "싱크대막힘 해결",
                        description: "싱크대 배수관 막힘, 기름때 제거, 배관 교체. 현장 상황에 따라 추가 비용이 발생할 수 있습니다.",
                    },
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        priceCurrency: "KRW",
                        minPrice: "50000",
                        maxPrice: "250000",
                        description: "단순 막힘 5만원~, 배관 교체 시 10~25만원 (현장 상황에 따라 추가 비용 발생 가능)",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "에어컨배관 청소",
                        description: "에어컨 드레인 배관 막힘 해결, 곰팡이·슬라임 제거. 현장 상황에 따라 추가 비용이 발생할 수 있습니다.",
                    },
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        priceCurrency: "KRW",
                        minPrice: "60000",
                        maxPrice: "200000",
                        description: "드레인 배관 뚫기 6만원~, 고압세척 포함 시 12~20만원 (현장 상황에 따라 추가 비용 발생 가능)",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "정화조막힘 해결",
                        description: "정화조 막힘, 오수 역류, 정화조 청소 및 배관 세척. 현장 상황에 따라 추가 비용이 발생할 수 있습니다.",
                    },
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        priceCurrency: "KRW",
                        minPrice: "150000",
                        maxPrice: "500000",
                        description: "정화조 뚫기 15만원~, 청소+세척 시 30~50만원 (현장 상황에 따라 추가 비용 발생 가능)",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "배관 고압세척",
                        description: "전문 고압세척 장비로 배관 내벽 기름때·석회질 완전 제거. 현장 상황에 따라 추가 비용이 발생할 수 있습니다.",
                    },
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        priceCurrency: "KRW",
                        minPrice: "150000",
                        maxPrice: "500000",
                        description: "배관 길이·구조에 따라 15~50만원 (현장 상황에 따라 추가 비용 발생 가능)",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "배관 내시경 점검",
                        description: "초고화질 카메라로 배관 내부 상태 정밀 진단. 현장 상황에 따라 추가 비용이 발생할 수 있습니다.",
                    },
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        priceCurrency: "KRW",
                        minPrice: "50000",
                        maxPrice: "150000",
                        description: "내시경 점검 5만원~, 배관 길이에 따라 변동 (현장 상황에 따라 추가 비용 발생 가능)",
                    },
                },
            ],
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        inLanguage: "ko-KR",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(plumberSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <MainPage faqs={faqs} />
        </>
    );
}
