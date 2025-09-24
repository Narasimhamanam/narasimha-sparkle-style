import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, Filter, Eye, MessageCircle, Heart, Mail, Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2024-01-15",
      requestsMade: 8,
      likesCount: 24,
      commentsCount: 12,
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "👩‍🦰",
    },
    {
      id: 2,
      name: "Emily Chen",
      email: "emily.chen@example.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2024-01-14",
      requestsMade: 12,
      likesCount: 18,
      commentsCount: 8,
      status: "Active",
      lastActive: "1 day ago",
      avatar: "👩‍🦱",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      phone: "+1 (555) 345-6789",
      joinDate: "2024-01-13",
      requestsMade: 5,
      likesCount: 31,
      commentsCount: 15,
      status: "Active",
      lastActive: "3 hours ago",
      avatar: "👩‍🦳",
    },
    {
      id: 4,
      name: "Jessica Taylor",
      email: "jessica.taylor@example.com",
      phone: "+1 (555) 456-7890",
      joinDate: "2024-01-12",
      requestsMade: 3,
      likesCount: 7,
      commentsCount: 4,
      status: "Inactive",
      lastActive: "1 week ago",
      avatar: "👩‍🦲",
    },
    {
      id: 5,
      name: "Amanda Williams",
      email: "amanda.williams@example.com",
      phone: "+1 (555) 567-8901",
      joinDate: "2024-01-11",
      requestsMade: 15,
      likesCount: 42,
      commentsCount: 28,
      status: "Active",
      lastActive: "30 minutes ago",
      avatar: "👩‍💼",
    },
    {
      id: 6,
      name: "Lisa Brown",
      email: "lisa.brown@example.com",
      phone: "+1 (555) 678-9012",
      joinDate: "2024-01-10",
      requestsMade: 7,
      likesCount: 16,
      commentsCount: 9,
      status: "Active",
      lastActive: "5 hours ago",
      avatar: "👩‍💻",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "requests":
        return b.requestsMade - a.requestsMade;
      case "likes":
        return b.likesCount - a.likesCount;
      case "newest":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      case "oldest":
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
      default:
        return 0;
    }
  });

  const stats = [
    { title: "Total Users", value: users.length, color: "text-blue-500" },
    { title: "Active Users", value: users.filter(u => u.status === "Active").length, color: "text-green-500" },
    { title: "Total Requests", value: users.reduce((sum, u) => sum + u.requestsMade, 0), color: "text-purple-500" },
    { title: "Total Likes", value: users.reduce((sum, u) => sum + u.likesCount, 0), color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/admin" className="flex items-center space-x-2 text-primary hover:text-primary/80">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            User <span className="text-gradient">Management</span>
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor all registered users
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-premium">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="card-premium mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-premium pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="input-premium">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="input-premium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="requests">Most Requests</SelectItem>
                    <SelectItem value="likes">Most Likes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>All Users ({sortedUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-center">Requests</TableHead>
                    <TableHead className="text-center">Likes</TableHead>
                    <TableHead className="text-center">Comments</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{user.joinDate}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-purple-600">
                          {user.requestsMade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-pink-600">
                          <Heart className="w-3 h-3 mr-1" />
                          {user.likesCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-blue-600">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {user.commentsCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.status === "Active" ? "default" : "secondary"}
                          support-extra-content
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastActive}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Block User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {sortedUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-2xl font-bold mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;