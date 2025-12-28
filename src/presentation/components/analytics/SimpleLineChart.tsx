"use client";

import { TrendData } from "@/src/presentation/presenters/analytics/AnalyticsPresenter";

interface SimpleLineChartProps {
  data: TrendData[];
  color?: string;
  height?: number;
}

export function SimpleLineChart({
  data,
  color = "#3B82F6",
  height = 200,
}: SimpleLineChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = ((maxValue - d.value) / range) * 80 + 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative" style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line
          x1="0"
          y1="25"
          x2="100"
          y2="25"
          stroke="currentColor"
          strokeWidth="0.1"
          className="text-gray-200 dark:text-gray-700"
        />
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="currentColor"
          strokeWidth="0.1"
          className="text-gray-200 dark:text-gray-700"
        />
        <line
          x1="0"
          y1="75"
          x2="100"
          y2="75"
          stroke="currentColor"
          strokeWidth="0.1"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Area under line */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={color}
          fillOpacity="0.1"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = ((maxValue - d.value) / range) * 80 + 10;
          return <circle key={i} cx={x} cy={y} r="0.8" fill={color} />;
        })}
      </svg>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <span>{data[0]?.date.split("-").slice(1).join("/")}</span>
        <span>
          {data[Math.floor(data.length / 2)]?.date
            .split("-")
            .slice(1)
            .join("/")}
        </span>
        <span>{data[data.length - 1]?.date.split("-").slice(1).join("/")}</span>
      </div>
    </div>
  );
}
