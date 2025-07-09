
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ChartBar, 
  CircleDollarSign, 
  Bell, 
  Users, 
  ArrowDown,
  User,
  Clock,
  CheckCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";

const Dashboard = () => {
  const wasteData = [
    { month: 'Jan', waste: 150, saved: 120 },
    { month: 'Feb', waste: 120, saved: 180 },
    { month: 'Mar', waste: 90, saved: 220 },
    { month: 'Apr', waste: 70, saved: 280 },
    { month: 'May', waste: 45, saved: 350 },
    { month: 'Jun', waste: 30, saved: 400 },
  ];

  const recentActivities = [
    { id: 1, action: "Dairy products discounted 30%", time: "2 minutes ago", type: "discount" },
    { id: 2, action: "50 units redistributed to Store #234", time: "15 minutes ago", type: "redistribution" },
    { id: 3, action: "100 meals donated to Food Bank", time: "1 hour ago", type: "donation" },
    { id: 4, action: "AI predicted demand spike for weekend", time: "2 hours ago", type: "forecast" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-muted-foreground text-lg">Here's your waste reduction impact today</p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 text-lg">
            🌱 Store #123 - Walmart Supercenter
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waste Prevented Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">847 lbs</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Saved</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">$2,340</div>
              <p className="text-xs text-muted-foreground">+8% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Redistributed</CardTitle>
              <ArrowDown className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">156</div>
              <p className="text-xs text-muted-foreground">To 3 nearby stores</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Donated</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">423</div>
              <p className="text-xs text-muted-foreground">To 2 food banks</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Waste Reduction Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-emerald-600" />
                Waste Reduction Progress
              </CardTitle>
              <CardDescription>Monthly comparison of waste vs. savings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wasteData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Area 
                      type="monotone" 
                      dataKey="waste" 
                      stackId="1" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="saved" 
                      stackId="2" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest AI actions and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'discount' ? 'bg-blue-500' :
                      activity.type === 'redistribution' ? 'bg-purple-500' :
                      activity.type === 'donation' ? 'bg-orange-500' :
                      'bg-emerald-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 gradient-primary text-white flex flex-col gap-2">
              <ChartBar className="h-6 w-6" />
              <span>View Inventory</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <CircleDollarSign className="h-6 w-6" />
              <span>Set Discounts</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <ArrowDown className="h-6 w-6" />
              <span>Redistribute Items</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Schedule Donations</span>
            </Button>
          </div>
        </div>

        {/* AI Insights */}
        <Card className="mt-8 gradient-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Today's Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">Discount dairy products by 25% before 6 PM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">Transfer 50 bread units to Store #456</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">Prepare for 30% demand increase this weekend</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Impact Forecast</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weekly Waste Target</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Revenue Recovery</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
