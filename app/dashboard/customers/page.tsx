"use client";

import { CustomerProfile, CustomerTag } from "@/src/domain/entities/Customer";
import { CustomerCard } from "@/src/presentation/components/customers/CustomerCard";
import { CustomerModal } from "@/src/presentation/components/customers/CustomerModal";
import { DashboardLayout } from "@/src/presentation/components/templates/DashboardLayout";
import {
  CustomersPresenterFactory,
  CustomerStats,
} from "@/src/presentation/presenters/customers/CustomersPresenter";
import { useEffect, useState } from "react";

const customersPresenter = CustomersPresenterFactory.create();

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [tags, setTags] = useState<CustomerTag[]>([]);
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] =
    useState<CustomerProfile | null>(null);

  useEffect(() => {
    loadCustomers();
  }, [searchQuery, selectedTags, selectedSource]);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const filters: any = {};

      if (searchQuery) {
        filters.search = searchQuery;
      }

      if (selectedTags.length > 0) {
        filters.tags = selectedTags;
      }

      if (selectedSource.length > 0) {
        filters.source = selectedSource;
      }

      const {
        customers: custs,
        tags: tgs,
        stats: sts,
      } = await customersPresenter.getCustomersViewModel("team-1", filters);

      setCustomers(custs);
      setTags(tgs);
      setStats(sts);
    } catch (error) {
      console.error("Failed to load customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomer = async (data: Partial<CustomerProfile>) => {
    try {
      if (editingCustomer) {
        await customersPresenter.updateCustomer(editingCustomer.id, data);
      } else {
        await customersPresenter.createCustomer({
          ...data,
          teamId: "team-1",
        });
      }

      await loadCustomers();
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await customersPresenter.deleteCustomer(customerId);
      await loadCustomers();
    } catch (error) {
      console.error("Failed to delete customer:", error);
      alert("ไม่สามารถลบลูกค้าได้");
    }
  };

  const handleEditCustomer = (customer: CustomerProfile) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  const sources = [
    { value: "facebook", label: "Facebook", icon: "📘" },
    { value: "instagram", label: "Instagram", icon: "📷" },
    { value: "line", label: "LINE", icon: "💚" },
    { value: "whatsapp", label: "WhatsApp", icon: "💬" },
    { value: "website", label: "Website", icon: "🌐" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ลูกค้า
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              จัดการข้อมูลลูกค้าทั้งหมด
            </p>
          </div>
          <button
            onClick={() => {
              setEditingCustomer(null);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
          >
            <span>+</span>
            <span>เพิ่มลูกค้าใหม่</span>
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">👥</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ลูกค้าทั้งหมด
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">⭐</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ลูกค้า VIP
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.vip}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🆕</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ลูกค้าใหม่ (30 วัน)
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.new}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🔥</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ลูกค้าที่ Active
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.active}
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาลูกค้า (ชื่อ, อีเมล, เบอร์โทร)..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="text-xl">▦</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-3 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                กรองตามแท็ก:
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.name)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag.name)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Source Filter */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              กรองตามช่องทาง:
            </p>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <button
                  key={source.value}
                  onClick={() =>
                    setSelectedSource((prev) =>
                      prev.includes(source.value)
                        ? prev.filter((s) => s !== source.value)
                        : [...prev, source.value]
                    )
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedSource.includes(source.value)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <span>{source.icon}</span>
                  <span>{source.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customers List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ยังไม่มีลูกค้า
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              เริ่มต้นเพิ่มลูกค้าเพื่อจัดการข้อมูล
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
            >
              + เพิ่มลูกค้าแรก
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
              />
            ))}
          </div>
        )}
      </div>

      {/* Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        customer={editingCustomer}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />
    </DashboardLayout>
  );
}
