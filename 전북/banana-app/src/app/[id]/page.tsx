import BananaTemplate from "@/components/BananaTemplate";
import NaverSeoResults from "@/components/NaverSeoResults";
import Pagination from "@/components/Pagination";
import { getAllPageIds, getAllPages, getPageById } from "../../utils/pageData";
import { generateNaverSeo } from "../../utils/seoGenerator";
import { SITE_URL } from "../../utils/siteConfig";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return getAllPages().map((page) => ({
        id: page.id,
    }));
}

export const dynamicParams = false;

type Params = Promise<{ id: string }>;

const buildPageUrl = (id: string) => `${SITE_URL}/${id}/`;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    const pageData = getPageById(id);

    if (!pageData) {
        return {
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const { region, keywordPermutation, tail } = pageData;
    const regionPart = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`
        .replace(/  +/g, " ")
        .trim();
    const keywordPart = `${keywordPermutation.join("")} ${tail}`;
    const { title, description } = generateNaverSeo(regionPart, keywordPart, id);
    const pageUrl = buildPageUrl(id);
    const imageUrl = `${SITE_URL}/images/fixed/1.png`;
    const publishedTime = "2025-12-11T15:23:54+01:00";
    const modifiedTime = new Date().toISOString();

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "Local Service Guide",
            type: "website",
            locale: "ko_KR",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${regionPart} ${keywordPart}`,
                    type: "image/png",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    alt: `${regionPart} ${keywordPart}`,
                },
            ],
        },
        alternates: {
            canonical: pageUrl,
        },
        robots: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
        other: {
            "article:published_time": publishedTime,
            "article:modified_time": modifiedTime,
        },
    };
}

export default async function Page({ params }: { params: Params }) {
    const { id } = await params;
    const pageData = getPageById(id);

    if (!pageData) {
        notFound();
    }

    const { region, keywordPermutation, tail } = pageData;
    const regionName = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`
        .replace(/  +/g, " ")
        .trim();
    const keyword = `${keywordPermutation.join("")} ${tail}`;
    const { jsonLd, faqs } = generateNaverSeo(regionName, keyword, id);
    const pageUrl = buildPageUrl(id);
    const pageIds = getAllPageIds();
    const currentPageId = Number(id);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: `${regionName} ${keyword}`,
                item: pageUrl,
            },
        ],
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
                keyword={keyword}
                lat={region.lat}
                lng={region.lng}
                faqs={faqs}
                pageId={id}
            />
            <Pagination currentPage={currentPageId} pageIds={pageIds} />
        </>
    );
}
