import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bananajeonju.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "전주 광주 변기막힘 하수구막힘 싱크대막힘 24시간 | 바나나배관",
    template: "%s"
  },
  description: "전주, 광주, 전북, 전남 변기막힘·하수구막힘·싱크대막힘 24시간 긴급출동. 출장비 무료, 선견적 후시공.",
  keywords: ["전주 변기막힘", "전주 하수구막힘", "전주 싱크대막힘", "광주 변기막힘", "광주 하수구막힘", "광주 싱크대막힘", "전주 배관막힘", "광주 배관막힘", "전북 배관막힘", "전남 배관막힘", "에어컨배관막힘", "정화조막힘", "배관막힘 24시간", "긴급출동"],
  authors: [{ name: "바나나배관" }],
  creator: "바나나배관",
  publisher: "바나나배관",
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '바나나배관',
    title: '전주 광주 변기막힘 하수구막힘 싱크대막힘 24시간 긴급출동',
    description: '전주, 광주, 전북, 전남 변기막힘·하수구막힘·싱크대막힘 전문. 출장비 무료, 24시간 긴급출동.',
    images: [{
      url: `${siteUrl}/images/og-image.png`,
      width: 1200,
      height: 630,
      alt: '전주 광주 변기막힘 하수구막힘 싱크대막힘 전문 바나나배관',
      type: 'image/png',
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
