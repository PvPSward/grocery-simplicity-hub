
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Plus, Minus, X, Printer, Save, BarcodeIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock data for products
const productsList = [
  { id: 1, name: "Milk 1L", category: "Dairy", price: 3.99, barcode: "5901234123457" },
  { id: 2, name: "Bread", category: "Bakery", price: 2.49, barcode: "4901234123458" },
  { id: 3, name: "Eggs (12pk)", category: "Dairy", price: 4.99, barcode: "3901234123459" },
  { id: 4, name: "Bananas 1kg", category: "Produce", price: 1.99, barcode: "2901234123450" },
  { id: 5, name: "Chicken Breast", category: "Meat", price: 7.99, barcode: "1901234123451" },
  { id: 6, name: "Rice 2kg", category: "Grains", price: 6.99, barcode: "6901234123452" },
  { id: 7, name: "Pasta 500g", category: "Grains", price: 1.49, barcode: "7901234123453" },
  { id: 8, name: "Tomatoes 1kg", category: "Produce", price: 3.49, barcode: "8901234123454" },
  { id: 9, name: "Cheese 200g", category: "Dairy", price: 4.49, barcode: "9901234123455" },
  { id: 10, name: "Yogurt 500g", category: "Dairy", price: 2.99, barcode: "0901234123456" },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  barcode: string;
};

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [barcode, setBarcode] = useState("");

  const filteredProducts = productsList.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  const addToCart = (product: typeof productsList[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = productsList.find(p => p.barcode === barcode);
    if (product) {
      addToCart(product);
      setBarcode("");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;

  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="Sales" 
        description="Process transactions and manage sales"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <form onSubmit={handleBarcodeSubmit} className="relative flex-1">
                  <BarcodeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Scan barcode..." 
                    className="pl-9"
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                  />
                </form>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="dairy">Dairy</TabsTrigger>
                  <TabsTrigger value="bakery">Bakery</TabsTrigger>
                  <TabsTrigger value="produce">Produce</TabsTrigger>
                  <TabsTrigger value="meat">Meat</TabsTrigger>
                  <TabsTrigger value="grains">Grains</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="m-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        className="text-left p-3 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                          <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-sm font-semibold mt-1">${product.price.toFixed(2)}</p>
                      </button>
                    ))}
                  </div>
                </TabsContent>
                
                {["dairy", "bakery", "produce", "meat", "grains"].map(category => (
                  <TabsContent key={category} value={category} className="m-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {productsList
                        .filter(p => p.category.toLowerCase() === category)
                        .map(product => (
                          <button
                            key={product.id}
                            className="text-left p-3 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
                            onClick={() => addToCart(product)}
                          >
                            <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                              <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="font-medium truncate">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-sm font-semibold mt-1">${product.price.toFixed(2)}</p>
                          </button>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Current Sale
              </h3>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
                  <ShoppingCart className="h-8 w-8 mb-2 opacity-50" />
                  <p>Your cart is empty</p>
                  <p className="text-sm">Add products to begin a sale</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right w-20">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            <div className="p-4 border-t mt-auto">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button variant="outline" className="w-full" disabled={cart.length === 0}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="w-full" disabled={cart.length === 0}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
              
              <Button 
                className={cn(
                  "w-full mt-2 transition-all",
                  cart.length === 0 ? "opacity-50 cursor-not-allowed" : "animate-pulse"
                )}
                disabled={cart.length === 0}
              >
                Complete Sale
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
