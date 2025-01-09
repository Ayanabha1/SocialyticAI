"use client";

import API from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function MonthlyLikesByPostTypeChart() {
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    try {
      const response = await API.get("/monthly-likes-by-type-graph");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
