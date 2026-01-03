import { PageData } from "./pageData";

// Title 생성 함수 - 6가지 패턴을 페이지 ID 기반으로 순환
export const generateSeoTitle = (regionName: string, keyword: string, pageId: string): string => {
    const id = parseInt(pageId);
    const patterns = [
        `${regionName} ${keyword} 견적 비교는 어떻게 해야 효율적일까요?`,
        `${regionName} ${keyword} 가까운 곳`,
        `${regionName} ${keyword} 빠른 출동 업체`,
        `${regionName} ${keyword} 지도 보고 바로 문의하기`,
        `${regionName}에서 찾아본 ${keyword}`,
        `${regionName} ${keyword} 24시간 긴급 상담`
    ];
    return patterns[id % 6];
};

export const generateSeoDescription = (regionName: string, keyword: string): string => {
    return `${regionName} 일대 ${keyword} 등 5개 업종 기준으로 검색에서 찾은 업체 중 위치·주소 정보가 명확한 곳의 위치와 지도를 한 화면에서 확인할 수 있습니다.`;
};

import { FaqData } from "../data/faqs";

export const generateJsonLd = (regionName: string, keyword: string, pageId?: string, faqs: FaqData[] = []) => {
    // 참조 사이트와 동일하게 고정 날짜 사용
    const datePublished = "2025-12-11T15:23:54+01:00";
    const dateModified = new Date().toISOString();

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${regionName} ${keyword} 가까운 곳`,
        "author": {
            "@type": "Person",
            "name": "관리자"
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "publisher": {
            "@type": "Organization",
            "name": "지역업체 안내"
        },
        "image": {
            "@type": "ImageObject",
            "url": "https://bananajeonju.netlify.app/images/fixed/1.png",
            "width": 800,
            "height": 600
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.length > 0 ? faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        })) : [
            {
                "@type": "Question",
                "name": `${regionName} ${keyword} 관련 업체를 한 번에 확인할 수 있는 곳이 있나요?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${regionName} 지역 ${keyword} 등 관련 업종 업체를 한 곳에 모아 소개해 드리는 상담·안내 페이지입니다. 소개해 드리는 지역에서 검색되는 업종은 본문에 정리된 각 업체 정보와 연락처를 통해 직접 확인해 주세요.`
                }
            }
        ]
    };

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": `${regionName} ${keyword} 현장 영상`,
        "description": `${regionName} 지역 ${keyword} 실제 작업 케이스 - 바나나배관 전문가의 작업 과정`,
        "thumbnailUrl": "https://img.youtube.com/vi/DL-zlugGLvg/maxresdefault.jpg",
        "uploadDate": datePublished,
        "contentUrl": "https://www.youtube.com/watch?v=DL-zlugGLvg",
        "embedUrl": "https://www.youtube.com/embed/DL-zlugGLvg",
        "duration": "PT5M"
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `${regionName} ${keyword} 전문 업체`,
        "description": `${regionName} 지역의 ${keyword} 전문 업체 정보를 제공합니다. 24시간 긴급 출동 서비스.`,
        "address": {
            "@type": "PostalAddress",
            "addressRegion": regionName,
            "addressCountry": "KR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "35.8242",
            "longitude": "127.1480"
        },
        "telephone": "0507-1234-5678",
        "openingHours": "Mo-Su 00:00-24:00",
        "priceRange": "₩₩",
        "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "35.8242",
                "longitude": "127.1480"
            },
            "geoRadius": "50000"
        },
        "areaServed": {
            "@type": "City",
            "name": regionName
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${keyword} 서비스`,
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "변기 막힘 해결",
                        "description": "변기 막힘 긴급 출동 및 해결"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "싱크대 배관 청소",
                        "description": "싱크대 막힘 및 배관 청소 서비스"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "하수구 뚫음",
                        "description": "하수구 막힘 고압 세척 서비스"
                    }
                }
            ]
        }
    };

    return { articleSchema, faqSchema, videoSchema, localBusinessSchema };
};

export const generatePermutations = (arr: string[]): string[][] => {
    if (arr.length === 0) return [[]];
    const firstElem = arr[0];
    const rest = arr.slice(1);
    const permsWithoutFirst = generatePermutations(rest);
    const allPermutations: string[][] = [];

    permsWithoutFirst.forEach((perm) => {
        for (let i = 0; i <= perm.length; i++) {
            const permWithFirst = [...perm.slice(0, i), firstElem, ...perm.slice(i)];
            allPermutations.push(permWithFirst);
        }
    });

    return allPermutations;
};
