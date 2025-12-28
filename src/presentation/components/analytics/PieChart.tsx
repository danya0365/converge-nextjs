"use client";

import { DistributionData } from "@/src/presentation/presenters/analytics/AnalyticsPresenter";

interface PieChartProps {
  data: DistributionData[];
}

export function PieChart({ data }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentAngle = 0;
  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
    };
  });

  const createArc = (
    startAngle: number,
    endAngle: number,
    radius: number = 40
  ) => {
    const start = polarToCartesian(50, 50, radius, endAngle);
    const end = polarToCartesian(50, 50, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      50,
      50,
      "Z",
    ].join(" ");
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="flex items-center gap-6">
      {/* Pie Chart */}
      <div className="flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          {slices.map((slice, index) => (
            <g key={index}>
              <path
                d={createArc(slice.startAngle, slice.endAngle)}
                fill={slice.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            </g>
          ))}
          {/* Center circle for donut effect */}
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="white"
            className="dark:fill-gray-800"
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-3">
        {slices.map((slice, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {slice.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {slice.value.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">
                {slice.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
