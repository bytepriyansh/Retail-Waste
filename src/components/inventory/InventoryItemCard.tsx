
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bell,
  ArrowDown,
  CircleDollarSign
} from "lucide-react";

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string;
  daysUntilExpiry: number;
  urgency: string;
  price: number;
  suggestedDiscount: number;
  location: string;
}

interface InventoryItemCardProps {
  item: InventoryItem;
}

export const InventoryItemCard = ({ item }: InventoryItemCardProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCountdownColor = (days: number) => {
    if (days <= 1) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    if (days <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription>{item.category} • {item.location}</CardDescription>
          </div>
          <Badge className={`${getUrgencyColor(item.urgency)} border`}>
            {item.urgency}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">{item.quantity}</div>
            <div className="text-sm text-muted-foreground">units in stock</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">${item.price}</div>
            {item.suggestedDiscount > 0 && (
              <div className="text-sm text-emerald-600">
                -{item.suggestedDiscount}% suggested
              </div>
            )}
          </div>
        </div>

        {/* Expiry Countdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Expires in:</span>
            <span className={`font-bold ${getCountdownColor(item.daysUntilExpiry)}`}>
              {item.daysUntilExpiry} day{item.daysUntilExpiry !== 1 ? 's' : ''}
            </span>
          </div>
          
          <Progress 
            value={Math.max(0, Math.min(100, (14 - item.daysUntilExpiry) / 14 * 100))} 
            className="h-2"
          />
          
          <div className="text-xs text-muted-foreground">
            Expiry Date: {new Date(item.expiryDate).toLocaleDateString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {item.suggestedDiscount > 0 && (
            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
              <CircleDollarSign className="h-4 w-4 mr-1" />
              Discount {item.suggestedDiscount}%
            </Button>
          )}
          
          {item.urgency === 'critical' || item.urgency === 'high' ? (
            <Button size="sm" variant="outline" className="flex-1">
              <ArrowDown className="h-4 w-4 mr-1" />
              Redistribute
            </Button>
          ) : null}
        </div>

        {/* AI Recommendations */}
        {item.urgency === 'critical' && (
          <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-200 text-sm font-medium mb-1">
              <Bell className="h-4 w-4" />
              AI Recommendation
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              Apply 50% discount immediately or donate to nearest food bank within 4 hours.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
