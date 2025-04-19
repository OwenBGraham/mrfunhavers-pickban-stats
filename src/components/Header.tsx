'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/agents', label: 'Agents' },
    { href: '/maps', label: 'Maps' },
    { href: '/teams', label: 'Teams' },
  ];

  return (
    <div className="w-full relative">
      {/* Background */}
      <div className="w-full h-16 absolute bg-[#00C3FF] transform-gpu" />
      
      {/* Main header content */}
      <div className="relative h-16 px-4 flex justify-between items-center text-rendering-optimizeLegibility subpixel-antialiased will-change-transform">
        {/* Logo and Title - centered on mobile */}
        <Link href="/" className="flex items-center md:ml-[140px] transform-gpu">
          <Image
            src="/images/logo.png"
            alt="FunhaverGG Stats Logo"
            width={41}
            height={45}
            className="mr-3 transform-gpu"
          />
          <div className="text-white text-xl font-extrabold transform-gpu">FunhaverGG Stats</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 mr-[200px] transform-gpu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white text-sm font-semibold relative group transform-gpu ${
                pathname === link.href ? 'text-white' : 'text-white/80'
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 transform-gpu"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none transform-gpu"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 transform-gpu"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#00C3FF] z-50 transform-gpu">
          <div className="px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-white text-sm font-semibold transform-gpu ${
                  pathname === link.href ? 'bg-[#00A3FF]' : 'hover:bg-[#00A3FF]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Decorative Elements - shown on all screen sizes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left cluster */}
        <div className="absolute left-[2%] top-[19px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-34.73deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[5%] top-[24px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[43.67deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[8%] top-[21px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-34.20deg] opacity-30 transform-gpu" />
        </div>

        {/* Center-left cluster */}
        <div className="absolute left-[20%] top-[8px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[15deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[25%] top-[30px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-25deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[30%] top-[15px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[35deg] opacity-30 transform-gpu" />
        </div>

        {/* Middle-left cluster */}
        <div className="absolute left-[35%] top-[15px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[20deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[38%] top-[30px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-30deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[41%] top-[5px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[40deg] opacity-30 transform-gpu" />
        </div>

        {/* Center cluster */}
        <div className="absolute left-[45%] top-[5px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-15deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[48%] top-[25px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[25deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[51%] top-[10px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-35deg] opacity-30 transform-gpu" />
        </div>

        {/* Middle-right cluster */}
        <div className="absolute left-[55%] top-[20px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-20deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[58%] top-[5px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[30deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[61%] top-[30px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-40deg] opacity-30 transform-gpu" />
        </div>

        {/* Center-right cluster */}
        <div className="absolute left-[65%] top-[20px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[15deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[70%] top-[5px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-25deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute left-[75%] top-[25px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[35deg] opacity-30 transform-gpu" />
        </div>

        {/* Right cluster */}
        <div className="absolute right-[15%] top-[15px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-15deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute right-[10%] top-[30px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[25deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute right-[5%] top-[10px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-35deg] opacity-30 transform-gpu" />
        </div>
        <div className="absolute right-[2%] top-[25px] transform-gpu">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[15deg] opacity-30 transform-gpu" />
        </div>
      </div>
    </div>
  );
} 