import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mockUsers } from "../data/mock/users.data";

// Types
export type UserRole = "customer" | "vendor" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Find user in mock data
          const foundUser = mockUsers.find(
            (u) => u.email === email && u.password === password
          );

          if (!foundUser) {
            throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
          }

          // Remove password from user object
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _pwd, ...user } = foundUser;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Check if email already exists
          const existingUser = mockUsers.find((u) => u.email === data.email);
          if (existingUser) {
            throw new Error("อีเมลนี้ถูกใช้งานแล้ว");
          }

          // Create new user
          const newUser: User = {
            id: `${mockUsers.length + 1}`,
            email: data.email,
            name: data.name,
            role: data.role || "customer",
            phone: data.phone,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
            createdAt: new Date().toISOString(),
            emailVerified: false,
          };

          // Add to mock users (in real app, this would be saved to DB)
          mockUsers.push({ ...newUser, password: data.password });

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const currentUser = get().user;
          if (!currentUser) {
            throw new Error("ไม่พบข้อมูลผู้ใช้");
          }

          const updatedUser = {
            ...currentUser,
            ...data,
          };

          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Check if email exists
          const user = mockUsers.find((u) => u.email === email);
          if (!user) {
            throw new Error("ไม่พบอีเมลนี้ในระบบ");
          }

          // In real app, send reset password email
          console.log("Reset password email sent to:", email);

          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // In real app, verify token and update password
          console.log(
            "Password reset with token:",
            token,
            "New password length:",
            newPassword.length
          );

          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      verifyEmail: async (token: string) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const currentUser = get().user;
          if (!currentUser) {
            throw new Error("ไม่พบข้อมูลผู้ใช้");
          }

          set({
            user: {
              ...currentUser,
              emailVerified: true,
            },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localforage),
    }
  )
);
