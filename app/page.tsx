import { LandingView } from "@/src/presentation/components/landing/LandingView";
import { MainLayout } from "@/src/presentation/components/templates/MainLayout";
import { LandingPresenterFactory } from "@/src/presentation/presenters/landing/LandingPresenter";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Converge - ระบบรวมแชทและ AI Chatbot สำหรับธุรกิจ",
      description:
        "รวมทุกช่องทางการแชทในที่เดียว Facebook, Instagram, LINE, WhatsApp, TikTok, Shopee, Lazada พร้อม AI ตอบอัตโนมัติ 24/7",
    };
  }
}

/**
 * Landing Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function Home() {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <LandingView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching landing data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลได้</p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
