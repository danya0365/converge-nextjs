import { PricingView } from "@/src/presentation/components/pricing/PricingView";
import { MainLayout } from "@/src/presentation/components/templates/MainLayout";
import { PricingPresenterFactory } from "@/src/presentation/presenters/pricing/PricingPresenter";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await PricingPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ราคาและแผนบริการ - Converge",
      description:
        "เลือกแผนที่เหมาะกับธุรกิจของคุณ เริ่มต้นฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต",
    };
  }
}

/**
 * Pricing Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function PricingPage() {
  const presenter = await PricingPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <PricingView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching pricing data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลราคาได้</p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
