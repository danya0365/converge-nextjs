import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserProfile } from "../domain/entities/User";
import {
  AuthPresenterFactory,
  SignUpData,
} from "../presentation/presenters/auth/AuthPresenter";

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const authPresenter = AuthPresenterFactory.create();

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string, rememberMe = false) => {
        set({ isLoading: true, error: null });

        try {
          const { user } = await authPresenter.login({
            email,
            password,
            rememberMe,
          });

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      signUp: async (data: SignUpData) => {
        set({ isLoading: true, error: null });

        try {
          const { user } = await authPresenter.signUp(data);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });

        try {
          await authPresenter.logout();

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      updateProfile: async (data: Partial<UserProfile>) => {
        set({ isLoading: true, error: null });

        try {
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
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          await authPresenter.resetPassword({ email });

          set({ isLoading: false, error: null });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        set({ isLoading: true, error: null });

        try {
          // In real app, verify token and update password
          console.log(
            "Password reset with token:",
            token,
            "New password length:",
            newPassword.length
          );

          set({ isLoading: false, error: null });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null });

        try {
          await authPresenter.verifyEmail(token);

          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                status: "active",
              },
              isLoading: false,
              error: null,
            });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      checkAuth: async () => {
        try {
          const user = await authPresenter.getCurrentUser();

          if (user) {
            set({
              user,
              isAuthenticated: true,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localforage),
    }
  )
);
