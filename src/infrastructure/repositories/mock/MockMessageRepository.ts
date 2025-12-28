/**
 * Mock Message Repository
 * Provides mock data for messages
 */

import {
  Message,
  MessageDraft,
  TypingIndicator,
} from "@/src/domain/entities/Message";

export class MockMessageRepository {
  private messages: Message[] = [
    // Conversation 1 Messages
    {
      id: "msg-101",
      conversationId: "conv-1",
      customerId: "cust-1",
      channelId: "channel-1",
      direction: "incoming",
      type: "text",
      content: "สวัสดีครับ ขอสอบถามเกี่ยวกับสินค้าหน่อยครับ",
      status: "read",
      createdAt: new Date("2024-11-22T14:20:00"),
      updatedAt: new Date("2024-11-22T14:20:00"),
      readAt: new Date("2024-11-22T14:21:00"),
    },
    {
      id: "msg-102",
      conversationId: "conv-1",
      customerId: "cust-1",
      userId: "user-3",
      channelId: "channel-1",
      direction: "outgoing",
      type: "text",
      content: "สวัสดีครับ! ยินดีให้บริการครับ มีอะไรให้ช่วยไหมครับ",
      status: "read",
      createdAt: new Date("2024-11-22T14:21:30"),
      updatedAt: new Date("2024-11-22T14:21:30"),
      deliveredAt: new Date("2024-11-22T14:21:31"),
      readAt: new Date("2024-11-22T14:22:00"),
    },
    {
      id: "msg-103",
      conversationId: "conv-1",
      customerId: "cust-1",
      channelId: "channel-1",
      direction: "incoming",
      type: "text",
      content: "อยากทราบราคาสินค้ารุ่นใหม่ครับ",
      status: "read",
      createdAt: new Date("2024-11-22T14:22:15"),
      updatedAt: new Date("2024-11-22T14:22:15"),
      readAt: new Date("2024-11-22T14:23:00"),
    },
    {
      id: "msg-104",
      conversationId: "conv-1",
      customerId: "cust-1",
      userId: "user-3",
      channelId: "channel-1",
      direction: "outgoing",
      type: "text",
      content: "สินค้ารุ่นใหม่ราคา 2,990 บาทครับ ส่งฟรีทั่วประเทศเลยครับ",
      status: "read",
      createdAt: new Date("2024-11-22T14:23:30"),
      updatedAt: new Date("2024-11-22T14:23:30"),
      deliveredAt: new Date("2024-11-22T14:23:31"),
      readAt: new Date("2024-11-22T14:24:00"),
    },
    {
      id: "msg-105",
      conversationId: "conv-1",
      customerId: "cust-1",
      channelId: "channel-1",
      direction: "incoming",
      type: "text",
      content: "มีโปรโมชันอะไรไหมครับ",
      status: "read",
      createdAt: new Date("2024-11-22T14:24:30"),
      updatedAt: new Date("2024-11-22T14:24:30"),
      readAt: new Date("2024-11-22T14:25:00"),
    },
    {
      id: "msg-106",
      conversationId: "conv-1",
      customerId: "cust-1",
      userId: "user-3",
      channelId: "channel-1",
      direction: "outgoing",
      type: "text",
      content: "ตอนนี้มีโปรโมชันสำหรับลูกค้า VIP ลด 10% เลยครับ",
      status: "read",
      createdAt: new Date("2024-11-22T14:25:30"),
      updatedAt: new Date("2024-11-22T14:25:30"),
      deliveredAt: new Date("2024-11-22T14:25:31"),
      readAt: new Date("2024-11-22T14:26:00"),
    },
    {
      id: "msg-107",
      conversationId: "conv-1",
      customerId: "cust-1",
      userId: "user-3",
      channelId: "channel-1",
      direction: "outgoing",
      type: "text",
      content: "ราคาพิเศษสำหรับคุณลูกค้าเหลือเพียง 2,691 บาทครับ",
      status: "read",
      createdAt: new Date("2024-11-22T14:26:00"),
      updatedAt: new Date("2024-11-22T14:26:00"),
      deliveredAt: new Date("2024-11-22T14:26:01"),
      readAt: new Date("2024-11-23T10:29:00"),
    },
    {
      id: "msg-108",
      conversationId: "conv-1",
      customerId: "cust-1",
      channelId: "channel-1",
      direction: "incoming",
      type: "text",
      content: "ขอบคุณมากครับ จะซื้อตอนมีโปรโมชันนะครับ",
      status: "read",
      createdAt: new Date("2024-11-23T10:30:00"),
      updatedAt: new Date("2024-11-23T10:30:00"),
      readAt: new Date("2024-11-23T10:30:30"),
    },

    // Conversation 2 Messages
    {
      id: "msg-201",
      conversationId: "conv-2",
      customerId: "cust-2",
      channelId: "channel-2",
      direction: "incoming",
      type: "text",
      content: "สวัสดีค่ะ สั่งของไปเมื่อวานนี้",
      status: "read",
      createdAt: new Date("2024-11-23T08:45:00"),
      updatedAt: new Date("2024-11-23T08:45:00"),
      readAt: new Date("2024-11-23T08:50:00"),
    },
    {
      id: "msg-202",
      conversationId: "conv-2",
      customerId: "cust-2",
      userId: "user-4",
      channelId: "channel-2",
      direction: "outgoing",
      type: "text",
      content: "สวัสดีค่ะ! รอสักครู่นะคะ จะเช็คให้ค่ะ",
      status: "delivered",
      createdAt: new Date("2024-11-23T08:51:00"),
      updatedAt: new Date("2024-11-23T08:51:00"),
      deliveredAt: new Date("2024-11-23T08:51:01"),
    },
    {
      id: "msg-203",
      conversationId: "conv-2",
      customerId: "cust-2",
      userId: "user-4",
      channelId: "channel-2",
      direction: "outgoing",
      type: "text",
      content: "ออเดอร์ของคุณกำลังจัดส่งค่ะ คาดว่าจะถึงวันนี้เย็นค่ะ",
      status: "delivered",
      createdAt: new Date("2024-11-23T08:53:00"),
      updatedAt: new Date("2024-11-23T08:53:00"),
      deliveredAt: new Date("2024-11-23T08:53:01"),
    },
    {
      id: "msg-204",
      conversationId: "conv-2",
      customerId: "cust-2",
      channelId: "channel-2",
      direction: "incoming",
      type: "text",
      content: "อ๋อ ขอบคุณค่ะ",
      status: "read",
      createdAt: new Date("2024-11-23T08:54:00"),
      updatedAt: new Date("2024-11-23T08:54:00"),
      readAt: new Date("2024-11-23T08:55:00"),
    },
    {
      id: "msg-205",
      conversationId: "conv-2",
      customerId: "cust-2",
      channelId: "channel-2",
      direction: "incoming",
      type: "text",
      content: "สินค้าถึงวันไหนคะ",
      status: "sent",
      createdAt: new Date("2024-11-23T11:15:00"),
      updatedAt: new Date("2024-11-23T11:15:00"),
    },

    // Conversation 3 Messages
    {
      id: "msg-301",
      conversationId: "conv-3",
      customerId: "cust-3",
      channelId: "channel-3",
      direction: "incoming",
      type: "text",
      content: "สินค้ามีของพร้อมส่งไหมครับ",
      status: "read",
      createdAt: new Date("2024-11-23T09:00:00"),
      updatedAt: new Date("2024-11-23T09:00:00"),
      readAt: new Date("2024-11-23T09:01:00"),
    },
    {
      id: "msg-302",
      conversationId: "conv-3",
      customerId: "cust-3",
      userId: "user-5",
      channelId: "channel-3",
      direction: "outgoing",
      type: "text",
      content: "มีครับ พร้อมส่งเลยครับ ส่งได้ทันทีเลยครับ",
      status: "read",
      createdAt: new Date("2024-11-23T09:02:00"),
      updatedAt: new Date("2024-11-23T09:02:00"),
      deliveredAt: new Date("2024-11-23T09:02:01"),
      readAt: new Date("2024-11-23T09:20:00"),
    },
    {
      id: "msg-303",
      conversationId: "conv-3",
      customerId: "cust-3",
      channelId: "channel-3",
      direction: "incoming",
      type: "text",
      content: "โอเคครับ ขอบคุณมากครับ",
      status: "read",
      createdAt: new Date("2024-11-23T09:20:00"),
      updatedAt: new Date("2024-11-23T09:20:00"),
      readAt: new Date("2024-11-23T09:20:30"),
    },

    // Conversation 4 Messages
    {
      id: "msg-401",
      conversationId: "conv-4",
      customerId: "cust-4",
      channelId: "channel-5",
      direction: "incoming",
      type: "text",
      content: "สวัสดีครับ มีปัญหาการชำระเงินหน่อยครับ",
      status: "read",
      createdAt: new Date("2024-11-23T11:25:00"),
      updatedAt: new Date("2024-11-23T11:25:00"),
      readAt: new Date("2024-11-23T11:26:00"),
    },
    {
      id: "msg-402",
      conversationId: "conv-4",
      customerId: "cust-4",
      channelId: "channel-5",
      direction: "incoming",
      type: "text",
      content: "ช่วยเช็คให้หน่อยได้ไหมครับ ชำระเงินไปแล้วแต่ยังไม่ได้สินค้า",
      status: "sent",
      createdAt: new Date("2024-11-23T11:30:00"),
      updatedAt: new Date("2024-11-23T11:30:00"),
    },
  ];

