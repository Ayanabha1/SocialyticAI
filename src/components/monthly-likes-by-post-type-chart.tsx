"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", Reels: 4000, Static: 2400, Carousel: 2400 },
  { month: "Feb", Reels: 3000, Static: 1398, Carousel: 2210 },
  { month: "Mar", Reels: 2000, Static: 9800, Carousel: 2290 },
  { month: "Apr", Reels: 2780, Static: 3908, Carousel: 2000 },
  { month: "May", Reels: 1890, Static: 4800, Carousel: 2181 },
  { month: "Jun", Reels: 2390, Static: 3800, Carousel: 2500 },
];

export function MonthlyLikesByPostTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar dataKey="Reels" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Static" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Carousel" fill="#db2777" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
