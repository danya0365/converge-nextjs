"use client";

import {
  ContactFormData,
  ContactViewModel,
} from "@/src/presentation/presenters/contact/ContactPresenter";
import { useContactPresenter } from "@/src/presentation/presenters/contact/useContactPresenter";
import Link from "next/link";
import { useState } from "react";

interface ContactViewProps {
  initialViewModel?: ContactViewModel;
}

export function ContactView({ initialViewModel }: ContactViewProps) {
  const [state, actions] = useContactPresenter(initialViewModel);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    subject: "general",
  });

  const viewModel = state.viewModel;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await actions.submitContactForm(formData);
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        subject: "general",
      });
    } catch (error) {
      // Error is already handled by the presenter
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (state.error || state.submitSuccess) {
      actions.resetSubmitStatus();
    }
  };

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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ติดต่อเรา
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              พร้อมให้บริการและตอบทุกคำถาม
              <br />
              ติดต่อเราได้หลายช่องทาง เราจะติดต่อกลับภายใน 24 ชั่วโมง
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {viewModel.contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {info.title}
                  </h3>
                  <div className="space-y-4">
                    {info.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {item.icon}
                        </span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.label}
                          </p>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-900 dark:text-white">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Offices Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  ส่งข้อความถึงเรา
                </h2>

                {state.submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <span className="text-2xl">✓</span>
                      <p className="font-semibold">
                        ส่งข้อความสำเร็จ! เราจะติดต่อกลับเร็วๆ นี้
                      </p>
                    </div>
                  </div>
                )}

                {state.error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-400">
                      {state.error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        อีเมล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        placeholder="example@company.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        เบอร์โทร
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        placeholder="0812345678"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        บริษัท/องค์กร
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        placeholder="ชื่อบริษัท"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        หัวข้อที่สนใจ
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      >
                        <option value="general">สอบถามทั่วไป</option>
                        <option value="demo">ขอสาธิตการใช้งาน</option>
                        <option value="pricing">สอบถามราคา</option>
                        <option value="support">ปัญหาการใช้งาน</option>
                        <option value="partnership">ความร่วมมือ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      ข้อความ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                      placeholder="เขียนข้อความของคุณที่นี่..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {state.submitting ? "กำลังส่ง..." : "ส่งข้อความ"}
                  </button>
                </form>
              </div>

              {/* Offices */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  สำนักงานของเรา
                </h2>

                <div className="space-y-6">
                  {viewModel.offices.map((office) => (
                    <div
                      key={office.id}
                      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {office.name}
                      </h3>
                      <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">📍</span>
                          <p>{office.address}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xl">📞</span>
                          <a
                            href={`tel:${office.phone.replace(/-/g, "")}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xl">📧</span>
                          <a
                            href={`mailto:${office.email}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xl">🕐</span>
                          <p>{office.hours}</p>
                        </div>
                      </div>
                      <a
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        ดูแผนที่ →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              คำถามที่พบบ่อย
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

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ยังมีคำถาม? ติดต่อเราได้เลย
              </p>
              <Link
                href="/help"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                ไปที่ศูนย์ช่วยเหลือ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              พร้อมเริ่มต้นแล้วหรือยัง?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              ทดลองใช้ Converge ฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              เริ่มทดลองใช้ฟรี
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
