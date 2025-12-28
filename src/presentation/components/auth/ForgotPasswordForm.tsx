"use client";

import { useAuthStore } from "@/src/stores/authStore";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm() {
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [validationError, setValidationError] = useState("");

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setValidationError("กรุณากรอกอีเมล");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("รูปแบบอีเมลไม่ถูกต้อง");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setValidationError("");

    if (!validateEmail()) {
      return;
    }

    try {
      await forgotPassword(email);
      setEmailSent(true);
    } catch (err) {
      // Error is handled by the store
      console.error("Forgot password error:", err);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (validationError) {
      setValidationError("");
    }
    if (error) {
      clearError();
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✉️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ส่งอีเมลแล้ว!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">
            {email}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            📌 ขั้นตอนถัดไป:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>เช็คอีเมลของคุณ (รวมถึงกล่องขยะ)</li>
            <li>คลิกลิงก์ในอีเมลเพื่อรีเซ็ตรหัสผ่าน</li>
            <li>ตั้งรหัสผ่านใหม่</li>
            <li>เข้าสู่ระบบด้วยรหัสผ่านใหม่</li>
          </ol>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setEmailSent(false)}
            className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold"
          >
            ส่งอีเมลอีกครั้ง
          </button>

          <Link
            href="/login"
            className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-center font-semibold"
          >
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ลืมรหัสผ่าน?
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          ไม่ต้องกังวล! กรอกอีเมลของคุณ
          <br />
          เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            อีเมล
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${
              validationError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="example@company.com"
            autoComplete="email"
          />
          {validationError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {validationError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isLoading ? "กำลังส่งอีเมล..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
        </button>
      </form>

      {/* Back to Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        จำรหัสผ่านได้แล้ว?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          เข้าสู่ระบบ
        </Link>
      </p>
    </div>
  );
}
