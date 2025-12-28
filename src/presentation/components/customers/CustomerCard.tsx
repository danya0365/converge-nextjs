"use client";

import { CustomerProfile } from "@/src/domain/entities/Customer";
import Link from "next/link";

interface CustomerCardProps {
  customer: CustomerProfile;
  onEdit?: (customer: CustomerProfile) => void;
  onDelete?: (customerId: string) => void;
}

export function CustomerCard({
  customer,
  onEdit,
  onDelete,
}: CustomerCardProps) {
  const getChannelIcon = (source: string) => {
    const icons: Record<string, string> = {
      facebook: "📘",
      instagram: "📷",
      line: "💚",
      whatsapp: "💬",
      website: "🌐",
      tiktok: "🎵",
      shopee: "🛍️",
      lazada: "📦",
    };
    return icons[source] || "💬";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalOrderValue =
    customer.orders?.reduce((sum, order) => sum + order.amount, 0) || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={customer.avatar || "https://i.pravatar.cc/150"}
              alt={customer.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="absolute -bottom-1 -right-1 text-lg">
              {getChannelIcon(customer.source)}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {customer.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {customer.email && <span>{customer.email}</span>}
              {customer.phoneNumber && (
                <>
                  {customer.email && <span>•</span>}
                  <span>{customer.phoneNumber}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/customers/${customer.id}`}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
            title="ดูรายละเอียด"
          >
            <span className="text-lg">👁️</span>
          </Link>
          {onEdit && (
            <button
              onClick={() => onEdit(customer)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              title="แก้ไข"
            >
              <span className="text-lg">✏️</span>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                if (confirm(`ต้องการลบ ${customer.name}?`)) {
                  onDelete(customer.id);
                }
              }}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              title="ลบ"
            >
              <span className="text-lg text-red-600">🗑️</span>
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      {customer.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {customer.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {customer.conversationsCount}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            การสนทนา
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {customer.orders?.length || 0}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            ออเดอร์
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            ฿{totalOrderValue.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">มูลค่า</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-500">
        <div className="flex items-center justify-between">
          <span>สร้างเมื่อ: {formatDate(customer.createdAt)}</span>
          {customer.lastContactAt && (
            <span>ติดต่อล่าสุด: {formatDate(customer.lastContactAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
