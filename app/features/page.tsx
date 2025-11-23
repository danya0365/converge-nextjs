import { FeaturesView } from "@/src/presentation/components/features/FeaturesView";
import { MainLayout } from "@/src/presentation/components/templates/MainLayout";
import { FeaturesPresenterFactory } from "@/src/presentation/presenters/features/FeaturesPresenter";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await FeaturesPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ฟีเจอร์ครบครัน - Converge",
      description:
        "สำรวจฟีเจอร์ทั้งหมดของ Converge: Unified Inbox, AI Chatbot, Flow Builder, Analytics และอีกมากมาย",
    };
  }
}

/**
 * Features Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function FeaturesPage() {
  const presenter = await FeaturesPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <FeaturesView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching features data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลฟีเจอร์ได้</p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
