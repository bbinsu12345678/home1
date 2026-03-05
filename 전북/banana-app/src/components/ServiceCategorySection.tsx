"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceCategory {
    name: string;
    icon: string;
    description: string;
    href: string;
}

const categories: ServiceCategory[] = [
    {
        name: "변기막힘",
        icon: "🚽",
        description: "화장실 변기 막힘 전문 해결",
        href: "/1"
    },
    {
        name: "싱크대막힘",
        icon: "🚰",
        description: "주방 싱크대 배수구 막힘",
        href: "/2"
    },
    {
        name: "하수구막힘",
        icon: "🔧",
        description: "하수구 역류 및 막힘 해결",
        href: "/3"
    },
    {
        name: "해빙작업",
        icon: "❄️",
        description: "겨울철 동파 배관 해빙",
        href: "/4"
    },
    {
        name: "누수",
        icon: "💧",
        description: "배관 누수 탐지 및 수리",
        href: "/5"
    },
    {
        name: "저수조청소",
        icon: "🧹",
        description: "저수조 및 물탱크 청소",
        href: "/6"
    }
];

const ServiceCategorySection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-banana-red font-bold text-sm tracking-widest uppercase mb-2">
                        Our Services
                    </h3>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                        전문 서비스 분야
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        어떤 배관 문제든 전문가가 신속하게 해결해 드립니다
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, idx) => (
                        <Link
                            key={idx}
                            href={category.href}
                            className="group bg-gray-50 hover:bg-banana-yellow border border-gray-100 hover:border-banana-yellow p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                {category.icon}
                            </div>
                            <h4 className="font-bold text-gray-900 group-hover:text-black mb-1">
                                {category.name}
                            </h4>
                            <p className="text-xs text-gray-500 group-hover:text-black/70 hidden sm:block">
                                {category.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCategorySection;
