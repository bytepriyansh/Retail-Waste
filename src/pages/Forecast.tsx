
import { Navbar } from "@/components/Navbar";

const Forecast = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">AI Demand Forecasting</h1>
        <p className="text-muted-foreground">Coming soon - Advanced forecasting with weather and event data</p>
      </div>
    </div>
  );
};

export default Forecast;
