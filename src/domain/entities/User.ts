/**
 * User Entity
 * Represents a user in the system
 */

export type UserRole = "owner" | "admin" | "agent" | "viewer";
export type UserStatus = "active" | "inactive" | "suspended" | "pending";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile extends User {
  bio?: string;
  department?: string;
  jobTitle?: string;
  timezone?: string;
  language?: string;
  emailNotifications: boolean;
  desktopNotifications: boolean;
  soundNotifications: boolean;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  user: User;
  role: UserRole;
  status: "active" | "inactive";
  joinedAt: Date;
  invitedBy: string;
}

export interface UserSession {
  userId: string;
  token: string;
  expiresAt: Date;
  deviceInfo?: string;
  ipAddress?: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
