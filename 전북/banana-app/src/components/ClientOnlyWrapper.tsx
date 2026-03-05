"use client";

import React, { useEffect, useState } from "react";

interface ClientOnlyWrapperProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * ClientOnlyWrapper
 * 서버 컴포넌트 트리 내에서 특정 컴포넌트를 클라이언트 사이드에서만 렌더링하도록 강제합니다.
 * ssr: false 설정의 dynamic import가 서버 컴포넌트에서 직접 호출될 때 발생하는 제약을 해결합니다.
 */
export default function ClientOnlyWrapper({
    children,
    fallback = null,
}: ClientOnlyWrapperProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
