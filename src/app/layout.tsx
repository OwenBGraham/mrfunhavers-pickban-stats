import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import { Header } from "@/components/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
