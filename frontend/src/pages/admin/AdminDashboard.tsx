import { Link } from "react-router-dom";
import { Users, ShoppingBag, Heart, MessageCircle, TrendingUp, Plus, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Dresses",
      value: "89",
      change: "+5%",
      icon: ShoppingBag,
      color: "text-green-500",
    },
    {
      title: "Total Likes",
      value: "3,456",
      change: "+18%",
      icon: Heart,
      color: "text-pink-500",
    },
    {
      title: "Total Comments",
      value: "567",
      change: "+23%",
      icon: MessageCircle,
      color: "text-purple-500",
    },
  ];

  const topDresses = [
    {
      id: 1,
      name: "Classic Little Black Dress",
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100&h=100&fit=crop",
      requests: 67,
      likes: 89,
      status: "Active",
    },
    {
      id: 2,
      name: "Party Cocktail Dress",
      image: "https://images.unsplash.com/photo-1566479179817-c0e5deb2e22c?w=100&h=100&fit=crop",
      requests: 45,
      likes: 67,
      status: "Active",
    },
    {
      id: 3,
      name: "Elegant Evening Gown",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop",
      requests: 24,
      likes: 45,
      status: "Active",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      requests: 3,
      likes: 12,
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Emily Chen",
      email: "emily@example.com",
      requests: 5,
      likes: 8,
      joinDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      email: "maria@example.com",
      requests: 2,
      likes: 15,
      joinDate: "2024-01-13",
    },
  ];

  const quickActions = [
    { title: "Add New Dress", icon: Plus, href: "/admin/add-dress", color: "btn-hero" },
    { title: "View All Users", icon: Users, href: "/admin/users", color: "btn-hero-outline" },
    { title: "Manage Requests", icon: ShoppingBag, href: "/admin/requests", color: "btn-hero-outline" },
    { title: "Analytics", icon: TrendingUp, href: "/admin/analytics", color: "btn-hero-outline" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>
          <Link to="/admin/add-dress">
            <Button className="btn-hero">
              <Plus className="w-4 h-4 mr-2" />
              Add New Dress
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-500 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Card className="card-premium hover:scale-105 transition-transform cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold">{action.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Requested Dresses */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Top Requested Dresses</span>
                <Link to="/admin/dresses">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDresses.map((dress) => (
                  <div key={dress.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{dress.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{dress.requests} requests</span>
                        <span>{dress.likes} likes</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{dress.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Users</span>
                <Link to="/admin/users">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span>{user.requests} requests</span>
                        <span>{user.likes} likes</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="text-sm font-medium">{user.joinDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart Placeholder */}
        <div className="mt-8">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Chart</h3>
                  <p className="text-muted-foreground">
                    Interactive charts and graphs will be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;