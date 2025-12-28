/**
 * Mock Conversation Repository
 * Provides mock data for conversations
 */

import {
  Conversation,
  ConversationDetail,
  ConversationNote,
  ConversationStats,
} from "@/src/domain/entities/Conversation";

export class MockConversationRepository {
  private conversations: ConversationDetail[] = [
    {
      id: "conv-1",
      teamId: "team-1",
      customerId: "cust-1",
      channelId: "channel-1",
      channelType: "facebook",
      status: "open",
      priority: "normal",
      subject: "สอบถามเกี่ยวกับสินค้า",
      assignedTo: "user-3",
      tags: ["สินค้า", "ราคา"],
      isRead: true,
      lastMessageAt: new Date("2024-11-23T10:30:00"),
      createdAt: new Date("2024-11-22T14:20:00"),
      updatedAt: new Date("2024-11-23T10:30:00"),
      customer: {
        id: "cust-1",
        name: "คุณลูกค้า สมชาติ",
        avatar: "https://i.pravatar.cc/150?img=1",
        email: "customer1@email.com",
        phoneNumber: "0912345678",
      },
      assignedUser: {
        id: "user-3",
        name: "สมศักดิ์ ช่วยงาน",
        avatar: "https://i.pravatar.cc/150?img=33",
      },
      messagesCount: 8,
      unreadCount: 0,
      lastMessage: {
        id: "msg-108",
        content: "ขอบคุณมากครับ จะซื้อตอนมีโปรโมชันนะครับ",
        createdAt: new Date("2024-11-23T10:30:00"),
        direction: "incoming",
      },
    },
    {
      id: "conv-2",
      teamId: "team-1",
      customerId: "cust-2",
      channelId: "channel-2",
      channelType: "instagram",
      status: "pending",
      priority: "high",
      subject: "ติดตามสถานะการส่งสินค้า",
      assignedTo: "user-4",
      tags: ["delivery"],
      isRead: false,
      lastMessageAt: new Date("2024-11-23T11:15:00"),
      createdAt: new Date("2024-11-23T08:45:00"),
      updatedAt: new Date("2024-11-23T11:15:00"),
      customer: {
        id: "cust-2",
        name: "น้องกุ้ง",
        avatar: "https://i.pravatar.cc/150?img=10",
        phoneNumber: "0923456789",
      },
      assignedUser: {
        id: "user-4",
        name: "ปราณี ยิ้มแย้ม",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      messagesCount: 5,
      unreadCount: 2,
      lastMessage: {
        id: "msg-205",
        content: "สินค้าถึงวันไหนคะ",
        createdAt: new Date("2024-11-23T11:15:00"),
        direction: "incoming",
      },
    },
    {
      id: "conv-3",
      teamId: "team-1",
      customerId: "cust-3",
      channelId: "channel-3",
      channelType: "line",
      status: "open",
      priority: "normal",
      assignedTo: "user-5",
      tags: [],
      isRead: true,
      lastMessageAt: new Date("2024-11-23T09:20:00"),
      createdAt: new Date("2024-11-23T09:00:00"),
      updatedAt: new Date("2024-11-23T09:20:00"),
      customer: {
        id: "cust-3",
        name: "พี่เบียร์",
        avatar: "https://i.pravatar.cc/150?img=20",
        email: "beer@email.com",
        phoneNumber: "0834567890",
      },
      assignedUser: {
        id: "user-5",
        name: "มานพ เก่งงาน",
        avatar: "https://i.pravatar.cc/150?img=51",
      },
      messagesCount: 3,
      unreadCount: 0,
      lastMessage: {
        id: "msg-303",
        content: "โอเคครับ ขอบคุณมากครับ",
        createdAt: new Date("2024-11-23T09:20:00"),
        direction: "incoming",
      },
    },
    {
      id: "conv-4",
      teamId: "team-1",
      customerId: "cust-4",
      channelId: "channel-5",
      channelType: "website",
      status: "open",
      priority: "urgent",
      subject: "ปัญหาการชำระเงิน",
      tags: ["payment", "urgent"],
      isRead: false,
      lastMessageAt: new Date("2024-11-23T11:30:00"),
      createdAt: new Date("2024-11-23T11:25:00"),
      updatedAt: new Date("2024-11-23T11:30:00"),
      customer: {
        id: "cust-4",
        name: "คุณมานะ",
        avatar: "https://i.pravatar.cc/150?img=30",
        phoneNumber: "0845678901",
      },
      messagesCount: 2,
      unreadCount: 1,
      lastMessage: {
        id: "msg-402",
        content: "ช่วยเช็คให้หน่อยได้ไหมครับ ชำระเงินไปแล้วแต่ยังไม่ได้สินค้า",
        createdAt: new Date("2024-11-23T11:30:00"),
        direction: "incoming",
      },
    },
    {
      id: "conv-5",
      teamId: "team-1",
      customerId: "cust-5",
      channelId: "channel-4",
      channelType: "whatsapp",
      status: "closed",
      priority: "normal",
      subject: "ใบเสนอราคาสินค้า",
      assignedTo: "user-5",
      tags: ["quote", "completed"],
      isRead: true,
      lastMessageAt: new Date("2024-11-22T16:45:00"),
      closedAt: new Date("2024-11-22T17:00:00"),
      createdAt: new Date("2024-11-22T14:30:00"),
      updatedAt: new Date("2024-11-22T17:00:00"),
      customer: {
        id: "cust-5",
        name: "คุณสมหญิง",
        avatar: "https://i.pravatar.cc/150?img=40",
        email: "somying@email.com",
        phoneNumber: "0856789012",
      },
      assignedUser: {
        id: "user-5",
        name: "มานพ เก่งงาน",
        avatar: "https://i.pravatar.cc/150?img=51",
      },
      messagesCount: 12,
      unreadCount: 0,
      lastMessage: {
        id: "msg-512",
        content: "ขอบคุณมากค่ะ จะติดต่อกลับเร็วๆ นี้ค่ะ",
        createdAt: new Date("2024-11-22T16:45:00"),
        direction: "incoming",
      },
    },
  ];

  private notes: ConversationNote[] = [
    {
      id: "note-1",
      conversationId: "conv-2",
      userId: "user-4",
      content: "ลูกค้าเร่งด่วน ต้องตรวจสอบสถานะพัสดุ",
      isInternal: true,
      createdAt: new Date("2024-11-23T11:00:00"),
      updatedAt: new Date("2024-11-23T11:00:00"),
    },
    {
      id: "note-2",
      conversationId: "conv-4",
      userId: "user-2",
      content: "ตรวจสอบแล้ว พบว่าชำระเงินสำเร็จแล้ว กำลังจัดส่ง",
      isInternal: true,
      createdAt: new Date("2024-11-23T11:35:00"),
      updatedAt: new Date("2024-11-23T11:35:00"),
    },
  ];

  async getAllConversations(teamId: string): Promise<ConversationDetail[]> {
    return this.conversations.filter((c) => c.teamId === teamId);
  }

  async getConversationById(id: string): Promise<ConversationDetail | null> {
    return this.conversations.find((c) => c.id === id) || null;
  }

  async getConversationsByStatus(
    teamId: string,
    status: string
  ): Promise<ConversationDetail[]> {
    return this.conversations.filter(
      (c) => c.teamId === teamId && c.status === status
    );
  }

  async getConversationsByAssignee(
    teamId: string,
    userId: string
  ): Promise<ConversationDetail[]> {
    return this.conversations.filter(
      (c) => c.teamId === teamId && c.assignedTo === userId
    );
  }

  async getUnreadConversations(teamId: string): Promise<ConversationDetail[]> {
    return this.conversations.filter((c) => c.teamId === teamId && !c.isRead);
  }

  async getConversationStats(teamId: string): Promise<ConversationStats> {
    const teamConversations = this.conversations.filter(
      (c) => c.teamId === teamId
    );

    return {
      total: teamConversations.length,
      open: teamConversations.filter((c) => c.status === "open").length,
      pending: teamConversations.filter((c) => c.status === "pending").length,
      closed: teamConversations.filter((c) => c.status === "closed").length,
      snoozed: teamConversations.filter((c) => c.status === "snoozed").length,
      unassigned: teamConversations.filter((c) => !c.assignedTo).length,
      averageResponseTime: 180,
      averageResolutionTime: 3600,
    };
  }

  async getConversationNotes(
    conversationId: string
  ): Promise<ConversationNote[]> {
    return this.notes.filter((n) => n.conversationId === conversationId);
  }

  async addConversationNote(
    conversationId: string,
    userId: string,
    content: string
  ): Promise<ConversationNote> {
    const note: ConversationNote = {
      id: `note-${Date.now()}`,
      conversationId,
      userId,
      content,
      isInternal: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.notes.push(note);
    return note;
  }

  async updateConversation(
    id: string,
    data: Partial<Conversation>
  ): Promise<ConversationDetail> {
    const index = this.conversations.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Conversation not found");
    }

    this.conversations[index] = {
      ...this.conversations[index],
      ...data,
      updatedAt: new Date(),
    };

    return this.conversations[index];
  }

  async markAsRead(id: string): Promise<void> {
    const conversation = this.conversations.find((c) => c.id === id);
    if (conversation) {
      conversation.isRead = true;
      conversation.unreadCount = 0;
      conversation.updatedAt = new Date();
    }
  }

  async markAsUnread(id: string): Promise<void> {
    const conversation = this.conversations.find((c) => c.id === id);
    if (conversation) {
      conversation.isRead = false;
      conversation.updatedAt = new Date();
    }
  }

  async assignConversation(id: string, userId: string): Promise<void> {
    const conversation = this.conversations.find((c) => c.id === id);
    if (conversation) {
      conversation.assignedTo = userId;
      conversation.updatedAt = new Date();
    }
  }

  async closeConversation(id: string): Promise<void> {
    const conversation = this.conversations.find((c) => c.id === id);
    if (conversation) {
      conversation.status = "closed";
      conversation.closedAt = new Date();
      conversation.updatedAt = new Date();
    }
  }
}

// Export singleton instance
export const mockConversationRepository = new MockConversationRepository();
