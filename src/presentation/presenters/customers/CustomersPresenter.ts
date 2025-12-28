/**
 * Customers Presenter
 * Handles customer management business logic
 */

import { CustomerProfile, CustomerTag } from "@/src/domain/entities/Customer";
import { mockCustomerRepository } from "@/src/infrastructure/repositories/mock/MockCustomerRepository";

export interface CustomersViewModel {
  customers: CustomerProfile[];
  tags: CustomerTag[];
  stats: CustomerStats;
}

export interface CustomerStats {
  total: number;
  vip: number;
  new: number;
  active: number;
}

export interface CustomerFilters {
  search?: string;
  tags?: string[];
  source?: string[];
}

export interface CustomersRepository {
  getCustomers(
    teamId: string,
    filters?: CustomerFilters
  ): Promise<CustomerProfile[]>;
  getCustomerById(id: string): Promise<CustomerProfile | null>;
  getTags(teamId: string): Promise<CustomerTag[]>;
  getStats(teamId: string): Promise<CustomerStats>;
  createCustomer(data: Partial<CustomerProfile>): Promise<CustomerProfile>;
  updateCustomer(
    id: string,
    data: Partial<CustomerProfile>
  ): Promise<CustomerProfile>;
  deleteCustomer(id: string): Promise<boolean>;
  addNote(customerId: string, userId: string, content: string): Promise<void>;
}

/**
 * Mock Customers Repository
 */
class MockCustomersRepository implements CustomersRepository {
  async getCustomers(
    teamId: string,
    filters?: CustomerFilters
  ): Promise<CustomerProfile[]> {
    let customers = await mockCustomerRepository.getAllCustomers(teamId);

    // Apply filters
    if (filters?.search) {
      customers = await mockCustomerRepository.searchCustomers(
        teamId,
        filters.search
      );
    }

    if (filters?.tags && filters.tags.length > 0) {
      customers = customers.filter((c) =>
        filters.tags!.some((tag) => c.tags.includes(tag))
      );
    }

    if (filters?.source && filters.source.length > 0) {
      customers = customers.filter((c) => filters.source!.includes(c.source));
    }

    return customers;
  }

  async getCustomerById(id: string): Promise<CustomerProfile | null> {
    return mockCustomerRepository.getCustomerById(id);
  }

  async getTags(teamId: string): Promise<CustomerTag[]> {
    return mockCustomerRepository.getAllTags(teamId);
  }

  async getStats(teamId: string): Promise<CustomerStats> {
    const customers = await mockCustomerRepository.getAllCustomers(teamId);

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      total: customers.length,
      vip: customers.filter((c) => c.tags.includes("vip")).length,
      new: customers.filter((c) => c.createdAt >= thirtyDaysAgo).length,
      active: customers.filter(
        (c) => c.lastContactAt && c.lastContactAt >= thirtyDaysAgo
      ).length,
    };
  }

  async createCustomer(
    data: Partial<CustomerProfile>
  ): Promise<CustomerProfile> {
    if (!data.teamId || !data.name || !data.source) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    return mockCustomerRepository.createCustomer({
      teamId: data.teamId,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      source: data.source,
      tags: data.tags || [],
      orders: [],
      notes: [],
    });
  }

  async updateCustomer(
    id: string,
    data: Partial<CustomerProfile>
  ): Promise<CustomerProfile> {
    return mockCustomerRepository.updateCustomer(id, data);
  }

  async deleteCustomer(id: string): Promise<boolean> {
    // In real app, this would soft delete
    return true;
  }

  async addNote(
    customerId: string,
    userId: string,
    content: string
  ): Promise<void> {
    await mockCustomerRepository.addCustomerNote(customerId, userId, content);
  }
}

/**
 * Customers Presenter
 */
export class CustomersPresenter {
  constructor(private readonly repository: CustomersRepository) {}

  async getCustomersViewModel(
    teamId: string,
    filters?: CustomerFilters
  ): Promise<CustomersViewModel> {
    const [customers, tags, stats] = await Promise.all([
      this.repository.getCustomers(teamId, filters),
      this.repository.getTags(teamId),
      this.repository.getStats(teamId),
    ]);

    return {
      customers,
      tags,
      stats,
    };
  }

  async getCustomerById(id: string): Promise<CustomerProfile | null> {
    return this.repository.getCustomerById(id);
  }

  async createCustomer(
    data: Partial<CustomerProfile>
  ): Promise<CustomerProfile> {
    return this.repository.createCustomer(data);
  }

  async updateCustomer(
    id: string,
    data: Partial<CustomerProfile>
  ): Promise<CustomerProfile> {
    return this.repository.updateCustomer(id, data);
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return this.repository.deleteCustomer(id);
  }

  async addNote(
    customerId: string,
    userId: string,
    content: string
  ): Promise<void> {
    if (!content.trim()) {
      throw new Error("กรุณากรอกเนื้อหาโน้ต");
    }
    return this.repository.addNote(customerId, userId, content);
  }
}

/**
 * Factory for creating CustomersPresenter instances
 */
export class CustomersPresenterFactory {
  static create(): CustomersPresenter {
    const repository = new MockCustomersRepository();
    return new CustomersPresenter(repository);
  }
}
