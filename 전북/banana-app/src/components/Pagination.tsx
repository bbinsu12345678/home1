'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    // 10 pages per group
    const pagesPerGroup = 10;
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);

    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

    const prevGroupStart = startPage - 1;
    const nextGroupStart = endPage + 1;

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 py-8 my-4 flex-wrap">
            {/* Previous Group Button */}
            {startPage > 1 && (
                <Link
                    href={`/${prevGroupStart}`}
                    className="px-3 py-2 border rounded hover:bg-gray-100 text-sm"
                >
                    이전 10페이지
                </Link>
            )}

            {/* Page Numbers */}
            {pages.map((page) => (
                <Link
                    key={page}
                    href={`/${page}`}
                    className={`px-3 py-2 border rounded text-sm ${page === currentPage
                            ? 'bg-red-600 text-white font-bold border-red-600'
                            : 'hover:bg-gray-100'
                        }`}
                >
                    {page}
                </Link>
            ))}

            {/* Next Group Button */}
            {endPage < totalPages && (
                <Link
                    href={`/${nextGroupStart}`}
                    className="px-3 py-2 border rounded hover:bg-gray-100 text-sm"
                >
                    다음 10페이지
                </Link>
            )}
        </div>
    );
}
