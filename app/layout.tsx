import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Alerts } from "next-alert";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akwa Ibom Tourism Board Admin Portal",
  description: "Admin portal for managing the Akwa Ibom Tourism Board website and services.",
   icons: {
    icon: '/logo-favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <div className="custom-alerts">
            <Alerts position="top-left" direction="left" timer={6000} className="z-50"/>
          </div>
        </Providers>
      </body>
    </html>
  );
}
