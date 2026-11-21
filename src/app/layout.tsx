import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AarogyaGo — Healthcare Without Borders | NFSU Hack Days",
  description:
    "AI-assisted healthcare journey coordination platform unifying hospital discovery, travel planning, accommodation, and arrival assistance for planned medical visits.",
  keywords: [
    "AarogyaGo",
    "Healthcare Without Borders",
    "Medical Travel",
    "Hospital Coordination",
    "NFSU Hack Days",
    "Gemini AI",
    "Patient Facilitation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#0D7A6E]/20 selection:text-[#0D7A6E] dark:selection:bg-[#2DD4BF]/30 dark:selection:text-[#2DD4BF]">
        <ThemeProvider>
          <AmbientBackground />
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
