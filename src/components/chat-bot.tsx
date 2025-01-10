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
} from "recharts";
import API from "@/lib/axios";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const res = await API.post("/query", {
        query: input,
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

  const renderChart = (data: any) => {
    if (data.isGraph === "true") {
      return (
        <div className="h-[300px] lg:w-[50%] w-full mt-4 shadow-md rounded-md p-3">
          <ResponsiveContainer width="100%" height="100%">
            {data.graphType === "LineChart" ? (
              <LineChart
                data={data.graphData.labels.map((label: any, i: number) => ({
                  name: label,
                  value: data.graphData.datasets[0].data[i],
                }))}
              >
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            ) : (
              <BarChart
                data={data.graphData.labels.map((label: any, i: number) => ({
                  name: label,
                  value: data.graphData.datasets[0].data[i],
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />;
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      );
    }
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
            {renderChart(data)}
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
            Ask questions about your social media analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
            {messages.map(renderMessage)}
          </ScrollArea>
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit} className="flex w-full space-x-2 p-0">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
}
