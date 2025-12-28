/**
 * Conversation Entity
 * Represents a conversation thread with a customer
 */

import { CustomerSource } from "./Customer";

export type ConversationStatus = "open" | "pending" | "closed" | "snoozed";
export type ConversationPriority = "low" | "normal" | "high" | "urgent";

export interface Conversation {
  id: string;
  teamId: string;
  customerId: string;
  channelId: string;
  channelType: CustomerSource;
  status: ConversationStatus;
  priority: ConversationPriority;
  subject?: string;
  assignedTo?: string; // User ID
  tags: string[];
  isRead: boolean;
  lastMessageAt: Date;
  closedAt?: Date;
  snoozedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationDetail extends Conversation {
  customer: {
    id: string;
    name: string;
    avatar?: string;
    email?: string;
    phoneNumber?: string;
  };
  assignedUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
  messagesCount: number;
  unreadCount: number;
  lastMessage?: {
    id: string;
    content: string;
    createdAt: Date;
    direction: "incoming" | "outgoing";
  };
}

export interface ConversationFilter {
  status?: ConversationStatus[];
  assignedTo?: string[];
  channelType?: CustomerSource[];
  tags?: string[];
  priority?: ConversationPriority[];
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface ConversationStats {
  total: number;
  open: number;
  pending: number;
  closed: number;
  snoozed: number;
  unassigned: number;
  averageResponseTime: number;
  averageResolutionTime: number;
}

export interface ConversationAssignment {
  conversationId: string;
  userId: string;
  assignedBy: string;
  assignedAt: Date;
  note?: string;
}

export interface ConversationNote {
  id: string;
  conversationId: string;
  userId: string;
  content: string;
  isInternal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationEvent {
  id: string;
  conversationId: string;
  type:
    | "status_changed"
    | "assigned"
    | "tagged"
    | "note_added"
    | "closed"
    | "reopened"
    | "snoozed";
  userId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}
