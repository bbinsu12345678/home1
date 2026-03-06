import BananaTemplate from "@/components/BananaTemplate";
import Pagination from "@/components/Pagination";
import { getAllPages, getPageById } from "../../utils/pageData";
import { generateEnhancedSeo } from "../../utils/seoGenerator";
import NaverSeoResults from "@/components/NaverSeoResults";
import { Metadata } from "next";

// [id] structure: /1, /2, /3 ...

export async function generateStaticParams() {
    // ISR 최적화: 정적 빌드 시 17,000개 페이지 생성을 스킵하고, 
    // 방문자가 접속할 때 실시간 생성 후 엣지 서버에 캐싱(ISR)
    return [];
}

export const dynamicParams = true;
export const revalidate = 86400; // ISR: 24시간 캐싱

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    const pageData = getPageById(id);

    if (!pageData) return {};

    const { region, keywordPermutation, tail } = pageData;
    const regionPart = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`.replace(/  +/g, ' ').trim();
    const keywordPart = `${keywordPermutation.join("")} ${tail}`;

    const { title, description, keywords } = generateEnhancedSeo(regionPart, keywordPart, id);
    const siteUrl = 'https://bananajeonju.netlify.app';
    const pageUrl = `${siteUrl}/${id}`;

    // 참조 사이트와 동일하게 고정 날짜 사용
    const publishedTime = '2025-12-11T15:23:54+01:00';
    const modifiedTime = new Date().toISOString();

    return {
        title: title,
        description: description,
        keywords: keywords,
        openGraph: {
            title: title,
            description: description,
            url: pageUrl,
            siteName: "바나나배관",
            type: "website",
            locale: "ko_KR",
            images: [{
                url: `${siteUrl}/images/fixed/1.png`,
                width: 1200,
                height: 630,
                alt: `${regionPart} ${keywordPart} 전문 업체 안내`,
                type: 'image/png',
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [{
                url: `${siteUrl}/images/fixed/1.png`,
                alt: `${regionPart} ${keywordPart} 긴급 출동`,
            }],
        },
        alternates: {
            canonical: pageUrl
        },
        robots: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1
        },
        other: {
            "article:published_time": publishedTime,
            "article:modified_time": modifiedTime,
        }
    };
}

export default async function Page({ params }: { params: Params }) {
    const { id } = await params;
    const pageData = getPageById(id);

    if (!pageData) {
        return <div>Page not found</div>;
    }

    const { region, keywordPermutation, tail } = pageData;
    const regionName = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`.replace(/  +/g, ' ').trim();
    const keywordStr = `${keywordPermutation.join("")} ${tail}`;

    // 새로운 네이버 SEO 엔진 로드 (FAQ 포함)
    const { jsonLd, faqs } = generateEnhancedSeo(regionName, keywordStr, id);

    // 결정론적 이미지 생성 (하이드레이션 오류 방지)
    const allImages = [
        "mosa0Y8lYT.jpeg", "mosa2gPbHX.jpeg", "mosa3D8Gab.6.2.jpeg", "mosa8spaNb.jpeg",
        "mosa9dnYZs.jpeg", "mosaB3IvNk.jpeg", "mosaB3QObb.jpeg", "mosabHYILN.jpeg", "mosadLfcMh.jpeg",
        "mosafCgw5S.jpeg", "mosafJz54o (1).jpeg", "mosafJz54o.jpeg", "mosafL01FA.jpeg", "mosagIETul.jpeg",
        "mosaJpDpZb.jpeg", "mosaKPQYdr.jpeg", "mosakVv0h6.jpeg", "mosalUquvU.jpeg", "mosaM7CH6v.jpeg",
        "mosalUquvU.jpeg", "mosaM7CH6v.jpeg",
        "mosamq09Ao.jpeg", "mosaObRZud.jpeg", "mosaOjUE3R.jpeg", "mosaq4e7id.4.24.jpeg", "mosaTJFa9v.jpeg",
        "mosaTs7udR.jpeg", "mosauARsUn.jpeg", "mosaVSOo76.jpeg", "mosaxhVHYI.jpeg", "mosaY4eUs8.jpeg",
        "mosaym1mh0 (1).jpeg", "mosayO3qdw.jpeg", "mosaZtCFWi.jpeg"
    ];

    // 페이지 ID를 기반으로 이미지 선택 (결정론적)
    const idNum = parseInt(id) || 0;
    const galleryImages = Array.from({ length: 7 }, (_, i) =>
        allImages[(idNum + i) % allImages.length]
    );

    // BreadcrumbList schema for search breadcrumbs
    const siteUrl = 'https://bananajeonju.netlify.app';
    const pageUrl = `${siteUrl}/${id}`;
    const breadcrumbSchema = {
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
                "name": `${regionName} ${keywordStr}`,
                "item": pageUrl
            }
        ]
    };

    return (
        <>
            <NaverSeoResults jsonLd={jsonLd} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <BananaTemplate
                region={regionName}
                keyword={keywordStr}
                lat={region.lat}
                lng={region.lng}
                faqs={faqs}
                pageId={id}
                galleryImages={galleryImages}
            />
            <Pagination currentPage={parseInt(id)} />
        </>
    );
}
