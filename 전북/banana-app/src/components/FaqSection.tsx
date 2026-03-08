"use client";
import { useState } from "react";

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    faqs: FaqItem[];
}

const FaqSection = ({ faqs }: FaqSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h3 className="text-banana-red font-bold text-sm tracking-widest uppercase mb-2">
                        Customer Service
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                        자주 묻는 <span className="text-banana-yellow">질문</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        고객님들이 자주 문의하시는 내용을 모았습니다.
                        더 궁금한 점은 언제든 연락 주세요.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-banana-yellow"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                aria-expanded={openIndex === idx}
                                aria-controls={`faq-panel-${idx}`}
                                className={`w-full flex justify-between items-center p-6 text-left transition-colors ${
                                    openIndex === idx
                                        ? "bg-banana-yellow text-black"
                                        : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                                }`}
                            >
                                <span className="font-bold text-lg flex items-center gap-3">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black ${
                                        openIndex === idx
                                            ? "bg-black text-banana-yellow"
                                            : "bg-banana-red text-white"
                                    }`}>
                                        Q
                                    </span>
                                    {faq.question}
                                </span>
                                <span className={`transform transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                id={`faq-panel-${idx}`}
                                role="region"
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === idx ? "max-h-96" : "max-h-0"
                                }`}
                            >
                                <div className="p-6 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
                                    <div className="flex gap-3">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm font-black flex-shrink-0">
                                            A
                                        </span>
                                        <p className="pt-1">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
