import BananaTemplate from "@/components/BananaTemplate";
import Pagination from "@/components/Pagination";
import { getAllPages, getPageById } from "../../utils/pageData";
import { generateJsonLd, generateSeoDescription, generateSeoTitle } from "../../utils/seo";
import { Metadata } from "next";

// [id] structure: /1, /2, /3 ...

export async function generateStaticParams() {
    const pages = getAllPages();
    return pages.map((page) => ({
        id: page.id,
    }));
}

export const dynamicParams = false;

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    const pageData = getPageById(id);

    if (!pageData) return {};

    const { region, keywordPermutation, tail } = pageData;
    const regionPart = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`.replace(/  +/g, ' ').trim();
    const keywordPart = `${keywordPermutation.join("")} ${tail}`; // Fixed: use keywordPermutation and tail directly

    // 6가지 Title 패턴 사용
    const title = generateSeoTitle(regionPart, keywordPart, id);

    const description = generateSeoDescription(regionPart, keywordPart);
    const siteUrl = 'https://bananajeonju.netlify.app';
    const pageUrl = `${siteUrl}/${id}`;

    // 참조 사이트와 동일하게 고정 날짜 사용
    const publishedTime = '2025-12-11T15:23:54+01:00';
    const modifiedTime = new Date().toISOString();

    return {
        title: title,
        description: description,
        keywords: [regionPart, "욕실 막힘", "하수구막힘", "변기막힘", "싱크대막힘", "배관청소", "수도설비", "24시간 출동", keywordPart],
        openGraph: {
            title: title,
            description: description,
            url: pageUrl,
            siteName: "지역업체 안내",
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

    // Generate JSON-LD (Article, FAQ, Video)
    const { articleSchema, faqSchema, videoSchema } = generateJsonLd(regionName, keywordStr, id);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
            />
            <BananaTemplate
                region={regionName}
                keyword={keywordStr}
                lat={region.lat}
                lng={region.lng}
            />
            <Pagination currentPage={parseInt(id)} totalPages={2002} />
        </>
    );
}
