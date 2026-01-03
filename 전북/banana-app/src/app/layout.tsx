import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bananajeonju.netlify.app'),
  title: {
    default: "전주시 전북 배관막힘 긴급출동 | 지역업체 안내",
    template: "%s"
  },
  description: "전주시 전북 일대 배관막힘, 변기막힘, 싱크대막힘, 하수구막힘 전문 업체 정보. 위치·주소 정보가 명확한 곳의 위치와 지도를 한 화면에서 확인할 수 있습니다.",
  keywords: ["배관막힘", "변기막힘", "싱크대막힘", "하수구막힘", "배관청소", "긴급출동", "24시간", "전북", "전주", "익산", "군산", "정읍", "남원", "김제", "지역업체"],
  authors: [{ name: "관리자" }],
  creator: "지역업체 안내",
  publisher: "지역업체 안내",
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '지역업체 안내',
    title: '전주시 전북 배관막힘 긴급출동',
    description: '전주시 전북 일대 배관막힘 업체 정보를 한눈에 확인하세요',
    images: [{
      url: 'https://bananajeonju.netlify.app/images/fixed/1.png',
      width: 1200,
      height: 630,
      alt: '전주시 전북 배관막힘 전문 업체',
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '0PaoOtAndsEpv_9DdbbQuKAsbIkb76XaC15u6mRDp9k',
    other: {
      'naver-site-verification': '738a164c1756d77b0023eaab1092de55036f6a72',
    },
  },
  alternates: {
    canonical: 'https://bananajeonju.netlify.app'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow w-full max-w-4xl mx-auto bg-white shadow-xl min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
