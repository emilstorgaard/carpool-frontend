"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
    { href: '/users', label: 'Users', icon: '/img/driver.png' },
    { href: '/trips', label: 'Trips', icon: '/img/road.png' },
    { href: '/about', label: 'About', icon: '/img/about.png' },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <nav className="page-container flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2.5 shrink-0">
                    <Image src="/img/electric-car.png" width={32} height={32} alt="" className="h-8 w-8" />
                    <span className="text-lg font-bold text-slate-900">Carpool</span>
                </Link>

                <div className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                                isActive(link.href)
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            <Image className="h-5 w-5" src={link.icon} width={20} height={20} alt="" />
                            {link.label}
                        </Link>
                    ))}
                </div>

                <button
                    type="button"
                    className="inline-flex items-center p-2 text-slate-500 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </nav>

            <div id="mobile-menu" className={`${isMenuOpen ? '' : 'hidden'} lg:hidden`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-10 bg-slate-900/40" onClick={toggleMenu}></div>
                <div className="fixed inset-y-0 right-0 z-20 w-full max-w-xs overflow-y-auto bg-white shadow-xl px-6 py-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2.5" onClick={toggleMenu}>
                            <Image src="/img/electric-car.png" width={28} height={28} alt="" className="h-7 w-7" />
                            <span className="text-base font-bold text-slate-900">Carpool</span>
                        </Link>
                        <button type="button" className="rounded-md p-2 text-slate-500 hover:bg-slate-100" onClick={toggleMenu}>
                            <span className="sr-only">Close menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 space-y-1.5">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={toggleMenu}
                                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                    isActive(link.href)
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <Image className="h-5 w-5" src={link.icon} width={20} height={20} alt="" />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}