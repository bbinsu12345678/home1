import Link from "next/link";
import { MapPinIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import regions from "../../data/regions.json";

// 시도별 매핑
const sidoMapping: Record<string, string> = {
    "전북특별자치도": "전북특별자치도",
    "전라남도": "전라남도",
    "광주광역시": "광주광역시",
};

const RegionGrid = () => {
    // 시도별로 그룹핑
    const grouped: Record<string, Set<string>> = {};

    regions.forEach((r) => {
        if (!r || !r.sido) return;
        if (!grouped[r.sido]) {
            grouped[r.sido] = new Set();
        }
        if (r.si) {
            grouped[r.sido].add(r.si);
        }
    });

    // 원하는 순서로 정렬
    const orderedSidos = ["전북특별자치도", "전라남도", "광주광역시"];

    const regionGroups = orderedSidos
        .filter((sido) => grouped[sido])
        .map((sido) => {
            const cities = Array.from(grouped[sido]).map((si) => {
                const count = regions.filter((r) => r.si === si).length;
                return { name: si, count };
            });

            // 지역 개수 많은 순으로 정렬
            cities.sort((a, b) => b.count - a.count);

            return {
                sido: sido.replace("특별자치도", "").replace("광역시", "").replace("도", ""),
                sidoFull: sidoMapping[sido] || sido,
                cities,
            };
        });

    // 총 지역 수 계산
    const totalRegions = regionGroups.reduce(
        (sum, group) => sum + group.cities.reduce((s, c) => s + c.count, 0),
        0
    );

    return (
        <section className="py-20 bg-white overflow-hidden" id="regions">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <span className="inline-block text-banana-red font-semibold text-sm tracking-wide mb-3">
                        전체 서비스 지역
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        <span className="text-banana-yellow">3개 광역시·도</span>, {totalRegions}개 지역 서비스
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        전북, 전남, 광주 전 지역에서 24시간 긴급 출동 서비스를 제공합니다.
                        <br className="hidden md:block" />
                        원하시는 지역을 클릭하시면 해당 지역의 상세 정보를 확인하실 수 있습니다.
                    </p>
                </div>

                {/* 시도별 그리드 */}
                <div className="space-y-16 max-w-6xl mx-auto">
                    {regionGroups.map((group) => (
                        <div key={group.sido}>
                            {/* 시도 헤더 */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-banana-yellow to-banana-red rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {group.sidoFull}
                                </h3>
                                <span className="text-sm text-gray-400">
                                    {group.cities.length}개 시/군
                                </span>
                            </div>

                            {/* 지역 카드 그리드 */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {group.cities.map((city) => (
                                    <Link
                                        key={city.name}
                                        href={`/gallery?si=${encodeURIComponent(city.name)}`}
                                        className="group relative bg-gray-50 hover:bg-white border border-gray-100 hover:border-banana-yellow rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-9 h-9 bg-white group-hover:bg-gradient-to-br group-hover:from-banana-yellow/20 group-hover:to-banana-red/10 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-banana-yellow/30 transition-all">
                                                <MapPinIcon className="w-4 h-4 text-gray-400 group-hover:text-banana-red transition-colors" />
                                            </div>
                                            <ArrowRightIcon className="w-4 h-4 text-gray-300 group-hover:text-banana-red transition-all transform group-hover:translate-x-1" />
                                        </div>
                                        <h4 className="text-base font-bold text-gray-900 group-hover:text-banana-red transition-colors mb-1">
                                            {city.name}
                                        </h4>
                                        <p className="text-xs text-gray-400">
                                            {city.count}개 동/읍/면
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 하단 CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-6">
                        찾으시는 지역이 목록에 없으신가요? 전화 문의 주시면 가능 여부를 안내해 드립니다.
                    </p>
                    <a
                        href="tel:010-2115-3496"
                        className="inline-flex items-center gap-2 bg-banana-red text-white font-semibold px-8 py-4 rounded-full hover:bg-red-700 transition-all transform hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        010-2115-3496
                    </a>
                </div>
            </div>
        </section>
    );
};

export default RegionGrid;
