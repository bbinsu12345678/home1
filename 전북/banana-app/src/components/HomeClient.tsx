"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllPages } from "@/utils/pageData";

const ITEMS_PER_PAGE = 15;

export default function HomeClient() {
    const [currentPage, setCurrentPage] = useState(1);

    const allPages = useMemo(() => getAllPages(), []);
    const totalCount = allPages.length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const paginatedPages = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return allPages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [allPages, currentPage]);

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
                {/* 총 개수 표시 */}
                <div className="mb-6 text-sm text-gray-600">
                    Total <span className="font-bold text-banana-red">{totalCount}</span>건 {currentPage} 페이지
                </div>

                {/* 카드 그리드 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {paginatedPages.map((page) => (
                        <Link
                            key={page.id}
                            href={`/${page.id}`}
                            className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-banana-yellow transition-all duration-300"
                        >
                            {/* 썸네일 영역 */}
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-banana-yellow to-yellow-500 flex items-center justify-center p-4">
                                <div className="absolute top-2 left-2 text-[10px] text-white/80 font-medium">
                                    하수구 막힘도 언빌리버블
                                </div>
                                <div className="text-center">
                                    <div className="text-white text-xl sm:text-2xl font-black leading-tight">
                                        {page.region.si.replace('시', '')}
                                    </div>
                                    <div className="text-banana-red text-lg sm:text-xl font-black mt-1">
                                        출장비 무료
                                    </div>
                                </div>
                            </div>

                            {/* 제목 영역 */}
                            <div className="p-3">
                                <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-banana-red transition-colors">
                                    {page.region.si} {page.region.dong} {page.keywordPermutation.join('')} {page.tail}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 페이지네이션 */}
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
                                    ? 'bg-blue-600 text-white font-bold'
                                    : 'text-gray-600 hover:bg-gray-100'
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
            </div>
        </section>
    );
}
