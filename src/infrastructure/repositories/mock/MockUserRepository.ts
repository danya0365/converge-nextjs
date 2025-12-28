/**
 * Mock User Repository
 * Provides mock data for users, team members, and user profiles
 */

import {
  TeamMember,
  UserActivity,
  UserProfile,
} from "@/src/domain/entities/User";

export class MockUserRepository {
  private users: UserProfile[] = [
    {
      id: "user-1",
      email: "admin@converge.co.th",
      name: "สมชาย ใจดี",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "owner",
      status: "active",
      phoneNumber: "0812345678",
      bio: "ผู้ก่อตั้ง Converge และเจ้าของธุรกิจ",
      department: "Management",
      jobTitle: "CEO",
      timezone: "Asia/Bangkok",
      language: "th",
      emailNotifications: true,
      desktopNotifications: true,
      soundNotifications: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-11-20"),
      lastLoginAt: new Date("2024-11-23"),
    },
    {
      id: "user-2",
      email: "somying@converge.co.th",
      name: "สมหญิง รักงาน",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "admin",
      status: "active",
      phoneNumber: "0823456789",
      bio: "ผู้ดูแลระบบและจัดการทีม",
      department: "Operations",
      jobTitle: "Operations Manager",
      timezone: "Asia/Bangkok",
      language: "th",
      emailNotifications: true,
      desktopNotifications: true,
      soundNotifications: false,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-11-22"),
      lastLoginAt: new Date("2024-11-23"),
    },
    {
      id: "user-3",
      email: "somsak@converge.co.th",
      name: "สมศักดิ์ ช่วยงาน",
      avatar: "https://i.pravatar.cc/150?img=33",
      role: "agent",
      status: "active",
      phoneNumber: "0834567890",
      bio: "เจ้าหน้าที่บริการลูกค้า ประจำเช้า",
      department: "Customer Service",
      jobTitle: "Customer Service Agent",
      timezone: "Asia/Bangkok",
      language: "th",
      emailNotifications: true,
      desktopNotifications: true,
      soundNotifications: true,
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-11-23"),
      lastLoginAt: new Date("2024-11-23"),
    },
    {
      id: "user-4",
      email: "pranee@converge.co.th",
      name: "ปราณี ยิ้มแย้ม",
      avatar: "https://i.pravatar.cc/150?img=9",
      role: "agent",
      status: "active",
      phoneNumber: "0845678901",
      bio: "เจ้าหน้าที่บริการลูกค้า ประจำบ่าย",
      department: "Customer Service",
      jobTitle: "Customer Service Agent",
      timezone: "Asia/Bangkok",
      language: "th",
      emailNotifications: true,
      desktopNotifications: true,
      soundNotifications: true,
      createdAt: new Date("2024-02-10"),
      updatedAt: new Date("2024-11-23"),
      lastLoginAt: new Date("2024-11-23"),
    },
    {
      id: "user-5",
      email: "manop@converge.co.th",
      name: "มานพ เก่งงาน",
      avatar: "https://i.pravatar.cc/150?img=51",
      role: "agent",
      status: "active",
      phoneNumber: "0856789012",
      bio: "เจ้าหน้าที่บริการลูกค้า ทีมขาย",
      department: "Sales",
      jobTitle: "Sales Agent",
      timezone: "Asia/Bangkok",
      language: "th",
      emailNotifications: false,
      desktopNotifications: true,
      soundNotifications: true,
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-11-22"),
      lastLoginAt: new Date("2024-11-22"),
    },
    {
      id: "user-6",
      email: "viewer@converge.co.th",
      name: "นภา ดูงาน",
      avatar: "https://i.pravatar.cc/150?img=32",
      role: "viewer",
      status: "active",
      phoneNumber: "0867890123",
      bio: "ผู้จัดการแผนก ดูรายงาน",
      department: "Management",
      jobTitle: "Department Manager",
      timezone: "Asia/Bangkok",
      language: "th",
      emailNotifications: true,
      desktopNotifications: false,
      soundNotifications: false,
      createdAt: new Date("2024-03-15"),
      updatedAt: new Date("2024-11-20"),
      lastLoginAt: new Date("2024-11-21"),
    },
  ];

  private teamMembers: TeamMember[] = [
    {
      id: "tm-1",
      userId: "user-1",
      teamId: "team-1",
      user: this.users[0],
      role: "owner",
      status: "active",
      joinedAt: new Date("2024-01-01"),
      invitedBy: "user-1",
    },
    {
      id: "tm-2",
      userId: "user-2",
      teamId: "team-1",
      user: this.users[1],
      role: "admin",
      status: "active",
      joinedAt: new Date("2024-01-15"),
      invitedBy: "user-1",
    },
    {
      id: "tm-3",
      userId: "user-3",
      teamId: "team-1",
      user: this.users[2],
      role: "agent",
      status: "active",
      joinedAt: new Date("2024-02-01"),
      invitedBy: "user-2",
    },
    {
      id: "tm-4",
      userId: "user-4",
      teamId: "team-1",
      user: this.users[3],
      role: "agent",
      status: "active",
      joinedAt: new Date("2024-02-10"),
      invitedBy: "user-2",
    },
    {
      id: "tm-5",
      userId: "user-5",
      teamId: "team-1",
      user: this.users[4],
      role: "agent",
      status: "active",
      joinedAt: new Date("2024-03-01"),
      invitedBy: "user-2",
    },
    {
      id: "tm-6",
      userId: "user-6",
      teamId: "team-1",
      user: this.users[5],
      role: "viewer",
      status: "active",
      joinedAt: new Date("2024-03-15"),
      invitedBy: "user-1",
    },
  ];

  async getAllUsers(): Promise<UserProfile[]> {
    return [...this.users];
  }

  async getUserById(id: string): Promise<UserProfile | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<UserProfile | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    return this.teamMembers.filter((member) => member.teamId === teamId);
  }

  async getUserActivities(
    userId: string,
    limit: number = 20
  ): Promise<UserActivity[]> {
    // Mock activity data
    const activities: UserActivity[] = [
      {
        id: "act-1",
        userId: userId,
        action: "user.login",
        metadata: { device: "Chrome on Mac" },
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0...",
        createdAt: new Date("2024-11-23T09:00:00"),
      },
      {
        id: "act-2",
        userId: userId,
        action: "conversation.assigned",
        metadata: { conversationId: "conv-123" },
        createdAt: new Date("2024-11-23T09:15:00"),
      },
      {
        id: "act-3",
        userId: userId,
        action: "message.sent",
        metadata: { conversationId: "conv-123", messageId: "msg-456" },
        createdAt: new Date("2024-11-23T09:20:00"),
      },
    ];

    return activities.slice(0, limit);
  }

  async updateUser(
    id: string,
    data: Partial<UserProfile>
  ): Promise<UserProfile> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }

    this.users[index] = {
      ...this.users[index],
      ...data,
      updatedAt: new Date(),
    };

    return this.users[index];
  }

  async createUser(
    data: Omit<UserProfile, "id" | "createdAt" | "updatedAt">
  ): Promise<UserProfile> {
    const newUser: UserProfile = {
      ...data,
      id: `user-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }
}

// Export singleton instance
export const mockUserRepository = new MockUserRepository();
