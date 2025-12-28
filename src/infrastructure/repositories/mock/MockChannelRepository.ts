/**
 * Mock Channel Repository
 * Provides mock data for channels
 */

import {
  Channel,
  ChannelStats,
  WebsiteChatWidget,
} from "@/src/domain/entities/Channel";

export class MockChannelRepository {
  private channels: Channel[] = [
    {
      id: "channel-1",
      teamId: "team-1",
      type: "facebook",
      name: "Converge Demo Page",
      avatar: "https://i.pravatar.cc/150?img=70",
      status: "connected",
      externalId: "fb-page-123456",
      connectedAt: new Date("2024-01-15"),
      lastSyncAt: new Date("2024-11-23T10:30:00"),
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-11-23"),
      settings: {
        autoReply: {
          enabled: true,
          message: "สวัสดีค่ะ! ยินดีต้อนรับสู่ Converge",
        },
        assignmentRules: {
          enabled: true,
          type: "round_robin",
          assignedUsers: ["user-3", "user-4"],
        },
        notificationSettings: {
          newMessage: true,
          mention: true,
        },
      },
    },
    {
      id: "channel-2",
      teamId: "team-1",
      type: "instagram",
      name: "Converge Official",
      avatar: "https://i.pravatar.cc/150?img=71",
      status: "connected",
      externalId: "ig-account-789012",
      connectedAt: new Date("2024-01-20"),
      lastSyncAt: new Date("2024-11-23T10:25:00"),
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-11-23"),
      settings: {
        autoReply: {
          enabled: true,
          message: "สวัสดีครับ! มีอะไรให้ช่วยไหมครับ",
        },
        notificationSettings: {
          newMessage: true,
          mention: true,
        },
      },
    },
    {
      id: "channel-3",
      teamId: "team-1",
      type: "line",
      name: "@converge",
      avatar: "https://i.pravatar.cc/150?img=72",
      status: "connected",
      externalId: "line-oa-345678",
      connectedAt: new Date("2024-02-01"),
      lastSyncAt: new Date("2024-11-23T10:20:00"),
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-11-23"),
      settings: {
        autoReply: {
          enabled: false,
        },
        assignmentRules: {
          enabled: true,
          type: "load_balance",
          assignedUsers: ["user-3", "user-4", "user-5"],
        },
        notificationSettings: {
          newMessage: true,
          mention: false,
        },
      },
    },
    {
      id: "channel-4",
      teamId: "team-1",
      type: "whatsapp",
      name: "WhatsApp Business",
      avatar: "https://i.pravatar.cc/150?img=73",
      status: "connected",
      externalId: "wa-business-567890",
      connectedAt: new Date("2024-02-15"),
      lastSyncAt: new Date("2024-11-23T10:15:00"),
      createdAt: new Date("2024-02-15"),
      updatedAt: new Date("2024-11-23"),
      settings: {
        autoReply: {
          enabled: true,
          message: "Hello! Welcome to Converge. How can we help you?",
        },
        notificationSettings: {
          newMessage: true,
          mention: true,
        },
      },
    },
    {
      id: "channel-5",
      teamId: "team-1",
      type: "website",
      name: "Website Live Chat",
      avatar: "https://i.pravatar.cc/150?img=74",
      status: "connected",
      externalId: "widget-123",
      connectedAt: new Date("2024-03-01"),
      lastSyncAt: new Date("2024-11-23T10:10:00"),
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-11-23"),
      settings: {
        autoReply: {
          enabled: true,
          message: "สวัสดีครับ! มีอะไรให้ช่วยไหมครับ",
        },
        workingHours: {
          enabled: true,
          schedule: {
            monday: { start: "09:00", end: "18:00", enabled: true },
            tuesday: { start: "09:00", end: "18:00", enabled: true },
            wednesday: { start: "09:00", end: "18:00", enabled: true },
            thursday: { start: "09:00", end: "18:00", enabled: true },
            friday: { start: "09:00", end: "18:00", enabled: true },
            saturday: { start: "10:00", end: "16:00", enabled: true },
            sunday: { start: "00:00", end: "00:00", enabled: false },
          },
        },
        notificationSettings: {
          newMessage: true,
          mention: true,
        },
      },
    },
  ];

