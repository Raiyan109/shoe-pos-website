import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { MenuNav } from "@/components/Menu";
import SiteSettings from "@/components/SiteSettings";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "E-commerce Store | Quality Products",
  description: "Browse our collection of high-quality products for your lifestyle",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans min-h-screen flex flex-col`}
      >
        <SiteSettings />
        <MenuNav />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
