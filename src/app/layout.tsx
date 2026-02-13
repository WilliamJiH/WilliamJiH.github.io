import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Poppins, Urbanist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

const brandonGrotesque = localFont({
  src: [
    { path: "../fonts/BrandonGrotesque-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/BrandonGrotesque-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/BrandonGrotesque-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-brandon",
  display: "swap",
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
        <body className={`${GeistSans.variable} ${poppins.variable} ${urbanist.variable} ${brandonGrotesque.variable} ${GeistSans.className} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
