"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart, LayoutDashboard, MessageSquare } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  {
    icon: MessageSquare,
    label: "Content Strategy Advisor",
    href: "/dashboard/content-strategy-advisor",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  // Don't render the sidebar on the landing page
  if (pathname === "/") return null;

  return (
    <div className="w-72 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center px-4 mt-7">
          <Link
            className="flex items-center gap-2 font-semibold text-2xl"
            href="/dashboard"
          >
            <BarChart className="h-7 w-7 text-primary" />
            <span className="text-primary">SocialyticAI</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 mt-5">
          <nav className="grid items-start px-4 text-md font-medium">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
