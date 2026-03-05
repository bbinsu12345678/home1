"use client";

import Link from "next/link";
import regions from "../../data/regions.json";
import { useMemo } from "react";

const RegionSidebar = () => {
    const majorRegions = useMemo(() => {
        const uniqueSi = Array.from(new Set(regions.filter(r => r.sido.includes("전북")).map(r => r.si)));
        return uniqueSi.map(si => {
            const regionList = regions.filter(r => r.si === si);
            const firstRegion = regionList[0];
            const firstRegionIndex = regions.findIndex(r => r.si === si);
            return {
                name: si,
                si: si,
                dong: firstRegion?.dong || "",
                id: firstRegionIndex >= 0 ? (firstRegionIndex * 6 * 1) + 1 : 1
            };
        });
    }, []);

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
                <div>
                    <h3 className="text-gray-900 font-black text-lg mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-banana-yellow rounded-full"></span>
                        전북 지역별
                    </h3>
                    <nav className="flex flex-col gap-1">
                        {majorRegions.map((region, idx) => (
                            <Link
                                key={idx}
                                href={`/${region.si}/${region.dong}`}
                                className="px-4 py-2.5 rounded-lg text-gray-600 hover:bg-banana-yellow hover:text-black font-medium transition-colors flex justify-between items-center group"
                            >
                                <span>{region.name}</span>
                                <span className="text-xs text-gray-500 group-hover:text-black/60 font-medium">→</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        전북특별자치도 전역에 24시간 긴급 출동이 가능한 배관 전문 업체들이 대기 중입니다.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default RegionSidebar;
