/**
 * Analytics Presenter
 * Handles analytics and reporting business logic
 */

export interface AnalyticsViewModel {
  overview: OverviewStats;
  conversationsTrend: TrendData[];
  messagesTrend: TrendData[];
  channelDistribution: DistributionData[];
  responseTimeStats: ResponseTimeStats;
  teamPerformance: TeamPerformanceData[];
  topCustomers: TopCustomerData[];
  recentActivity: ActivityData[];
}

export interface OverviewStats {
  totalConversations: number;
  conversationsChange: number;
  totalMessages: number;
  messagesChange: number;
  averageResponseTime: number;
  responseTimeChange: number;
  customerSatisfaction: number;
  satisfactionChange: number;
}

export interface TrendData {
  date: string;
  value: number;
}

export interface DistributionData {
  name: string;
  value: number;
  color: string;
}

export interface ResponseTimeStats {
  average: number;
  median: number;
  fastest: number;
  slowest: number;
}

export interface TeamPerformanceData {
  id: string;
  name: string;
  avatar?: string;
  conversationsHandled: number;
  messagesHandled: number;
  averageResponseTime: number;
  satisfaction: number;
}

export interface TopCustomerData {
  id: string;
  name: string;
  avatar?: string;
  totalMessages: number;
  totalOrders: number;
  totalValue: number;
}

export interface ActivityData {
  id: string;
  type: "conversation" | "message" | "order" | "note";
  description: string;
  timestamp: Date;
  user?: string;
}

export interface AnalyticsRepository {
  getOverviewStats(teamId: string, period: string): Promise<OverviewStats>;
  getConversationsTrend(teamId: string, period: string): Promise<TrendData[]>;
  getMessagesTrend(teamId: string, period: string): Promise<TrendData[]>;
  getChannelDistribution(teamId: string): Promise<DistributionData[]>;
  getResponseTimeStats(
    teamId: string,
    period: string
  ): Promise<ResponseTimeStats>;
  getTeamPerformance(
    teamId: string,
    period: string
  ): Promise<TeamPerformanceData[]>;
  getTopCustomers(
    teamId: string,
    period: string,
    limit: number
  ): Promise<TopCustomerData[]>;
  getRecentActivity(teamId: string, limit: number): Promise<ActivityData[]>;
}

/**
 * Mock Analytics Repository
 */
class MockAnalyticsRepository implements AnalyticsRepository {
  async getOverviewStats(
    teamId: string,
    period: string
  ): Promise<OverviewStats> {
    return {
      totalConversations: 1247,
      conversationsChange: 12.5,
      totalMessages: 8934,
      messagesChange: 8.3,
      averageResponseTime: 2.3,
      responseTimeChange: -15.2,
      customerSatisfaction: 4.7,
      satisfactionChange: 3.1,
    };
  }

