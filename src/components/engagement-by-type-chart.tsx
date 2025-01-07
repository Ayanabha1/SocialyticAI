"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { type: "Carousel", engagement: 1000 },
  { type: "Reels", engagement: 1500 },
  { type: "Static", engagement: 800 },
];

export function EngagementByTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="engagement" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
