import { PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const FloatingCTA = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] max-w-4xl mx-auto">
            <div className="flex gap-2">
                <a
                    href="tel:010-8184-3496"
                    className="flex-1 bg-banana-red text-white py-3 rounded-xl flex justify-center items-center gap-2 font-bold text-lg shadow-lg active:scale-95 transition"
                >
                    <PhoneIcon className="h-6 w-6" />
                    전화 상담
                </a>
                <a
                    href="http://pf.kakao.com/_xgQDxnxj"
                    target="_blank"
                    className="flex-1 bg-yellow-400 text-banana-black py-3 rounded-xl flex justify-center items-center gap-2 font-bold text-lg shadow-lg active:scale-95 transition"
                >
                    <ChatBubbleLeftRightIcon className="h-6 w-6" />
                    카톡 문의
                </a>
            </div>
        </div>
    );
};

export default FloatingCTA;
