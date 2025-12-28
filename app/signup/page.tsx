import { Logo } from "@/src/presentation/components/atoms/Logo";
import { SignUpForm } from "@/src/presentation/components/auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสมาชิก - Converge",
  description:
    "สร้างบัญชี Converge เริ่มต้นใช้งานฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center lg:text-left">
            <Logo className="mb-8 justify-center lg:justify-start" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              เริ่มต้นใช้งาน Converge
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ฟรี 14 วัน
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              รวมทุกช่องทางการแชทในที่เดียว
              <br />
              พร้อม AI ตอบอัตโนมัติ 24/7
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    ไม่ต้องใส่บัตรเครดิต
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ทดลองใช้ฟรีครบทุกฟีเจอร์
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    เชื่อมต่อได้ทันที
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Facebook, Instagram, LINE, WhatsApp และอีกมากมาย
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    ยกเลิกได้ทุกเมื่อ
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ไม่มีข้อผูกมัด ไม่มีค่าปรับ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
