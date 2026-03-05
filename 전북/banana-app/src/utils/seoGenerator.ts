import { FAQ_BASE, FAQItem } from '../data/faqBase';
import { generateUltraEnhancedSeo } from './seoGeneratorEnhanced';

export interface SeoData {
    title: string;
    description: string;
    jsonLd: string;
    faqs: FAQItem[];
    keywords: string[];
}

/**
 * 2026년 최신 SEO 표준에 맞춘 고도화된 스키마 생성기
 * - 이제 generateUltraEnhancedSeo를 사용하여 더 강력한 SEO 제공
 * - E-E-A-T, AI 검색, 음성 검색 최적화
 * - 12개 타이틀 패턴, 15개 FAQ, 5개 스키마 타입
 */
export const generateEnhancedSeo = (
    region: string,
    keyword: string,
    pageId: string
): SeoData => {
    // 새로운 강화된 SEO 생성기를 사용
    return generateUltraEnhancedSeo(region, keyword, pageId);
};