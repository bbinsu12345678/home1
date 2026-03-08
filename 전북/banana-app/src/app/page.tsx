import MainPage from "../components/MainPage";
import type { Metadata } from "next";
import { generateNaverSeo } from "../utils/seoGenerator";
import { SITE_NAME, SITE_URL } from "../utils/siteConfig";

const MAIN_REGION = "전북 전남 광주";
const MAIN_KEYWORD = "배관막힘";
const FAQ_SOURCE_ID = "1";

const homeTitle = `${MAIN_REGION} ${MAIN_KEYWORD} 24시간 상담 안내`;
const homeDescription = `${MAIN_REGION} 지역의 배관막힘, 하수구막힘, 변기막힘, 싱크대막힘, 에어컨배관청소, 정화조막힘 전문 상담 정보를 정리한 메인 페이지입니다.`;
const homeKeywords = [
    "전북 배관막힘",
    "전남 배관막힘",
    "광주 배관막힘",
    "하수구막힘",
    "변기막힘",
    "싱크대막힘",
    "에어컨배관막힘",
    "에어컨배관청소",
    "정화조막힘",
    "정화조청소",
    "정화조뚫기",
];

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
                url: `${SITE_URL}/images/fixed/1.png`,
                width: 1200,
                height: 630,
                alt: `${MAIN_REGION} ${MAIN_KEYWORD}`,
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
                url: `${SITE_URL}/images/fixed/1.png`,
                alt: `${MAIN_REGION} ${MAIN_KEYWORD}`,
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
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE_NAME,
        description: homeDescription,
        url: `${SITE_URL}/`,
        areaServed: MAIN_REGION,
        telephone: "010-2115-3496",
        image: `${SITE_URL}/images/fixed/1.png`,
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <MainPage faqs={faqs} />
        </>
    );
}
