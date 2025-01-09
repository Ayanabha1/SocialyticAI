"use client";

import API from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function MonthlyLikesByGenreChart() {
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    try {
      const response = await API.get("/monthly-likes-by-genre-graph");
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
        {data.length > 0 &&
          Object.keys(data[0])
            .slice(1)
            .map((key, index) => (
              <Line
                type="monotone"
                dataKey={key}
                stroke={
                  index % 2 === 0
                    ? `hsl(${index * 60}, 70%, 50%)`
                    : `hsl(${index * 60 + 30}, 70%, 50%)`
                }
                strokeWidth={2}
                key={key}
              />
            ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
