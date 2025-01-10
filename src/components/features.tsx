import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart2,
  TrendingUp,
  MessageSquare,
  Clock,
  Target,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BarChart2,
    title: "Comprehensive Analytics",
    description:
      "Dive deep into your Instagram data with our interactive dashboards and detailed metrics.",
  },
  {
    icon: TrendingUp,
    title: "Trend Prediction",
    description:
      "Stay ahead of the curve with AI-powered trend forecasting and content recommendations.",
  },
  {
    icon: MessageSquare,
    title: "Sentiment Analysis",
    description:
      "Gauge audience reactions and sentiment towards your content and brand.",
  },
  {
    icon: Clock,
    title: "Optimal Posting Times",
    description:
      "Maximize engagement by posting at the perfect time for your audience.",
  },
  {
    icon: Target,
    title: "Competitor Analysis",
    description:
      "Benchmark your performance against competitors and industry standards.",
  },
  {
    icon: Zap,
    title: "AI-Powered Recommendations",
    description:
      "Receive personalized content and strategy suggestions based on your unique data and goals.",
  },
];

export function Features() {
  return (
    <section id="features" className="">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features to Boost Your Instagram Presence
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
