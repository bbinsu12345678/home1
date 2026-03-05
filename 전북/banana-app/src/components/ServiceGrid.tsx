import { WrenchScrewdriverIcon, BeakerIcon, LifebuoyIcon, SparklesIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const services = [
    { name: "변기 막힘", desc: "단순 막힘부터 이물질 제거까지", icon: WrenchScrewdriverIcon },
    { name: "싱크대 막힘", desc: "기름 슬러지 제거 및 배관 세척", icon: BeakerIcon },
    { name: "하수구 막힘", desc: "첨단 장비 활용 강력 통수", icon: LifebuoyIcon },
    { name: "배관 고압세척", desc: "배관 내부 새것처럼 스케일링", icon: SparklesIcon },
    { name: "누수 탐지/수리", desc: "정확한 지점 포착 및 완벽 보수", icon: ShieldCheckIcon },
];

const ServiceGrid = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="text-banana-red font-bold text-sm tracking-widest uppercase mb-2">Our Services</h3>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">전문적인 해결 서비스</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {services.map((service, idx) => (
                        <div key={idx} className="group bg-gray-50 p-8 rounded-2xl hover:bg-banana-yellow transition-all duration-300 transform hover:-translate-y-2 cursor-pointer shadow-sm hover:shadow-xl border border-gray-100">
                            <service.icon className="h-12 w-12 text-banana-red mb-6 group-hover:text-black transition-colors" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black">{service.name}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed group-hover:text-black/80">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
