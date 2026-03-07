import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - 페이지를 찾을 수 없습니다 | 바나나배관',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-black text-banana-red mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
          <br />
          주소를 다시 확인해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-banana-red text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
          >
            홈으로 돌아가기
          </Link>
          <a
            href="tel:010-8184-3496"
            className="bg-banana-yellow text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
          >
            긴급 상담 전화
          </a>
        </div>
      </div>
    </div>
  );
}
