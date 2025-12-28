"use client";

import { CustomerProfile } from "@/src/domain/entities/Customer";
import { DashboardLayout } from "@/src/presentation/components/templates/DashboardLayout";
import { CustomersPresenterFactory } from "@/src/presentation/presenters/customers/CustomersPresenter";
import { useAuthStore } from "@/src/stores/authStore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const customersPresenter = CustomersPresenterFactory.create();

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "notes" | "activity"
  >("overview");
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  const loadCustomer = async () => {
    setLoading(true);
    try {
      const cust = await customersPresenter.getCustomerById(customerId);
      setCustomer(cust);
    } catch (error) {
      console.error("Failed to load customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !user) return;

    setSavingNote(true);
    try {
      await customersPresenter.addNote(customerId, user.id, newNote);
      setNewNote("");
      await loadCustomer();
    } catch (error) {
      console.error("Failed to add note:", error);
      alert("ไม่สามารถเพิ่มโน้ตได้");
    } finally {
      setSavingNote(false);
    }
  };

  const getChannelIcon = (source: string) => {
    const icons: Record<string, string> = {
      facebook: "📘",
      instagram: "📷",
      line: "💚",
      whatsapp: "💬",
      website: "🌐",
      tiktok: "🎵",
      shopee: "🛍️",
      lazada: "📦",
    };
    return icons[source] || "💬";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ไม่พบข้อมูลลูกค้า
            </h2>
            <Link
              href="/dashboard/customers"
              className="text-blue-600 hover:underline"
            >
              กลับไปหน้าลูกค้า
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalOrderValue =
    customer.orders?.reduce((sum, order) => sum + order.amount, 0) || 0;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/customers"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {customer.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                รหัสลูกค้า: {customer.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-medium">
              ✏️ แก้ไข
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
              💬 ส่งข้อความ
            </button>
          </div>
        </div>

        {/* Customer Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={customer.avatar || "https://i.pravatar.cc/150"}
                alt={customer.name}
                className="w-24 h-24 rounded-full"
              />
              <div className="absolute -bottom-2 -right-2 text-3xl">
                {getChannelIcon(customer.source)}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                  ข้อมูลติดต่อ
                </h3>
                <div className="space-y-2">
                  {customer.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <span>📧</span>
                      <span className="text-gray-900 dark:text-white">
                        {customer.email}
                      </span>
                    </div>
                  )}
                  {customer.phoneNumber && (
                    <div className="flex items-center gap-2 text-sm">
                      <span>📱</span>
                      <span className="text-gray-900 dark:text-white">
                        {customer.phoneNumber}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span>🌐</span>
                    <span className="text-gray-900 dark:text-white capitalize">
                      {customer.source}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                  สถิติ
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      การสนทนา:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {customer.conversationsCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      ออเดอร์:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {customer.orders?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      มูลค่ารวม:
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ฿{totalOrderValue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                  ข้อมูลเพิ่มเติม
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      สร้างเมื่อ:
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(customer.createdAt)}
                    </p>
                  </div>
                  {customer.lastContactAt && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        ติดต่อล่าสุด:
                      </span>
                      <p className="text-gray-900 dark:text-white">
                        {formatDate(customer.lastContactAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {customer.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  แท็ก:
                </span>
                <div className="flex flex-wrap gap-2">
                  {customer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-medium transition-all ${
                  activeTab === "overview"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                📊 ภาพรวม
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-6 py-4 font-medium transition-all ${
                  activeTab === "orders"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                🛍️ ออเดอร์ ({customer.orders?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-6 py-4 font-medium transition-all ${
                  activeTab === "notes"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                📝 โน้ต ({customer.notes?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`px-6 py-4 font-medium transition-all ${
                  activeTab === "activity"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                📅 กิจกรรม
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <div className="text-3xl mb-2">💬</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {customer.conversationsCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      การสนทนาทั้งหมด
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                    <div className="text-3xl mb-2">🛍️</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {customer.orders?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ออเดอร์ทั้งหมด
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ฿{totalOrderValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      มูลค่ารวม
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    กิจกรรมล่าสุด
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600">💬</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          เริ่มการสนทนาใหม่
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {customer.lastContactAt
                            ? formatDate(customer.lastContactAt)
                            : "ไม่ระบุ"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                {customer.orders && customer.orders.length > 0 ? (
                  customer.orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              ออเดอร์ #{order.orderId}
                            </h4>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                order.status === "completed"
                                  ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                                  : "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                              }`}
                            >
                              {order.status === "completed" && "สำเร็จ"}
                              {order.status === "pending" && "รอดำเนินการ"}
                              {order.status === "cancelled" && "ยกเลิก"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {order.items && order.items.length > 0
                              ? order.items
                                  .map((item: any) => item.name || item)
                                  .join(", ")
                              : "ไม่มีรายการสินค้า"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            ฿{order.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {order.items?.length || 0} รายการ
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛍️</div>
                    <p className="text-gray-600 dark:text-gray-400">
                      ยังไม่มีออเดอร์
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                {/* Add Note Form */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="เพิ่มโน้ต..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    rows={3}
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleAddNote}
                      disabled={!newNote.trim() || savingNote}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {savingNote ? "กำลังบันทึก..." : "เพิ่มโน้ต"}
                    </button>
                  </div>
                </div>

                {/* Notes List */}
                {customer.notes && customer.notes.length > 0 ? (
                  <div className="space-y-3">
                    {customer.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              โน้ตจาก Agent
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(note.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-600 dark:text-gray-400">
                      ยังไม่มีโน้ต
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-600 dark:text-gray-400">ไม่มีกิจกรรม</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
