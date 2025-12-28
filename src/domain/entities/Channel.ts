/**
 * Channel Entity
 * Represents a communication channel (Facebook, LINE, WhatsApp, etc.)
 */

export type ChannelType =
  | "facebook"
  | "instagram"
  | "line"
  | "whatsapp"
  | "website"
  | "tiktok"
  | "shopee"
  | "lazada";
export type ChannelStatus = "connected" | "disconnected" | "error" | "pending";

export interface Channel {
  id: string;
  teamId: string;
  type: ChannelType;
  name: string;
  avatar?: string;
  status: ChannelStatus;
  externalId?: string; // Page ID, Line ID, etc.
  credentials?: Record<string, any>; // Encrypted tokens
  settings?: ChannelSettings;
  connectedAt: Date;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChannelSettings {
  autoReply?: {
    enabled: boolean;
    message?: string;
  };
  workingHours?: {
    enabled: boolean;
    schedule?: any;
  };
  assignmentRules?: {
    enabled: boolean;
    type: "round_robin" | "load_balance" | "manual";
    assignedUsers?: string[];
  };
  webhookUrl?: string;
  notificationSettings?: {
    newMessage: boolean;
    mention: boolean;
  };
}

export interface ChannelIntegration {
  id: string;
  channelId: string;
  type: string;
  name: string;
  config: Record<string, any>;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChannelStats {
  channelId: string;
  period: string;
  messagesReceived: number;
  messagesSent: number;
  conversationsStarted: number;
  conversationsClosed: number;
  averageResponseTime: number;
  firstResponseTime: number;
}

// Facebook specific
export interface FacebookPageInfo {
  pageId: string;
  name: string;
  category: string;
  picture: string;
  accessToken: string;
}

// LINE specific
export interface LineChannelInfo {
  channelId: string;
  channelName: string;
  channelSecret: string;
  accessToken: string;
}

// WhatsApp specific
export interface WhatsAppBusinessInfo {
  businessId: string;
  phoneNumber: string;
  phoneNumberId: string;
  displayName: string;
  accessToken: string;
}

// Website Live Chat
export interface WebsiteChatWidget {
  id: string;
  teamId: string;
  name: string;
  widgetKey: string;
  settings: {
    position: "bottom-right" | "bottom-left";
    primaryColor: string;
    greeting: string;
    placeholder: string;
    showAvatar: boolean;
    showTeamName: boolean;
  };
  domains: string[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
