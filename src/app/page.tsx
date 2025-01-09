"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Play, BarChart2, Zap } from "lucide-react";
import { useRef } from "react";

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border px-56">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-lg rotate-6" />
              <div className="absolute inset-0 bg-primary/80 rounded-lg rotate-2" />
              <BarChart2 className="relative h-8 w-8 text-primary-foreground p-1.5" />
            </div>
            <span className="text-xl font-bold text-primary">SocialyticAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="w-full sm:w-auto group">
              <Github className="group-hover:text-primary" />
            </Button>
            <Button asChild variant="default">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section ref={targetRef} className="pt-32 pb-16 md:pt-40 md:pb-24 px-24">
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
                Powered by DataStax Langflow
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Revolutionize Your{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">
                  Social Strategy
                </span>
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Transform your social media strategy with AI-powered analytics.
              Get deep insights, predict trends, and grow your audience
              organically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/dashboard">
                <Button className="p-6 flex items-center">
                  <span className="text-lg">Get Started</span>
                  <ArrowRight className="" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group text-lg"
              >
                <Play className="mr-2 h-4 w-4 group-hover:text-primary" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Product Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
