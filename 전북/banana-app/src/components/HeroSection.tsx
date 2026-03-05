import Image from "next/image";
import { PhoneIcon } from "@heroicons/react/24/solid";

interface HeroSectionProps {
    region: string;
    keyword: string;
}

const HeroSection = ({ region, keyword }: HeroSectionProps) => {
    return (
        <section className="relative w-full overflow-hidden bg-banana-black">
            {/* Background Image / Pattern */}
            <div className="absolute inset-0 opacity-40">
                <Image
                    src="/images/fixed/1.webp"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

            <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-block bg-banana-yellow text-black text-xs font-bold px-3 py-1 rounded-full mb-6">
                    #{region} #{keyword} 전문가
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-6">
                    <span className="text-banana-yellow">{region}</span>{" "}
                    <span className="text-banana-red">{keyword}</span> 전문
                    <br />
                    <span className="text-white/90">24시간 긴급출동 | 출장비 무료</span>
                </h1>
                <p className="text-gray-300 text-lg mb-10 max-w-xl">
                    검색 엔진 데이터를 기반으로 엄선된 우수 업체들의 위치와 평가를 한눈에 확인해 보세요.
                    출장비 무료부터 당일 해결까지 신속하게 도와드립니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a
                        href="tel:010-2115-3496"
                        className="flex items-center justify-center gap-3 bg-banana-red text-white text-xl font-black px-8 py-4 rounded-xl hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg animate-pulse touch-target"
                    >
                        <PhoneIcon className="h-6 w-6" />
                        긴급출동 상담하기
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
