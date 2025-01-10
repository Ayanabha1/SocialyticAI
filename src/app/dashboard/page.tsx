import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MonthlyLikesByPostTypeChart } from "@/components/monthly-likes-by-post-type-chart";
import { MonthlyLikesByGenreChart } from "@/components/monthly-likes-by-genre-chart";
import { SentimentsByGenreChart } from "@/components/sentiments-by-genre-chart";
import { StatsBoard } from "@/components/stats-board";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentPostsTable } from "@/components/recent-post-table";

export default function Dashboard() {
  return (
    <div className="space-y-8 px-10">
      <StatsBoard />

      <Tabs defaultValue="likes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="likes">Likes Analysis</TabsTrigger>
          <TabsTrigger value="sentiments">Sentiment Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="likes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Average Likes by Post Type</CardTitle>
                <CardDescription>
                  Comparison of likes across different post types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyLikesByPostTypeChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Average Likes by Genre</CardTitle>
                <CardDescription>
                  Trend of likes across different genres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyLikesByGenreChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sentiments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sentiments by Genre</CardTitle>
              <CardDescription>
                Distribution of sentiments across genres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SentimentsByGenreChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <RecentPostsTable />
      </Card>
    </div>
  );
}
