
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, ArrowDownCircle, ArrowUpCircle, Plus, Minus, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for payments
const paymentTransactions = [
  { id: 1, date: "2023-09-05 14:30", type: "Cash In", amount: 120.50, description: "Sales revenue", balance: 1200.75 },
  { id: 2, date: "2023-09-05 12:00", type: "Cash Out", amount: 50.00, description: "Supplier payment", balance: 1080.25 },
  { id: 3, date: "2023-09-04 17:45", type: "Cash In", amount: 230.75, description: "Sales revenue", balance: 1130.25 },
  { id: 4, date: "2023-09-04 11:30", type: "Cash Out", amount: 25.50, description: "Office supplies", balance: 899.50 },
  { id: 5, date: "2023-09-03 16:20", type: "Cash In", amount: 175.00, description: "Sales revenue", balance: 925.00 },
  { id: 6, date: "2023-09-03 09:45", type: "Cash Out", amount: 30.00, description: "Miscellaneous expense", balance: 750.00 },
  { id: 7, date: "2023-09-02 15:10", type: "Cash In", amount: 310.50, description: "Sales revenue", balance: 780.00 },
  { id: 8, date: "2023-09-02 10:30", type: "Cash Out", amount: 80.50, description: "Utility payment", balance: 469.50 },
  { id: 9, date: "2023-09-01 18:00", type: "Cash In", amount: 250.00, description: "Sales revenue", balance: 550.00 },
  { id: 10, date: "2023-09-01 11:15", type: "Cash Out", amount: 100.00, description: "Supplier payment", balance: 300.00 }
];

const creditAccounts = [
  { id: 1, name: "John Smith", balance: 150.50, limit: 500, lastPayment: "2023-08-30", status: "Good" },
  { id: 2, name: "Mary Johnson", balance: 320.00, limit: 500, lastPayment: "2023-08-15", status: "Warning" },
  { id: 3, name: "Robert Brown", balance: 75.25, limit: 300, lastPayment: "2023-09-01", status: "Good" },
  { id: 4, name: "Sarah Williams", balance: 450.00, limit: 500, lastPayment: "2023-07-20", status: "Overdue" },
  { id: 5, name: "David Miller", balance: 0.00, limit: 200, lastPayment: "2023-08-10", status: "Good" }
];

export default function Payments() {
  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="Payment Management" 
        description="Manage cash flow and credit accounts"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Cash in Drawer" 
          value="$1,200.75" 
          variant="primary"
          icon={DollarSign}
        />
        <StatCard 
          title="Today's Cash In" 
          value="$351.25" 
          variant="ghost"
          icon={ArrowDownCircle}
          description="From 23 transactions"
        />
        <StatCard 
          title="Today's Cash Out" 
          value="$50.00" 
          variant="ghost"
          icon={ArrowUpCircle}
          description="From 1 transaction"
        />
        <StatCard 
          title="Credit Balance" 
          value="$995.75" 
          variant="ghost"
          icon={CreditCard}
          description="From 5 accounts"
        />
      </div>
      
      <Tabs defaultValue="cash-drawer">
        <TabsList className="mb-4">
          <TabsTrigger value="cash-drawer">Cash Drawer</TabsTrigger>
          <TabsTrigger value="credit-accounts">Credit Accounts</TabsTrigger>
          <TabsTrigger value="payment-settings">Payment Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cash-drawer" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Cash flow transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentTransactions.map(transaction => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            transaction.type === "Cash In" 
                              ? "bg-success/10 text-success border-success/20" 
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="text-right">
                          <span className={transaction.type === "Cash In" ? "text-success" : "text-destructive"}>
                            {transaction.type === "Cash In" ? "+" : "-"}${transaction.amount.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${transaction.balance.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Manage Cash</CardTitle>
                <CardDescription>Add or remove cash from the drawer</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">Amount ($)</label>
                    <Input id="amount" placeholder="0.00" type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Input id="description" placeholder="Enter a description..." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">Transaction Type</label>
                    <Select defaultValue="in">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">Cash In</SelectItem>
                        <SelectItem value="out">Cash Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Cash In
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Minus className="h-4 w-4 mr-2" />
                    Cash Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="credit-accounts" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Credit Accounts</CardTitle>
                <CardDescription>Manage customer credit accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Current Balance</TableHead>
                      <TableHead className="text-right">Credit Limit</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creditAccounts.map(account => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.name}</TableCell>
                        <TableCell className="text-right">${account.balance.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${account.limit.toFixed(2)}</TableCell>
                        <TableCell>{account.lastPayment}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            account.status === "Good" 
                              ? "bg-success/10 text-success border-success/20" 
                              : account.status === "Warning"
                                ? "bg-warning/10 text-warning border-warning/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                          }>
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Payments
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>New Credit Account</CardTitle>
                <CardDescription>Create a credit account for a customer</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="customer-name" className="text-sm font-medium">Customer Name</label>
                    <Input id="customer-name" placeholder="Enter customer name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact" className="text-sm font-medium">Contact Number</label>
                    <Input id="contact" placeholder="Enter contact number" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="credit-limit" className="text-sm font-medium">Credit Limit ($)</label>
                    <Input id="credit-limit" placeholder="500.00" type="number" step="10" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                    <Input id="notes" placeholder="Additional notes..." />
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payment-settings" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment options and taxes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Tax Settings</h3>
                  <div className="space-y-2">
                    <label htmlFor="tax-rate" className="text-sm font-medium">Tax Rate (%)</label>
                    <Input id="tax-rate" placeholder="7.00" defaultValue="7.00" type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tax-name" className="text-sm font-medium">Tax Name</label>
                    <Input id="tax-name" placeholder="Sales Tax" defaultValue="Sales Tax" />
                  </div>
                  <Button size="sm">Update Tax Settings</Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Methods</h3>
                  <div className="space-y-2 border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Cash</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Credit Card</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Store Credit</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
