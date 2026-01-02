const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 pb-24 max-w-4xl mx-auto w-full">
            <div className="container mx-auto px-6">

                {/* Coupang Partners Ad Banner Section */}
                <div className="mb-12 flex justify-center gap-4 flex-wrap">
                    <iframe
                        src="https://coupa.ng/clcxsV"
                        width="120"
                        height="240"
                        frameBorder="0"
                        scrolling="no"
                        referrerPolicy="unsafe-url"
                        // @ts-expect-error -- nonstandard iframe attribute
                        browsingtopics="true"
                    ></iframe>
                    <iframe
                        src="https://coupa.ng/clcxsV"
                        width="120"
                        height="240"
                        frameBorder="0"
                        scrolling="no"
                        referrerPolicy="unsafe-url"
                        // @ts-expect-error -- nonstandard iframe attribute
                        browsingtopics="true"
                    ></iframe>
                    <iframe
                        src="https://coupa.ng/clcxsV"
                        width="120"
                        height="240"
                        frameBorder="0"
                        scrolling="no"
                        referrerPolicy="unsafe-url"
                        // @ts-expect-error -- nonstandard iframe attribute
                        browsingtopics="true"
                    ></iframe>
                    <iframe
                        src="https://coupa.ng/clcxsV"
                        width="120"
                        height="240"
                        frameBorder="0"
                        scrolling="no"
                        referrerPolicy="unsafe-url"
                        // @ts-expect-error -- nonstandard iframe attribute
                        browsingtopics="true"
                    ></iframe>
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
