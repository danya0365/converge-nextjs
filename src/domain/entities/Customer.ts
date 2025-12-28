/**
 * Customer Entity
 * Represents a customer who interacts with the team
 */

export type CustomerSource =
  | "facebook"
  | "instagram"
  | "line"
  | "whatsapp"
  | "website"
  | "tiktok"
  | "shopee"
  | "lazada";

export interface Customer {
  id: string;
  teamId: string;
  externalId?: string; // ID from external platform
  name: string;
  avatar?: string;
  email?: string;
  phoneNumber?: string;
  source: CustomerSource;
  tags: string[];
  customFields?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  lastContactAt?: Date;
}

export interface CustomerProfile extends Customer {
  conversationsCount: number;
  messagesCount: number;
  averageResponseTime?: number;
  lifetimeValue?: number;
  orders?: CustomerOrder[];
  notes?: CustomerNote[];
  metadata?: CustomerMetadata;
}

export interface CustomerOrder {
  id: string;
  customerId: string;
  orderId: string;
  platform: string;
  amount: number;
  currency: string;
  status: string;
  items?: any[];
  createdAt: Date;
}

export interface CustomerNote {
  id: string;
  customerId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerMetadata {
  location?: {
    city?: string;
    country?: string;
    timezone?: string;
  };
  device?: {
    type?: string;
    os?: string;
    browser?: string;
  };
  preferences?: {
    language?: string;
    notificationEnabled?: boolean;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    line?: string;
  };
}

export interface CustomerTag {
  id: string;
  teamId: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface CustomerSegment {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  filters: CustomerSegmentFilter[];
  customersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerSegmentFilter {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: any;
}
