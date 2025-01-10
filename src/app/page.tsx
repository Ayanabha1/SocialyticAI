"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  BarChart2,
  Zap,
  Instagram,
  Bot,
  PieChart,
  Github,
} from "lucide-react";
import { useRef } from "react";
import { Features } from "@/components/features";
import { FAQ } from "@/components/faq";

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background mx-auto">
      {/* Navigation */}
      <nav className="fixed top-0 w-full left-[50%] translate-x-[-50%] z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex gap-10 items-center">
            <Link className="flex items-center space-x-2" href="/">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-lg rotate-6" />
                <div className="absolute inset-0 bg-primary/80 rounded-lg rotate-2" />
                <BarChart2 className="relative h-8 w-8 text-primary-foreground p-1.5" />
              </div>
              <span className="text-xl font-bold text-primary mr-10">
                SocialyticAI
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#features"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#how-it-works"
              >
                How It Works
              </Link>

              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#faq"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/NityaSG/Socialytic-Ai"
              target="_blank"
            >
              <Button variant="outline" className="shadow-sm">
                <Github className="w-10 h-10" />
              </Button>
            </Link>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={targetRef} className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/10 mb-8">
              <Zap className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Powered by DataStax
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Revolutionize Your{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">
                  Instagram Strategy
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-primary/20"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Harness the power of AI to analyze your Instagram data, uncover
              trends, and boost engagement. Get personalized recommendations and
              deep insights to stay ahead in the social media game.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link
                  href="https://www.youtube.com/watch?v=H2tHNKzbLVk"
                  target="_blank"
                  className="flex items-center"
                >
                  <Play className="mr-2 h-4 w-4" /> Play Demo
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Platform Preview Video*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto mb-16 shadow-lg rounded-xl"
          >
            <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/demo.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 mt-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How SocialyticAI Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Instagram,
                title: "Data Collection",
                description:
                  "We securely collect data from Instagram using advanced scraping techniques, ensuring up-to-date insights.",
              },
              {
                icon: Bot,
                title: "AI Analysis",
                description:
                  "Our AI processes the data, generating embeddings, categorizing content, and performing sentiment analysis.",
              },
              {
                icon: PieChart,
                title: "Actionable Insights",
                description:
                  "Receive personalized recommendations, trend reports, and interactive visualizations to guide your strategy.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg shadow-lg border border-border"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-20">
        <FAQ />
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 mt-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Supercharge Your Instagram Strategy?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of influencers and brands who are already benefiting
            from SocialyticAI.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <BarChart2 className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">SocialyticAI</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Empowering your social media strategy with AI-driven insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 SocialyticAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
