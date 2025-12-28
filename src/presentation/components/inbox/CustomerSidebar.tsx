"use client";

import { ConversationDetail } from "@/src/domain/entities/Conversation";
import { useState } from "react";

interface CustomerSidebarProps {
  conversation: ConversationDetail;
}

export function CustomerSidebar({ conversation }: CustomerSidebarProps) {
  const [activeTab, setActiveTab] = useState<"info" | "history" | "notes">(
    "info"
  );

  const customer = conversation.customer;

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col h-full overflow-hidden">
      {/* Customer Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center text-center">
          <img
            src={customer.avatar || "https://i.pravatar.cc/150"}
            alt={customer.name}
            className="w-20 h-20 rounded-full mb-4"
          />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {customer.name}
          </h3>
          {customer.email && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {customer.email}
            </p>
          )}
          {customer.phoneNumber && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {customer.phoneNumber}
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
            activeTab === "info"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          ข้อมูล
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
            activeTab === "history"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          ประวัติ
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
            activeTab === "notes"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          โน้ต
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "info" && (
          <div className="space-y-4">
            {/* Conversation Info */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                การสนทนานี้
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    สถานะ:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {conversation.status === "open" && "เปิด"}
                    {conversation.status === "pending" && "รอดำเนินการ"}
                    {conversation.status === "closed" && "ปิด"}
                    {conversation.status === "snoozed" && "เลื่อน"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    ช่องทาง:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {conversation.channelType}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    ข้อความ:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {conversation.messagesCount}
                  </span>
                </div>
                {conversation.assignedUser && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      ผู้รับผิดชอบ:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {conversation.assignedUser.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {conversation.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                  แท็ก
                </h4>
                <div className="flex flex-wrap gap-2">
                  {conversation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Stats */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                สถิติลูกค้า
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {conversation.messagesCount}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    ข้อความทั้งหมด
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                การดำเนินการ
              </h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all text-sm font-medium">
                  👤 ดูโปรไฟล์ลูกค้า
                </button>
                <button className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-sm font-medium">
                  📝 เพิ่มโน้ต
                </button>
                <button className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-sm font-medium">
                  🏷️ เพิ่มแท็ก
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-3">
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm py-8">
              ยังไม่มีประวัติการสนทนา
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-3">
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm py-8">
              ยังไม่มีโน้ต
            </div>
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold">
              + เพิ่มโน้ตใหม่
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
