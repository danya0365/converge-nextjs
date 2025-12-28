import { Logo } from "@/src/presentation/components/atoms/Logo";
import { LoginForm } from "@/src/presentation/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ - Converge",
  description: "เข้าสู่ระบบ Converge เพื่อจัดการแชทและลูกค้าของคุณ",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center lg:text-left">
            <Logo className="mb-8 justify-center lg:justify-start" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ยินดีต้อนรับกลับ
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                สู่ Converge
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              จัดการแชทและลูกค้าของคุณ
              <br />
              ได้อย่างมีประสิทธิภาพ
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ผู้ใช้งาน
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    5M+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ข้อความ/เดือน
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                    8
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ช่องทาง
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ความพึงพอใจ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
