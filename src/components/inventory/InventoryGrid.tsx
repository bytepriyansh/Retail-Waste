
import { InventoryItemCard, type InventoryItem } from "./InventoryItemCard";

interface InventoryGridProps {
  items: InventoryItem[];
}

export const InventoryGrid = ({ items }: InventoryGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <InventoryItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
