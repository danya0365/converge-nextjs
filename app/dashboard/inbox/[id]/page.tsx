"use client";

import { ConversationDetail } from "@/src/domain/entities/Conversation";
import { Message } from "@/src/domain/entities/Message";
import { ConversationList } from "@/src/presentation/components/inbox/ConversationList";
import { CustomerSidebar } from "@/src/presentation/components/inbox/CustomerSidebar";
import { MessageInput } from "@/src/presentation/components/inbox/MessageInput";
import { MessageList } from "@/src/presentation/components/inbox/MessageList";
import { DashboardLayout } from "@/src/presentation/components/templates/DashboardLayout";
import { InboxPresenterFactory } from "@/src/presentation/presenters/inbox/InboxPresenter";
import { useAuthStore } from "@/src/stores/authStore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inboxPresenter = InboxPresenterFactory.create();

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const conversationId = params.id as string;

  const [conversations, setConversations] = useState<ConversationDetail[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<ConversationDetail | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId]);

  const loadConversations = async () => {
    try {
      const { conversations: convs } = await inboxPresenter.getInboxViewModel(
        "team-1"
      );
      setConversations(convs);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadConversation = async (id: string) => {
    setLoading(true);
    try {
      const { conversation, messages: msgs } =
        await inboxPresenter.getConversationViewModel(id);
      setCurrentConversation(conversation);
      setMessages(msgs);

      // Mark as read
      if (!conversation.isRead) {
        await inboxPresenter.markAsRead(id);
        // Reload conversations to update unread badge
        loadConversations();
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversation || !user) {
      return;
    }

    setSendingMessage(true);
    try {
      const newMessage = await inboxPresenter.sendMessage(
        currentConversation.id,
        content,
        user.id
      );

      setMessages((prev) => [...prev, newMessage]);

      // Update conversation last message
      setCurrentConversation((prev) =>
        prev
          ? {
              ...prev,
              lastMessageAt: newMessage.createdAt,
              lastMessage: {
                id: newMessage.id,
                content: newMessage.content,
                createdAt: newMessage.createdAt,
                direction: "outgoing",
              },
            }
          : null
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("ไม่สามารถส่งข้อความได้");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleCloseConversation = async () => {
    if (!currentConversation) return;

    if (confirm("ต้องการปิดการสนทนานี้?")) {
      try {
        await inboxPresenter.closeConversation(currentConversation.id);
        router.push("/dashboard/inbox");
      } catch (error) {
        console.error("Failed to close conversation:", error);
        alert("ไม่สามารถปิดการสนทนาได้");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Conversation List */}
        <div className="w-96 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Inbox
            </h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList conversations={conversations} />
          </div>
        </div>

        {/* Middle Panel - Messages */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
              </div>
            </div>
          ) : currentConversation ? (
            <>
              {/* Conversation Header */}
              <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        currentConversation.customer.avatar ||
                        "https://i.pravatar.cc/150"
                      }
                      alt={currentConversation.customer.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {currentConversation.customer.name}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{currentConversation.channelType}</span>
                        {currentConversation.assignedUser && (
                          <>
                            <span>•</span>
                            <span>
                              👤{" "}
                              {
                                currentConversation.assignedUser.name.split(
                                  " "
                                )[0]
                              }
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {currentConversation.status !== "closed" && (
                      <button
                        onClick={handleCloseConversation}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm font-medium"
                      >
                        ปิดการสนทนา
                      </button>
                    )}
                    <Link
                      href="/dashboard/inbox"
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                      title="กลับ"
                    >
                      <span className="text-xl">✕</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <MessageList messages={messages} currentUserId={user?.id} />

              {/* Message Input */}
              {currentConversation.status !== "closed" ? (
                <MessageInput
                  onSendMessage={handleSendMessage}
                  disabled={sendingMessage}
                />
              ) : (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 text-center">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    การสนทนานี้ถูกปิดแล้ว
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  ไม่พบการสนทนา
                </h2>
                <Link
                  href="/dashboard/inbox"
                  className="text-blue-600 hover:underline"
                >
                  กลับไปหน้า Inbox
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Customer Sidebar */}
        {currentConversation && (
          <CustomerSidebar conversation={currentConversation} />
        )}
      </div>
    </DashboardLayout>
  );
}
