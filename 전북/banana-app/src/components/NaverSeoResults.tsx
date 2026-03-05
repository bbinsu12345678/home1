import React from 'react';

interface Props {
    jsonLd: string;
}

/**
 * 네이버 및 검색 엔진용 구조화 데이터(JSON-LD)를 페이지에 주입합니다.
 */
export default function NaverSeoResults({ jsonLd }: Props) {
    if (!jsonLd) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
    );
}
