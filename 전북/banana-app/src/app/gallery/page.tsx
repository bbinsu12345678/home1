import { Suspense } from "react";
import GalleryClient from "@/components/GalleryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "전주 익산 군산 목포 여수 순천 변기막힘 하수구막힘 싱크대막힘 | 바나나배관",
  description: "전주시 익산시 군산시 김제시 남원시 정읍시 목포시 여수시 순천시 광양시 나주시 담양군 곡성군 구례군 고흥군 보성군 화순군 장흥군 강진군 해남군 영암군 무안군 함평군 영광군 장성군 완도군 진도군 신안군. 변기막힘 변기역류, 하수구막힘 하수구역류, 싱크대막힘 싱크대역류. 뚫음 고압세척 배관청소 수리 교체. 24시간 긴급출동 출장비무료",
};

// CollectionPage 스키마 - 갤러리 페이지
const galleryPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://bananajeonju.netlify.app/gallery#collectionpage",
  "url": "https://bananajeonju.netlify.app/gallery",
  "name": "전북 전남 광주 전체 업체 목록",
  "description": "전북, 전남, 광주 전 지역 배관막힘 전문 업체 2,002개 전체 목록",
  "isPartOf": { "@id": "https://bananajeonju.netlify.app/#website" },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://bananajeonju.netlify.app/" },
      { "@type": "ListItem", "position": 2, "name": "전체 업체 목록", "item": "https://bananajeonju.netlify.app/gallery" }
    ]
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 4860,
    "itemListOrder": "https://schema.org/ItemListOrderAscending"
  },
  "inLanguage": "ko-KR"
};

// 로딩 스켈레톤 컴포넌트
function GalleryLoading() {
  return (
    <section className="py-8 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* 필터 스켈레톤 */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>

        {/* 총 개수 스켈레톤 */}
        <div className="mb-4 w-32 h-5 bg-gray-200 rounded animate-pulse"></div>

        {/* 카드 그리드 스켈레톤 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryPageJsonLd).replace(/</g, '\\u003c') }}
      />
      <Suspense fallback={<GalleryLoading />}>
        <GalleryClient />
      </Suspense>
    </>
  );
}
