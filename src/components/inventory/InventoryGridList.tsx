import { InventoryItemCard, type InventoryItem } from "./InventoryItemCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface InventoryGridProps {
  items: InventoryItem[];
  viewMode: string;
  onEdit?: (item: InventoryItem) => void;
  onDelete?: (item: InventoryItem) => void;
}

export const InventoryGrid = ({ items, viewMode, onEdit, onDelete }: InventoryGridProps) => {
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [inventory, setInventory] = useState<InventoryItem[]>(items);

  useEffect(() => {
    // Keep inventory in sync with localStorage and props
    const localData = localStorage.getItem('inventoryData');
    if (localData) {
      setInventory(JSON.parse(localData));
    } else {
      setInventory(items);
    }
  }, [items]);

  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValue(item.quantity);
  };

  const handleSave = (item: InventoryItem) => {
    const updatedItems = inventory.map((prod) =>
      prod.id === item.id ? { ...prod, quantity: editValue } : prod
    );
    setInventory(updatedItems);
    localStorage.setItem('inventoryData', JSON.stringify(updatedItems));
    setEditingId(null);
  };

  if (inventory.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Warehouse</th>
              <th className="px-4 py-2">Shelf</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Mfg Date</th>
              <th className="px-4 py-2">Expiry Date</th>
              <th className="px-4 py-2">Urgency</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.warehouse || '-'}</td>
                <td className="px-4 py-2">{item.shelf || '-'}</td>
                <td className="px-4 py-2">{[item.flatNumber, item.apartmentNumber, item.street, item.city, item.state, item.zip].filter(Boolean).join(', ')}</td>
                <td className="px-4 py-2">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      className="border p-1 w-20 rounded"
                      value={editValue}
                      min={0}
                      onChange={e => setEditValue(Number(e.target.value))}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="px-4 py-2">{item.manufacturingDate ? new Date(item.manufacturingDate).toLocaleDateString() : '-'}</td>
                <td className="px-4 py-2">{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : '-'}</td>
                <td className="px-4 py-2">{item.urgency}</td>
                <td className="px-4 py-2">${item.price}</td>
                <td className="px-4 py-2">
                  {editingId === item.id ? (
                    <Button size="sm" onClick={() => handleSave(item)}>Save</Button>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => onEdit && onEdit(item)}>Edit</Button>{' '}
                      <Button size="sm" variant="destructive" onClick={() => onDelete && onDelete(item)}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inventory.map((item) => (
        <div key={item.id}>
          <InventoryItemCard item={item} />
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" onClick={() => onEdit && onEdit(item)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete && onDelete(item)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
