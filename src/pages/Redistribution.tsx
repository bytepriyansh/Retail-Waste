import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowDown, MapPin, Send, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { geocodeAddress, fetchNearbyPlaces, buildFullAddress } from "@/lib/utils";

function getAtRiskInventory() {
	const data = localStorage.getItem("inventoryData");
	if (!data) return [];
	const all = JSON.parse(data);
	return all.filter((item) => item.daysUntilExpiry <= 3);
}

const Redistribution: React.FC = () => {
	const [inventory, setInventory] = useState<any[]>([]);
	const [selectedItem, setSelectedItem] = useState<any | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedDestination, setSelectedDestination] = useState<any | null>(null);
	const [quantity, setQuantity] = useState<number>(1);
	const [status, setStatus] = useState<"idle" | "pending" | "confirmed">("idle");
	const [history, setHistory] = useState<any[]>([]);
	const [destinations, setDestinations] = useState<any[]>([]);
	const [loadingDest, setLoadingDest] = useState(false);
	const [destError, setDestError] = useState<string | null>(null);
	const location = useLocation();

	useEffect(() => {
		setInventory(getAtRiskInventory());
		const hist = localStorage.getItem("redistributionHistory");
		if (hist) setHistory(JSON.parse(hist));
		// Pre-select item if passed from navigation
		if (location.state && location.state.selectedItem) {
			setSelectedItem(location.state.selectedItem);
			setShowModal(true);
		}
	}, [location.state]);

	useEffect(() => {
		if (showModal && selectedItem) {
			const fetchDest = async () => {
				setLoadingDest(true);
				setDestError(null);
				try {
					const address = buildFullAddress(selectedItem);
					const geo = await geocodeAddress(address);
					if (!geo) throw new Error("Could not geocode address");
					const places = await fetchNearbyPlaces(geo.lat, geo.lng);
					setDestinations(places);
				} catch (e: any) {
					setDestError(e.message || "Failed to fetch destinations");
					setDestinations([]);
				}
				setLoadingDest(false);
			};
			fetchDest();
		}
	}, [showModal, selectedItem]);

	const handleRedistribute = () => {
		if (!selectedItem || !selectedDestination) return;
		setStatus("pending");
		setTimeout(() => {
			const all = JSON.parse(localStorage.getItem("inventoryData") || "[]");
			const updated = all.map((item) =>
				item.id === selectedItem.id
					? { ...item, quantity: Math.max(0, item.quantity - quantity) }
					: item
			);
			localStorage.setItem("inventoryData", JSON.stringify(updated));
			const newRecord = {
				product: selectedItem.name,
				quantity,
				to: selectedDestination.name,
				address: selectedDestination.address,
				date: new Date().toLocaleString(),
				status: "Delivered",
			};
			const newHistory = [newRecord, ...history];
			setHistory(newHistory);
			localStorage.setItem("redistributionHistory", JSON.stringify(newHistory));
			setStatus("confirmed");
			setTimeout(() => {
				setShowModal(false);
				setStatus("idle");
				setSelectedDestination(null);
				setSelectedItem(null);
				setQuantity(1);
				setInventory(getAtRiskInventory());
			}, 1500);
		}, 1200);
	};

	return (
		<div className="min-h-screen bg-background px-4 py-8">
			<Navbar />
			<div className="max-w-5xl mx-auto">
				<h1 className="text-4xl font-bold mb-2">Redistribution Engine</h1>
				<p className="text-muted-foreground mb-8">
					Smartly route at-risk inventory to other stores, NGOs, or community centers before expiry.
				</p>
				<section className="mb-10">
					<h2 className="text-2xl font-semibold mb-4">At-Risk Inventory</h2>
					{inventory.length === 0 ? (
						<div className="text-muted-foreground">No at-risk products right now 🎉</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{inventory.map((item) => (
								<Card key={item.id} className="border-2">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ArrowDown className="h-5 w-5 text-purple-600" />
											{item.name}
											<Badge className="ml-2">{item.category}</Badge>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="mb-2">
											<span className="font-semibold">Quantity:</span> {item.quantity}
										</div>
										<div className="mb-2">
											<span className="font-semibold">Expires in:</span>{" "}
											<span className="text-red-600 font-bold">{item.daysUntilExpiry} days</span>
										</div>
										<div className="mb-2">
											<span className="font-semibold">Warehouse:</span> {item.warehouse} |{" "}
											<span className="font-semibold">Shelf:</span> {item.shelf}
										</div>
										<Button
											className="mt-2"
											onClick={() => {
												setSelectedItem(item);
												setShowModal(true);
												setQuantity(1);
												setSelectedDestination(null);
												setStatus("idle");
											}}
										>
											<ArrowDown className="h-4 w-4 mr-1" />
											Redistribute
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</section>
				<Dialog open={showModal} onOpenChange={setShowModal}>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle>
								<ArrowDown className="h-5 w-5 text-purple-600 inline mr-2" />
								Redistribute Product
							</DialogTitle>
						</DialogHeader>
						{selectedItem && (
							<div>
								<div className="mb-2">
									<span className="font-semibold">Product:</span> {selectedItem.name}
								</div>
								<div className="mb-2">
									<span className="font-semibold">Available:</span> {selectedItem.quantity}
								</div>
								<div className="mb-2">
									<span className="font-semibold">Select Quantity:</span>
									<Input
										type="number"
										min={1}
										max={selectedItem.quantity}
										value={quantity}
										onChange={(e) => setQuantity(Number(e.target.value))}
										className="w-24 ml-2"
									/>
								</div>
								<div className="mb-4">
									<span className="font-semibold">Select Destination:</span>
									<div className="mt-2 space-y-2">
										{loadingDest && <div className="text-sm text-muted-foreground">Loading nearby locations...</div>}
										{destError && <div className="text-sm text-red-600">{destError}</div>}
										{!loadingDest && !destError && destinations.length === 0 && (
											<div className="text-sm text-muted-foreground">No nearby locations found.</div>
										)}
										{destinations.map((dest: any) => (
											<Card
												key={dest.place_id}
												className={`border-2 cursor-pointer ${selectedDestination?.place_id === dest.place_id ? "border-purple-600" : ""}`}
												onClick={() => setSelectedDestination(dest)}
											>
												<CardContent className="flex flex-col gap-1 py-2">
													<div className="flex items-center gap-2">
														<MapPin className="h-4 w-4 text-emerald-600" />
														<span className="font-semibold">{dest.name}</span>
														<Badge>Nearby</Badge>
													</div>
													<div className="text-xs text-muted-foreground">{dest.address}</div>
												</CardContent>
											</Card>
										))}
									</div>
								</div>
								<div className="flex justify-end gap-2">
									<Button variant="outline" onClick={() => setShowModal(false)}>
										<X className="h-4 w-4 mr-1" />
										Cancel
									</Button>
									<Button
										disabled={
											!selectedDestination ||
											quantity < 1 ||
											quantity > selectedItem.quantity ||
											status === "pending"
										}
										onClick={handleRedistribute}
									>
										<Send className="h-4 w-4 mr-1" />
										{status === "pending" ? "Processing..." : "Confirm & Send"}
									</Button>
								</div>
								{status === "confirmed" && (
									<div className="flex items-center gap-2 mt-4 text-green-600 font-semibold">
										<CheckCircle className="h-5 w-5" />
										Redistribution Confirmed!
									</div>
								)}
							</div>
						)}
					</DialogContent>
				</Dialog>
				<section className="mt-12">
					<h2 className="text-2xl font-semibold mb-4">Redistribution History</h2>
					{history.length === 0 ? (
						<div className="text-muted-foreground">No redistribution actions yet.</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full bg-white border rounded-lg">
								<thead>
									<tr>
										<th className="px-4 py-2">Product</th>
										<th className="px-4 py-2">Quantity</th>
										<th className="px-4 py-2">Destination</th>
										<th className="px-4 py-2">Address</th>
										<th className="px-4 py-2">Date</th>
										<th className="px-4 py-2">Status</th>
									</tr>
								</thead>
								<tbody>
									{history.map((rec, idx) => (
										<tr key={idx} className="border-t">
											<td className="px-4 py-2">{rec.product}</td>
											<td className="px-4 py-2">{rec.quantity}</td>
											<td className="px-4 py-2">{rec.to}</td>
											<td className="px-4 py-2">{rec.address}</td>
											<td className="px-4 py-2">{rec.date}</td>
											<td className="px-4 py-2">
												<Badge className="bg-emerald-100 text-emerald-800">{rec.status}</Badge>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default Redistribution;
