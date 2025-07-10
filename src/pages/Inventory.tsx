
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InventorySummaryCards } from "@/components/inventory/InventorySummaryCards";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
import type { InventoryItem } from "@/components/inventory/InventoryItemCard";

const API_URL = "http://localhost:5000/api/inventory";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: 0,
    expiryDate: "",
    price: 0,
    location: ""
  });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setInventoryItems(data));
  }, []);

  const handleAddProduct = async () => {
    // Calculate daysUntilExpiry and urgency
    const expiry = new Date(newProduct.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    let urgency = "low";
    if (daysUntilExpiry <= 1) urgency = "critical";
    else if (daysUntilExpiry <= 3) urgency = "high";
    else if (daysUntilExpiry <= 7) urgency = "medium";
    // Example discount logic
    let suggestedDiscount = 0;
    if (urgency === "critical") suggestedDiscount = 50;
    else if (urgency === "high") suggestedDiscount = 30;
    else if (urgency === "medium") suggestedDiscount = 15;

    const product = {
      ...newProduct,
      daysUntilExpiry,
      urgency,
      suggestedDiscount,
    };
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const saved = await res.json();
    setInventoryItems(prev => [...prev, saved]);
    setShowModal(false);
    setNewProduct({ name: "", category: "", quantity: 0, expiryDate: "", price: 0, location: "" });
  };

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
    critical: inventoryItems.filter(i => i.urgency === 'critical').length,
    high: inventoryItems.filter(i => i.urgency === 'high').length,
    medium: inventoryItems.filter(i => i.urgency === 'medium').length,
    good: inventoryItems.filter(i => i.urgency === 'low').length,
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
          <Button className="gradient-primary text-white flex items-center gap-2" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
        {/* Modal for adding product */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Add Product</h2>
              <div className="space-y-3">
                <input className="w-full border p-2 rounded" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
                <input className="w-full border p-2 rounded" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} />
                <input className="w-full border p-2 rounded" placeholder="Location" value={newProduct.location} onChange={e => setNewProduct(p => ({ ...p, location: e.target.value }))} />
                <input className="w-full border p-2 rounded" type="number" placeholder="Quantity" value={newProduct.quantity} onChange={e => setNewProduct(p => ({ ...p, quantity: Number(e.target.value) }))} />
                <input className="w-full border p-2 rounded" type="date" placeholder="Expiry Date" value={newProduct.expiryDate} onChange={e => setNewProduct(p => ({ ...p, expiryDate: e.target.value }))} />
                <input className="w-full border p-2 rounded" type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: Number(e.target.value) }))} />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button onClick={handleAddProduct}>Add</Button>
              </div>
            </div>
          </div>
        )}
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
