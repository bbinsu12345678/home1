'use client';

import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    pageIds: number[];
}

export default function Pagination({ currentPage, pageIds }: PaginationProps) {
    if (pageIds.length === 0) {
        return null;
    }

    const pagesPerGroup = 10;
    const currentIndex = pageIds.indexOf(currentPage);

    if (currentIndex === -1) {
        return null;
    }

    const currentGroup = Math.floor(currentIndex / pagesPerGroup);
    const startIndex = currentGroup * pagesPerGroup;
    const endIndex = Math.min(startIndex + pagesPerGroup, pageIds.length);
    const groupPages = pageIds.slice(startIndex, endIndex);
    const prevGroupStart = startIndex > 0 ? pageIds[startIndex - 1] : null;
    const nextGroupStart = endIndex < pageIds.length ? pageIds[endIndex] : null;

    return (
        <div className="flex justify-center items-center gap-2 py-8 my-4 flex-wrap">
            {prevGroupStart !== null && (
                <Link
                    href={`/${prevGroupStart}`}
                    className="px-3 py-2 border rounded hover:bg-gray-100 text-sm"
                >
                    Previous 10
                </Link>
            )}

            {groupPages.map((pageId) => (
                <Link
                    key={pageId}
                    href={`/${pageId}`}
                    className={`px-3 py-2 border rounded text-sm ${pageId === currentPage
                        ? 'bg-red-600 text-white font-bold border-red-600'
                        : 'hover:bg-gray-100'
                        }`}
                >
                    {pageId}
                </Link>
            ))}

            {nextGroupStart !== null && (
                <Link
                    href={`/${nextGroupStart}`}
                    className="px-3 py-2 border rounded hover:bg-gray-100 text-sm"
                >
                    Next 10
                </Link>
            )}
        </div>
    );
}
