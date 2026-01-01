import BananaTemplate from "../components/BananaTemplate";
import regions from "../../data/regions.json";
import keywords from "../../data/keywords.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "바나나배관 올케어 | 전북 전국 24시 배관막힘 긴급출동",
  description: "전북 전 지역 30분 내 빠른 출동! 변기막힘, 싱크대막힘, 하수구막힘 해결 전문. 못 뚫으면 0원, 출장비 무료!",
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

  return (
    <BananaTemplate
      region={defaultRegion.full}
      keyword={defaultKeyword}
      lat={35.8049} // 전주시청 좌표 근처 (임의 설정)
      lng={127.1145}
    />
  );
}
