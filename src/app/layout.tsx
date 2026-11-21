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
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#3D43C8]/20 selection:text-[#3D43C8] dark:selection:bg-[#A5AAFF]/30 dark:selection:text-[#A5AAFF]">
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
