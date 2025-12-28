"use client";

import { DashboardLayout } from "@/src/presentation/components/templates/DashboardLayout";
import { useAuthStore } from "@/src/stores/authStore";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();

  // Mock stats data
  const stats = [
    {
      label: "การสนทนาใหม่วันนี้",
      value: "24",
      change: "+12%",
      changeType: "increase" as const,
      icon: "💬",
      color: "blue",
    },
    {
      label: "ข้อความทั้งหมด",
      value: "1,847",
      change: "+8%",
      changeType: "increase" as const,
      icon: "📨",
      color: "purple",
    },
    {
      label: "เวลาตอบกลับเฉลี่ย",
      value: "2.5 นาที",
      change: "-15%",
      changeType: "decrease" as const,
      icon: "⚡",
      color: "green",
    },
    {
      label: "ความพึงพอใจ",
      value: "98%",
      change: "+2%",
      changeType: "increase" as const,
      icon: "⭐",
      color: "yellow",
    },
  ];

  const recentConversations = [
    {
      id: "1",
      customer: "คุณลูกค้า สมชาติ",
      avatar: "https://i.pravatar.cc/150?img=1",
      message: "ขอบคุณมากครับ จะซื้อตอนมีโปรโมชันนะครับ",
      time: "2 นาทีที่แล้ว",
      channel: "facebook",
      unread: false,
    },
    {
      id: "2",
      customer: "น้องกุ้ง",
      avatar: "https://i.pravatar.cc/150?img=10",
      message: "สินค้าถึงวันไหนคะ",
      time: "15 นาทีที่แล้ว",
      channel: "instagram",
      unread: true,
    },
    {
      id: "3",
      customer: "พี่เบียร์",
      avatar: "https://i.pravatar.cc/150?img=20",
      message: "โอเคครับ ขอบคุณมากครับ",
      time: "1 ชั่วโมงที่แล้ว",
      channel: "line",
      unread: false,
    },
  ];

  const quickActions = [
    {
      label: "ข้อความใหม่",
      icon: "✉️",
      href: "/dashboard/inbox",
      color: "bg-blue-500",
    },
    {
      label: "เพิ่มลูกค้า",
      icon: "👤",
      href: "/dashboard/customers",
      color: "bg-purple-500",
    },
    {
      label: "ส่ง Broadcast",
      icon: "📢",
      href: "/dashboard/broadcast",
      color: "bg-pink-500",
    },
    {
      label: "ดูรายงาน",
      icon: "📊",
      href: "/dashboard/analytics",
      color: "bg-green-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            สวัสดี, {user?.name?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="text-white/90">
            วันนี้มีการสนทนาใหม่ 24 รายการ และมี 5 ข้อความรอคุณตอบกลับ
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === "increase"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            การดำเนินการด่วน
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {action.label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Conversations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  การสนทนาล่าสุด
                </h2>
                <Link
                  href="/dashboard/inbox"
                  className="text-sm text-blue-600 hover:underline"
                >
                  ดูทั้งหมด →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentConversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/dashboard/inbox/${conv.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                >
                  <img
                    src={conv.avatar}
                    alt={conv.customer}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {conv.customer}
                      </p>
                      <span className="text-xs">
                        {conv.channel === "facebook" && "📘"}
                        {conv.channel === "instagram" && "📷"}
                        {conv.channel === "line" && "💚"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conv.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {conv.time}
                    </p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Team Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                กิจกรรมของทีม
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-semibold">ปราณี</span> ปิดการสนทนากับ
                    คุณมานะ
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    5 นาทีที่แล้ว
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600">💬</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-semibold">สมศักดิ์</span> ตอบกลับ 3
                    ข้อความ
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    10 นาทีที่แล้ว
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600">📢</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-semibold">มานพ</span> ส่ง Broadcast
                    ไปยัง 250 คน
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    1 ชั่วโมงที่แล้ว
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
