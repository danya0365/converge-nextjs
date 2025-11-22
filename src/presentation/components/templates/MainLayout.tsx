import { Footer } from "@/src/presentation/components/molecules/Footer";
import { Header } from "@/src/presentation/components/molecules/Header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

/**
 * MainLayout - Template component for the main application layout
 * Includes Header and Footer with optional visibility control
 * Follows Clean Architecture principles and Atomic Design structure
 */
export function MainLayout({
  children,
  showHeader = true,
  showFooter = true,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
