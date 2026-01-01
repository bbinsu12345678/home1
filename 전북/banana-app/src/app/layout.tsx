import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://banana-piping.com'),
  title: {
    default: "바나나배관 올케어 | 전국 24시간 배관막힘 긴급출동",
    template: "%s | 바나나배관 올케어"
  },
  description: "전북 전국 어디서나 30분 빠른 출동! 변기막힘, 싱크대막힘, 하수구막힘 전문. 24시간 긴급출동, 출장비 무료, 못 뚫으면 0원!",
  keywords: ["배관막힘", "변기막힘", "싱크대막힘", "하수구막힘", "배관청소", "긴급출동", "24시간", "전북", "전주", "익산", "군산", "정읍", "남원", "김제"],
  authors: [{ name: "바나나배관 올케어" }],
  creator: "바나나배관 올케어",
  publisher: "바나나배관 올케어",
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '바나나배관 올케어',
    title: '바나나배관 올케어 | 전국 24시간 배관막힘 긴급출동',
    description: '전북 전국 어디서나 30분 빠른 출동! 변기막힘, 싱크대막힘, 하수구막힘 전문. 24시간 긴급출동 서비스',
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
    google: 'google-site-verification-code',
    other: {
      'naver-site-verification': 'naver-site-verification-code',
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
