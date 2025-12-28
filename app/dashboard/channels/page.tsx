"use client";

import { Channel } from "@/src/domain/entities/Channel";
import { ChannelCard } from "@/src/presentation/components/channels/ChannelCard";
import { ConnectChannelModal } from "@/src/presentation/components/channels/ConnectChannelModal";
import { DashboardLayout } from "@/src/presentation/components/templates/DashboardLayout";
import {
  ChannelOverallStats,
  ChannelsPresenterFactory,
} from "@/src/presentation/presenters/channels/ChannelsPresenter";
import { useEffect, useState } from "react";

const channelsPresenter = ChannelsPresenterFactory.create();

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [stats, setStats] = useState<ChannelOverallStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    setLoading(true);
    try {
      const { channels: chs, stats: st } =
        await channelsPresenter.getChannelsViewModel("team-1");
      setChannels(chs);
      setStats(st);
    } catch (error) {
      console.error("Failed to load channels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (data: {
    name: string;
    type: string;
    credentials: Record<string, string>;
  }) => {
    try {
      await channelsPresenter.connectChannel({
        teamId: "team-1",
        ...data,
      });
      await loadChannels();
      setIsModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDisconnect = async (channelId: string) => {
    try {
      await channelsPresenter.disconnectChannel(channelId);
      await loadChannels();
    } catch (error) {
      console.error("Failed to disconnect channel:", error);
      alert("ไม่สามารถยกเลิกการเชื่อมต่อได้");
    }
  };

  const handleTest = async (channelId: string): Promise<boolean> => {
    try {
      return await channelsPresenter.testConnection(channelId);
    } catch (error) {
      console.error("Failed to test connection:", error);
      return false;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ช่องทางการสื่อสาร
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              เชื่อมต่อและจัดการช่องทางต่างๆ ของคุณ
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
          >
            <span>+</span>
            <span>เชื่อมต่อช่องทางใหม่</span>
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">📡</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ช่องทางทั้งหมด
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalChannels}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                เชื่อมต่อแล้ว
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.activeChannels}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">💬</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                การสนทนา
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalConversations}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">📨</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ข้อความ
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalMessages.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Channel List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
            </div>
          </div>
        ) : channels.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">📡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ยังไม่มีช่องทางการสื่อสาร
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              เริ่มต้นเชื่อมต่อช่องทางแรกของคุณ
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
            >
              + เชื่อมต่อช่องทางแรก
            </button>
          </div>
        ) : (
          <>
            {/* Channel Categories */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ช่องทางที่เชื่อมต่อ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    onDisconnect={handleDisconnect}
                    onTest={handleTest}
                  />
                ))}
              </div>
            </div>

            {/* Available Channels */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ช่องทางที่รองรับ
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">📘</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Facebook
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Instagram
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">💚</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    LINE
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    WhatsApp
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">🌐</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Website
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">🎵</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    TikTok
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">🛍️</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Shopee
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Lazada
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Connect Channel Modal */}
      <ConnectChannelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
      />
    </DashboardLayout>
  );
}
