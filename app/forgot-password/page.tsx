import { Logo } from "@/src/presentation/components/atoms/Logo";
import { ForgotPasswordForm } from "@/src/presentation/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ลืมรหัสผ่าน - Converge",
  description: "รีเซ็ตรหัสผ่าน Converge ของคุณ",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center lg:text-left">
            <Logo className="mb-8 justify-center lg:justify-start" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              เราช่วยคุณได้!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              รีเซ็ตรหัสผ่านง่ายๆ ภายในไม่กี่นาที
            </p>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      ปลอดภัย 100%
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ระบบรีเซ็ตรหัสผ่านของเรามีความปลอดภัยสูง
                      ใช้เทคโนโลยีเข้ารหัสระดับสากล
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      รวดเร็วทันใจ
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      รับลิงก์รีเซ็ตรหัสผ่านทันที
                      ผ่านอีเมลของคุณภายในไม่กี่วินาที
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
