'use client';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from "react";
import { navigationLinks } from '@/constants/navBar';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Create a click listener that closes the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            setIsMenuOpen(false);
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [isMenuOpen]);

    return (
        <div>
            <nav className="flex flex-row bg-gray-50 m-5 px-6 py-3.5 rounded-4xl text-blue-900 justify-between">
                <a href="https://constructdigitally.com" target="_self" rel="home" aria-current="page">
                    <h6 className="text-md md:text-lg font-medium font-sans">Construct Digitally</h6>
                </a>
                <button onClick={() => setIsMenuOpen(true)} aria-label="Menu" className='md:hidden'>
                    <MenuIcon size={24} />
                </button>
                <div className='hidden md:flex flex-row gap-8 [&>*]:text-md [&>*]:font-medium [&>*]:font-sans [&>*]:text-blue-900'>
                    {navigationLinks.map((link) => (
                        <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
            {isMenuOpen && (
                <div className="absolute top-0 left-0 bg-white p-5 min-w-full min-h-screen z-10 flex flex-col gap-8">
                    <CloseIcon size={24} className='self-end' />
                    <div className='flex flex-col items-center [&>*]:px-4 [&>*]:py-2 [&>*]:text-lg [&>*]:text-blue-900 [&>*]:font-medium'>
                        {navigationLinks.map((link) => (
                            <a key={link.name} href={link.href}>
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}