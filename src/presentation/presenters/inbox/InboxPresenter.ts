/**
 * Inbox Presenter
 * Handles inbox/conversation business logic
 */

import {
  ConversationDetail,
  ConversationStats,
} from "@/src/domain/entities/Conversation";
import { Message } from "@/src/domain/entities/Message";
import { mockConversationRepository } from "@/src/infrastructure/repositories/mock/MockConversationRepository";
import { mockMessageRepository } from "@/src/infrastructure/repositories/mock/MockMessageRepository";

export interface InboxViewModel {
  conversations: ConversationDetail[];
  stats: ConversationStats;
}

export interface ConversationViewModel {
  conversation: ConversationDetail;
  messages: Message[];
}

export interface InboxRepository {
  getConversations(
    teamId: string,
    filters?: ConversationFilters
  ): Promise<ConversationDetail[]>;
  getConversationById(id: string): Promise<ConversationDetail | null>;
  getStats(teamId: string): Promise<ConversationStats>;
  getMessages(conversationId: string): Promise<Message[]>;
  sendMessage(
    conversationId: string,
    content: string,
    userId: string
  ): Promise<Message>;
  markAsRead(conversationId: string): Promise<void>;
  assignConversation(conversationId: string, userId: string): Promise<void>;
  closeConversation(conversationId: string): Promise<void>;
}

export interface ConversationFilters {
  status?: string[];
  assignedTo?: string;
  channelType?: string[];
  search?: string;
}

/**
 * Mock Inbox Repository
 */
class MockInboxRepository implements InboxRepository {
  async getConversations(
    teamId: string,
    filters?: ConversationFilters
  ): Promise<ConversationDetail[]> {
    let conversations = await mockConversationRepository.getAllConversations(
      teamId
    );

    // Apply filters
    if (filters?.status && filters.status.length > 0) {
      conversations = conversations.filter((c) =>
        filters.status!.includes(c.status)
      );
    }

    if (filters?.assignedTo) {
      conversations = conversations.filter(
        (c) => c.assignedTo === filters.assignedTo
      );
    }

    if (filters?.channelType && filters.channelType.length > 0) {
      conversations = conversations.filter((c) =>
        filters.channelType!.includes(c.channelType)
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      conversations = conversations.filter(
        (c) =>
          c.customer.name.toLowerCase().includes(searchLower) ||
          c.lastMessage?.content.toLowerCase().includes(searchLower)
      );
    }

    return conversations;
  }

  async getConversationById(id: string): Promise<ConversationDetail | null> {
    return mockConversationRepository.getConversationById(id);
  }

  async getStats(teamId: string): Promise<ConversationStats> {
    return mockConversationRepository.getConversationStats(teamId);
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return mockMessageRepository.getMessagesByConversation(conversationId);
  }

  async sendMessage(
    conversationId: string,
    content: string,
    userId: string
  ): Promise<Message> {
    const conversation = await mockConversationRepository.getConversationById(
      conversationId
    );
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return mockMessageRepository.sendMessage({
      conversationId,
      customerId: conversation.customerId,
      userId,
      channelId: conversation.channelId,
      direction: "outgoing",
      type: "text",
      content,
      status: "sending",
    });
  }

  async markAsRead(conversationId: string): Promise<void> {
    await mockConversationRepository.markAsRead(conversationId);
  }

  async assignConversation(
    conversationId: string,
    userId: string
  ): Promise<void> {
    await mockConversationRepository.assignConversation(conversationId, userId);
  }

  async closeConversation(conversationId: string): Promise<void> {
    await mockConversationRepository.closeConversation(conversationId);
  }
}

/**
 * Inbox Presenter
 */
export class InboxPresenter {
  constructor(private readonly repository: InboxRepository) {}

  async getInboxViewModel(
    teamId: string,
    filters?: ConversationFilters
  ): Promise<InboxViewModel> {
    const [conversations, stats] = await Promise.all([
      this.repository.getConversations(teamId, filters),
      this.repository.getStats(teamId),
    ]);

    return {
      conversations,
      stats,
    };
  }

  async getConversationViewModel(
    conversationId: string
  ): Promise<ConversationViewModel> {
    const [conversation, messages] = await Promise.all([
      this.repository.getConversationById(conversationId),
      this.repository.getMessages(conversationId),
    ]);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return {
      conversation,
      messages,
    };
  }

  async sendMessage(
    conversationId: string,
    content: string,
    userId: string
  ): Promise<Message> {
    return this.repository.sendMessage(conversationId, content, userId);
  }

  async markAsRead(conversationId: string): Promise<void> {
    return this.repository.markAsRead(conversationId);
  }

  async assignConversation(
    conversationId: string,
    userId: string
  ): Promise<void> {
    return this.repository.assignConversation(conversationId, userId);
  }

  async closeConversation(conversationId: string): Promise<void> {
    return this.repository.closeConversation(conversationId);
  }
}

/**
 * Factory for creating InboxPresenter instances
 */
export class InboxPresenterFactory {
  static create(): InboxPresenter {
    const repository = new MockInboxRepository();
    return new InboxPresenter(repository);
  }
}
