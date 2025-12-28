"use client";

import { PieChart } from "@/src/presentation/components/analytics/PieChart";
import { SimpleLineChart } from "@/src/presentation/components/analytics/SimpleLineChart";
import { StatCard } from "@/src/presentation/components/analytics/StatCard";
import { DashboardLayout } from "@/src/presentation/components/templates/DashboardLayout";
import type {
  ActivityData,
  AnalyticsViewModel,
} from "@/src/presentation/presenters/analytics/AnalyticsPresenter";
import { AnalyticsPresenterFactory } from "@/src/presentation/presenters/analytics/AnalyticsPresenter";
import { useEffect, useState } from "react";

const analyticsPresenter = AnalyticsPresenterFactory.create();

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"week" | "month" | "quarter">("month");

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const analytics = await analyticsPresenter.getAnalyticsViewModel(
        "team-1",
        period
      );
      setData(analytics);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 1) return `${Math.round(minutes * 60)} วินาที`;
    if (minutes < 60) return `${minutes.toFixed(1)} นาที`;
    return `${(minutes / 60).toFixed(1)} ชั่วโมง`;
  };

  const getActivityIcon = (type: ActivityData["type"]) => {
    const icons = {
      conversation: "💬",
      message: "📨",
      order: "🛍️",
      note: "📝",
    };
    return icons[type] || "📌";
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "เมื่อสักครู่";
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    const days = Math.floor(hours / 24);
    return `${days} วันที่แล้ว`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              กำลังโหลดข้อมูล...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ไม่สามารถโหลดข้อมูลได้
            </h2>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              สถิติและรายงานภาพรวม
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setPeriod("week")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                period === "week"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              7 วัน
            </button>
            <button
              onClick={() => setPeriod("month")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                period === "month"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              30 วัน
            </button>
            <button
              onClick={() => setPeriod("quarter")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                period === "quarter"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              90 วัน
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="การสนทนาทั้งหมด"
            value={data.overview.totalConversations.toLocaleString()}
            change={data.overview.conversationsChange}
            icon="💬"
            color="blue"
          />
          <StatCard
            title="ข้อความทั้งหมด"
            value={data.overview.totalMessages.toLocaleString()}
            change={data.overview.messagesChange}
            icon="📨"
            color="green"
          />
          <StatCard
            title="เวลาตอบกลับเฉลี่ย"
            value={data.overview.averageResponseTime.toFixed(1)}
            change={data.overview.responseTimeChange}
            icon="⏱️"
            color="purple"
            suffix="นาที"
          />
          <StatCard
            title="ความพึงพอใจ"
            value={data.overview.customerSatisfaction.toFixed(1)}
            change={data.overview.satisfactionChange}
            icon="⭐"
            color="orange"
            suffix="/ 5"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversations Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              แนวโน้มการสนทนา
            </h3>
            <SimpleLineChart
              data={data.conversationsTrend}
              color="#3B82F6"
              height={250}
            />
          </div>

          {/* Messages Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              แนวโน้มข้อความ
            </h3>
            <SimpleLineChart
              data={data.messagesTrend}
              color="#10B981"
              height={250}
            />
          </div>
        </div>

        {/* Channel Distribution & Response Time */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              กระจายตามช่องทาง
            </h3>
            <PieChart data={data.channelDistribution} />
          </div>

          {/* Response Time Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              สถิติเวลาตอบกลับ
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    📊
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      เฉลี่ย
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatTime(data.responseTimeStats.average)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                    📈
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      มัธยฐาน
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatTime(data.responseTimeStats.median)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    เร็วที่สุด
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatTime(data.responseTimeStats.fastest)}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    ช้าที่สุด
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatTime(data.responseTimeStats.slowest)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance & Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              ประสิทธิภาพทีม
            </h3>
            <div className="space-y-4">
              {data.teamPerformance.map((member, index) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={member.avatar || "https://i.pravatar.cc/150"}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {member.name}
                      </p>
                      {index === 0 && (
                        <span className="text-yellow-500">🏆</span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>💬 {member.conversationsHandled}</span>
                      <span>⏱️ {formatTime(member.averageResponseTime)}</span>
                      <span>⭐ {member.satisfaction.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              ลูกค้าชั้นนำ
            </h3>
            <div className="space-y-4">
              {data.topCustomers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={customer.avatar || "https://i.pravatar.cc/150"}
                      alt={customer.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {customer.name}
                      </p>
                      {index === 0 && (
                        <span className="text-yellow-500">👑</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <span>💬 {customer.totalMessages}</span>
                      <span>🛍️ {customer.totalOrders}</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ฿{customer.totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            กิจกรรมล่าสุด
          </h3>
          <div className="space-y-3">
            {data.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-xl">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      โดย {activity.user}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-500">
                  {getTimeAgo(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
