"use client";

import {
  ConversationDetail,
  ConversationStats,
} from "@/src/domain/entities/Conversation";
import { ConversationList } from "@/src/presentation/components/inbox/ConversationList";
import { DashboardLayout } from "@/src/presentation/components/templates/DashboardLayout";
import { InboxPresenterFactory } from "@/src/presentation/presenters/inbox/InboxPresenter";
import { useEffect, useState } from "react";

const inboxPresenter = InboxPresenterFactory.create();

export default function InboxPage() {
  const [conversations, setConversations] = useState<ConversationDetail[]>([]);
  const [stats, setStats] = useState<ConversationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "open" | "pending" | "unread">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadConversations();
  }, [filter, searchQuery]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const filters: any = {};

      if (filter === "open") {
        filters.status = ["open"];
      } else if (filter === "pending") {
        filters.status = ["pending"];
      } else if (filter === "unread") {
        // Will filter unread in frontend
      }

      if (searchQuery) {
        filters.search = searchQuery;
      }

      const { conversations: convs, stats: st } =
        await inboxPresenter.getInboxViewModel("team-1", filters);

      // Filter unread if needed
      let filteredConvs = convs;
      if (filter === "unread") {
        filteredConvs = convs.filter((c) => !c.isRead);
      }

      setConversations(filteredConvs);
      setStats(st);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Conversation List */}
        <div className="w-96 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Inbox
            </h1>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาการสนทนา..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                ทั้งหมด ({stats?.total || 0})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === "unread"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                ยังไม่อ่าน
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                รอดำเนินการ ({stats?.pending || 0})
              </button>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    กำลังโหลด...
                  </p>
                </div>
              </div>
            ) : (
              <ConversationList conversations={conversations} />
            )}
          </div>
        </div>

        {/* Right Panel - Empty State */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              เลือกการสนทนา
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              เลือกการสนทนาจากรายการด้านซ้ายเพื่อเริ่มต้น
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
