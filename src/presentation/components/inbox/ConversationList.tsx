"use client";

import { ConversationDetail } from "@/src/domain/entities/Conversation";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ConversationListProps {
  conversations: ConversationDetail[];
  onConversationSelect?: (conversationId: string) => void;
}

export function ConversationList({ conversations }: ConversationListProps) {
  const pathname = usePathname();

  const getChannelIcon = (channelType: string) => {
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
    return icons[channelType] || "💬";
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: "text-red-600 dark:text-red-400",
      high: "text-orange-600 dark:text-orange-400",
      normal: "text-blue-600 dark:text-blue-400",
      low: "text-gray-600 dark:text-gray-400",
    };
    return colors[priority] || colors.normal;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "เมื่อสักครู่";
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    if (days < 7) return `${days} วันที่แล้ว`;
    return date.toLocaleDateString("th-TH");
  };

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          ไม่มีการสนทนา
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ยังไม่มีการสนทนาในขณะนี้
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.map((conversation) => {
        const isActive = pathname?.includes(conversation.id);

        return (
          <Link
            key={conversation.id}
            href={`/dashboard/inbox/${conversation.id}`}
            className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all ${
              isActive ? "bg-blue-50 dark:bg-blue-900/20" : ""
            } ${
              !conversation.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={
                  conversation.customer.avatar || "https://i.pravatar.cc/150"
                }
                alt={conversation.customer.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 text-lg">
                {getChannelIcon(conversation.channelType)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <h3
                    className={`font-semibold truncate ${
                      !conversation.isRead
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {conversation.customer.name}
                  </h3>
                  {conversation.priority !== "normal" && (
                    <span
                      className={`text-xs ${getPriorityColor(
                        conversation.priority
                      )}`}
                    >
                      ●
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-2">
                  {formatTime(conversation.lastMessageAt)}
                </span>
              </div>

              {conversation.subject && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 truncate">
                  {conversation.subject}
                </p>
              )}

              <p
                className={`text-sm truncate ${
                  !conversation.isRead
                    ? "text-gray-900 dark:text-white font-medium"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {conversation.lastMessage?.direction === "outgoing" && "คุณ: "}
                {conversation.lastMessage?.content || "ไม่มีข้อความ"}
              </p>

              {/* Tags & Status */}
              <div className="flex items-center gap-2 mt-2">
                {conversation.status === "pending" && (
                  <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full">
                    รอดำเนินการ
                  </span>
                )}
                {conversation.status === "snoozed" && (
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                    เลื่อน
                  </span>
                )}
                {conversation.assignedUser && (
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    👤 {conversation.assignedUser.name.split(" ")[0]}
                  </span>
                )}
                {conversation.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Unread Badge */}
            {conversation.unreadCount > 0 && (
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {conversation.unreadCount}
                </span>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
