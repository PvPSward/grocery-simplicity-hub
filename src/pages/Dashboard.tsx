
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package, CreditCard, TrendingUp, Users, Inbox, DollarSign, TrendingDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Mock data
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 6000 },
  { name: "Sun", sales: 3490 },
];

const topProducts = [
  { id: 1, name: "Milk 1L", category: "Dairy", sales: 145, stock: 32 },
  { id: 2, name: "Bread", category: "Bakery", sales: 129, stock: 15 },
  { id: 3, name: "Eggs (12pk)", category: "Dairy", sales: 98, stock: 24 },
  { id: 4, name: "Bananas 1kg", category: "Produce", sales: 86, stock: 40 },
  { id: 5, name: "Chicken Breast", category: "Meat", sales: 75, stock: 18 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader 
        title="Dashboard" 
        description="Welcome back to A.I Stores POS system"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Today's Sales" 
          value="$3,240.50" 
          icon={ShoppingCart}
          trend={{ value: 12.5, isPositive: true }}
          description="vs. yesterday"
          variant="primary"
        />
        <StatCard 
          title="Products Count" 
          value="1,423" 
          icon={Package}
          description="24 low stock items"
          variant="ghost"
        />
        <StatCard 
          title="Transactions" 
          value="156" 
          icon={CreditCard}
          trend={{ value: 3.2, isPositive: true }}
          description="vs. yesterday"
          variant="ghost"
        />
        <StatCard 
          title="Average Sale" 
          value="$20.77" 
          icon={TrendingUp}
          trend={{ value: 1.4, isPositive: false }}
          description="vs. last week"
          variant="ghost"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Comparison of sales performance this week</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">Download Report</Button>
              </div>
              <TabsContent value="daily" className="m-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" name="Sales ($)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="weekly" className="m-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" name="Sales ($)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="monthly" className="m-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" name="Sales ($)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Quick Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Active Users</span>
                </div>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Low Stock Items</span>
                </div>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Cash in Drawer</span>
                </div>
                <span className="font-semibold">$1,245.65</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Returns Today</span>
                </div>
                <span className="font-semibold">3 ($78.45)</span>
              </div>
            </div>

            <div className="pt-2 border-t">
              <h4 className="text-sm font-semibold mb-3">Top Selling Products</h4>
              <div className="space-y-3">
                {topProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{product.sales} sold</p>
                      <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
