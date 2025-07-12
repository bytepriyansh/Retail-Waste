import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InventorySummaryCards } from "@/components/inventory/InventorySummaryCards";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { InventoryGrid as InventoryGridList } from "@/components/inventory/InventoryGridList";
import type { InventoryItem } from "@/components/inventory/InventoryItemCard";

const API_URL = "http://localhost:5000/api/inventory";

const CATEGORY_OPTIONS = [
	"Dairy",
	"Produce",
	"Bakery",
	"Meat",
	"Beverages",
	"Frozen",
	"Household",
	"Other",
];

// Utility to reset inventory with default demo products
function resetDemoInventory() {
	const sampleProducts = [
		{
			id: "SKU1001",
			name: "Milk",
			category: "Dairy",
			quantity: 20,
			expiryDate: new Date(
				Date.now() + 2 * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.slice(0, 10),
			manufacturingDate: new Date(
				Date.now() - 5 * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.slice(0, 10),
			price: 2.99,
			warehouse: "WH-1",
			shelf: "Shelf 2",
			street: "1600 Pennsylvania Avenue NW",
			city: "Washington",
			state: "DC",
			zip: "20500",
			flatNumber: "1",
			apartmentNumber: "A",
			daysUntilExpiry: 2,
			urgency: "high",
			suggestedDiscount: 30,
		},
		{
			id: "SKU1002",
			name: "Bread",
			category: "Bakery",
			quantity: 15,
			expiryDate: new Date(
				Date.now() + 1 * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.slice(0, 10),
			manufacturingDate: new Date(
				Date.now() - 2 * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.slice(0, 10),
			price: 1.49,
			warehouse: "WH-2",
			shelf: "Shelf 5",
			street: "350 5th Ave",
			city: "New York",
			state: "NY",
			zip: "10118",
			flatNumber: "20",
			apartmentNumber: "B",
			daysUntilExpiry: 1,
			urgency: "critical",
			suggestedDiscount: 50,
		},
		{
			id: "SKU1003",
			name: "Orange Juice",
			category: "Beverages",
			quantity: 10,
			expiryDate: new Date(
				Date.now() + 7 * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.slice(0, 10),
			manufacturingDate: new Date(
				Date.now() - 1 * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.slice(0, 10),
			price: 3.99,
			warehouse: "WH-1",
			shelf: "Shelf 1",
			street: "1 Infinite Loop",
			city: "Cupertino",
			state: "CA",
			zip: "95014",
			flatNumber: "5",
			apartmentNumber: "C",
			daysUntilExpiry: 7,
			urgency: "medium",
			suggestedDiscount: 15,
		},
	];
	localStorage.setItem("inventoryData", JSON.stringify(sampleProducts));
	return sampleProducts;
}

const Inventory = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterBy, setFilterBy] = useState("all");
	const [viewMode, setViewMode] = useState("grid");
	const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [newProduct, setNewProduct] = useState({
		id: "",
		name: "",
		category: "",
		quantity: 0,
		expiryDate: "",
		manufacturingDate: "",
		price: 0,
		warehouse: "",
		shelf: "",
		street: "",
		city: "",
		state: "",
		zip: "",
		flatNumber: "",
		apartmentNumber: "",
	});
	const [customCategory, setCustomCategory] = useState("");

	useEffect(() => {
		// Check if localStorage has inventory data
		const localData = localStorage.getItem("inventoryData");
		if (localData) {
			setInventoryItems(JSON.parse(localData));
		} else {
			// Add some sample products for demo/testing
			const sampleProducts = [
				{
					id: "SKU1001",
					name: "Milk",
					category: "Dairy",
					quantity: 20,
					expiryDate: new Date(
						Date.now() + 2 * 24 * 60 * 60 * 1000
					)
						.toISOString()
						.slice(0, 10), // 2 days from now
					manufacturingDate: new Date(
						Date.now() - 5 * 24 * 60 * 60 * 1000
					)
						.toISOString()
						.slice(0, 10), // 5 days ago
					price: 2.99,
					warehouse: "WH-1",
					shelf: "Shelf 2",
					street: "1600 Pennsylvania Avenue NW",
					city: "Washington",
					state: "DC",
					zip: "20500",
					flatNumber: "1",
					apartmentNumber: "A",
					daysUntilExpiry: 2,
					urgency: "high",
					suggestedDiscount: 30,
				},
				{
					id: "SKU1002",
					name: "Bread",
					category: "Bakery",
					quantity: 15,
					expiryDate: new Date(
						Date.now() + 1 * 24 * 60 * 60 * 1000
					)
						.toISOString()
						.slice(0, 10), // 1 day from now
					manufacturingDate: new Date(
						Date.now() - 2 * 24 * 60 * 60 * 1000
					)
						.toISOString()
						.slice(0, 10), // 2 days ago
					price: 1.49,
					warehouse: "WH-2",
					shelf: "Shelf 5",
					street: "350 5th Ave",
					city: "New York",
					state: "NY",
					zip: "10118",
					flatNumber: "20",
					apartmentNumber: "B",
					daysUntilExpiry: 1,
					urgency: "critical",
					suggestedDiscount: 50,
				},
				{
					id: "SKU1003",
					name: "Orange Juice",
					category: "Beverages",
					quantity: 10,
					expiryDate: new Date(
						Date.now() + 7 * 24 * 60 * 60 * 1000
					)
						.toISOString()
						.slice(0, 10), // 7 days from now
					manufacturingDate: new Date(
						Date.now() - 1 * 24 * 60 * 60 * 1000
					)
						.toISOString()
						.slice(0, 10), // 1 day ago
					price: 3.99,
					warehouse: "WH-1",
					shelf: "Shelf 1",
					street: "1 Infinite Loop",
					city: "Cupertino",
					state: "CA",
					zip: "95014",
					flatNumber: "5",
					apartmentNumber: "C",
					daysUntilExpiry: 7,
					urgency: "medium",
					suggestedDiscount: 15,
				},
			];
			setInventoryItems(sampleProducts);
			localStorage.setItem("inventoryData", JSON.stringify(sampleProducts));
		}
	}, []);

	// When adding a product, also update localStorage
	const handleAddProduct = async () => {
		// Calculate daysUntilExpiry and urgency
		const expiry = new Date(newProduct.expiryDate);
		const today = new Date();
		const daysUntilExpiry = Math.ceil(
			(expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
		);
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
		setInventoryItems((prev) => {
			const updated = [...prev, product];
			localStorage.setItem("inventoryData", JSON.stringify(updated));
			return updated;
		});
		setShowModal(false);
		setNewProduct({
			id: "",
			name: "",
			category: "",
			quantity: 0,
			expiryDate: "",
			manufacturingDate: "",
			price: 0,
			warehouse: "",
			shelf: "",
			street: "",
			city: "",
			state: "",
			zip: "",
			flatNumber: "",
			apartmentNumber: "",
		});
	};

	// Edit product handler
	const handleEditProduct = (item: InventoryItem) => {
		setShowModal(true);
		setEditMode(true);
		setEditIndex(inventoryItems.findIndex((i) => i.id === item.id));
		setNewProduct({
			id: String(item.id),
			name: item.name,
			category: item.category,
			quantity: item.quantity,
			expiryDate: item.expiryDate,
			manufacturingDate: item.manufacturingDate,
			price: item.price,
			warehouse: item.warehouse,
			shelf: item.shelf,
			street: item.street,
			city: item.city,
			state: item.state,
			zip: item.zip,
			flatNumber: item.flatNumber,
			apartmentNumber: item.apartmentNumber,
		});
	};

	// Delete product handler
	const handleDeleteProduct = (item: InventoryItem) => {
		const updated = inventoryItems.filter((i) => i.id !== item.id);
		setInventoryItems(updated);
		localStorage.setItem("inventoryData", JSON.stringify(updated));
	};

	// Save edited product
	const handleSaveEditProduct = () => {
		if (editIndex !== null) {
			const expiry = new Date(newProduct.expiryDate);
			const today = new Date();
			const daysUntilExpiry = Math.ceil(
				(expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
			);
			let urgency = "low";
			if (daysUntilExpiry <= 1) urgency = "critical";
			else if (daysUntilExpiry <= 3) urgency = "high";
			else if (daysUntilExpiry <= 7) urgency = "medium";
			let suggestedDiscount = 0;
			if (urgency === "critical") suggestedDiscount = 50;
			else if (urgency === "high") suggestedDiscount = 30;
			else if (urgency === "medium") suggestedDiscount = 15;
			const updatedProduct = {
				...newProduct,
				daysUntilExpiry,
				urgency,
				suggestedDiscount,
			};
			const updated = [...inventoryItems];
			updated[editIndex] = updatedProduct;
			setInventoryItems(updated);
			localStorage.setItem("inventoryData", JSON.stringify(updated));
			setShowModal(false);
			setEditMode(false);
			setEditIndex(null);
			setNewProduct({
				id: "",
				name: "",
				category: "",
				quantity: 0,
				expiryDate: "",
				manufacturingDate: "",
				price: 0,
				warehouse: "",
				shelf: "",
				street: "",
				city: "",
				state: "",
				zip: "",
				flatNumber: "",
				apartmentNumber: "",
			});
		}
	};

	const filteredItems = inventoryItems.filter((item) => {
		const matchesSearch =
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.category.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesFilter =
			filterBy === "all" ||
			(filterBy === "expiring" && item.daysUntilExpiry <= 3) ||
			(filterBy === "dairy" && item.category === "Dairy") ||
			(filterBy === "produce" && item.category === "Produce") ||
			(filterBy === "bakery" && item.category === "Bakery");
		return matchesSearch && matchesFilter;
	});

	const summaryData = {
		critical: inventoryItems.filter((i) => i.urgency === "critical").length,
		high: inventoryItems.filter((i) => i.urgency === "high").length,
		medium: inventoryItems.filter((i) => i.urgency === "medium").length,
		good: inventoryItems.filter((i) => i.urgency === "low").length,
	};

	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<div className="container mx-auto px-6 py-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-4xl font-bold mb-2">
							Real-Time Inventory
						</h1>
						<p className="text-muted-foreground text-lg">
							Track and manage products with intelligent expiry
							monitoring
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							className="gradient-primary text-white flex items-center gap-2"
							onClick={() => setShowModal(true)}
						>
							<Plus className="h-4 w-4" />
							Add Product
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								const products = resetDemoInventory();
								setInventoryItems(products);
							}}
						>
							Reset Demo Data
						</Button>
					</div>
				</div>
				{/* Modal for adding product */}
				{showModal && (
					<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
						<div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl">
							<h2 className="text-3xl font-bold mb-6 text-center">
								{editMode ? "Edit Product" : "Add Product"}
							</h2>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (editMode) handleSaveEditProduct();
									else handleAddProduct();
								}}
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
									<div className="flex flex-col">
										<label className="mb-1 font-medium">
											Product ID
										</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											placeholder="e.g. SKU12345"
											value={newProduct.id}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													id: e.target.value,
												}))
											}
											required
										/>
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">Name</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											placeholder="e.g. Milk"
											value={newProduct.name}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													name: e.target.value,
												}))
											}
											required
										/>
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">
											Category
										</label>
										<select
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											value={newProduct.category}
											onChange={(e) => {
												setNewProduct((p) => ({
													...p,
													category: e.target.value,
												}));
												if (e.target.value !== "Other")
													setCustomCategory("");
											}}
											required
										>
											<option value="">Select Category</option>
											{CATEGORY_OPTIONS.map((cat) => (
												<option key={cat} value={cat}>
													{cat}
												</option>
											))}
										</select>
										{newProduct.category === "Other" && (
											<input
												className="mt-2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
												placeholder="Please specify your category"
												value={customCategory}
												onChange={(e) => {
													setCustomCategory(e.target.value);
													setNewProduct((p) => ({
														...p,
														category: e.target.value,
													}));
												}}
												required
											/>
										)}
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">
											Warehouse
										</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											placeholder="e.g. WH-1"
											value={newProduct.warehouse}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													warehouse: e.target.value,
												}))
											}
											required
										/>
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">
											Shelf Number
										</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											placeholder="e.g. Shelf 5"
											value={newProduct.shelf}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													shelf: e.target.value,
												}))
											}
											required
										/>
									</div>
									<div className="flex flex-col md:col-span-2">
										<label className="mb-1 font-medium">Address</label>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
											<input
												className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
												placeholder="Street"
												value={newProduct.street}
												onChange={(e) =>
													setNewProduct((p) => ({
														...p,
														street: e.target.value,
													}))
												}
												required
											/>
											<input
												className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
												placeholder="City"
												value={newProduct.city}
												onChange={(e) =>
													setNewProduct((p) => ({
														...p,
														city: e.target.value,
													}))
												}
												required
											/>
											<input
												className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
												placeholder="State"
												value={newProduct.state}
												onChange={(e) =>
													setNewProduct((p) => ({
														...p,
														state: e.target.value,
													}))
												}
												required
											/>
											<input
												className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
												placeholder="ZIP"
												value={newProduct.zip}
												onChange={(e) =>
													setNewProduct((p) => ({
														...p,
														zip: e.target.value,
													}))
												}
												required
											/>
											<input
												className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
												placeholder="Flat Number"
												value={newProduct.flatNumber}
												onChange={(e) =>
													setNewProduct((p) => ({
														...p,
														flatNumber: e.target.value,
													}))
												}
											/>
											<input
												className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
												placeholder="Apartment Number"
												value={newProduct.apartmentNumber}
												onChange={(e) =>
													setNewProduct((p) => ({
														...p,
														apartmentNumber: e.target.value,
													}))
												}
											/>
										</div>
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">Quantity</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											type="number"
											placeholder="e.g. 20"
											value={newProduct.quantity}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													quantity: Number(e.target.value),
												}))
											}
											min={1}
											required
										/>
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">
											Manufacturing Date
										</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											type="date"
											value={newProduct.manufacturingDate}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													manufacturingDate: e.target.value,
												}))
											}
											required
										/>
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">Expiry Date</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											type="date"
											value={newProduct.expiryDate}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													expiryDate: e.target.value,
												}))
											}
											required
										/>
									</div>
									<div className="flex flex-col">
										<label className="mb-1 font-medium">Price</label>
										<input
											className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
											type="number"
											placeholder="e.g. 2.99"
											value={newProduct.price}
											onChange={(e) =>
												setNewProduct((p) => ({
													...p,
													price: Number(e.target.value),
												}))
											}
											min={0}
											step={0.01}
											required
										/>
									</div>
								</div>
								<div className="text-xs text-muted-foreground mb-4">
									Please fill all details. If you select "Other" for
									category, specify your own below.
								</div>
								<div className="flex justify-end gap-2">
									<Button
										variant="outline"
										type="button"
										onClick={() => {
											setShowModal(false);
											setEditMode(false);
											setEditIndex(null);
											setNewProduct({
												id: "",
												name: "",
												category: "",
												quantity: 0,
												expiryDate: "",
												manufacturingDate: "",
												price: 0,
												warehouse: "",
												shelf: "",
												street: "",
												city: "",
												state: "",
												zip: "",
												flatNumber: "",
												apartmentNumber: "",
											});
										}}
									>
										Cancel
									</Button>
									<Button type="submit">
										{editMode ? "Save" : "Add"}
									</Button>
								</div>
							</form>
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
				<InventoryGridList
					items={filteredItems}
					viewMode={viewMode}
					onEdit={handleEditProduct}
					onDelete={handleDeleteProduct}
				/>
			</div>
		</div>
	);
};

export default Inventory;
