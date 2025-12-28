/**
 * Team Entity
 * Represents a team/organization in the system
 */

export type TeamPlan = "basic" | "pro" | "advanced" | "enterprise";
export type TeamStatus = "active" | "suspended" | "trial" | "expired";

export interface Team {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  plan: TeamPlan;
  status: TeamStatus;
  trialEndsAt?: Date;
  subscriptionEndsAt?: Date;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamSettings {
  teamId: string;
  workingHours: {
    enabled: boolean;
    timezone: string;
    schedule: {
      [key: string]: {
        start: string;
        end: string;
        enabled: boolean;
      };
    };
  };
  autoReply: {
    enabled: boolean;
    welcomeMessage?: string;
    offlineMessage?: string;
  };
  branding: {
    primaryColor?: string;
    logoUrl?: string;
    companyName?: string;
  };
  notifications: {
    email: boolean;
    slack?: {
      enabled: boolean;
      webhookUrl?: string;
    };
  };
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  email: string;
  role: string;
  invitedBy: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface TeamUsageStats {
  teamId: string;
  period: string;
  messagesCount: number;
  conversationsCount: number;
  activeUsers: number;
  aiMessagesCount: number;
  storageUsed: number; // in bytes
  limits: {
    messages: number;
    users: number;
    channels: number;
    aiMessages: number;
    storage: number;
  };
}
