import Image from "next/image";

interface GallerySectionProps {
    images: string[];
    keyword: string;
    region?: string;
}

const GallerySection = ({ images, keyword, region }: GallerySectionProps) => {
    // SEO 최적화된 alt 텍스트 생성
    const getAltText = (idx: number): string => {
        const altPatterns = [
            `${region || ''} ${keyword} 변기 막힘 해결 전후 비교 사진`,
            `${region || ''} 싱크대 배관 청소 작업 현장`,
            `${region || ''} 하수구 고압 세척 진행 모습`,
            `${region || ''} ${keyword} 배관 내시경 검사 결과`,
            `${region || ''} 욕실 배수구 막힘 제거 과정`,
            `${region || ''} 주방 기름때 제거 작업 사진`,
            `${region || ''} ${keyword} 전문 장비 사용 모습`,
            `${region || ''} 옥상 배수구 청소 현장`,
            `${region || ''} 정화조 배관 점검 작업`,
            `${region || ''} ${keyword} 완료 후 깨끗한 배관 상태`
        ].map(text => text.trim());

        return altPatterns[idx % altPatterns.length];
    };
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="text-banana-red font-bold text-sm tracking-widest uppercase mb-2">Work Showcase</h3>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">실시간 작업 현장</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-lg group">
                            <Image
                                src={`/images/gallery/${img}`}
                                alt={getAltText(idx)}
                                title={getAltText(idx)}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 20vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-bold px-3 py-1 border border-white rounded-full">자세히 보기</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
