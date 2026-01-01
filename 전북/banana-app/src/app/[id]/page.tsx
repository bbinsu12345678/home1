import BananaTemplate from "@/components/BananaTemplate";
import { getAllPages, getPageById } from "../../utils/pageData";
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

    // Decode logic is no longer needed as we use the pre-calculated slug from pageData
    // The slug in pageData is already [sido, si, gugun, dong, keywordStr]

    const regionPart = `${region.sido} ${region.si} ${region.gugun} ${region.dong}`.replace(/  +/g, ' ').trim();
    const keywordPart = slug[4]; // The keyword string (e.g. "변기막힘 10곳 비교")

    const siteUrl = 'https://bananajeonju.netlify.app';
    // Canonical URL uses the ID now
    const pageUrl = `${siteUrl}/${id}`;

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
        "url": pageUrl,
    };

    return {
        title: `${regionPart} ${keywordPart}`,
        description: `${regionPart} ${keywordPart} 전문 업체. 30분내 방문, 출장비 무료!`,
        openGraph: {
            title: `${regionPart} ${keywordPart}`,
            description: `전국 30분 출동! ${regionPart} 배관 막힘 해결은 바나나배관에서.`,
            url: pageUrl,
            images: [`${siteUrl}/images/brand_logo.png`],
        },
        alternates: {
            canonical: pageUrl
        },
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

    return (
        <BananaTemplate
            region={regionName}
            keyword={keywordStr}
            lat={region.lat}
            lng={region.lng}
        />
    );
}
