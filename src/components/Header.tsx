"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="mb-10">
            <nav className="flex justify-between items-center py-4 px-6 bg-white text-gray-800 shadow-md">
                <Link href="/" className="flex items-center space-x-3">
                    <Image src="/img/electric-car.png" width={500} height={500} alt="logo" className="h-8 w-auto" />
                    <span className="text-lg font-semibold">Carpool</span>
                </Link>

                <div className="hidden lg:flex items-center space-x-6">
                    <Link href="/drivers" className="py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-200">Drivers</Link>
                    <Link href="/drives" className="py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-200">Drives</Link>
                </div>

                <button
                    data-collapse-toggle="mobile-menu-2"
                    type="button"
                    className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="mobile-menu-2"
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

            <div className={`${isMenuOpen ? '' : 'hidden'} lg:hidden`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50" onClick={toggleMenu}></div>
                <div className="fixed inset-y-0 right-0 z-20 w-full max-w-xs overflow-y-auto bg-white shadow-lg px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <Image className="h-8 w-auto" src="/img/electric-car.png" width={500} height={500} alt="" />
                        </Link>
                        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
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
                    <div className="mt-6">
                        <div className="space-y-4">
                            <Link href="/drivers" onClick={toggleMenu} className="block py-2 px-4 text-center text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition duration-200">Drivers</Link>
                            <Link href="/drives" onClick={toggleMenu} className="block py-2 px-4 text-center text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition duration-200">Drives</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}