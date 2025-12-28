"use client";

import { SignUpData } from "@/src/presentation/presenters/auth/AuthPresenter";
import { useAuthStore } from "@/src/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (error) {
      clearError();
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "กรุณากรอกชื่อ-นามสกุล";
    }

    if (!formData.email.trim()) {
      errors.email = "กรุณากรอกอีเมล";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!formData.password) {
      errors.password = "กรุณากรอกรหัสผ่าน";
    } else if (formData.password.length < 8) {
      errors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
    } else if (formData.password !== confirmPassword) {
      errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }

    if (!agreedToTerms) {
      errors.terms = "กรุณายอมรับข้อตกลงและเงื่อนไข";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signUp(formData);
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by the store
      console.error("Sign up error:", err);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          สร้างบัญชีใหม่
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          เริ่มต้นใช้งาน Converge ฟรี 14 วัน
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            ชื่อ-นามสกุล <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${
              validationErrors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="กรอกชื่อ-นามสกุล"
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${
              validationErrors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="example@company.com"
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            placeholder="0812345678"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            รหัสผ่าน <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white pr-12 ${
                validationErrors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="อย่างน้อย 8 ตัวอักษร"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {validationErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (validationErrors.confirmPassword) {
                setValidationErrors((prev) => ({
                  ...prev,
                  confirmPassword: "",
                }));
              }
            }}
            className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${
              validationErrors.confirmPassword
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="ยืนยันรหัสผ่าน"
          />
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (validationErrors.terms) {
                  setValidationErrors((prev) => ({ ...prev, terms: "" }));
                }
              }}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ฉันยอมรับ{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                ข้อตกลงการใช้งาน
              </Link>{" "}
              และ{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                นโยบายความเป็นส่วนตัว
              </Link>
            </span>
          </label>
          {validationErrors.terms && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {validationErrors.terms}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isLoading ? "กำลังสร้างบัญชี..." : "สร้างบัญชี"}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        มีบัญชีอยู่แล้ว?{" "}
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
