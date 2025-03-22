
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Search, Plus, BarcodeIcon, Download, Upload, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for inventory
const inventoryItems = [
  { id: 1, name: "Milk 1L", category: "Dairy", stock: 32, price: 3.99, cost: 2.50, barcode: "5901234123457", status: "In Stock" },
  { id: 2, name: "Bread", category: "Bakery", stock: 15, price: 2.49, cost: 1.20, barcode: "4901234123458", status: "Low Stock" },
  { id: 3, name: "Eggs (12pk)", category: "Dairy", stock: 24, price: 4.99, cost: 3.20, barcode: "3901234123459", status: "In Stock" },
  { id: 4, name: "Bananas 1kg", category: "Produce", stock: 40, price: 1.99, cost: 0.89, barcode: "2901234123450", status: "In Stock" },
  { id: 5, name: "Chicken Breast", category: "Meat", stock: 8, price: 7.99, cost: 5.50, barcode: "1901234123451", status: "Low Stock" },
  { id: 6, name: "Rice 2kg", category: "Grains", stock: 50, price: 6.99, cost: 4.20, barcode: "6901234123452", status: "In Stock" },
  { id: 7, name: "Pasta 500g", category: "Grains", stock: 42, price: 1.49, cost: 0.75, barcode: "7901234123453", status: "In Stock" },
  { id: 8, name: "Tomatoes 1kg", category: "Produce", stock: 5, price: 3.49, cost: 1.89, barcode: "8901234123454", status: "Low Stock" },
  { id: 9, name: "Cheese 200g", category: "Dairy", stock: 18, price: 4.49, cost: 2.99, barcode: "9901234123455", status: "In Stock" },
  { id: 10, name: "Yogurt 500g", category: "Dairy", stock: 0, price: 2.99, cost: 1.85, barcode: "0901234123456", status: "Out of Stock" },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("all");

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.barcode.includes(searchTerm);
    
    if (currentView === "all") return matchesSearch;
    if (currentView === "low-stock") return matchesSearch && item.status === "Low Stock";
    if (currentView === "out-of-stock") return matchesSearch && item.status === "Out of Stock";
    return matchesSearch && item.category.toLowerCase() === currentView;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">In Stock</Badge>;
      case "Low Stock":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="Inventory Management" 
        description="Manage your store's inventory and stock levels"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </>
        }
      />
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-[180px]">
                <Select defaultValue="all" onValueChange={setCurrentView}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                    <SelectItem value="produce">Produce</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-[240px]">
                <BarcodeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Scan barcode..." className="pl-9" />
              </div>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Barcode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center">
                        <Package className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No products found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map(item => {
                    const profit = item.price - item.cost;
                    const profitMargin = (profit / item.price) * 100;
                    
                    return (
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">
                          {item.stock <= 10 && item.stock > 0 ? (
                            <div className="flex items-center justify-end gap-1">
                              <AlertTriangle className="h-4 w-4 text-warning" />
                              {item.stock}
                            </div>
                          ) : item.stock === 0 ? (
                            <div className="flex items-center justify-end gap-1">
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                              0
                            </div>
                          ) : (
                            item.stock
                          )}
                        </TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${profit.toFixed(2)} ({profitMargin.toFixed(0)}%)
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="font-mono text-xs">{item.barcode}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
