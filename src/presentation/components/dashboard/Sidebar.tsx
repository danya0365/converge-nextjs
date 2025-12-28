"use client";

import { useAuthStore } from "@/src/stores/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../atoms/Logo";

interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: string;
  subItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: "📊",
    href: "/dashboard",
  },
  {
    label: "Inbox",
    icon: "💬",
    href: "/dashboard/inbox",
    badge: "5",
  },
  {
    label: "Customers",
    icon: "👥",
    href: "/dashboard/customers",
  },
  {
    label: "Channels",
    icon: "📡",
    href: "/dashboard/channels",
  },
  {
    label: "Automation",
    icon: "🤖",
    href: "/dashboard/automation",
    subItems: [
      { label: "Auto Reply", href: "/dashboard/automation/auto-reply" },
      { label: "Chatbot", href: "/dashboard/automation/chatbot" },
      { label: "Flows", href: "/dashboard/automation/flows" },
    ],
  },
  {
    label: "Broadcast",
    icon: "📢",
    href: "/dashboard/broadcast",
  },
  {
    label: "Analytics",
    icon: "📈",
    href: "/dashboard/analytics",
  },
  {
    label: "Team",
    icon: "👨‍💼",
    href: "/dashboard/team",
  },
  {
    label: "Settings",
    icon: "⚙️",
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive(item.href)
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>

            {/* Sub Items */}
            {item.subItems && isActive(item.href) && (
              <div className="ml-11 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                      pathname === subItem.href
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
