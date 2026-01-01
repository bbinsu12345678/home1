import Link from 'next/link';
import NextImage from 'next/image';
import { PhoneIcon } from '@heroicons/react/24/solid';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm max-w-4xl mx-auto w-full">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-banana-yellow rounded-xl shadow-sm overflow-hidden p-1">
                        <NextImage
                            src="/images/brand_logo.png"
                            alt="바나나배관 로고"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg md:text-xl font-black text-gray-900 leading-none tracking-tighter">
                            BANANA<span className="text-banana-yellow">.</span>
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Service</span>
                    </div>
                </Link>

                {/* Right CTA */}
                <a href="tel:010-8184-3496" className="flex items-center gap-2 bg-banana-red text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition animate-pulse">
                    <PhoneIcon className="h-5 w-5" />
                    <span>긴급출동</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
