/**
 * Channels Presenter
 * Handles channel management business logic
 */

import { Channel, ChannelStats } from "@/src/domain/entities/Channel";
import { mockChannelRepository } from "@/src/infrastructure/repositories/mock/MockChannelRepository";

export interface ChannelsViewModel {
  channels: Channel[];
  stats: ChannelOverallStats;
}

export interface ChannelOverallStats {
  totalChannels: number;
  activeChannels: number;
  totalMessages: number;
  totalConversations: number;
}

export interface ChannelsRepository {
  getChannels(teamId: string): Promise<Channel[]>;
  getChannelById(id: string): Promise<Channel | null>;
  getChannelStats(channelId: string): Promise<ChannelStats | null>;
  getOverallStats(teamId: string): Promise<ChannelOverallStats>;
  connectChannel(data: ConnectChannelData): Promise<Channel>;
  updateChannel(id: string, data: Partial<Channel>): Promise<Channel>;
  disconnectChannel(id: string): Promise<boolean>;
  testConnection(id: string): Promise<boolean>;
}

export interface ConnectChannelData {
  teamId: string;
  name: string;
  type: string;
  credentials: Record<string, string>;
}

/**
 * Mock Channels Repository
 */
class MockChannelsRepository implements ChannelsRepository {
  async getChannels(teamId: string): Promise<Channel[]> {
    return mockChannelRepository.getAllChannels(teamId);
  }

  async getChannelById(id: string): Promise<Channel | null> {
    return mockChannelRepository.getChannelById(id);
  }

  async getChannelStats(channelId: string): Promise<ChannelStats | null> {
    return mockChannelRepository.getChannelStats(channelId);
  }

  async getOverallStats(teamId: string): Promise<ChannelOverallStats> {
    const channels = await mockChannelRepository.getAllChannels(teamId);

    let totalMessages = 0;
    let totalConversations = 0;

    for (const channel of channels) {
      const stats = await mockChannelRepository.getChannelStats(channel.id);
      if (stats) {
        totalMessages += stats.messagesReceived + stats.messagesSent;
        totalConversations += stats.conversationsStarted;
      }
    }

    return {
      totalChannels: channels.length,
      activeChannels: channels.filter((c) => c.status === "connected").length,
      totalMessages,
      totalConversations,
    };
  }

  async connectChannel(data: ConnectChannelData): Promise<Channel> {
    // Simulate channel connection
    const newChannel: Channel = {
      id: `channel-${Date.now()}`,
      teamId: data.teamId,
      name: data.name,
      type: data.type as Channel["type"],
      status: "connected",
      settings: {
        autoReply: {
          enabled: false,
        },
        notificationSettings: {
          newMessage: true,
          mention: true,
        },
        workingHours: {
          enabled: false,
        },
      },
      connectedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSyncAt: new Date(),
    };

    return newChannel;
  }

  async updateChannel(id: string, data: Partial<Channel>): Promise<Channel> {
    const channel = await mockChannelRepository.getChannelById(id);
    if (!channel) {
      throw new Error("Channel not found");
    }

    return {
      ...channel,
      ...data,
      updatedAt: new Date(),
    };
  }

  async disconnectChannel(id: string): Promise<boolean> {
    // Simulate disconnection
    return true;
  }

  async testConnection(id: string): Promise<boolean> {
    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Math.random() > 0.1; // 90% success rate
  }
}

/**
 * Channels Presenter
 */
export class ChannelsPresenter {
  constructor(private readonly repository: ChannelsRepository) {}

  async getChannelsViewModel(teamId: string): Promise<ChannelsViewModel> {
    const [channels, stats] = await Promise.all([
      this.repository.getChannels(teamId),
      this.repository.getOverallStats(teamId),
    ]);

    return {
      channels,
      stats,
    };
  }

  async getChannelById(id: string): Promise<Channel | null> {
    return this.repository.getChannelById(id);
  }

  async getChannelStats(channelId: string): Promise<ChannelStats | null> {
    return this.repository.getChannelStats(channelId);
  }

  async connectChannel(data: ConnectChannelData): Promise<Channel> {
    if (!data.name || !data.type) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    return this.repository.connectChannel(data);
  }

  async updateChannel(id: string, data: Partial<Channel>): Promise<Channel> {
    return this.repository.updateChannel(id, data);
  }

  async disconnectChannel(id: string): Promise<boolean> {
    return this.repository.disconnectChannel(id);
  }

  async testConnection(id: string): Promise<boolean> {
    return this.repository.testConnection(id);
  }
}

/**
 * Factory for creating ChannelsPresenter instances
 */
export class ChannelsPresenterFactory {
  static create(): ChannelsPresenter {
    const repository = new MockChannelsRepository();
    return new ChannelsPresenter(repository);
  }
}
