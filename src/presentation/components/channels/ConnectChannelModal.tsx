"use client";

import { useState } from "react";

interface ConnectChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (data: {
    name: string;
    type: string;
    credentials: Record<string, string>;
  }) => Promise<void>;
}

const channelTypes = [
  {
    value: "facebook",
    label: "Facebook Messenger",
    icon: "📘",
    description: "เชื่อมต่อกับ Facebook Page ของคุณ",
    fields: [
      { name: "pageId", label: "Page ID", type: "text", required: true },
      {
        name: "pageAccessToken",
        label: "Page Access Token",
        type: "password",
        required: true,
      },
    ],
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: "📷",
    description: "เชื่อมต่อกับ Instagram Business Account",
    fields: [
      { name: "accountId", label: "Account ID", type: "text", required: true },
      {
        name: "accessToken",
        label: "Access Token",
        type: "password",
        required: true,
      },
    ],
  },
  {
    value: "line",
    label: "LINE",
    icon: "💚",
    description: "เชื่อมต่อกับ LINE Official Account",
    fields: [
      { name: "channelId", label: "Channel ID", type: "text", required: true },
      {
        name: "channelSecret",
        label: "Channel Secret",
        type: "password",
        required: true,
      },
      {
        name: "channelAccessToken",
        label: "Channel Access Token",
        type: "password",
        required: true,
      },
    ],
  },
  {
    value: "whatsapp",
    label: "WhatsApp Business",
    icon: "💬",
    description: "เชื่อมต่อกับ WhatsApp Business API",
    fields: [
      {
        name: "phoneNumberId",
        label: "Phone Number ID",
        type: "text",
        required: true,
      },
      {
        name: "accessToken",
        label: "Access Token",
        type: "password",
        required: true,
      },
    ],
  },
  {
    value: "website",
    label: "Website Chat",
    icon: "🌐",
    description: "แชทบนเว็บไซต์ของคุณ",
    fields: [
      { name: "websiteUrl", label: "Website URL", type: "url", required: true },
    ],
  },
];

export function ConnectChannelModal({
  isOpen,
  onClose,
  onConnect,
}: ConnectChannelModalProps) {
  const [selectedType, setSelectedType] = useState("");
  const [channelName, setChannelName] = useState("");
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const selectedChannel = channelTypes.find((c) => c.value === selectedType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!channelName.trim()) {
      setError("กรุณากรอกชื่อช่องทาง");
      return;
    }

    if (!selectedType) {
      setError("กรุณาเลือกประเภทช่องทาง");
      return;
    }

    // Validate required fields
    if (selectedChannel) {
      for (const field of selectedChannel.fields) {
        if (field.required && !credentials[field.name]) {
          setError(`กรุณากรอก ${field.label}`);
          return;
        }
      }
    }

    setIsConnecting(true);
    try {
      await onConnect({
        name: channelName,
        type: selectedType,
        credentials,
      });

      // Reset form
      setChannelName("");
      setSelectedType("");
      setCredentials({});
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCredentialChange = (fieldName: string, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              เชื่อมต่อช่องทางใหม่
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Channel Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                เลือกประเภทช่องทาง <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {channelTypes.map((channel) => (
                  <button
                    key={channel.value}
                    type="button"
                    onClick={() => {
                      setSelectedType(channel.value);
                      setCredentials({});
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedType === channel.value
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{channel.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {channel.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {channel.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Channel Name */}
            {selectedType && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ชื่อช่องทาง <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="ตัวอย่าง: My Facebook Page"
                    required
                  />
                </div>

                {/* Credentials */}
                {selectedChannel && selectedChannel.fields.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      ข้อมูลการเชื่อมต่อ
                    </h3>
                    {selectedChannel.fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500"> *</span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          value={credentials[field.name] || ""}
                          onChange={(e) =>
                            handleCredentialChange(field.name, e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                          placeholder={`กรอก ${field.label}`}
                          required={field.required}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Info Box */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div className="flex-1">
                      <p className="text-sm text-blue-900 dark:text-blue-200 font-semibold mb-1">
                        วิธีการหาข้อมูลการเชื่อมต่อ
                      </p>
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        {selectedType === "facebook" &&
                          "ไปที่ Facebook Developers > My Apps > เลือก App > Settings"}
                        {selectedType === "instagram" &&
                          "ไปที่ Facebook Developers > Instagram API > Settings"}
                        {selectedType === "line" &&
                          "ไปที่ LINE Developers Console > เลือก Channel > Channel settings"}
                        {selectedType === "whatsapp" &&
                          "ไปที่ Meta Business Suite > WhatsApp API > Settings"}
                        {selectedType === "website" &&
                          "คัดลอก URL ของเว็บไซต์ที่ต้องการติดตั้งแชท"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold"
                disabled={isConnecting}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isConnecting || !selectedType}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isConnecting ? "กำลังเชื่อมต่อ..." : "เชื่อมต่อ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
