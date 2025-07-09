import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  CircleDollarSign, 
  Bell, 
  CheckCircle,
  User,
  Settings
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const SmartPricing = () => {
  const [autoDiscount, setAutoDiscount] = useState(true);
  const [globalDiscountRate, setGlobalDiscountRate] = useState([25]);

  const pricingData = [
    { hour: '6AM', sales: 20, discount: 0 },
    { hour: '9AM', sales: 45, discount: 5 },
    { hour: '12PM', sales: 80, discount: 10 },
    { hour: '3PM', sales: 120, discount: 15 },
    { hour: '6PM', sales: 200, discount: 30 },
    { hour: '9PM', sales: 150, discount: 50 },
  ];

  const products = [
    {
      id: 1,
      name: "Organic Milk 1L",
      originalPrice: 4.99,
      currentDiscount: 30,
      predictedSellThrough: 85,
      urgency: "high",
      hoursLeft: 8,
      category: "Dairy"
    },
    {
      id: 2,
      name: "Fresh Bread Loaves",
      originalPrice: 2.99,
      currentDiscount: 50,
      predictedSellThrough: 95,
      urgency: "critical",
      hoursLeft: 4,
      category: "Bakery"
    },
    {
      id: 3,
      name: "Strawberries 1lb",
      originalPrice: 4.99,
      currentDiscount: 25,
      predictedSellThrough: 70,
      urgency: "medium",
      hoursLeft: 12,
      category: "Produce"
    },
    {
      id: 4,
      name: "Greek Yogurt",
      originalPrice: 5.49,
      currentDiscount: 0,
      predictedSellThrough: 40,
      urgency: "low",
      hoursLeft: 48,
      category: "Dairy"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateDiscountedPrice = (originalPrice: number, discount: number) => {
    return (originalPrice * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">🧠 Smart Pricing Dashboard</h1>
            <p className="text-muted-foreground text-lg">AI-powered dynamic discounting to maximize revenue and minimize waste</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Auto-Discount Engine</span>
              <Switch checked={autoDiscount} onCheckedChange={setAutoDiscount} />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Pricing Rules
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-600">Revenue Protected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">$4,520</div>
              <p className="text-xs text-muted-foreground">+18% vs static pricing</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Products Discounted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">47</div>
              <p className="text-xs text-muted-foreground">Active discount campaigns</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">Avg. Sell-Through Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">87%</div>
              <p className="text-xs text-muted-foreground">+23% improvement</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Time to Waste</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">6.2h</div>
              <p className="text-xs text-muted-foreground">Average remaining time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Dynamic Pricing Trends */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-blue-600" />
                Sales vs. Discount Correlation
              </CardTitle>
              <CardDescription>Hourly sales volume and discount percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pricingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" opacity={0.6} />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="discount" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Global Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                Global Discount Controls
              </CardTitle>
              <CardDescription>Adjust AI pricing parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Max Discount Rate</span>
                  <Badge variant="secondary">{globalDiscountRate[0]}%</Badge>
                </div>
                <Slider
                  value={globalDiscountRate}
                  onValueChange={setGlobalDiscountRate}
                  max={70}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Discount Triggers</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical (≤4h)</span>
                    <Badge className="bg-red-100 text-red-800">50-70%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High (4-12h)</span>
                    <Badge className="bg-orange-100 text-orange-800">25-50%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium (12-24h)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">10-25%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low (&gt;24h)</span>
                    <Badge className="bg-green-100 text-green-800">0-10%</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full gradient-primary text-white">
                Update Pricing Rules
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Product-Specific Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-emerald-600" />
              Product-Specific AI Discounting
            </CardTitle>
            <CardDescription>Real-time discount optimization for each product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge className={`${getUrgencyColor(product.urgency)} border`}>
                      {product.urgency} • {product.hoursLeft}h left
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Pricing */}
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-600">
                          ${calculateDiscountedPrice(product.originalPrice, product.currentDiscount)}
                        </span>
                        {product.currentDiscount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.currentDiscount > 0 && (
                        <Badge className="bg-blue-100 text-blue-800 mt-1">
                          -{product.currentDiscount}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Sell-Through Prediction */}
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Predicted Sell-Through</div>
                      <div className="text-2xl font-bold">{product.predictedSellThrough}%</div>
                      <Progress value={product.predictedSellThrough} className="h-2 mt-2" />
                    </div>

                    {/* Discount Slider */}
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Manual Discount</div>
                      <Slider
                        defaultValue={[product.currentDiscount]}
                        max={70}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        AI suggests: {product.currentDiscount}%
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={autoDiscount}
                      >
                        Apply Discount
                      </Button>
                      <Button size="sm" variant="outline">
                        Override AI
                      </Button>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="mt-4 bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 text-sm font-medium mb-2">
                      <User className="h-4 w-4" />
                      AI Analysis
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {product.urgency === 'critical' 
                        ? `Critical: Increase discount to 60% immediately to achieve 95% sell-through rate.`
                        : product.urgency === 'high'
                        ? `High priority: Current discount optimal for target sell-through. Monitor closely.`
                        : product.urgency === 'medium'
                        ? `Medium priority: Consider 15% discount in next 6 hours for optimal revenue.`
                        : `Low priority: No discount needed yet. Current sell-through rate is healthy.`
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartPricing;
