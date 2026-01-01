const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 pb-24 max-w-4xl mx-auto w-full">
            <div className="container mx-auto px-6">

                {/* Naver Shopping Ads Section */}
                <div className="mb-12 grid grid-cols-2 gap-4">
                    <a href="https://mkt.shopping.naver.com/link/6950f9989ee9dc532374bf99" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-gray-700 hover:border-banana-yellow transition">
                        <div className="bg-gray-800 p-4 text-center h-full flex flex-col justify-center items-center">
                            <span className="text-sm font-bold text-banana-yellow mb-2">추천 상품 1</span>
                            <span className="text-xs text-gray-400">네이버 인기 배관 세정제</span>
                        </div>
                    </a>
                    <a href="https://mkt.shopping.naver.com/link/6950f9989ee9dc532374bf99" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-gray-700 hover:border-banana-yellow transition">
                        <div className="bg-gray-800 p-4 text-center h-full flex flex-col justify-center items-center">
                            <span className="text-sm font-bold text-banana-yellow mb-2">추천 상품 2</span>
                            <span className="text-xs text-gray-400">강력 배수구 뚫기 특가</span>
                        </div>
                    </a>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm leading-loose">
                    <h3 className="text-white font-bold text-lg mb-4">바나나배관 올케어</h3>
                    <p>대표: 오다희 | 사업자등록번호: 139-04-76709</p>
                    <p>주소: 전주시 덕진구 쪽구름로 42</p>
                    <p>고객센터: 010-8184-3496 (24시간 연중무휴)</p>
                    <p className="mt-4 text-xs text-gray-600">Copyright © BANANA PIPING. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
