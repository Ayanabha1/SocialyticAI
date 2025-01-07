"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Recommendation() {
  const [recommendation, setRecommendation] = useState("");
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real application, this would call an API to get a recommendation
    setRecommendation(
      "Based on your interests and current trends, we recommend focusing on creating Reels about Fashion and Lifestyle. This content type has shown 30% higher engagement rates for new influencers in the past month."
    );
    toast({
      title: "Recommendation Generated",
      description: "Your personalized content strategy is ready!",
    });
  };

  return (
    <div className="max-w-4xl ml-10 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Get Recommendations
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content Strategy Advisor</CardTitle>
          <CardDescription>
            Fill in your details to get personalized content recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="niche">Your Niche</Label>
                <Select>
                  <SelectTrigger id="niche">
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience-age">Target Audience Age</Label>
                <Select>
                  <SelectTrigger id="audience-age">
                    <SelectValue placeholder="Select target age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13-17">13-17</SelectItem>
                    <SelectItem value="18-24">18-24</SelectItem>
                    <SelectItem value="25-34">25-34</SelectItem>
                    <SelectItem value="35-44">35-44</SelectItem>
                    <SelectItem value="45+">45+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-frequency">Post Frequency</Label>
              <Select>
                <SelectTrigger id="post-frequency">
                  <SelectValue placeholder="Select post frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>
            Get Recommendation
          </Button>
        </CardFooter>
      </Card>
      {recommendation && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{recommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
