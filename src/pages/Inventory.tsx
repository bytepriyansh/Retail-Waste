
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InventorySummaryCards } from "@/components/inventory/InventorySummaryCards";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
import type { InventoryItem } from "@/components/inventory/InventoryItemCard";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const inventoryItems: InventoryItem[] = [
    {
      id: 1,
      name: "Organic Milk 1L",
      category: "Dairy",
      quantity: 45,
      expiryDate: "2024-07-05",
      daysUntilExpiry: 2,
      urgency: "high",
      price: 4.99,
      suggestedDiscount: 30,
      location: "Aisle 12-A"
    },
    {
      id: 2,
      name: "Fresh Bread Loaves",
      category: "Bakery",
      quantity: 28,
      expiryDate: "2024-07-04",
      daysUntilExpiry: 1,
      urgency: "critical",
      price: 2.99,
      suggestedDiscount: 50,
      location: "Bakery Section"
    },
    {
      id: 3,
      name: "Bananas 2lb",
      category: "Produce",
      quantity: 67,
      expiryDate: "2024-07-07",
      daysUntilExpiry: 4,
      urgency: "medium",
      price: 1.99,
      suggestedDiscount: 15,
      location: "Produce Section"
    },
    {
      id: 4,
      name: "Greek Yogurt",
      category: "Dairy",
      quantity: 34,
      expiryDate: "2024-07-10",
      daysUntilExpiry: 7,
      urgency: "low",
      price: 5.49,
      suggestedDiscount: 0,
      location: "Aisle 12-B"
    },
    {
      id: 5,
      name: "Strawberries 1lb",
      category: "Produce",
      quantity: 23,
      expiryDate: "2024-07-06",
      daysUntilExpiry: 3,
      urgency: "high",
      price: 4.99,
      suggestedDiscount: 25,
      location: "Produce Section"
    }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'expiring' && item.daysUntilExpiry <= 3) ||
                         (filterBy === 'dairy' && item.category === 'Dairy') ||
                         (filterBy === 'produce' && item.category === 'Produce') ||
                         (filterBy === 'bakery' && item.category === 'Bakery');
    
    return matchesSearch && matchesFilter;
  });

  const summaryData = {
    critical: 3,
    high: 7,
    medium: 12,
    good: 156
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Real-Time Inventory</h1>
            <p className="text-muted-foreground text-lg">Track and manage products with intelligent expiry monitoring</p>
          </div>
          <Button className="gradient-primary text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Summary Cards */}
        <InventorySummaryCards summaryData={summaryData} />

        {/* Search and Filters */}
        <InventoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Inventory Grid */}
        <InventoryGrid items={filteredItems} />
      </div>
    </div>
  );
};

export default Inventory;
