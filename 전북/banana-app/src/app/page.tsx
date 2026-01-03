import BananaTemplate from "../components/BananaTemplate";
import regions from "../../data/regions.json";
import keywords from "../../data/keywords.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "전주시 전북 배관막힘 10곳 견적 비교는 어떻게 해야 효율적일까요?",
  description: "전주시 전북 일대 배관막힘 등 5개 업종 기준으로 검색에서 찾은 업체 중 위치·주소 정보가 명확한 곳의 위치와 지도를 한 화면에서 확인할 수 있습니다.",
  keywords: ["전주시", "전북", "배관막힘", "변기막힘", "싱크대막힘", "하수구막힘", "배관청소", "24시간 출동", "긴급출동"],
  openGraph: {
    title: "전주시 전북 배관막힘 10곳 견적 비교",
    description: "전주시 전북 일대 배관막힘 등 5개 업종 기준으로 검색에서 찾은 업체 중 위치·주소 정보가 명확한 곳의 위치와 지도를 한 화면에서 확인할 수 있습니다.",
    url: "https://bananajeonju.netlify.app",
    siteName: "지역업체 안내",
    type: "website",
    locale: "ko_KR",
    images: [{
      url: "https://bananajeonju.netlify.app/images/fixed/1.png",
      width: 1200,
      height: 630,
      alt: "전주시 전북 배관막힘 전문 업체 안내",
      type: 'image/png',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "전주시 전북 배관막힘 10곳 견적 비교",
    description: "전주시 전북 일대 배관막힘 업체 정보",
    images: [{
      url: "https://bananajeonju.netlify.app/images/fixed/1.png",
      alt: "전주시 전북 배관막힘 긴급 출동",
    }],
  },
  alternates: {
    canonical: "https://bananajeonju.netlify.app"
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1
  },
  other: {
    "article:published_time": "2025-12-11T15:23:54+01:00",
    "article:modified_time": new Date().toISOString(),
  }
};

export default function Home() {
  // 기본값 설정 (전주시 완산구 삼천동3가 / 변기막힘)
  const defaultRegion = regions[0];
  const defaultKeyword = keywords.basic[0];

  const siteUrl = 'https://bananajeonju.netlify.app';
  const regionName = "전주시 전북";
  const keywordStr = "배관막힘";

  // LocalBusiness Schema for main page
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${regionName} ${keywordStr} 전문 업체 안내`,
    "description": `${regionName} 지역의 ${keywordStr}, 변기막힘, 싱크대막힘, 하수구막힘 전문 업체 정보를 제공합니다. 24시간 긴급 출동 서비스.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "전주시",
      "addressRegion": "전라북도",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.8049",
      "longitude": "127.1145"
    },
    "url": siteUrl,
    "telephone": "0507-1234-5678",
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "₩₩",
    "areaServed": {
      "@type": "City",
      "name": regionName
    }
  };

  // Organization Schema for main page
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "지역업체 안내",
    "url": siteUrl,
    "logo": `${siteUrl}/images/brand_logo.png`,
    "description": "전국 배관막힘, 하수구막힘, 변기막힘 전문 업체 정보 제공",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "0507-1234-5678",
      "contactType": "customer service",
      "areaServed": "KR",
      "availableLanguage": "Korean"
    },
    "sameAs": [
      siteUrl
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <BananaTemplate
        region={defaultRegion.full}
        keyword={defaultKeyword}
        lat={35.8049} // 전주시청 좌표 근처 (임의 설정)
        lng={127.1145}
      />
    </>
  );
}
