/**
 * Mock Customer Repository
 * Provides mock data for customers
 */

import {
  Customer,
  CustomerNote,
  CustomerProfile,
  CustomerTag,
} from "@/src/domain/entities/Customer";

export class MockCustomerRepository {
  private customers: CustomerProfile[] = [
    {
      id: "cust-1",
      teamId: "team-1",
      externalId: "fb-123456",
      name: "คุณลูกค้า สมชาติ",
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "customer1@email.com",
      phoneNumber: "0912345678",
      source: "facebook",
      tags: ["vip", "ลูกค้าประจำ"],
      conversationsCount: 15,
      messagesCount: 78,
      averageResponseTime: 180,
      lifetimeValue: 25000,
      createdAt: new Date("2024-09-15"),
      updatedAt: new Date("2024-11-22"),
      lastContactAt: new Date("2024-11-22"),
      orders: [
        {
          id: "order-1",
          customerId: "cust-1",
          orderId: "ORD-001",
          platform: "shopee",
          amount: 1250,
          currency: "THB",
          status: "completed",
          createdAt: new Date("2024-11-20"),
        },
      ],
      notes: [],
    },
    {
      id: "cust-2",
      teamId: "team-1",
      externalId: "ig-789012",
      name: "น้องกุ้ง",
      avatar: "https://i.pravatar.cc/150?img=10",
      phoneNumber: "0923456789",
      source: "instagram",
      tags: ["ลูกค้าใหม่"],
      conversationsCount: 3,
      messagesCount: 12,
      createdAt: new Date("2024-11-15"),
      updatedAt: new Date("2024-11-23"),
      lastContactAt: new Date("2024-11-23"),
      orders: [],
      notes: [],
    },
    {
      id: "cust-3",
      teamId: "team-1",
      externalId: "line-345678",
      name: "พี่เบียร์",
      avatar: "https://i.pravatar.cc/150?img=20",
      email: "beer@email.com",
      phoneNumber: "0834567890",
      source: "line",
      tags: ["สนใจสินค้าใหม่"],
      conversationsCount: 8,
      messagesCount: 35,
      lifetimeValue: 8500,
      createdAt: new Date("2024-10-01"),
      updatedAt: new Date("2024-11-21"),
      lastContactAt: new Date("2024-11-21"),
      orders: [
        {
          id: "order-2",
          customerId: "cust-3",
          orderId: "ORD-002",
          platform: "line",
          amount: 3500,
          currency: "THB",
          status: "completed",
          createdAt: new Date("2024-10-15"),
        },
        {
          id: "order-3",
          customerId: "cust-3",
          orderId: "ORD-003",
          platform: "line",
          amount: 5000,
          currency: "THB",
          status: "completed",
          createdAt: new Date("2024-11-10"),
        },
      ],
      notes: [],
    },
    {
      id: "cust-4",
      teamId: "team-1",
      name: "คุณมานะ",
      avatar: "https://i.pravatar.cc/150?img=30",
      phoneNumber: "0845678901",
      source: "website",
      tags: [],
      conversationsCount: 2,
      messagesCount: 8,
      createdAt: new Date("2024-11-20"),
      updatedAt: new Date("2024-11-23"),
      lastContactAt: new Date("2024-11-23"),
      orders: [],
      notes: [],
    },
    {
      id: "cust-5",
      teamId: "team-1",
      externalId: "wa-567890",
      name: "คุณสมหญิง",
      avatar: "https://i.pravatar.cc/150?img=40",
      email: "somying@email.com",
      phoneNumber: "0856789012",
      source: "whatsapp",
      tags: ["vip", "corporate"],
      conversationsCount: 25,
      messagesCount: 150,
      averageResponseTime: 120,
      lifetimeValue: 75000,
      createdAt: new Date("2024-08-01"),
      updatedAt: new Date("2024-11-22"),
      lastContactAt: new Date("2024-11-22"),
      orders: [
        {
          id: "order-4",
          customerId: "cust-5",
          orderId: "ORD-004",
          platform: "website",
          amount: 25000,
          currency: "THB",
          status: "completed",
          createdAt: new Date("2024-10-05"),
        },
        {
          id: "order-5",
          customerId: "cust-5",
          orderId: "ORD-005",
          platform: "website",
          amount: 50000,
          currency: "THB",
          status: "completed",
          createdAt: new Date("2024-11-01"),
        },
      ],
      notes: [
        {
          id: "note-1",
          customerId: "cust-5",
          userId: "user-2",
          content: "ลูกค้า VIP องค์กร ต้องการใบกำกับภาษีทุกครั้ง",
          createdAt: new Date("2024-10-01"),
          updatedAt: new Date("2024-10-01"),
        },
      ],
    },
  ];

