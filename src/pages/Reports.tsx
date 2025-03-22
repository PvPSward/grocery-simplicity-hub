
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, PieChart, Pie, Cell } from "recharts";
import { Calendar, Download, BarChart4, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/ui/stat-card";

// Mock data for charts
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 6000 },
  { name: "Sun", sales: 3490 },
];

const pieData = [
  { name: "Dairy", value: 35 },
  { name: "Bakery", value: 20 },
  { name: "Produce", value: 25 },
  { name: "Meat", value: 15 },
  { name: "Grains", value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Reports() {
  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="Reports & Analytics" 
        description="View sales data and track performance"
        actions={
          <>
            <Select defaultValue="this-week">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Sales" 
          value="$24,780.50" 
          trend={{ value: 12.5, isPositive: true }}
          description="vs. last week"
          variant="primary"
        />
        <StatCard 
          title="Transactions" 
          value="983" 
          trend={{ value: 4.2, isPositive: true }}
          description="vs. last week"
          variant="ghost"
        />
        <StatCard 
          title="Average Sale" 
          value="$25.21" 
          trend={{ value: 1.3, isPositive: false }}
          description="vs. last week"
          variant="ghost"
        />
        <StatCard 
          title="Net Profit" 
          value="$8,540.12" 
          trend={{ value: 9.4, isPositive: true }}
          description="vs. last week"
          variant="ghost"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Weekly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Sales Transactions</CardTitle>
                <CardDescription>Detailed view of recent sales</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-09-05 14:30</TableCell>
                    <TableCell className="font-mono text-xs">TRX-2309051430</TableCell>
                    <TableCell>5 items</TableCell>
                    <TableCell>Cash</TableCell>
                    <TableCell className="text-right font-medium">$34.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-09-05 12:15</TableCell>
                    <TableCell className="font-mono text-xs">TRX-2309051215</TableCell>
                    <TableCell>3 items</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right font-medium">$22.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-09-05 10:45</TableCell>
                    <TableCell className="font-mono text-xs">TRX-2309051045</TableCell>
                    <TableCell>7 items</TableCell>
                    <TableCell>Cash</TableCell>
                    <TableCell className="text-right font-medium">$47.25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-09-05 09:30</TableCell>
                    <TableCell className="font-mono text-xs">TRX-2309050930</TableCell>
                    <TableCell>2 items</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right font-medium">$15.75</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-09-04 16:20</TableCell>
                    <TableCell className="font-mono text-xs">TRX-2309041620</TableCell>
                    <TableCell>10 items</TableCell>
                    <TableCell>Cash</TableCell>
                    <TableCell className="text-right font-medium">$89.99</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="m-0">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <BarChart4 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/70" />
                <h3 className="text-lg font-medium mb-2">Inventory Report Coming Soon</h3>
                <p className="text-muted-foreground">This feature is under development and will be available soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cashflow" className="m-0">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <BarChart4 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/70" />
                <h3 className="text-lg font-medium mb-2">Cash Flow Report Coming Soon</h3>
                <p className="text-muted-foreground">This feature is under development and will be available soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profit" className="m-0">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <BarChart4 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/70" />
                <h3 className="text-lg font-medium mb-2">Profit & Loss Report Coming Soon</h3>
                <p className="text-muted-foreground">This feature is under development and will be available soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
