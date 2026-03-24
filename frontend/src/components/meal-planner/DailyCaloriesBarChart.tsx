"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { DailyNutrition } from "@/types/meal-plan.types";

interface DailyCaloriesBarChartProps {
  dailyBreakdown: DailyNutrition[];
}

export function DailyCaloriesBarChart({ dailyBreakdown }: DailyCaloriesBarChartProps) {
  const data = dailyBreakdown.map((d) => ({
    day: d.day.slice(0, 3),
    calories: Math.round(d.calories),
  }));

  const hasData = data.some((d) => d.calories > 0);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-40 text-sm text-gray-400">
        No calorie data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={40} />
        <Tooltip formatter={(value) => [`${value} kcal`, "Calories"]} />
        <Bar dataKey="calories" fill="#16a34a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
