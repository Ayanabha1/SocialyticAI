"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", Sports: 4000, Fashion: 2400, Automobile: 2400, News: 1800 },
  { month: "Feb", Sports: 3000, Fashion: 1398, Automobile: 2210, News: 2000 },
  { month: "Mar", Sports: 2000, Fashion: 9800, Automobile: 2290, News: 2500 },
  { month: "Apr", Sports: 2780, Fashion: 3908, Automobile: 2000, News: 1900 },
  { month: "May", Sports: 1890, Fashion: 4800, Automobile: 2181, News: 2100 },
  { month: "Jun", Sports: 2390, Fashion: 3800, Automobile: 2500, News: 2300 },
];

export function MonthlyLikesByGenreChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="Sports"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Fashion"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Automobile"
          stroke="#ffc658"
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="News" stroke="#ff7300" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
