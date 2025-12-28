"use client";

import { Message } from "@/src/domain/entities/Message";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (messageDate.toDateString() === today.toDateString()) {
      return "วันนี้";
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "เมื่อวาน";
    }

    return messageDate.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = "";

  messages.forEach((message) => {
    const messageDate = formatDate(message.createdAt);
    if (messageDate !== currentDate) {
      currentDate = messageDate;
      groupedMessages.push({ date: messageDate, messages: [message] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    }
  });

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          เริ่มการสนทนา
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ส่งข้อความแรกเพื่อเริ่มต้นการสนทนา
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {groupedMessages.map((group, groupIndex) => (
        <div key={groupIndex}>
          {/* Date Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400">
              {group.date}
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {group.messages.map((message) => {
              const isOutgoing = message.direction === "outgoing";

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isOutgoing ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      isOutgoing
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    } rounded-2xl px-4 py-3 shadow-sm`}
                  >
                    {/* Message Content */}
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>

                    {/* Message Metadata */}
                    <div
                      className={`flex items-center gap-2 mt-2 text-xs ${
                        isOutgoing
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <span>{formatTime(message.createdAt)}</span>

                      {/* Status Indicators for Outgoing Messages */}
                      {isOutgoing && (
                        <>
                          {message.status === "sending" && <span>⏳</span>}
                          {message.status === "sent" && <span>✓</span>}
                          {message.status === "delivered" && <span>✓✓</span>}
                          {message.status === "read" && (
                            <span className="text-blue-200">✓✓</span>
                          )}
                          {message.status === "failed" && (
                            <span className="text-red-300">✗</span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Attachments (if any) */}
                    {message.metadata?.attachments &&
                      message.metadata.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.metadata.attachments.map(
                            (attachment, index) => (
                              <div
                                key={index}
                                className="p-2 bg-white/10 rounded-lg text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span>📎</span>
                                  <span className="truncate">
                                    {attachment.filename || "ไฟล์แนบ"}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}
