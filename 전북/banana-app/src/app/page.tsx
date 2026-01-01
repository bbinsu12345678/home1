import BananaTemplate from "../components/BananaTemplate";
import regions from "../../data/regions.json";
import keywords from "../../data/keywords.json";

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
