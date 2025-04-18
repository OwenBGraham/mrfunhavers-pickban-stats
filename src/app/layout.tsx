import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FunhaverGG Stats",
  description: "Statistics and analytics for VALORANT agent drafts across tournaments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-900`}>
        <header className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/logo.png"
                    alt="FunhaverGG Stats Logo"
                    width={40}
                    height={40}
                    className="mr-3"
                  />
                  <span className="text-white text-xl font-bold">FunhaverGG Stats</span>
                </Link>
              </div>
              <nav className="flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
                <Link
                  href="/agents"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  Agents
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
                <Link
                  href="/maps"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  Maps
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
                <Link
                  href="/teams"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  Teams
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
