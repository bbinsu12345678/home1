"use client";

import { useState } from "react";

interface Business {
    name: string;
    category: string;
    address: string;
    roadAddress: string;
    lat: number;
    lng: number;
    phone: string;
}

interface CompetitorStyleBusinessListProps {
    region: string;
    keyword: string;
    businesses: Business[];
    pageNumber?: number;
}

// 경쟁사 스타일 색상 패턴
const H2_COLORS = [
    "#FFC107", // 노란색
    "#28A745", // 초록색
    "#DC3545", // 빨간색
    "#007BFF", // 파란색
    "#17A2B8", // 청록색
    "#FFC107", // 노란색 (반복)
    "#28A745", // 초록색 (반복)
    "#DC3545", // 빨간색 (반복)
    "#007BFF", // 파란색 (반복)
    "#17A2B8", // 청록색 (반복)
];

// 서비스 변형 (5개 업종)
const SERVICE_VARIANTS = [
    "막힘",
    "뚫음",
    "청소",
    "역류",
    "시공"
];

export default function CompetitorStyleBusinessList({
    region,
    keyword,
    businesses,
    pageNumber = 1
}: CompetitorStyleBusinessListProps) {

    // 페이지당 10개 업체 표시
    const startIdx = (pageNumber - 1) * 10;
    const endIdx = startIdx + 10;
    const displayBusinesses = businesses.slice(startIdx, endIdx);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* 상단 설명 박스 (경쟁사 스타일) */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-8">
                <h2 className="text-xl font-bold mb-2">
                    {region} 일대 {keyword} 업체 안내
                </h2>
                <p className="text-gray-700">
                    {region} 일대 {keyword} 등 5개 업종 기준으로 네이버 지역검색에서 찾은 업체 {businesses.length}곳 중
                    위치·주소 정보가 명확한 10곳의 위치와 지도를 한 화면에서 확인할 수 있습니다.
                </p>
                <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">{region}</span>
                    <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">{keyword}</span>
                    <span className="px-3 py-1 bg-orange-500 text-white rounded text-sm">10곳 비교</span>
                </div>
            </div>

            {/* 업체 목록 (경쟁사 스타일 H2 + 색상) */}
            {displayBusinesses.map((business, index) => {
                const serviceVariant = SERVICE_VARIANTS[index % SERVICE_VARIANTS.length];
                const bgColor = H2_COLORS[index];

                return (
                    <div key={index} className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
                        {/* H2 헤더 (경쟁사 스타일) */}
                        <h2
                            className="text-white font-bold p-4 text-lg"
                            style={{ backgroundColor: bgColor }}
                        >
                            {region} 지역 {keyword.split(' ')[0]} {serviceVariant} 검색 업체
                            <br />
                            <b className="text-xl">{business.name}</b>
                        </h2>

                        {/* 업체 상세 정보 */}
                        <div className="p-4 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">분류:</span> 건설업 &gt; 배관,냉난방공사
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">지번주소:</span> {business.address}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">도로명주소:</span> {business.roadAddress}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">전화번호:</span> {business.phone}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">위도:</span> {business.lat.toFixed(6)}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">경도:</span> {business.lng.toFixed(6)}
                                    </p>
                                    <div className="flex gap-2 mt-3">
                                        <a
                                            href={`https://map.naver.com/v5/search/${encodeURIComponent(region + ' ' + keyword)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                        >
                                            네이버 지도
                                        </a>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${business.lat},${business.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                                        >
                                            구글 지도
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 광고 삽입 (3, 6번째 업체 후) */}
                        {(index === 2 || index === 5) && (
                            <div className="bg-yellow-50 border-t border-yellow-200 p-4">
                                <div className="text-center text-gray-500 text-sm">
                                    [광고 영역]
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* 하단 안내 문구 (키워드 밀도 증가) */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                    <strong>{region}</strong> 지역에서 <strong>{keyword}</strong> 서비스를 찾고 계신가요?
                    위 목록은 <strong>{region}</strong> 일대의 <strong>{keyword}</strong> 전문 업체들입니다.
                    <strong>{region}</strong>에서 신뢰할 수 있는 <strong>{keyword}</strong> 업체를 선택하세요.
                </p>
            </div>
        </div>
    );
}