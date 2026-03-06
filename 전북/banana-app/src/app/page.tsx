import MainPage from "../components/MainPage";
import { Metadata } from "next";
import { generateEnhancedSeo } from "../utils/seoGenerator";

// 메인 페이지용 대표 키워드 및 지역 설정
const MAIN_REGION = "전북 전남 광주";
const MAIN_KEYWORD = "배관막힘";
const PAGE_ID = "main";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description, keywords } = generateEnhancedSeo(MAIN_REGION, MAIN_KEYWORD, PAGE_ID);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "https://bananajeonju.netlify.app",
      siteName: "바나나배관",
      type: "website",
      locale: "ko_KR",
      images: [{
        url: "https://bananajeonju.netlify.app/images/fixed/1.webp",
        width: 1200,
        height: 630,
        alt: `${MAIN_REGION} ${MAIN_KEYWORD} 전문 업체 안내`,
        type: 'image/webp',
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{
        url: "https://bananajeonju.netlify.app/images/fixed/1.webp",
        alt: `${MAIN_REGION} ${MAIN_KEYWORD} 전문`,
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
      "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE", // 구글 서치콘솔 인증 (실제 코드로 교체 필요)
      "article:published_time": "2025-12-11T15:23:54+01:00",
      "article:modified_time": new Date().toISOString(),
    }
  };
}

export default function Home() {
  const { jsonLd, faqs } = generateEnhancedSeo(MAIN_REGION, MAIN_KEYWORD, PAGE_ID);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <MainPage faqs={faqs} />
    </>
  );
}
