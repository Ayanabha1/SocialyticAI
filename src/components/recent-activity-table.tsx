import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentActivity = [
  {
    user: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "/avatars/01.png",
    },
    type: "Comment",
    content: "Great post! Really enjoyed reading it.",
    post: "10 Tips for Better Social Media Engagement",
    date: "2 hours ago",
  },
  {
    user: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/avatars/02.png",
    },
    type: "Like",
    content: "",
    post: "The Future of AI in Social Media Marketing",
    date: "5 hours ago",
  },
  {
    user: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/avatars/03.png",
    },
    type: "Share",
    content: "This is a must-read for all marketers!",
    post: "How to Create Viral Content: A Step-by-Step Guide",
    date: "1 day ago",
  },
  {
    user: {
      name: "William Kim",
      email: "william.kim@email.com",
      avatar: "/avatars/04.png",
    },
    type: "Comment",
    content: "I have a question about point #3. Can you elaborate?",
    post: "5 Emerging Social Media Platforms You Should Know About",
    date: "2 days ago",
  },
]

export function RecentActivityTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">User</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Post</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentActivity.map((item) => (
          <TableRow key={item.user.email}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{item.user.name}</div>
                  <div className="text-sm text-muted-foreground">{item.user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={item.type === "Like" ? "default" : item.type === "Comment" ? "secondary" : "outline"}>
                {item.type}
              </Badge>
            </TableCell>
            <TableCell>{item.content}</TableCell>
            <TableCell>{item.post}</TableCell>
            <TableCell className="text-right">{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

