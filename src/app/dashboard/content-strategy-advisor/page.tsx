"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import API from "@/lib/axios";
import { cn } from "@/lib/utils";

interface ApiResponse {
  isGraph: string;
  graphType: "LineChart" | "BarChart";
  graphData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      chart_title: string;
      borderColor: string;
      tension: number;
    }[];
  };
  text_response: string;
}

const genres = [
  "fashion",
  "food",
  "lifestyle",
  "sports",
  "technology",
  "other",
];

export default function ContentAdvisor() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [genre, setGenre] = useState("");
  const [targetAge, setTargetAge] = useState("");
  const [postFrequency, setPostFrequency] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const prompt = `
    Hi, I am a new influencer. I want to post on Instagram. My target is to get as much engagement as possible.
    I will give you details about me, please recommend me what I should post, at what time, what genre and what genre (if i have provided a genre, try to stick to that).
    Whatever response you give, try to support that with data available. Try to give graph, comparisions, tables, analysis data etc to back it up.
    If i provide post frequency, you do not need to match it with any date or something like that. You can just give me a general idea from what you understand. (For example if you see that technology is getting more popular day by day then you can maybe tell me to post everyday or every 2 days on technology).
    My details are:
    ${genre ? `genre: ${genre}` : ""}
    ${targetAge ? `Target Age: ${targetAge}` : ""}
    ${postFrequency ? `Post Frequency: ${postFrequency}` : ""}
    ${description ? `Additional description about me: ${description}` : ""}
    `;
      console.log(prompt);

      setError(null);

      const res = await API.post("/query", { query: prompt });
      console.log(res);
      setApiResponse(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  const renderChart = () => {
    if (
      !apiResponse ||
      apiResponse.isGraph !== "true" ||
      !apiResponse.graphData
    ) {
      setError("No chart data available");
      return null;
    }

    const { graphType, graphData } = apiResponse;
    const chartData = graphData.labels.map((label, index) => ({
      name: label,
      ...graphData.datasets.reduce((acc, dataset) => {
        acc[dataset.label] = dataset.data[index];
        return acc;
      }, {} as Record<string, number>),
    }));

    const ChartComponent = graphType === "LineChart" ? LineChart : BarChart;

    return (
      <Card className="max-w-[50%] mt-6">
        <CardHeader>
          <CardTitle>{graphData.datasets[0].chart_title}</CardTitle>
          <CardDescription>Comparison across different genres</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartComponent data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {graphData.datasets.map((dataset, index) => {
                  const ChartElement = graphType === "LineChart" ? Line : Bar;
                  return (
                    <ChartElement
                      key={index}
                      type="monotone"
                      dataKey={dataset.label}
                      stroke={dataset.borderColor}
                      fill={dataset.borderColor}
                    />
                  );
                })}
              </ChartComponent>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="px-8">
      <div className="rounded-lg bg-gradient-to-br from-white to-[#F8FAFF] border p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#4177FF] text-xl">✧</span>
          <h2 className="text-[22px] font-bold">Content Strategy Advisor</h2>
        </div>

        <p className="text-[#666666] mb-6">
          Fill in your details to get personalized recommendations.
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-medium text-[14px]">Your Genre</label>
              <Select onValueChange={setGenre}>
                <SelectTrigger className="bg-white border-[#E5E7EB] h-11">
                  <SelectValue placeholder="Select your genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-[14px]">
                Target Audience Age
              </label>
              <Select onValueChange={setTargetAge}>
                <SelectTrigger className="bg-white border-[#E5E7EB] h-11">
                  <SelectValue placeholder="Select target age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45+">45+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-[14px]">Post Frequency</label>
              <Select onValueChange={setPostFrequency}>
                <SelectTrigger className="bg-white border-[#E5E7EB] h-11">
                  <SelectValue placeholder="Select post frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-[14px]">
              Tell me more (Description)
            </label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your content goals, challenges, or any specific areas you'd like content-strategy-advisors on..."
              className="h-[245px] resize-none bg-white border-[#E5E7EB]"
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-6">
            <Button
              type="submit"
              className={cn(
                "bg-[#4177FF] hover:bg-[#2955CC] text-[15px] h-11 px-4 rounded-md",
                {
                  "cursor-not-allowed opacity-50": loading,
                }
              )}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              Get content-strategy-advisor
            </Button>
          </div>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {apiResponse && (
          <div className="mt-8 border-t pt-8">
            {renderChart()}
            <div className="mt-4 text-[#666666]">
              {apiResponse.text_response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
