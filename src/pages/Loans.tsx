
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, WalletIcon, BadgeDollarSign, Search, HandCoins } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import LoanDetailsDialog from "@/components/loans/LoanDetailsDialog";

// Mock data for loans - ensuring status is one of the union types in Loan
const loansMockData = [
  { 
    id: 1, 
    customerName: "Jane Smith", 
    amount: 500, 
    issuedDate: "2023-05-15", 
    dueDate: "2023-06-15", 
    status: "Active" as const,
    paymentsMade: 0,
    totalPayments: 2,
    interestRate: 5,
    phone: "555-1234",
    notes: "Regular customer, first loan"
  },
  { 
    id: 2, 
    customerName: "John Doe", 
    amount: 1200, 
    issuedDate: "2023-04-10", 
    dueDate: "2023-07-10", 
    status: "Active" as const,
    paymentsMade: 1,
    totalPayments: 3,
    interestRate: 5,
    phone: "555-5678",
    notes: "Grocery supplier"
  },
  { 
    id: 3, 
    customerName: "Alice Johnson", 
    amount: 300, 
    issuedDate: "2023-03-20", 
    dueDate: "2023-04-20", 
    status: "Overdue" as const,
    paymentsMade: 0,
    totalPayments: 1,
    interestRate: 5,
    phone: "555-9012",
    notes: "First-time customer"
  },
  { 
    id: 4, 
    customerName: "Robert Chen", 
    amount: 850, 
    issuedDate: "2023-05-01", 
    dueDate: "2023-08-01", 
    status: "Active" as const,
    paymentsMade: 1,
    totalPayments: 3,
    interestRate: 5,
    phone: "555-3456",
    notes: "Regular customer"
  },
  { 
    id: 5, 
    customerName: "Maria Garcia", 
    amount: 600, 
    issuedDate: "2023-02-15", 
    dueDate: "2023-05-15", 
    status: "Completed" as const,
    paymentsMade: 3,
    totalPayments: 3,
    interestRate: 5,
    phone: "555-7890",
    notes: "Prompt payments"
  }
];

export type Loan = {
  id: number;
  customerName: string;
  amount: number;
  issuedDate: string;
  dueDate: string;
  status: "Active" | "Overdue" | "Completed";
  paymentsMade: number;
  totalPayments: number;
  interestRate: number;
  phone: string;
  notes: string;
};

export default function Loans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loans, setLoans] = useState<Loan[]>(loansMockData);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredLoans = loans.filter(loan => 
    loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.amount.toString().includes(searchTerm)
  );

  const tabFilteredLoans = activeTab === "all" 
    ? filteredLoans 
    : filteredLoans.filter(loan => loan.status.toLowerCase() === activeTab.toLowerCase());

  const viewLoanDetails = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsDetailsOpen(true);
  };

  const handleRecordPayment = (loanId: number) => {
    // In a real app, this would call an API to record the payment
    setLoans(prevLoans => 
      prevLoans.map(loan => 
        loan.id === loanId && loan.paymentsMade < loan.totalPayments 
          ? { 
              ...loan, 
              paymentsMade: loan.paymentsMade + 1,
              status: loan.paymentsMade + 1 === loan.totalPayments ? "Completed" : "Active"
            } 
          : loan
      )
    );
    
    toast.success("Payment recorded successfully");
  };

  const handleCreateNewLoan = () => {
    toast.info("New loan creation would open a form here");
    // In a real app, this would open a form to create a new loan
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="Loans" 
        description="Manage customer loans and payment tracking"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <BadgeDollarSign className="h-4 w-4 mr-2" />
              Active Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loans.filter(loan => loan.status === "Active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <WalletIcon className="h-4 w-4 mr-2" />
              Total Outstanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${loans
                .filter(loan => loan.status !== "Completed")
                .reduce((sum, loan) => sum + loan.amount * (loan.totalPayments - loan.paymentsMade) / loan.totalPayments, 0)
                .toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Overdue Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">
              {loans.filter(loan => loan.status === "Overdue").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <HandCoins className="h-4 w-4 mr-2" />
              Completed Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">
              {loans.filter(loan => loan.status === "Completed").length}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search loans..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateNewLoan}>
                Create New Loan
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Loans</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="m-0">
                <ScrollArea className="h-[calc(100vh-400px)]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Issued Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payments</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tabFilteredLoans.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No loans found
                          </TableCell>
                        </TableRow>
                      ) : (
                        tabFilteredLoans.map(loan => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">{loan.customerName}</TableCell>
                            <TableCell>${loan.amount.toFixed(2)}</TableCell>
                            <TableCell>{loan.issuedDate}</TableCell>
                            <TableCell>{loan.dueDate}</TableCell>
                            <TableCell>
                              <span 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  loan.status === 'Active' ? 'bg-blue-100 text-blue-800' : 
                                  loan.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                                  'bg-green-100 text-green-800'
                                }`}
                              >
                                {loan.status}
                              </span>
                            </TableCell>
                            <TableCell>{loan.paymentsMade} of {loan.totalPayments}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mr-2"
                                onClick={() => viewLoanDetails(loan)}
                              >
                                Details
                              </Button>
                              <Button 
                                size="sm"
                                disabled={loan.status === "Completed" || loan.paymentsMade >= loan.totalPayments}
                                onClick={() => handleRecordPayment(loan.id)}
                              >
                                Record Payment
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {selectedLoan && (
        <LoanDetailsDialog 
          loan={selectedLoan} 
          open={isDetailsOpen} 
          onOpenChange={setIsDetailsOpen} 
        />
      )}
    </div>
  );
}
