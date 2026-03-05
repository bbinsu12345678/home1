"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAllPages, getAllUniqueSi } from "@/utils/pageData";

const ITEMS_PER_PAGE = 15;

export default function GalleryClient() {
    const searchParams = useSearchParams();
    const initialSi = searchParams.get("si") || "";

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSi, setSelectedSi] = useState(initialSi);

    const allPages = useMemo(() => getAllPages(), []);
    const uniqueSiList = useMemo(() => getAllUniqueSi(), []);

    const filteredPages = useMemo(() => {
        if (!selectedSi) return allPages;
        return allPages.filter(p => p.region.si === selectedSi);
    }, [allPages, selectedSi]);

    const totalCount = filteredPages.length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const paginatedPages = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredPages, currentPage]);

    const handleSiChange = (si: string) => {
        setSelectedSi(si);
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 3);
        const end = Math.min(totalPages, start + 7);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <section className="py-8 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                {/* 필터 */}
                <div className="mb-6 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">지역:</span>
                    <button
                        onClick={() => handleSiChange("")}
                        className={`px-3 py-1 text-sm rounded-full transition ${
                            !selectedSi ? "bg-banana-yellow text-black font-bold" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        전체
                    </button>
                    {uniqueSiList.map((si) => (
                        <button
                            key={si}
                            onClick={() => handleSiChange(si)}
                            className={`px-3 py-1 text-sm rounded-full transition ${
                                selectedSi === si ? "bg-banana-yellow text-black font-bold" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {si}
                        </button>
                    ))}
                </div>

                {/* 총 개수 */}
                <div className="mb-4 text-sm text-gray-600">
                    Total <span className="font-bold text-banana-red">{totalCount}</span>건 {currentPage} 페이지
                </div>

                {/* 카드 그리드 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {paginatedPages.map((page) => (
                        <Link
                            key={page.id}
                            href={`/${page.id}`}
                            className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-banana-yellow transition-all"
                        >
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-banana-yellow to-yellow-500 flex items-center justify-center p-4">
                                <div className="absolute top-2 left-2 text-[10px] text-white/80 font-medium">
                                    하수구 막힘도 언빌리버블
                                </div>
                                <div className="text-center">
                                    <div className="text-white text-xl sm:text-2xl font-black">
                                        {page.region.si.replace('시', '')}
                                    </div>
                                    <div className="text-banana-red text-lg sm:text-xl font-black mt-1">
                                        출장비 무료
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-banana-red transition-colors">
                                    {page.region.si} {page.region.dong} {page.keywordPermutation.join('')}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center items-center gap-1 flex-wrap">
                        {currentPage > 1 && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="px-3 py-2 text-sm text-gray-600 hover:text-banana-red"
                            >
                                이전
                            </button>
                        )}
                        {getPageNumbers().map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center text-sm rounded ${
                                    pageNum === currentPage
                                        ? "bg-blue-600 text-white font-bold"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className="px-3 py-2 text-sm text-gray-600 hover:text-banana-red"
                            >
                                맨끝
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
