import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Layout/Nav";

import localFont from 'next/font/local';

const gatwick = localFont({
  src: '../fonts/gatwick/Gatwick-Bold.woff2',
  variable: '--font-gatwick',
});

const glacial = localFont({
  src: '../fonts/glacial/GlacialIndifference-Regular.woff2',
  variable: '--font-glacial',
});

const garet = localFont({
  src: '../fonts/garet/Garet-Book.woff2',
  variable: '--font-garet',
});

export const metadata: Metadata = {
  title: "Helium",
  description: "Next-gen air conditioning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gatwick.variable} ${glacial.variable} ${garet.variable}`}>
      <body className="font-garet antialiased">
        <div>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
