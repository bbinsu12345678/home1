"use client";

import { PhoneIcon } from "@heroicons/react/24/solid";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    페이지를 불러오는 중 문제가 발생했습니다
                </h2>
                <p className="text-gray-500 mb-8">
                    잠시 후 다시 시도해 주세요. 긴급한 경우 전화로 문의해 주세요.
                </p>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => reset()}
                        className="bg-banana-yellow text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-400 transition"
                    >
                        다시 시도
                    </button>
                    <a
                        href="/"
                        className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition"
                    >
                        홈으로 돌아가기
                    </a>
                    <a
                        href="tel:010-2115-3496"
                        className="inline-flex items-center justify-center gap-2 bg-banana-red text-white font-bold py-3 px-6 rounded-xl hover:bg-red-700 transition"
                    >
                        <PhoneIcon className="h-5 w-5" />
                        전화 상담 010-2115-3496
                    </a>
                </div>
            </div>
        </div>
    );
}
