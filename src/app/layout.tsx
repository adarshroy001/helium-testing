import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Layout/Footer";

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
    <html lang="en">
      <body className="antialiased scroll-smooth">
        <div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