  private channelStats: Map<string, ChannelStats> = new Map([
    [
      "channel-1",
      {
        channelId: "channel-1",
        period: "2024-11",
        messagesReceived: 1245,
        messagesSent: 1389,
        conversationsStarted: 87,
        conversationsClosed: 75,
        averageResponseTime: 180,
        firstResponseTime: 120,
      },
    ],
    [
      "channel-2",
      {
        channelId: "channel-2",
        period: "2024-11",
        messagesReceived: 892,
        messagesSent: 956,
        conversationsStarted: 65,
        conversationsClosed: 58,
        averageResponseTime: 210,
        firstResponseTime: 150,
      },
    ],
    [
      "channel-3",
      {
        channelId: "channel-3",
        period: "2024-11",
        messagesReceived: 567,
        messagesSent: 623,
        conversationsStarted: 42,
        conversationsClosed: 38,
        averageResponseTime: 165,
        firstResponseTime: 100,
      },
    ],
    [
      "channel-4",
      {
        channelId: "channel-4",
        period: "2024-11",
        messagesReceived: 234,
        messagesSent: 267,
        conversationsStarted: 28,
        conversationsClosed: 25,
        averageResponseTime: 140,
        firstResponseTime: 90,
      },
    ],
    [
      "channel-5",
      {
        channelId: "channel-5",
        period: "2024-11",
        messagesReceived: 456,
        messagesSent: 503,
        conversationsStarted: 35,
        conversationsClosed: 32,
        averageResponseTime: 195,
        firstResponseTime: 130,
      },
    ],
  ]);

  private widgets: WebsiteChatWidget[] = [
    {
      id: "widget-1",
      teamId: "team-1",
      name: "Main Website Widget",
      widgetKey: "wgt_xxxxxxxxxx",
      settings: {
        position: "bottom-right",
        primaryColor: "#4F46E5",
        greeting: "สวัสดีครับ! มีอะไรให้ช่วยไหมครับ",
        placeholder: "พิมพ์ข้อความ...",
        showAvatar: true,
        showTeamName: true,
      },
      domains: ["converge.co.th", "www.converge.co.th"],
      enabled: true,
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-11-20"),
    },
  ];

  async getAllChannels(teamId: string): Promise<Channel[]> {
    return this.channels.filter((c) => c.teamId === teamId);
  }

  async getChannelById(id: string): Promise<Channel | null> {
    return this.channels.find((c) => c.id === id) || null;
  }

  async getChannelsByType(teamId: string, type: string): Promise<Channel[]> {
    return this.channels.filter((c) => c.teamId === teamId && c.type === type);
  }

  async getChannelStats(channelId: string): Promise<ChannelStats | null> {
    return this.channelStats.get(channelId) || null;
  }

  async getWebsiteWidgets(teamId: string): Promise<WebsiteChatWidget[]> {
    return this.widgets.filter((w) => w.teamId === teamId);
  }

  async updateChannel(id: string, data: Partial<Channel>): Promise<Channel> {
    const index = this.channels.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Channel not found");
    }

    this.channels[index] = {
      ...this.channels[index],
      ...data,
      updatedAt: new Date(),
    };

    return this.channels[index];
  }

  async createChannel(
    data: Omit<Channel, "id" | "createdAt" | "updatedAt">
  ): Promise<Channel> {
    const newChannel: Channel = {
      ...data,
      id: `channel-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.channels.push(newChannel);
    return newChannel;
  }

  async deleteChannel(id: string): Promise<boolean> {
    const index = this.channels.findIndex((c) => c.id === id);
    if (index === -1) {
      return false;
    }

    this.channels.splice(index, 1);
    return true;
  }
}

// Export singleton instance
export const mockChannelRepository = new MockChannelRepository();
