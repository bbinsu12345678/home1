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

    const titlePatterns = [
        `${region} ${keyword} 해결 가이드 및 견적 문의`,
        `${region} ${keyword} 막힘 해결부터 사후 관리까지`,
        `${region} ${keyword} 정직한 진단과 합리적 비용 안내`,
        `${region} ${keyword} 원인 진단 후 빠른 해결 진행`,
        `${region} ${keyword} 24시간 긴급 출동 안내`,
        `${region} ${keyword} 실패 없는 업체 선택 체크리스트`,
    ];
    const descriptionPatterns = [
        `${region} ${keyword} 문제를 빠르게 점검하고 해결 방향을 안내합니다. 현장 상황에 맞는 장비와 작업 순서를 기준으로 합리적인 상담을 제공합니다.`,
        `${region} ${keyword} 작업 전 원인 파악과 예상 작업 범위를 먼저 설명합니다. 불필요한 작업 없이 필요한 조치만 안내하는 운영 기준을 반영했습니다.`,
        `${region} ${keyword} 막힘, 역류, 악취 문제를 점검하고 대응합니다. 지역 현장 경험을 바탕으로 방문 전 상담부터 사후 관리 포인트까지 정리했습니다.`,
    ];

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
    const imageUrl = `${SITE_URL}/images/fixed/1.png`;
    const schemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `${region} ${keyword} 전문 안내`,
            description,
            url: pageUrl,
            telephone: '010-0000-0000',
            image: imageUrl,
            address: {
                '@type': 'PostalAddress',
                addressLocality: region,
                addressCountry: 'KR',
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
