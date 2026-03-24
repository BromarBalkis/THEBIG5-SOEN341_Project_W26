"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { NutritionTotals } from "@/types/meal-plan.types";

const COLORS = ["#3b82f6", "#f59e0b", "#ef4444"]; // blue, amber, red

interface MacroPieChartProps {
  totals: NutritionTotals;
}

export function MacroPieChart({ totals }: MacroPieChartProps) {
  const data = [
    { name: "Protein", value: Math.round(totals.protein) },
    { name: "Carbs", value: Math.round(totals.carbs) },
    { name: "Fat", value: Math.round(totals.fat) },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-sm text-gray-400">
        No nutrition data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}g`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
