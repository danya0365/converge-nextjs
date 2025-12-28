/**
 * Auth Presenter
 * Handles authentication business logic
 */

import { UserProfile } from "@/src/domain/entities/User";

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordData {
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  expiresAt: Date;
}

export interface AuthRepository {
  signUp(data: SignUpData): Promise<AuthResponse>;
  login(data: LoginData): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UserProfile | null>;
  resetPassword(data: ResetPasswordData): Promise<boolean>;
  changePassword(data: ChangePasswordData): Promise<boolean>;
  verifyEmail(token: string): Promise<boolean>;
  resendVerificationEmail(email: string): Promise<boolean>;
}

/**
 * Mock Auth Repository
 * Replace with real Supabase implementation later
 */
class MockAuthRepository implements AuthRepository {
  private currentUser: UserProfile | null = null;
  private token: string | null = null;

  async signUp(data: SignUpData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (!data.email || !data.password || !data.name) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    if (data.password.length < 8) {
      throw new Error("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
    }

    // Mock user creation
    const user: UserProfile = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      role: "agent",
      status: "pending",
      emailNotifications: true,
      desktopNotifications: true,
      soundNotifications: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const token = `mock_token_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    this.currentUser = user;
    this.token = token;

    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    }

    return { user, token, expiresAt };
  }

  async login(data: LoginData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (!data.email || !data.password) {
      throw new Error("กรุณากรอกอีเมลและรหัสผ่าน");
    }

    // Mock credentials check (in real app, this would be Supabase)
    if (
      data.email === "admin@converge.co.th" &&
      data.password === "password123"
    ) {
      const user: UserProfile = {
        id: "user-1",
        email: "admin@converge.co.th",
        name: "สมชาย ใจดี",
        avatar: "https://i.pravatar.cc/150?img=12",
        role: "owner",
        status: "active",
        phoneNumber: "0812345678",
        bio: "ผู้ก่อตั้ง Converge และเจ้าของธุรกิจ",
        department: "Management",
        jobTitle: "CEO",
        timezone: "Asia/Bangkok",
        language: "th",
        emailNotifications: true,
        desktopNotifications: true,
        soundNotifications: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
      };

      const token = `mock_token_${Date.now()}`;
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      this.currentUser = user;
      this.token = token;

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      }

      return { user, token, expiresAt };
    }

    throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  }

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    this.currentUser = null;
    this.token = null;

    // Clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("auth_user");
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        this.currentUser = JSON.parse(storedUser);
        this.token = storedToken;
        return this.currentUser;
      }
    }

    return this.currentUser;
  }

  async resetPassword(data: ResetPasswordData): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!data.email) {
      throw new Error("กรุณากรอกอีเมล");
    }

    // Mock email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("รูปแบบอีเมลไม่ถูกต้อง");
    }

    // In real app, this would send email via Supabase
    console.log(`Password reset email sent to: ${data.email}`);
    return true;
  }

  async changePassword(data: ChangePasswordData): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    if (data.newPassword !== data.confirmPassword) {
      throw new Error("รหัสผ่านใหม่ไม่ตรงกัน");
    }

    if (data.newPassword.length < 8) {
      throw new Error("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
    }

    // In real app, this would update password via Supabase
    return true;
  }

  async verifyEmail(token: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, this would verify email via Supabase
    console.log(`Email verified with token: ${token}`);
    return true;
  }

  async resendVerificationEmail(email: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, this would resend email via Supabase
    console.log(`Verification email resent to: ${email}`);
    return true;
  }
}

/**
 * Auth Presenter
 * Handles authentication business logic following Clean Architecture
 */
export class AuthPresenter {
  constructor(private readonly repository: AuthRepository) {}

  async signUp(data: SignUpData): Promise<AuthResponse> {
    return this.repository.signUp(data);
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.repository.login(data);
  }

  async logout(): Promise<void> {
    return this.repository.logout();
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    return this.repository.getCurrentUser();
  }

  async resetPassword(data: ResetPasswordData): Promise<boolean> {
    return this.repository.resetPassword(data);
  }

  async changePassword(data: ChangePasswordData): Promise<boolean> {
    return this.repository.changePassword(data);
  }

  async verifyEmail(token: string): Promise<boolean> {
    return this.repository.verifyEmail(token);
  }

  async resendVerificationEmail(email: string): Promise<boolean> {
    return this.repository.resendVerificationEmail(email);
  }
}

/**
 * Factory for creating AuthPresenter instances
 */
export class AuthPresenterFactory {
  static create(): AuthPresenter {
    // TODO: Replace with real Supabase repository
    const repository = new MockAuthRepository();
    return new AuthPresenter(repository);
  }
}
