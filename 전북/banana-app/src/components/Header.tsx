import Link from 'next/link';
import { PhoneIcon } from '@heroicons/react/24/solid';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm max-w-4xl mx-auto w-full">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black text-banana-black tracking-tighter">
                        BANANA<span className="text-banana-yellow">.</span>
                    </span>
                    <span className="bg-banana-yellow text-banana-black text-xs font-bold px-2 py-1 rounded-full">
                        올케어
                    </span>
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
