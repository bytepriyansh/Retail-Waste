
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { 
  ArrowDown, 
  ChartBar, 
  CircleDollarSign, 
  Bell, 
  Users, 
  User,
  CheckCircle
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-white font-bold">RWI</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Retail Waste Intelligence
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="gradient-primary text-white border-0">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            🌱 Powered by AI • Zero Waste Vision
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-700 bg-clip-text text-transparent leading-tight">
            Smart Discounts.<br />
            Smarter Logistics.<br />
            <span className="text-emerald-600">Zero Waste.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform retail waste into opportunity with AI-powered dynamic pricing, 
            intelligent forecasting, and seamless donation coordination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-white border-0 px-8 py-6 text-lg animate-pulse-glow">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">85%</div>
              <div className="text-sm text-muted-foreground">Waste Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$2.3M</div>
              <div className="text-sm text-muted-foreground">Revenue Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">1M+</div>
              <div className="text-sm text-muted-foreground">Meals Donated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-red-100 text-red-800">The Problem</Badge>
            <h2 className="text-4xl font-bold mb-6">$300B+ Lost to Food Waste Annually</h2>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                40% of food produced is wasted globally
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Retailers lose 15-20% of inventory to expiration
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Static pricing fails to adapt to demand
              </li>
            </ul>
          </div>
          
          <div>
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Our Solution</Badge>
            <h2 className="text-4xl font-bold mb-6">AI-Driven Zero Waste Ecosystem</h2>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Dynamic pricing prevents waste before it happens
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Smart redistribution to high-demand locations
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Seamless donation to food banks & NGOs
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Features</Badge>
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Eliminate Waste</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered platform for intelligent retail waste management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
                <ChartBar className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Real-Time Inventory</CardTitle>
              <CardDescription>
                Track expiry dates with visual countdowns and smart alerts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
                <CircleDollarSign className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Dynamic Pricing AI</CardTitle>
              <CardDescription>
                Automated discounts based on demand, expiry, and market conditions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
                <ArrowDown className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Smart Redistribution</CardTitle>
              <CardDescription>
                Transfer inventory to high-demand locations automatically
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Demand Forecasting</CardTitle>
              <CardDescription>
                Predict demand spikes using weather, events, and historical data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Donation Network</CardTitle>
              <CardDescription>
                Connect with verified NGOs for seamless food donations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
                <User className="w-6 h-6 text-white" />
              </div>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Natural language copilot for logistics optimization
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="gradient-primary text-white text-center">
          <CardContent className="p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Retail Operations?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the sustainable retail revolution. Start reducing waste and increasing profits today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg text-white border-white hover:bg-white hover:text-emerald-600">
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RWI</span>
                </div>
                <span className="font-bold">Retail Waste Intelligence</span>
              </div>
              <p className="text-gray-400">
                AI-powered waste reduction for sustainable retail operations.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Retail Waste Intelligence. Built for Walmart's Creating a Sustainable Future Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
