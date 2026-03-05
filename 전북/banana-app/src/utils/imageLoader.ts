/**
 * Netlify Image CDN Loader
 * 이미지의 URL을 분석하여 Netlify Image CDN 형식에 맞게 변환합니다.
 * 참고: https://docs.netlify.com/image-cdn/overview/
 */
export default function netlifyLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    // 외부 URL인 경우 그대로 반환 (width 파라미터 포함)
    if (src.startsWith('http')) {
        return `${src}?w=${width}`;
    }

    // 로컬 개발 환경에서는 일반 경로 사용 (width 파라미터 포함하여 경고 방지)
    if (process.env.NODE_ENV === 'development') {
        return `${src}?w=${width}`;
    }

    // Netlify Image CDN 쿼리 파라미터 생성 (프로덕션 환경)
    const params = new URLSearchParams();
    params.set('url', src);
    params.set('w', width.toString());
    params.set('q', (quality || 75).toString());

    // 브라우저가 지원하는 최적의 포맷(WebP, AVIF)은 Netlify CDN이 자동으로 처리함
    return `/.netlify/images?${params.toString()}`;
}
