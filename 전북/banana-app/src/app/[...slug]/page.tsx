import BananaTemplate from "@/components/BananaTemplate";
import regions from "../../../data/regions.json";
import keywords from "../../../data/keywords.json";
import { generatePermutations } from "@/utils/seo";

// [slug] 구조: [시도, 시군구, 읍면동, 키워드조합]
// 예: /전북특별자치도/전주시/완산구/삼천동3가/변기막힘싱크대막힘

export async function generateStaticParams() {
    const paths = [];

    // 전체 지역에 대해 페이지 생성 (SEO 최적화)
    const targetRegions = regions;

    // 키워드 조합 생성 (Top 3 키워드 순열)
    const baseKeywords = keywords.basic.slice(0, 3); // 변기, 싱크대, 하수구
    const perms = generatePermutations(baseKeywords);

    for (const region of targetRegions) {
        for (const perm of perms) {
            // 키워드 조합 문자열 생성 (예: 변기막힘싱크대막힘 10곳 비교)
            // tailing 문구가 여러 개일 경우, 여기서는 첫 번째 것을 사용하거나 루프를 돌릴 수 있음.
            // 일단 단순화를 위해 '10곳 비교' (tailing[0]) 만 사용하거나, 랜덤하게 적용.
            // 요구사항: "SEO 랜딩페이지를 자동 생성하여 대량 배포" -> 다양한 조합 필요.

            // 모든 꼬리 문구에 대해 페이지 생성 (페이지 수 폭증 주의 - 테스트 단계에선 하나만)
            // const tail = keywords.tailing[Math.floor(Math.random() * keywords.tailing.length)]; 
            // 하지만 generateStaticParams는 빌드 시 정해져야 하므로 random은 좋지 않음 (hydra mismatch).

            // 모든 꼬리 문구에 대해 페이지 생성
            const tails = keywords.tail && keywords.tail.length > 0 ? keywords.tail : ["10곳 비교"];

            for (const tail of tails) {
                const keywordStr = `${perm.join("")} ${tail}`;

                paths.push({
                    slug: [
                        region.sido,
                        region.si,
                        region.gugun,
                        region.dong,
                        keywordStr
                    ].filter(Boolean).map(s => encodeURIComponent(s))
                });
            }
        }
    }

    // 디버깅: 생성된 경로 일부 확인
    if (paths.length > 0) {
        console.log("Generated Paths Sample:", JSON.stringify(paths.slice(0, 3), null, 2));
    }

    return paths;
}

export const dynamicParams = false; // Static export requires all paths to be pre-generated

type Params = Promise<{ slug: string[] }>;

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params;
    if (!slug || slug.length < 5) return {};

    // URL 디코딩 처리
    const decodedSlug = slug.map(s => decodeURIComponent(s));
    const regionPart = decodedSlug.slice(0, 4).join(" "); // 시도, 시, 구군, 동
    const keywordPart = decodedSlug[4]; // 5번째가 키워드

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://banana-piping.com';
    const pageUrl = `${siteUrl}/${decodedSlug.map(s => encodeURIComponent(s)).join('/')}`;

    // 구조화된 데이터 (Schema.org JSON-LD) - 지역 비즈니스
    const localBusinessData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `바나나배관 올케어 ${regionPart}`,
        "description": `${regionPart} ${keywordPart} 전문 업체. 30분내 방문, 출장비 무료, 못 뚫으면 0원!`,
        "image": `${siteUrl}/images/brand_logo.png`,
        "address": {
            "@type": "PostalAddress",
            "addressRegion": regionPart,
            "addressCountry": "KR"
        },
        "telephone": "010-8184-3496",
        "priceRange": "₩₩",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
            "@type": "Place",
            "name": regionPart
        },
        "serviceType": keywordPart,
        "url": pageUrl,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
        }
    };

    // 빵 부스러기 (Breadcrumb) 구조화 데이터
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "홈",
                "item": siteUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": decodedSlug[0],
                "item": `${siteUrl}/${encodeURIComponent(decodedSlug[0])}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": decodedSlug[1],
                "item": `${siteUrl}/${encodeURIComponent(decodedSlug[0])}/${encodeURIComponent(decodedSlug[1])}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": `${regionPart} ${keywordPart}`,
                "item": pageUrl
            }
        ]
    };

    return {
        title: `${regionPart} ${keywordPart}`,
        description: `${regionPart} ${keywordPart} 전문 업체. 30분내 방문, 출장비 무료, 못 뚫으면 0원! 24시간 긴급출동 서비스. 전화: 010-8184-3496`,
        keywords: [regionPart, keywordPart, "배관막힘", "긴급출동", "24시간", "출장비무료", "바나나배관", "전북", decodedSlug[0], decodedSlug[1], decodedSlug[2], decodedSlug[3]],
        openGraph: {
            title: `${regionPart} ${keywordPart}`,
            description: `전국 30분 출동! ${regionPart} 배관 막힘 해결은 바나나배관에서. 24시간 긴급출동`,
            type: "website",
            locale: "ko_KR",
            url: pageUrl,
            siteName: "바나나배관 올케어",
            images: [
                {
                    url: `${siteUrl}/images/brand_logo.png`,
                    width: 800,
                    height: 600,
                    alt: `${regionPart} ${keywordPart} - 바나나배관 올케어`,
                }
            ],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: pageUrl
        },
        other: {
            'application/ld+json': JSON.stringify([localBusinessData, breadcrumbData])
        }
    };
}

export default async function Page({ params }: { params: Params }) {
    const { slug } = await params;

    // slug 길이 검증
    if (!slug || slug.length < 5) {
        // 기본 페이지 반환
        return <BananaTemplate
            region="전국"
            keyword="배관막힘 해결"
            lat={35.8242}
            lng={127.1480}
        />;
    }

    const decodedSlug = slug.map(s => decodeURIComponent(s));

    const regionName = decodedSlug.slice(0, 4).join(" "); // 시도, 시, 구군, 동
    const keywordStr = decodedSlug[4]; // 5번째가 키워드

    // regions.json에서 해당 지역 찾기 (좌표 확보용)
    const targetRegion = regions.find(r =>
        r.sido === decodedSlug[0] &&
        r.si === decodedSlug[1] &&
        r.gugun === decodedSlug[2] &&
        r.dong === decodedSlug[3]
    );

    // 기본값은 전주시청 좌표
    const lat = targetRegion?.lat || 35.8242;
    const lng = targetRegion?.lng || 127.1480;

    return <BananaTemplate region={regionName} keyword={keywordStr} lat={lat} lng={lng} />;
}
