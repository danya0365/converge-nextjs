"use client";

import { Channel } from "@/src/domain/entities/Channel";
import { useState } from "react";

interface ChannelCardProps {
  channel: Channel;
  onDisconnect?: (channelId: string) => void;
  onTest?: (channelId: string) => Promise<boolean>;
  onViewStats?: (channelId: string) => void;
}

export function ChannelCard({
  channel,
  onDisconnect,
  onTest,
  onViewStats,
}: ChannelCardProps) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(
    null
  );

  const getChannelIcon = (type: string) => {
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
    return icons[type] || "📡";
  };

  const getChannelName = (type: string) => {
    const names: Record<string, string> = {
      facebook: "Facebook",
      instagram: "Instagram",
      line: "LINE",
      whatsapp: "WhatsApp",
      website: "Website Chat",
      tiktok: "TikTok",
      shopee: "Shopee",
      lazada: "Lazada",
    };
    return names[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active:
        "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      inactive: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
      error: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    };
    return colors[status] || colors.inactive;
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      active: "เชื่อมต่อแล้ว",
      inactive: "ไม่ได้เชื่อมต่อ",
      error: "เกิดข้อผิดพลาด",
    };
    return texts[status] || status;
  };

  const handleTest = async () => {
    if (!onTest) return;

    setTesting(true);
    setTestResult(null);

    try {
      const result = await onTest(channel.id);
      setTestResult(result ? "success" : "error");

      setTimeout(() => {
        setTestResult(null);
      }, 3000);
    } catch (error) {
      setTestResult("error");
      setTimeout(() => {
        setTestResult(null);
      }, 3000);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{getChannelIcon(channel.type)}</div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {channel.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getChannelName(channel.type)}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            channel.status
          )}`}
        >
          {getStatusText(channel.status)}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        {channel.lastSyncAt && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              ซิงค์ล่าสุด:
            </span>
            <span className="text-gray-900 dark:text-white">
              {new Date(channel.lastSyncAt).toLocaleString("th-TH")}
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">สร้างเมื่อ:</span>
          <span className="text-gray-900 dark:text-white">
            {new Date(channel.createdAt).toLocaleDateString("th-TH")}
          </span>
        </div>
      </div>

      {/* Settings */}
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {channel.settings.autoReply && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
              ✓ ตอบกลับอัตโนมัติ
            </span>
          )}
          {channel.settings.notificationsEnabled && (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs rounded-full">
              ✓ การแจ้งเตือน
            </span>
          )}
          {channel.settings.workingHours?.enabled && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full">
              ✓ เวลาทำงาน
            </span>
          )}
        </div>
      </div>

      {/* Test Result */}
      {testResult && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            testResult === "success"
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p
            className={`text-sm ${
              testResult === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {testResult === "success"
              ? "✓ การเชื่อมต่อทำงานปกติ"
              : "✗ การเชื่อมต่อมีปัญหา"}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleTest}
          disabled={testing || channel.status !== "active"}
          className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {testing ? "กำลังทดสอบ..." : "🔍 ทดสอบ"}
        </button>
        {onViewStats && (
          <button
            onClick={() => onViewStats(channel.id)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm font-medium"
          >
            📊 สถิติ
          </button>
        )}
        {onDisconnect && channel.status === "active" && (
          <button
            onClick={() => {
              if (confirm(`ต้องการยกเลิกการเชื่อมต่อ ${channel.name}?`)) {
                onDisconnect(channel.id);
              }
            }}
            className="col-span-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-sm font-medium"
          >
            🔌 ยกเลิกการเชื่อมต่อ
          </button>
        )}
      </div>
    </div>
  );
}
