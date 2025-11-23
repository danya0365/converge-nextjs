"use client";

import { PricingViewModel } from "@/src/presentation/presenters/pricing/PricingPresenter";
import { usePricingPresenter } from "@/src/presentation/presenters/pricing/usePricingPresenter";
import Link from "next/link";
import { useState } from "react";

interface PricingViewProps {
  initialViewModel?: PricingViewModel;
}

export function PricingView({ initialViewModel }: PricingViewProps) {
  const [state] = usePricingPresenter(initialViewModel);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              ราคาที่โปร่งใส
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                เหมาะกับทุกขนาดธุรกิจ
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              เริ่มต้นฟรี 14 วัน • ไม่ต้องใส่บัตรเครดิต • ยกเลิกได้ทุกเมื่อ
            </p>

            {/* Toggle Comparison */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300"
            >
              {showComparison
                ? "ซ่อนตารางเปรียบเทียบ"
                : "ดูตารางเปรียบเทียบฟีเจอร์"}
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showComparison ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {viewModel.plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105 border-4 border-blue-500"
                    : "bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">
                    ⭐ แนะนำ
                  </div>
                )}
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.highlighted
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mb-6 text-sm ${
                    plan.highlighted
                      ? "text-white/90"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span
                    className={`text-5xl font-bold ${
                      plan.highlighted
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-lg ${
                        plan.highlighted
                          ? "text-white/80"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <Link
                  href={plan.id === "enterprise" ? "/contact" : "/signup"}
                  className={`block w-full py-3 rounded-lg text-center font-semibold mb-8 transition-all ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                      : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-start text-sm ${
                        plan.highlighted
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span
                        className={`mr-2 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? "text-white" : "text-green-500"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
              <span className="text-3xl">💰</span>
              <div className="text-left">
                <p className="font-bold text-gray-900 dark:text-white">
                  รับประกันความพึงพอใจ 30 วัน
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ไม่พอใจคืนเงิน 100% ภายใน 30 วันแรก
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {showComparison && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                เปรียบเทียบฟีเจอร์แบบละเอียด
              </h2>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                {/* Table Header */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white sticky left-0 bg-gray-100 dark:bg-gray-800 z-10">
                          ฟีเจอร์
                        </th>
                        {viewModel.plans.map((plan) => (
                          <th
                            key={plan.id}
                            className={`px-6 py-4 text-center text-sm font-semibold min-w-[140px] ${
                              plan.highlighted
                                ? "bg-blue-600 text-white"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {viewModel.comparisonFeatures.map(
                        (category, catIndex) => (
                          <>
                            <tr
                              key={`cat-${catIndex}`}
                              className="bg-gray-50 dark:bg-gray-800/50"
                            >
                              <td
                                colSpan={5}
                                className="px-6 py-3 text-sm font-bold text-gray-900 dark:text-white"
                              >
                                {category.category}
                              </td>
                            </tr>
                            {category.features.map((feature, featureIndex) => (
                              <tr
                                key={`feature-${catIndex}-${featureIndex}`}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                              >
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900">
                                  {feature.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  {typeof feature.basic === "boolean" ? (
                                    feature.basic ? (
                                      <span className="text-green-500 text-xl">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="text-gray-300 dark:text-gray-600 text-xl">
                                        ✕
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {feature.basic}
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  {typeof feature.pro === "boolean" ? (
                                    feature.pro ? (
                                      <span className="text-green-500 text-xl">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="text-gray-300 dark:text-gray-600 text-xl">
                                        ✕
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {feature.pro}
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  {typeof feature.advanced === "boolean" ? (
                                    feature.advanced ? (
                                      <span className="text-green-500 text-xl">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="text-gray-300 dark:text-gray-600 text-xl">
                                        ✕
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {feature.advanced}
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  {typeof feature.enterprise === "boolean" ? (
                                    feature.enterprise ? (
                                      <span className="text-green-500 text-xl">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="text-gray-300 dark:text-gray-600 text-xl">
                                        ✕
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {feature.enterprise}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              คำถามที่พบบ่อยเกี่ยวกับราคา
            </h2>

            <div className="space-y-4">
              {viewModel.faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                    }
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`text-2xl transform transition-transform flex-shrink-0 ${
                        openFaqId === faq.id ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openFaqId === faq.id && (
                    <div className="px-6 py-4 bg-white dark:bg-gray-900">
                      <p className="text-gray-700 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              เพิ่มเติมตามต้องการ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  ผู้ใช้งานเพิ่มเติม
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  เพิ่มผู้ใช้งานเกินกำหนด
                </p>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ฿390-590
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  ต่อคน/เดือน
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  ข้อความเพิ่มเติม
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  แพ็กเกจข้อความเพิ่ม
                </p>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ฿490
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  ต่อ 5,000 ข้อความ
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  AI ข้อความเพิ่ม
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  ข้อความ AI เกินโควต้า
                </p>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ฿0.50
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  ต่อข้อความ
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
              พร้อมที่จะเริ่มต้นแล้วหรือยัง?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              ทดลองใช้ฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต
              <br />
              ยกเลิกได้ทุกเมื่อ ไม่มีข้อผูกมัด
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                เริ่มทดลองใช้ฟรี
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
              >
                ติดต่อฝ่ายขาย
              </Link>
            </div>
            <p className="mt-8 text-white/80">
              ยังไม่แน่ใจ?{" "}
              <Link href="/demo" className="underline hover:text-white">
                ดูการสาธิตสด
              </Link>{" "}
              หรือ{" "}
              <Link href="/contact" className="underline hover:text-white">
                ปรึกษาผู้เชี่ยวชาญ
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
