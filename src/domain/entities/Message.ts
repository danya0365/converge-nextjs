/**
 * Message Entity
 * Represents a message in a conversation
 */

export type MessageDirection = "incoming" | "outgoing";
export type MessageType =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "file"
  | "location"
  | "sticker"
  | "template"
  | "quick_reply";
export type MessageStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed";

export interface Message {
  id: string;
  conversationId: string;
  customerId: string;
  userId?: string; // If sent by user
  channelId: string;
  direction: MessageDirection;
  type: MessageType;
  content: string;
  status: MessageStatus;
  externalId?: string; // ID from external platform
  replyTo?: string; // Message ID being replied to
  metadata?: MessageMetadata;
  createdAt: Date;
  updatedAt: Date;
  readAt?: Date;
  deliveredAt?: Date;
}

export interface MessageMetadata {
  attachments?: MessageAttachment[];
  quickReplies?: QuickReply[];
  template?: MessageTemplate;
  location?: MessageLocation;
  sticker?: MessageSticker;
  mentions?: string[]; // User IDs mentioned
  edited?: boolean;
  editedAt?: Date;
}

export interface MessageAttachment {
  id: string;
  type: "image" | "video" | "audio" | "file";
  url: string;
  filename?: string;
  size?: number;
  mimeType?: string;
  thumbnail?: string;
  duration?: number; // For audio/video
  width?: number; // For images/videos
  height?: number; // For images/videos
}

export interface QuickReply {
  id: string;
  title: string;
  payload: string;
  imageUrl?: string;
}

export interface MessageTemplate {
  type: "button" | "generic" | "receipt" | "list";
  elements: TemplateElement[];
}

export interface TemplateElement {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttons?: TemplateButton[];
}

export interface TemplateButton {
  type: "url" | "postback" | "call";
  title: string;
  url?: string;
  payload?: string;
  phoneNumber?: string;
}

export interface MessageLocation {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface MessageSticker {
  id: string;
  packageId?: string;
  url?: string;
}

export interface MessageDraft {
  conversationId: string;
  userId: string;
  content: string;
  attachments?: MessageAttachment[];
  updatedAt: Date;
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface TypingIndicator {
  conversationId: string;
  userId?: string;
  customerId?: string;
  isTyping: boolean;
  timestamp: Date;
}

export interface ReadReceipt {
  messageId: string;
  conversationId: string;
  userId?: string;
  customerId?: string;
  readAt: Date;
}
