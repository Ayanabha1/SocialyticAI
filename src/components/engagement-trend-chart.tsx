"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2023-01-01", engagement: 4000 },
  { date: "2023-02-01", engagement: 3000 },
  { date: "2023-03-01", engagement: 5000 },
  { date: "2023-04-01", engagement: 4500 },
  { date: "2023-05-01", engagement: 6000 },
];

export function EngagementTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="engagement" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
