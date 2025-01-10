"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
} from "recharts";
import API from "@/lib/axios";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const exampleQuestions = [
  "Show me average month by month likes for each post type with bar graph.",
  "Show me average month by month likes for each genre.",
  "Which content genre has the highest average sentiment score?",
  "What's the best time to post for maximum engagement based on historical data?",
  "Which hashtags are associated with the highest reach in our posts?",
];

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (prompt: string) => {
    if (!prompt.trim()) return;

    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    try {
      const res = await API.post("/query", {
        query: prompt.trim(),
        history: messages.slice(-5, messages.length),
      });
      console.log(messages);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data },
      ]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendRequest(input);
  };

  const renderExampleQuestions = () => (
    <div className="space-y-4">
      <p className="font-medium text-lg">Example questions you can ask:</p>
      {exampleQuestions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          type="button"
          className="w-full justify-start h-auto py-2 px-4 text-left"
          onClick={() => {
            console.log(question);
            sendRequest(question);
          }}
        >
          {question}
        </Button>
      ))}
    </div>
  );

  const renderChart = (data: any) => {
    if (data.graphType === "BarChart") {
      const chartData = data.graphData.labels.map((label: any, i: number) => {
        const dataPoint: { [key: string]: string | number | null } = {
          name: label,
        };
        data.graphData.datasets.forEach((dataset: any) => {
          dataPoint[dataset.label] = dataset.data[i] ?? 0; // Use 0 for null values
        });
        return dataPoint;
      });

      return (
        <ResponsiveContainer width="50%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.graphData.datasets.map((dataset: any, index: number) => (
              <Bar
                key={index}
                dataKey={dataset.label}
                fill={dataset.borderColor}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (data.graphType === "LineChart") {
      const chartData = data.graphData.labels.map((label: any, i: number) => ({
        name: label,
        value: data.graphData.datasets[0].data[i],
      }));
      return (
        <ResponsiveContainer width="50%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };
  const renderMessage = (message: ChatMessage, index: number) => {
    if (message.role === "user") {
      return (
        <div key={index} className="bg-primary/10 p-3 rounded-lg mb-2">
          {message.content}
        </div>
      );
    } else {
      try {
        const data: any = message.content;
        return (
          <div key={index} className="bg-secondary/10 p-3 rounded-lg mb-2">
            {data.text_response}
            <div className="mt-6">{renderChart(data)}</div>
          </div>
        );
      } catch (error) {
        console.error(error);
        return (
          <div key={index} className="bg-secondary/10 p-3 rounded-lg mb-2">
            {message.content}
          </div>
        );
      }
    }
  };

  return (
    <section className="space-y-4">
      <Card className="w-full h-[calc(100vh-7rem)]">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>
            Ask questions about social media analytics insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
            {messages.length === 0
              ? renderExampleQuestions()
              : messages.map(renderMessage)}
          </ScrollArea>
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit} className="flex w-full space-x-2 p-0">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
}
