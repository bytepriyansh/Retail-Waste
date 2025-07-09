
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryData {
  critical: number;
  high: number;
  medium: number;
  good: number;
}

interface InventorySummaryCardsProps {
  summaryData: SummaryData;
}

export const InventorySummaryCards = ({ summaryData }: InventorySummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-600">Critical (≤1 day)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">{summaryData.critical}</div>
          <p className="text-xs text-muted-foreground">Items need immediate action</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-orange-600">High Priority (2-3 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-600">{summaryData.high}</div>
          <p className="text-xs text-muted-foreground">Items expiring soon</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-yellow-600">Medium Priority (4-7 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-600">{summaryData.medium}</div>
          <p className="text-xs text-muted-foreground">Items to monitor</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-600">Good Condition (&gt;7 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{summaryData.good}</div>
          <p className="text-xs text-muted-foreground">Items in good condition</p>
        </CardContent>
      </Card>
    </div>
  );
};
