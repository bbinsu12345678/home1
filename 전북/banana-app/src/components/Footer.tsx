const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 pb-24 max-w-4xl mx-auto w-full">
            <div className="container mx-auto px-6">

                {/* Coupang Ads Section */}
                <div className="mb-12 grid grid-cols-2 gap-4">
                    <a href="https://link.coupang.com/a/djZdJ3" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-gray-700 hover:border-banana-yellow transition">
                        <div className="bg-gray-800 p-4 text-center h-full flex flex-col justify-center items-center">
                            <span className="text-sm font-bold text-banana-yellow mb-2">추천 상품 1</span>
                            <span className="text-xs text-gray-400">배관 관리 필수템 보러가기</span>
                        </div>
                    </a>
                    <a href="https://link.coupang.com/a/djZdKr" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-gray-700 hover:border-banana-yellow transition">
                        <div className="bg-gray-800 p-4 text-center h-full flex flex-col justify-center items-center">
                            <span className="text-sm font-bold text-banana-yellow mb-2">추천 상품 2</span>
                            <span className="text-xs text-gray-400">강력 세척제 특가 확인</span>
                        </div>
                    </a>
                    <p className="text-[10px] text-gray-600 col-span-2 text-center mt-2">
                        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
                    </p>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm leading-loose">
                    <h3 className="text-white font-bold text-lg mb-4">바나나배관 올케어</h3>
                    <p>대표: 김인수 | 사업자등록번호: 000-00-00000</p>
                    <p>주소: 전라북도 전주시 완산구</p>
                    <p>고객센터: 010-8184-3496 (24시간 연중무휴)</p>
                    <p className="mt-4 text-xs text-gray-600">Copyright © BANANA PIPING. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