  private drafts: Map<string, MessageDraft> = new Map();
  private typingIndicators: Map<string, TypingIndicator> = new Map();

  async getMessagesByConversation(
    conversationId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    const messages = this.messages
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return messages.slice(offset, offset + limit);
  }

  async getMessageById(id: string): Promise<Message | null> {
    return this.messages.find((m) => m.id === id) || null;
  }

  async sendMessage(
    data: Omit<Message, "id" | "createdAt" | "updatedAt">
  ): Promise<Message> {
    const newMessage: Message = {
      ...data,
      id: `msg-${Date.now()}`,
      status: "sending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.messages.push(newMessage);

    // Simulate sending
    setTimeout(() => {
      newMessage.status = "sent";
      newMessage.deliveredAt = new Date();
    }, 100);

    return newMessage;
  }

  async updateMessageStatus(
    id: string,
    status: "sending" | "sent" | "delivered" | "read" | "failed"
  ): Promise<void> {
    const message = this.messages.find((m) => m.id === id);
    if (message) {
      message.status = status;
      message.updatedAt = new Date();

      if (status === "delivered" && !message.deliveredAt) {
        message.deliveredAt = new Date();
      } else if (status === "read" && !message.readAt) {
        message.readAt = new Date();
      }
    }
  }

  async saveDraft(
    conversationId: string,
    userId: string,
    content: string
  ): Promise<void> {
    const draft: MessageDraft = {
      conversationId,
      userId,
      content,
      updatedAt: new Date(),
    };

    this.drafts.set(conversationId, draft);
  }

  async getDraft(conversationId: string): Promise<MessageDraft | null> {
    return this.drafts.get(conversationId) || null;
  }

  async deleteDraft(conversationId: string): Promise<void> {
    this.drafts.delete(conversationId);
  }

  async setTypingIndicator(
    conversationId: string,
    userId: string | undefined,
    customerId: string | undefined,
    isTyping: boolean
  ): Promise<void> {
    const indicator: TypingIndicator = {
      conversationId,
      userId,
      customerId,
      isTyping,
      timestamp: new Date(),
    };

    this.typingIndicators.set(conversationId, indicator);

    // Auto-clear after 5 seconds
    if (isTyping) {
      setTimeout(() => {
        const current = this.typingIndicators.get(conversationId);
        if (current?.timestamp === indicator.timestamp) {
          this.typingIndicators.delete(conversationId);
        }
      }, 5000);
    }
  }

  async getTypingIndicator(
    conversationId: string
  ): Promise<TypingIndicator | null> {
    return this.typingIndicators.get(conversationId) || null;
  }

  async markMessagesAsRead(
    conversationId: string,
    userId: string
  ): Promise<void> {
    const messages = this.messages.filter(
      (m) => m.conversationId === conversationId && m.direction === "incoming"
    );

    for (const message of messages) {
      if (message.status !== "read") {
        message.status = "read";
        message.readAt = new Date();
        message.updatedAt = new Date();
      }
    }
  }

  async searchMessages(
    teamId: string,
    query: string,
    limit: number = 20
  ): Promise<Message[]> {
    const lowerQuery = query.toLowerCase();
    return this.messages
      .filter((m) => m.content.toLowerCase().includes(lowerQuery))
      .slice(0, limit);
  }

  async deleteMessage(id: string): Promise<boolean> {
    const index = this.messages.findIndex((m) => m.id === id);
    if (index === -1) {
      return false;
    }

    this.messages.splice(index, 1);
    return true;
  }
}

// Export singleton instance
export const mockMessageRepository = new MockMessageRepository();
