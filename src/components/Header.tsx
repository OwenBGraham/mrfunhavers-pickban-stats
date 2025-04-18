'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <div className="w-full h-16 relative">
      <div className="w-full h-16 left-0 top-[2px] absolute bg-[#00C3FF]" />
      
      {/* Logo and Title */}
      <div className="flex items-center left-[140px] top-[11px] absolute">
        <Image
          src="/images/logo.png"
          alt="FunhaverGG Stats Logo"
          width={41}
          height={45}
          className="mr-3"
        />
        <div className="text-white text-xl font-extrabold">FunhaverGG Stats</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-4 absolute right-[200px] top-[24px]">
        <Link
          href="/"
          className={`text-white text-sm font-semibold relative group ${
            pathname === '/' ? 'text-white' : 'text-white/80'
          }`}
        >
          Home
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
        </Link>
        <Link
          href="/agents"
          className={`text-white text-sm font-semibold relative group ${
            pathname === '/agents' ? 'text-white' : 'text-white/80'
          }`}
        >
          Agents
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
        </Link>
        <Link
          href="/maps"
          className={`text-white text-sm font-semibold relative group ${
            pathname === '/maps' ? 'text-white' : 'text-white/80'
          }`}
        >
          Maps
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
        </Link>
        <Link
          href="/teams"
          className={`text-white text-sm font-semibold relative group ${
            pathname === '/teams' ? 'text-white' : 'text-white/80'
          }`}
        >
          Teams
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
        </Link>
      </nav>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left cluster */}
        <div className="absolute left-[2%] top-[19px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-34.73deg] opacity-30" />
        </div>
        <div className="absolute left-[5%] top-[24px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[43.67deg] opacity-30" />
        </div>
        <div className="absolute left-[8%] top-[21px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-34.20deg] opacity-30" />
        </div>

        {/* Center-left cluster */}
        <div className="absolute left-[20%] top-[8px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[15deg] opacity-30" />
        </div>
        <div className="absolute left-[25%] top-[30px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-25deg] opacity-30" />
        </div>
        <div className="absolute left-[30%] top-[15px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[35deg] opacity-30" />
        </div>

        {/* Middle-left cluster */}
        <div className="absolute left-[35%] top-[15px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[20deg] opacity-30" />
        </div>
        <div className="absolute left-[38%] top-[30px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-30deg] opacity-30" />
        </div>
        <div className="absolute left-[41%] top-[5px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[40deg] opacity-30" />
        </div>

        {/* Center cluster */}
        <div className="absolute left-[45%] top-[5px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-15deg] opacity-30" />
        </div>
        <div className="absolute left-[48%] top-[25px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[25deg] opacity-30" />
        </div>
        <div className="absolute left-[51%] top-[10px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-35deg] opacity-30" />
        </div>

        {/* Middle-right cluster */}
        <div className="absolute left-[55%] top-[20px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-20deg] opacity-30" />
        </div>
        <div className="absolute left-[58%] top-[5px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[30deg] opacity-30" />
        </div>
        <div className="absolute left-[61%] top-[30px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-40deg] opacity-30" />
        </div>

        {/* Center-right cluster */}
        <div className="absolute left-[65%] top-[20px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[15deg] opacity-30" />
        </div>
        <div className="absolute left-[70%] top-[5px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-25deg] opacity-30" />
        </div>
        <div className="absolute left-[75%] top-[25px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[35deg] opacity-30" />
        </div>

        {/* Right cluster */}
        <div className="absolute right-[15%] top-[15px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-15deg] opacity-30" />
        </div>
        <div className="absolute right-[10%] top-[30px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[25deg] opacity-30" />
        </div>
        <div className="absolute right-[5%] top-[10px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[-35deg] opacity-30" />
        </div>
        <div className="absolute right-[2%] top-[25px]">
          <Image src="/images/decorative.png" alt="" width={25} height={28} className="rotate-[15deg] opacity-30" />
        </div>
      </div>
    </div>
  );
} 