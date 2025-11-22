import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Converge - ระบบรวมแชทและ AI Chatbot สำหรับธุรกิจ",
  description:
    "แพลตฟอร์ม Omnichannel Chat รวมทุกช่องทางการสื่อสารในที่เดียว พร้อม AI Chatbot อัจฉริยะ ระบบอัตโนมัติ Analytics และ Broadcast Campaign เพิ่มยอดขายและประสิทธิภาพการบริการลูกค้า",
  keywords: [
    "omnichannel chat",
    "unified inbox",
    "AI chatbot",
    "customer service platform",
    "live chat",
    "ระบบรวมแชท",
    "แชทบอท AI",
    "ระบบบริการลูกค้า",
    "converge",
    "facebook messenger",
    "instagram chat",
    "line oa",
    "whatsapp business",
    "tiktok shop",
    "shopee chat",
    "lazada chat",
    "broadcast campaign",
    "chat automation",
    "customer analytics",
    "next.js",
    "tailwind css",
    "zustand",
    "supabase",
  ],
  authors: [{ name: "Converge Team" }],
  creator: "Marosdee Uma",
  publisher: "Converge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/favicon.ico"],
    apple: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Converge - ระบบรวมแชทและ AI Chatbot สำหรับธุรกิจ",
    description:
      "รวมทุกช่องทางการแชทในที่เดียว Facebook, Instagram, LINE, WhatsApp, TikTok, Shopee, Lazada พร้อม AI ตอบอัตโนมัติ 24/7 เพิ่มยอดขายและลดต้นทุนบริการ",
    type: "website",
    siteName: "Converge",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Converge - Omnichannel Chat Platform with AI",
      },
    ],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Converge - ระบบรวมแชทและ AI Chatbot สำหรับธุรกิจ",
    description:
      "จัดการแชทจากทุกช่องทางในที่เดียว พร้อม AI Chatbot, Automation, Analytics และ Broadcast Campaign ที่ทรงพลัง",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