  async getConversationsTrend(
    teamId: string,
    period: string
  ): Promise<TrendData[]> {
    const days = period === "week" ? 7 : period === "month" ? 30 : 90;
    const data: TrendData[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split("T")[0],
        value: Math.floor(Math.random() * 50) + 30,
      });
    }

    return data;
  }

  async getMessagesTrend(teamId: string, period: string): Promise<TrendData[]> {
    const days = period === "week" ? 7 : period === "month" ? 30 : 90;
    const data: TrendData[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split("T")[0],
        value: Math.floor(Math.random() * 300) + 200,
      });
    }

    return data;
  }

  async getChannelDistribution(teamId: string): Promise<DistributionData[]> {
    return [
      { name: "Facebook", value: 450, color: "#1877F2" },
      { name: "LINE", value: 320, color: "#06C755" },
      { name: "Instagram", value: 280, color: "#E4405F" },
      { name: "WhatsApp", value: 150, color: "#25D366" },
      { name: "Website", value: 100, color: "#6366F1" },
    ];
  }

  async getResponseTimeStats(
    teamId: string,
    period: string
  ): Promise<ResponseTimeStats> {
    return {
      average: 2.3,
      median: 1.8,
      fastest: 0.5,
      slowest: 8.2,
    };
  }

  async getTeamPerformance(
    teamId: string,
    period: string
  ): Promise<TeamPerformanceData[]> {
    return [
      {
        id: "user-1",
        name: "สมชาย ใจดี",
        avatar: "https://i.pravatar.cc/150?u=user1",
        conversationsHandled: 234,
        messagesHandled: 1567,
        averageResponseTime: 1.8,
        satisfaction: 4.9,
      },
      {
        id: "user-2",
        name: "สมหญิง รักงาน",
        avatar: "https://i.pravatar.cc/150?u=user2",
        conversationsHandled: 198,
        messagesHandled: 1423,
        averageResponseTime: 2.1,
        satisfaction: 4.8,
      },
      {
        id: "user-3",
        name: "วิทยา ขยัน",
        avatar: "https://i.pravatar.cc/150?u=user3",
        conversationsHandled: 176,
        messagesHandled: 1245,
        averageResponseTime: 2.5,
        satisfaction: 4.6,
      },
    ];
  }

  async getTopCustomers(
    teamId: string,
    period: string,
    limit: number
  ): Promise<TopCustomerData[]> {
    return [
      {
        id: "cust-1",
        name: "บริษัท ABC จำกัด",
        avatar: "https://i.pravatar.cc/150?u=cust1",
        totalMessages: 456,
        totalOrders: 23,
        totalValue: 125000,
      },
      {
        id: "cust-2",
        name: "ร้านขายของออนไลน์",
        avatar: "https://i.pravatar.cc/150?u=cust2",
        totalMessages: 389,
        totalOrders: 18,
        totalValue: 98000,
      },
      {
        id: "cust-3",
        name: "คุณสมศักดิ์ มั่งมี",
        avatar: "https://i.pravatar.cc/150?u=cust3",
        totalMessages: 312,
        totalOrders: 15,
        totalValue: 87500,
      },
      {
        id: "cust-4",
        name: "บริษัท XYZ",
        avatar: "https://i.pravatar.cc/150?u=cust4",
        totalMessages: 287,
        totalOrders: 12,
        totalValue: 76000,
      },
      {
        id: "cust-5",
        name: "ห้างหุ้นส่วน DEF",
        avatar: "https://i.pravatar.cc/150?u=cust5",
        totalMessages: 234,
        totalOrders: 10,
        totalValue: 65000,
      },
    ].slice(0, limit);
  }

  async getRecentActivity(
    teamId: string,
    limit: number
  ): Promise<ActivityData[]> {
    const activities: ActivityData[] = [
      {
        id: "act-1",
        type: "conversation",
        description: "เริ่มการสนทนาใหม่กับ บริษัท ABC จำกัด",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        user: "สมชาย ใจดี",
      },
      {
        id: "act-2",
        type: "order",
        description: "ได้รับออเดอร์ใหม่ มูลค่า ฿12,500",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        user: "สมหญิง รักงาน",
      },
      {
        id: "act-3",
        type: "message",
        description: "ส่งข้อความถึง 45 ลูกค้า",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        user: "วิทยา ขยัน",
      },
      {
        id: "act-4",
        type: "note",
        description: "เพิ่มโน้ตให้ลูกค้า ร้านขายของออนไลน์",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        user: "สมชาย ใจดี",
      },
      {
        id: "act-5",
        type: "conversation",
        description: "ปิดการสนทนากับ คุณสมศักดิ์ มั่งมี",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        user: "สมหญิง รักงาน",
      },
    ];

    return activities.slice(0, limit);
  }
}

/**
 * Analytics Presenter
 */
export class AnalyticsPresenter {
  constructor(private readonly repository: AnalyticsRepository) {}

  async getAnalyticsViewModel(
    teamId: string,
    period: string = "month"
  ): Promise<AnalyticsViewModel> {
    const [
      overview,
      conversationsTrend,
      messagesTrend,
      channelDistribution,
      responseTimeStats,
      teamPerformance,
      topCustomers,
      recentActivity,
    ] = await Promise.all([
      this.repository.getOverviewStats(teamId, period),
      this.repository.getConversationsTrend(teamId, period),
      this.repository.getMessagesTrend(teamId, period),
      this.repository.getChannelDistribution(teamId),
      this.repository.getResponseTimeStats(teamId, period),
      this.repository.getTeamPerformance(teamId, period),
      this.repository.getTopCustomers(teamId, period, 5),
      this.repository.getRecentActivity(teamId, 10),
    ]);

    return {
      overview,
      conversationsTrend,
      messagesTrend,
      channelDistribution,
      responseTimeStats,
      teamPerformance,
      topCustomers,
      recentActivity,
    };
  }
}

/**
 * Factory for creating AnalyticsPresenter instances
 */
export class AnalyticsPresenterFactory {
  static create(): AnalyticsPresenter {
    const repository = new MockAnalyticsRepository();
    return new AnalyticsPresenter(repository);
  }
}
