"use client";

import { FeaturesViewModel } from "@/src/presentation/presenters/features/FeaturesPresenter";
import { useFeaturesPresenter } from "@/src/presentation/presenters/features/useFeaturesPresenter";
import Link from "next/link";
import { useState } from "react";

interface FeaturesViewProps {
  initialViewModel?: FeaturesViewModel;
}

export function FeaturesView({ initialViewModel }: FeaturesViewProps) {
  const [state] = useFeaturesPresenter(initialViewModel);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const viewModel = state.viewModel;

  // Show loading only on initial load
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (state.error && !viewModel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">
            เกิดข้อผิดพลาด
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{state.error}</p>
        </div>
      </div>
    );
  }

  if (!viewModel) {
    return null;
  }

  // Filter features by selected category
  const filteredFeatures = selectedCategory
    ? viewModel.features.filter((f) => f.category === selectedCategory)
    : viewModel.features;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              ฟีเจอร์ครบครัน
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                เพิ่มประสิทธิภาพทีมของคุณ
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              เครื่องมือที่ทรงพลังสำหรับจัดการแชท ระบบอัตโนมัติ AI และการตลาด
              <br />
              ครบจบในแพลตฟอร์มเดียว
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              หมวดหมู่ฟีเจอร์
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {viewModel.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                  className={`p-6 rounded-xl text-left transition-all ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl scale-105"
                      : "bg-gray-50 dark:bg-gray-800 hover:shadow-lg hover:scale-102"
                  }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      selectedCategory === category.id
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      selectedCategory === category.id
                        ? "text-white/90"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {category.description}
                  </p>
                </button>
              ))}
            </div>

            {selectedCategory && (
              <div className="text-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  แสดงฟีเจอร์ทั้งหมด
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedCategory
                  ? `ฟีเจอร์ ${
                      viewModel.categories.find(
                        (c) => c.id === selectedCategory
                      )?.name
                    }`
                  : "ฟีเจอร์ทั้งหมด"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredFeatures.length} ฟีเจอร์
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      ประโยชน์:
                    </h4>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-green-500 mr-2 mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Cases */}
                  {feature.useCases.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        ตัวอย่างการใช้งาน:
                      </h4>
                      <ul className="space-y-2">
                        {feature.useCases.map((useCase, index) => (
                          <li
                            key={index}
                            className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                          >
                            <span className="text-blue-500 mr-2 mt-0.5">→</span>
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              ธุรกิจประเภทไหนเหมาะกับ Converge?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center">
              ดูตัวอย่างความสำเร็จจากธุรกิจหลากหลายประเภท
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {viewModel.useCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                    {useCase.industry}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {useCase.description}
                  </p>

                  {/* Results */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                      ผลลัพธ์:
                    </h4>
                    <ul className="space-y-2">
                      {useCase.results.map((result, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-green-500 mr-2">📈</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              เชื่อมต่อกับเครื่องมือที่คุณใช้อยู่
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Converge รองรับการเชื่อมต่อกับแพลตฟอร์มชั้นนำมากมาย
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2">🛍️</div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  E-commerce
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Shopify, WooCommerce
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2">📦</div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Marketplace
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Shopee, Lazada, TikTok
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  CRM
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  HubSpot, Salesforce
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2">🔗</div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  อื่นๆ
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Zapier, Webhooks, API
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              พร้อมลองฟีเจอร์เหล่านี้แล้วหรือยัง?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              เริ่มต้นใช้งาน Converge วันนี้ ทดลองฟรี 14 วัน
              <br />
              ไม่ต้องใส่บัตรเครดิต ยกเลิกได้ทุกเมื่อ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                เริ่มทดลองใช้ฟรี
              </Link>
              <Link
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
              >
                ดูการสาธิต
              </Link>
            </div>
            <p className="mt-8 text-white/80">
              มีคำถาม?{" "}
              <Link href="/contact" className="underline hover:text-white">
                ติดต่อทีมขาย
              </Link>{" "}
              หรือ{" "}
              <Link href="/pricing" className="underline hover:text-white">
                ดูราคา
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