  private tags: CustomerTag[] = [
    {
      id: "tag-1",
      teamId: "team-1",
      name: "vip",
      color: "#F59E0B",
      createdAt: new Date(),
    },
    {
      id: "tag-2",
      teamId: "team-1",
      name: "ลูกค้าประจำ",
      color: "#3B82F6",
      createdAt: new Date(),
    },
    {
      id: "tag-3",
      teamId: "team-1",
      name: "ลูกค้าใหม่",
      color: "#10B981",
      createdAt: new Date(),
    },
    {
      id: "tag-4",
      teamId: "team-1",
      name: "สนใจสินค้าใหม่",
      color: "#8B5CF6",
      createdAt: new Date(),
    },
    {
      id: "tag-5",
      teamId: "team-1",
      name: "corporate",
      color: "#EC4899",
      createdAt: new Date(),
    },
  ];

  async getAllCustomers(teamId: string): Promise<CustomerProfile[]> {
    return this.customers.filter((c) => c.teamId === teamId);
  }

  async getCustomerById(id: string): Promise<CustomerProfile | null> {
    return this.customers.find((c) => c.id === id) || null;
  }

  async searchCustomers(
    teamId: string,
    query: string
  ): Promise<CustomerProfile[]> {
    const lowerQuery = query.toLowerCase();
    return this.customers.filter(
      (c) =>
        c.teamId === teamId &&
        (c.name.toLowerCase().includes(lowerQuery) ||
          c.email?.toLowerCase().includes(lowerQuery) ||
          c.phoneNumber?.includes(query))
    );
  }

  async getCustomersByTag(
    teamId: string,
    tag: string
  ): Promise<CustomerProfile[]> {
    return this.customers.filter(
      (c) => c.teamId === teamId && c.tags.includes(tag)
    );
  }

  async getAllTags(teamId: string): Promise<CustomerTag[]> {
    return this.tags.filter((t) => t.teamId === teamId);
  }

  async addCustomerNote(
    customerId: string,
    userId: string,
    content: string
  ): Promise<CustomerNote> {
    const note: CustomerNote = {
      id: `note-${Date.now()}`,
      customerId,
      userId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const customer = this.customers.find((c) => c.id === customerId);
    if (customer && customer.notes) {
      customer.notes.push(note);
    }

    return note;
  }

  async updateCustomer(
    id: string,
    data: Partial<Customer>
  ): Promise<CustomerProfile> {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Customer not found");
    }

    this.customers[index] = {
      ...this.customers[index],
      ...data,
      updatedAt: new Date(),
    };

    return this.customers[index];
  }

  async createCustomer(
    data: Omit<
      CustomerProfile,
      "id" | "createdAt" | "updatedAt" | "conversationsCount" | "messagesCount"
    >
  ): Promise<CustomerProfile> {
    const newCustomer: CustomerProfile = {
      ...data,
      id: `cust-${Date.now()}`,
      conversationsCount: 0,
      messagesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }
}

// Export singleton instance
export const mockCustomerRepository = new MockCustomerRepository();
