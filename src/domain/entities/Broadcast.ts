/**
 * Broadcast Entity
 * Represents broadcast campaigns for marketing
 */

export type BroadcastStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "paused"
  | "cancelled";
export type BroadcastType = "immediate" | "scheduled" | "recurring";

export interface Broadcast {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  type: BroadcastType;
  status: BroadcastStatus;
  channelIds: string[];
  segmentId?: string;
  customerIds?: string[];
  message: BroadcastMessage;
  scheduledAt?: Date;
  recurringConfig?: RecurringConfig;
  stats: BroadcastStats;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  completedAt?: Date;
}

export interface BroadcastMessage {
  type: "text" | "image" | "template";
  content: string;
  attachments?: {
    type: string;
    url: string;
  }[];
  template?: {
    id: string;
    variables?: Record<string, string>;
  };
  quickReplies?: {
    title: string;
    payload: string;
  }[];
}

export interface RecurringConfig {
  frequency: "daily" | "weekly" | "monthly";
  interval: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  time: string;
  timezone: string;
  endDate?: Date;
}

export interface BroadcastStats {
  totalRecipients: number;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  clicked: number;
  replied: number;
  unsubscribed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
}

export interface BroadcastRecipient {
  id: string;
  broadcastId: string;
  customerId: string;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  messageId?: string;
  error?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
}

export interface BroadcastTemplate {
  id: string;
  teamId: string;
  name: string;
  category: string;
  message: BroadcastMessage;
  variables: string[];
  timesUsed: number;
  createdAt: Date;
  updatedAt: Date;
}
