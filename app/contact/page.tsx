import { ContactView } from "@/src/presentation/components/contact/ContactView";
import { MainLayout } from "@/src/presentation/components/templates/MainLayout";
import { ContactPresenterFactory } from "@/src/presentation/presenters/contact/ContactPresenter";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await ContactPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ติดต่อเรา - Converge",
      description:
        "ติดต่อทีมขาย Converge เพื่อขอคำปรึกษา สาธิตการใช้งาน หรือสอบถามข้อมูลเพิ่มเติม",
    };
  }
}

/**
 * Contact Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function ContactPage() {
  const presenter = await ContactPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <ContactView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching contact data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลติดต่อได้</p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
