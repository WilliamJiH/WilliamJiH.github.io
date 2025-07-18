import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Poppins } from "next/font/google";
import "./globals.css";
import { MyFloatingDock } from "@/components/floating-dock";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "William Ji",
  description: "Full-Stack Developer & Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${poppins.variable} ${GeistSans.className} antialiased`}>
        {children}
        <MyFloatingDock />
      </body>
    </html>
  );
}
