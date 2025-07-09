
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface InventoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterBy: string;
  setFilterBy: (value: string) => void;
  viewMode: string;
  setViewMode: (value: string) => void;
}

export const InventoryFilters = ({
  searchTerm,
  setSearchTerm,
  filterBy,
  setFilterBy,
  viewMode,
  setViewMode,
}: InventoryFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12"
        />
      </div>
      
      <Select value={filterBy} onValueChange={setFilterBy}>
        <SelectTrigger className="w-48 h-12">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Items</SelectItem>
          <SelectItem value="expiring">Expiring Soon</SelectItem>
          <SelectItem value="dairy">Dairy</SelectItem>
          <SelectItem value="produce">Produce</SelectItem>
          <SelectItem value="bakery">Bakery</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button 
          variant={viewMode === "grid" ? "default" : "outline"} 
          onClick={() => setViewMode("grid")}
          size="sm"
        >
          Grid
        </Button>
        <Button 
          variant={viewMode === "list" ? "default" : "outline"} 
          onClick={() => setViewMode("list")}
          size="sm"
        >
          List
        </Button>
      </div>
    </div>
  );
};
