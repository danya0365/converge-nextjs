/**
 * Mock Team Repository
 * Provides mock data for teams and team settings
 */

import {
  Team,
  TeamInvitation,
  TeamSettings,
  TeamUsageStats,
} from "@/src/domain/entities/Team";

export class MockTeamRepository {
  private teams: Team[] = [
    {
      id: "team-1",
      name: "Converge Demo Team",
      slug: "converge-demo",
      logo: "https://i.pravatar.cc/150?img=70",
      plan: "pro",
      status: "active",
      ownerId: "user-1",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-11-20"),
    },
  ];

  private teamSettings: TeamSettings[] = [
    {
      teamId: "team-1",
      workingHours: {
        enabled: true,
        timezone: "Asia/Bangkok",
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
      autoReply: {
        enabled: true,
        welcomeMessage:
          "สวัสดีค่ะ! ยินดีต้อนรับสู่ Converge ทีมงานของเราพร้อมให้บริการคุณ 😊",
        offlineMessage:
          "ขออภัยค่ะ ขณะนี้อยู่นอกเวลาทำงาน เราจะติดต่อกลับโดยเร็วที่สุดค่ะ",
      },
      branding: {
        primaryColor: "#4F46E5",
        logoUrl: "https://i.pravatar.cc/150?img=70",
        companyName: "Converge Demo Team",
      },
      notifications: {
        email: true,
        slack: {
          enabled: false,
        },
      },
    },
  ];

  private invitations: TeamInvitation[] = [];

  private usageStats: TeamUsageStats = {
    teamId: "team-1",
    period: "2024-11",
    messagesCount: 2847,
    conversationsCount: 156,
    activeUsers: 5,
    aiMessagesCount: 423,
    storageUsed: 1024 * 1024 * 250, // 250 MB
    limits: {
      messages: 5000,
      users: 3,
      channels: 5,
      aiMessages: 1000,
      storage: 1024 * 1024 * 1024 * 5, // 5 GB
    },
  };

  async getTeamById(id: string): Promise<Team | null> {
    return this.teams.find((team) => team.id === id) || null;
  }

  async getTeamBySlug(slug: string): Promise<Team | null> {
    return this.teams.find((team) => team.slug === slug) || null;
  }

  async getTeamSettings(teamId: string): Promise<TeamSettings | null> {
    return (
      this.teamSettings.find((settings) => settings.teamId === teamId) || null
    );
  }

  async updateTeamSettings(
    teamId: string,
    data: Partial<TeamSettings>
  ): Promise<TeamSettings> {
    const index = this.teamSettings.findIndex(
      (settings) => settings.teamId === teamId
    );
    if (index === -1) {
      throw new Error("Team settings not found");
    }

    this.teamSettings[index] = {
      ...this.teamSettings[index],
      ...data,
    };

    return this.teamSettings[index];
  }

  async getTeamUsageStats(teamId: string): Promise<TeamUsageStats> {
    // In real app, this would calculate from database
    return { ...this.usageStats };
  }

  async createTeamInvitation(
    data: Omit<TeamInvitation, "id" | "createdAt">
  ): Promise<TeamInvitation> {
    const invitation: TeamInvitation = {
      ...data,
      id: `inv-${Date.now()}`,
      createdAt: new Date(),
    };

    this.invitations.push(invitation);
    return invitation;
  }

  async getTeamInvitations(teamId: string): Promise<TeamInvitation[]> {
    return this.invitations.filter((inv) => inv.teamId === teamId);
  }

  async updateTeam(id: string, data: Partial<Team>): Promise<Team> {
    const index = this.teams.findIndex((team) => team.id === id);
    if (index === -1) {
      throw new Error("Team not found");
    }

    this.teams[index] = {
      ...this.teams[index],
      ...data,
      updatedAt: new Date(),
    };

    return this.teams[index];
  }

  async createTeam(
    data: Omit<Team, "id" | "createdAt" | "updatedAt">
  ): Promise<Team> {
    const newTeam: Team = {
      ...data,
      id: `team-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.teams.push(newTeam);
    return newTeam;
  }
}

// Export singleton instance
export const mockTeamRepository = new MockTeamRepository();
