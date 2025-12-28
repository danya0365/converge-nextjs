"use client";

import { useAuthStore } from "@/src/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "../atoms/ThemeToggle";

export function DashboardHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Mock notifications
  const notifications = [
    {
      id: "1",
      type: "message",
      title: "ข้อความใหม่จาก คุณลูกค้า",
      message: "สอบถามเกี่ยวกับสินค้า",
      time: "2 นาทีที่แล้ว",
      unread: true,
    },
    {
      id: "2",
      type: "assignment",
      title: "มีการมอบหมายงานใหม่",
      message: "คุณได้รับมอบหมายแชท 3 รายการ",
      time: "15 นาทีที่แล้ว",
      unread: true,
    },
    {
      id: "3",
      type: "info",
      title: "อัปเดตระบบ",
      message: "Converge มีฟีเจอร์ใหม่!",
      time: "1 ชั่วโมงที่แล้ว",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left Side - Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="search"
            placeholder="ค้นหาลูกค้า, การสนทนา, ข้อความ..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
          >
            <span className="text-2xl">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      การแจ้งเตือน
                    </h3>
                    {unreadCount > 0 && (
                      <button className="text-xs text-blue-600 hover:underline">
                        ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        notification.unread
                          ? "bg-blue-50 dark:bg-blue-900/10"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-blue-600 hover:underline">
                    ดูทั้งหมด
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white hidden md:block">
              {user?.name?.split(" ")[0] || "User"}
            </span>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email || "user@example.com"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Role: {user?.role || "Agent"}
                  </p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/dashboard/profile");
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <span>👤</span> โปรไฟล์
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/dashboard/settings");
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <span>⚙️</span> ตั้งค่า
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 dark:text-red-400 flex items-center gap-2"
                  >
                    <span>🚪</span> ออกจากระบบ
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
