import { FAQ_BASE, FAQItem } from '../data/faqBase';
import { SITE_URL } from './siteConfig';

export interface SeoData {
    title: string;
    description: string;
    jsonLd: string;
    faqs: FAQItem[];
}

export const generateNaverSeo = (
    region: string,
    keyword: string,
    pageId: string
): SeoData => {
    const idNum = Number.parseInt(pageId.replace(/[^0-9]/g, ''), 10) || 0;

    const isAircon = keyword.includes('에어컨');
    const isSepticTank = keyword.includes('정화조');

    let titlePatterns: string[];
    let descriptionPatterns: string[];

    if (isAircon) {
        titlePatterns = [
            `${region} 에어컨배관 막힘·청소 전문 해결`,
            `${region} 에어컨 드레인 배관 막힘 긴급 출동`,
            `${region} 에어컨배관청소 견적 비교 안내`,
            `${region} 에어컨 배관 뚫기·세척 전문 업체`,
            `${region} 에어컨 물 떨어짐? 배관 막힘 원인 점검`,
            `${region} 에어컨배관막힘 고압세척으로 완벽 해결`,
        ];
        descriptionPatterns = [
            `${region} 에어컨 배관 막힘, 드레인 호스 청소를 전문 장비로 해결합니다. 곰팡이·슬라임 제거, 냉방 효율 개선까지 한번에 처리합니다.`,
            `${region} 에어컨에서 물이 떨어지나요? 드레인 배관 막힘이 원인일 수 있습니다. 고압 세척으로 배관 내부를 깨끗하게 청소합니다.`,
            `${region} 에어컨배관 막힘·청소·뚫기 전문. 여름철 에어컨 배관 트러블을 신속하게 진단하고 현장에서 바로 해결합니다.`,
        ];
    } else if (isSepticTank) {
        titlePatterns = [
            `${region} 정화조 막힘·청소 전문 해결`,
            `${region} 정화조 배관 뚫기 긴급 출동`,
            `${region} 정화조막힘 고압세척 견적 안내`,
            `${region} 정화조 오수 역류? 원인 진단 후 해결`,
            `${region} 정화조 배관청소 전문 업체 추천`,
            `${region} 정화조뚫기·배관세척 합리적 비용`,
        ];
        descriptionPatterns = [
            `${region} 정화조 막힘, 오수 역류, 악취 문제를 전문 장비로 해결합니다. 고압 세척과 흡입 장비로 정화조 내부와 연결 배관을 철저히 청소합니다.`,
            `${region} 정화조가 막혔을 때 방치하면 오수 역류와 악취로 큰 피해가 발생합니다. 배관 내시경으로 원인을 파악하고 즉시 뚫기 작업을 진행합니다.`,
            `${region} 단독주택, 농가, 식당의 정화조 막힘 전문. 정화조 청소부터 배관 뚫기까지 원스톱으로 해결합니다.`,
        ];
    } else {
        titlePatterns = [
            `${region} ${keyword} 해결 가이드 및 견적 문의`,
            `${region} ${keyword} 막힘 해결부터 사후 관리까지`,
            `${region} ${keyword} 정직한 진단과 합리적 비용 안내`,
            `${region} ${keyword} 원인 진단 후 빠른 해결 진행`,
            `${region} ${keyword} 24시간 긴급 출동 안내`,
            `${region} ${keyword} 실패 없는 업체 선택 체크리스트`,
        ];
        descriptionPatterns = [
            `${region} ${keyword} 문제를 빠르게 점검하고 해결 방향을 안내합니다. 현장 상황에 맞는 장비와 작업 순서를 기준으로 합리적인 상담을 제공합니다.`,
            `${region} ${keyword} 작업 전 원인 파악과 예상 작업 범위를 먼저 설명합니다. 불필요한 작업 없이 필요한 조치만 안내하는 운영 기준을 반영했습니다.`,
            `${region} ${keyword} 막힘, 역류, 악취 문제를 점검하고 대응합니다. 지역 현장 경험을 바탕으로 방문 전 상담부터 사후 관리 포인트까지 정리했습니다.`,
        ];
    }

    const title = titlePatterns[idNum % titlePatterns.length];
    const description = descriptionPatterns[idNum % descriptionPatterns.length];
    const faqCount = 3 + (idNum % 2);
    const faqs: FAQItem[] = [];

    for (let index = 0; index < faqCount; index++) {
        const item = FAQ_BASE[(idNum + index) % FAQ_BASE.length];
        faqs.push({
            ...item,
            question: item.question.replace(/\{\{region\}\}/g, region).replace(/\{\{keyword\}\}/g, keyword),
            answer: item.answer.replace(/\{\{region\}\}/g, region).replace(/\{\{keyword\}\}/g, keyword),
        });
    }

    const pageUrl = `${SITE_URL}/${pageId}/`;
    const imageUrl = `${SITE_URL}/images/og-image.png`;
    const schemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'Plumber',
            name: '바나나배관',
            description,
            url: pageUrl,
            telephone: '010-2115-3496',
            image: imageUrl,
            logo: `${SITE_URL}/images/brand_logo.png`,
            priceRange: '₩₩',
            address: {
                '@type': 'PostalAddress',
                addressLocality: region.split(' ')[0],
                addressRegion: '전북특별자치도',
                addressCountry: 'KR',
            },
            openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '00:00',
                closes: '23:59',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '342',
                bestRating: '5',
                worstRating: '1',
            },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: '배관 서비스',
                itemListElement: [
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '변기막힘 해결' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '하수구막힘 해결' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '싱크대막힘 해결' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '에어컨배관 청소' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '정화조막힘 해결' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '배관 고압세척' } },
                ],
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        },
    ];

    return {
        title,
        description,
        jsonLd: JSON.stringify(schemas),
        faqs,
    };
};
