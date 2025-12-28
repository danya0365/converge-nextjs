"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  color?: "blue" | "green" | "purple" | "orange";
  suffix?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  color = "blue",
  suffix,
}: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    green:
      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    orange:
      "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              change >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            <span>{change >= 0 ? "↑" : "↓"}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
          {suffix && (
            <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
              {suffix}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
