import BananaTemplate from "@/components/BananaTemplate";
import { getAllPages, getPageById } from "../../utils/pageData";
import { generateJsonLd, generateSeoDescription } from "../../utils/seo";
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

    const { region, slug } = pageData;
    const regionPart = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`.replace(/  +/g, ' ').trim();
    const keywordPart = slug[4]; // The keyword string (e.g. "변기막힘 10곳 비교" or similar from permutation)

    // Construct the requested title format: {Region} {Keyword} {Suffix}
    // Note: slug[4] might already contain the keyword + tail, or just keyword.
    // In pageData.ts: keywordStr = `${perm.join("")} ${tail}`;
    // So slug[4] is exactly what we need.
    const title = `${regionPart} ${keywordPart}`;

    const description = generateSeoDescription(regionPart, keywordPart);
    const siteUrl = 'https://bananajeonju.netlify.app';
    const pageUrl = `${siteUrl}/${id}`;

    const publishedTime = new Date('2025-12-11T15:23:54+01:00').toISOString(); // Reference site date or dynamic
    const modifiedTime = new Date().toISOString();

    return {
        title: title,
        description: description,
        keywords: [regionPart, "욕실 막힘", "하수구막힘", "변기막힘", "싱크대막힘", "배관청소", "수도설비", keywordPart],
        openGraph: {
            title: title,
            description: description,
            url: pageUrl,
            siteName: "지역업체 안내",
            type: "website",
            locale: "ko_KR",
            images: [{
                url: `${siteUrl}/images/brand_logo.png`,
                width: 800,
                height: 600,
                alt: title,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [`${siteUrl}/images/brand_logo.png`],
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

    const { region, slug } = pageData;
    const regionName = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`.replace(/  +/g, ' ').trim();
    const keywordStr = slug[4];

    // Generate JSON-LD
    const { articleSchema, faqSchema } = generateJsonLd(regionName, keywordStr);

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
            <BananaTemplate
                region={regionName}
                keyword={keywordStr}
                lat={region.lat}
                lng={region.lng}
            />
        </>
    );
}
