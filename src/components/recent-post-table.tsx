"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  ImageIcon,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { Button } from "./ui/button";

interface Post {
  _id: { $oid: string };
  post_url: string;
  image_url: string;
  likes: { $numberInt: string };
  comment_count: { $numberInt: string };
  media_type: string;
  caption: string;
  post_date: string;
  genre: string;
  sentiment: { $numberDouble: string };
}

const ITEMS_PER_PAGE = 10;
export function RecentPostsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async (page: number) => {
    try {
      const response = await API.get("/posts", {
        params: { page, limit: ITEMS_PER_PAGE },
      });
      console.log(response);
      setPosts(response.data.posts);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl">Recent Posts</CardTitle>
        <CardDescription>
          Your latest social media content and their performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[1000px] pr-4">
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.post_url}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 rounded-lg border p-4 transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <div className="relative h-40 w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={post.image_url}
                    alt={post.caption}
                    fill
                    className="object-cover"
                  />
                  {post.media_type !== "image" && (
                    <div className="absolute bottom-2 right-2">
                      <Badge
                        variant="secondary"
                        className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
                      >
                        {post.media_type === "carousel" ? (
                          <ImageIcon className="h-4 w-4" />
                        ) : (
                          <MessageCircle className="h-4 w-4" />
                        )}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div>
                      <p className="font-medium line-clamp-2">{post.caption}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{post.genre}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(post.post_date), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-rose-500" />
                        <span className="text-sm font-medium">
                          {Number(post.likes).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-sky-500" />
                        <span className="text-sm font-medium">
                          {Number(post.comment_count).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={getSentimentBadgeVariant(
                        Number(post.sentiment.$numberDouble)
                      )}
                    >
                      {getSentimentLabel(Number(post.sentiment.$numberDouble))}
                    </Badge>
                    <a
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center"
                    >
                      View on Instagram
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getSentimentBadgeVariant(
  sentiment: number
): "default" | "secondary" | "destructive" {
  if (sentiment >= 4) return "default";
  if (sentiment >= 3) return "secondary";
  return "destructive";
}

function getSentimentLabel(sentiment: number): string {
  if (sentiment >= 4) return "Positive";
  if (sentiment >= 3) return "Neutral";
  return "Negative";
}
