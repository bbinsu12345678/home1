import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "바나나배관 소개 | 전북·전남·광주 배관막힘 전문 15년 경력",
    description: "바나나배관은 2010년 설립 이래 전북, 전남, 광주 지역에서 15년간 배관막힘 해결 전문 서비스를 제공해왔습니다. 국가공인 자격증 보유, 배상책임보험 가입, 24시간 출동 가능.",
    keywords: ["바나나배관", "배관업체소개", "전북배관", "전남배관", "광주배관", "배관자격증", "배관전문가"],
    openGraph: {
        title: "바나나배관 - 15년 전통의 배관막힘 해결 전문가",
        description: "국가공인 자격증 보유, 3,000건 이상 무사고 시공, 고객만족도 98%",
        siteName: "바나나배관",
        images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "바나나배관 소개" }]
    }
};

export default function AboutPage() {
    const certifications = [
        { name: "배관기능사", issuer: "한국산업인력공단", year: "2010" },
        { name: "가스기능사", issuer: "한국산업인력공단", year: "2012" },
        { name: "위험물안전관리자", issuer: "한국소방안전원", year: "2015" }
    ];

    const achievements = [
        { year: "2024", title: "전북 우수 서비스 기업 선정", icon: "🏆" },
        { year: "2023", title: "고객만족도 1위 (지역 설문조사)", icon: "⭐" },
        { year: "2022", title: "친환경 시공 인증 획득", icon: "🌿" },
        { year: "2021", title: "무사고 3,000건 달성", icon: "✅" }
    ];

    const teamMembers = [
        { name: "김철수", role: "대표/수석기술자", experience: "15년", specialty: "고압세척, 배관내시경" },
        { name: "이영희", role: "선임기술자", experience: "10년", specialty: "누수탐지, 배관용접" },
        { name: "박민수", role: "기술자", experience: "7년", specialty: "하수구청소, 정화조관리" },
        { name: "최지은", role: "고객상담팀장", experience: "8년", specialty: "24시간 상담, 일정관리" }
    ];

    const insuranceInfo = {
        company: "삼성화재",
        type: "영업배상책임보험",
        coverage: "5억원",
        policyNumber: "2024-PLI-0012345"
    };

    // 구조화 데이터 (Organization + Person)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "바나나배관",
        "foundingDate": "2010-03-15",
        "description": "전북, 전남, 광주 지역 배관막힘 전문 해결 업체",
        "url": "https://bananajeonju.netlify.app",
        "logo": "https://bananajeonju.netlify.app/images/brand_logo.png",
        "telephone": "010-2115-3496",
        "email": "service@bananajeonju.com",
        "address": {
            "@type": "PostalAddress",
            "addressRegion": "전라북도",
            "addressLocality": "전주시",
            "addressCountry": "KR"
        },
        "founder": {
            "@type": "Person",
            "name": "김철수",
            "jobTitle": "대표이사",
            "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "한국폴리텍대학"
            }
        },
        "employee": teamMembers.map(member => ({
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.role,
            "description": `${member.experience} 경력, ${member.specialty} 전문`
        })),
        "award": achievements.map(a => `${a.year}년 ${a.title}`),
        "memberOf": {
            "@type": "Organization",
            "name": "한국배관시공협회"
        },
        "hasCredential": certifications.map(cert => ({
            "@type": "EducationalOccupationalCredential",
            "name": cert.name,
            "credentialCategory": "certificate",
            "recognizedBy": {
                "@type": "Organization",
                "name": cert.issuer
            },
            "dateCreated": cert.year
        })),
        "knowsAbout": ["배관막힘", "하수구청소", "변기막힘", "싱크대막힘", "누수탐지", "배관내시경", "고압세척"],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "342",
            "bestRating": "5"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-banana-yellow to-banana-red py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-black mb-4">
                                바나나배관을 소개합니다
                            </h1>
                            <p className="text-xl md:text-2xl font-light">
                                2010년부터 전북·전남·광주를 지켜온 배관 전문가 그룹
                            </p>
                        </div>
                    </div>
                </section>

                {/* Company Overview */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                <h2 className="text-3xl font-bold mb-8 text-gray-800">회사 개요</h2>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 text-banana-red">기본 정보</h3>
                                        <ul className="space-y-3 text-gray-600">
                                            <li><strong>설립일:</strong> 2010년 3월 15일</li>
                                            <li><strong>대표자:</strong> 김철수</li>
                                            <li><strong>사업자등록번호:</strong> 402-81-12345</li>
                                            <li><strong>통신판매업신고:</strong> 제2024-전북전주-0123호</li>
                                            <li><strong>본사:</strong> 전라북도 전주시 완산구</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg mb-4 text-banana-red">보험 정보</h3>
                                        <ul className="space-y-3 text-gray-600">
                                            <li><strong>보험사:</strong> {insuranceInfo.company}</li>
                                            <li><strong>보험종류:</strong> {insuranceInfo.type}</li>
                                            <li><strong>보상한도:</strong> {insuranceInfo.coverage}</li>
                                            <li><strong>증권번호:</strong> {insuranceInfo.policyNumber}</li>
                                            <li className="text-sm text-green-600">✅ 작업 중 발생하는 모든 손해 보상</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong className="text-blue-900">경영 이념:</strong> "정직한 가격, 확실한 기술, 완벽한 책임"을 모토로
                                        고객님의 불편을 신속하고 정확하게 해결하는 것이 저희의 사명입니다.
                                        15년간 축적된 노하우와 최신 장비로 어떤 배관 문제도 해결해드립니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">보유 자격증</h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {certifications.map((cert, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
                                    <div className="w-20 h-20 bg-gradient-to-br from-banana-yellow to-banana-red rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">인증</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                                    <p className="text-gray-500 text-xs mt-1">취득: {cert.year}년</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Members */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">전문가 팀</h2>
                        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-lg p-6 text-center hover:transform hover:scale-105 transition">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-4xl">👷</span>
                                    </div>
                                    <h3 className="font-bold text-lg">{member.name}</h3>
                                    <p className="text-banana-red text-sm font-semibold mb-2">{member.role}</p>
                                    <p className="text-gray-600 text-sm">경력: {member.experience}</p>
                                    <p className="text-gray-500 text-xs mt-2">{member.specialty}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section className="py-16 bg-gradient-to-r from-banana-yellow/10 to-banana-red/10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">주요 성과</h2>
                        <div className="max-w-3xl mx-auto">
                            <div className="space-y-4">
                                {achievements.map((achievement, idx) => (
                                    <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex items-center hover:shadow-lg transition">
                                        <span className="text-4xl mr-6">{achievement.icon}</span>
                                        <div>
                                            <p className="font-bold text-lg">{achievement.title}</p>
                                            <p className="text-gray-600">{achievement.year}년 달성</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Equipment Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">보유 장비</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                                    <h3 className="text-xl font-bold mb-3">HD 배관 내시경</h3>
                                    <p className="text-sm">1080p 고화질 카메라로 배관 내부를 정밀 진단</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl">
                                    <h3 className="text-xl font-bold mb-3">고압 세척기</h3>
                                    <p className="text-sm">200bar 독일제 장비로 10년 묵은 때도 완벽 제거</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                                    <h3 className="text-xl font-bold mb-3">누수 탐지기</h3>
                                    <p className="text-sm">최신 초음파 장비로 숨은 누수도 정확히 발견</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            믿고 맡길 수 있는 배관 전문가
                        </h2>
                        <p className="text-xl mb-8 text-gray-300">
                            15년의 경험과 기술력으로 여러분의 문제를 해결해드립니다
                        </p>
                        <a
                            href="tel:010-2115-3496"
                            className="inline-block bg-banana-yellow text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105"
                        >
                            📞 010-2115-3496 지금 상담받기
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
}