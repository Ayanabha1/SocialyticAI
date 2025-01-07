import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Carousel Engagement",
    value: "20% Higher",
    description: "Carousel posts have 20% higher engagement than static posts.",
    trend: "up",
  },
  {
    title: "Reels Comments",
    value: "2x More",
    description: "Reels drive 2x more comments compared to other formats.",
    trend: "up",
  },
  {
    title: "Fashion vs Sports",
    value: "20% More Likes",
    description:
      "Fashion related posts are getting 20% more likes than Sports.",
    trend: "up",
  },
  {
    title: "Sports vs News (December)",
    value: "35% Better",
    description:
      "Sports related posts performed 35% better than News related posts in December.",
    trend: "up",
  },
];

export function StatsBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <Badge variant={stat.trend === "up" ? "default" : "destructive"}>
              {stat.trend === "up" ? "↑" : "↓"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
