
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, WalletIcon, BadgeDollarSign, Search, HandCoins } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import LoanDetailsDialog from "@/components/loans/LoanDetailsDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Define the API base URL
const API_BASE_URL = "/api";

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

type LoanStats = {
  activeLoans: number;
  overdueLoans: number;
  completedLoans: number;
  totalOutstanding: number;
};

// API functions
const fetchLoans = async (): Promise<Loan[]> => {
  const response = await fetch(`${API_BASE_URL}/loans`);
  if (!response.ok) {
    throw new Error('Failed to fetch loans');
  }
  return response.json();
};

const fetchLoansByStatus = async (status: string): Promise<Loan[]> => {
  if (status === 'all') {
    return fetchLoans();
  }
  const response = await fetch(`${API_BASE_URL}/loans/by-status/${status}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${status} loans`);
  }
  return response.json();
};

const fetchLoanStats = async (): Promise<LoanStats> => {
  const response = await fetch(`${API_BASE_URL}/loans/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch loan stats');
  }
  return response.json();
};

const recordLoanPayment = async (loanId: number): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/loans/${loanId}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: 0 }), // API only needs to know a payment was made
  });
  
  if (!response.ok) {
    throw new Error('Failed to record payment');
  }
  return response.json();
};

export default function Loans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const queryClient = useQueryClient();

  // Fetch all loans
  const { data: loans = [], isLoading, error } = useQuery({
    queryKey: ['loans'],
    queryFn: fetchLoans,
  });

  // Fetch loans by status
  const { data: statusLoans = [] } = useQuery({
    queryKey: ['loans', 'status', activeTab],
    queryFn: () => fetchLoansByStatus(activeTab),
    enabled: activeTab !== 'all', // Only run this query if not on 'all' tab
  });

  // Fetch loan stats
  const { data: loanStats } = useQuery({
    queryKey: ['loanStats'],
    queryFn: fetchLoanStats,
  });

  // Record payment mutation
  const recordPaymentMutation = useMutation({
    mutationFn: recordLoanPayment,
    onSuccess: () => {
      toast.success("Payment recorded successfully");
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loans', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['loanStats'] });
    },
    onError: (error) => {
      toast.error(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Filter loans based on search term
  const filteredLoans = (activeTab === 'all' ? loans : statusLoans).filter(loan => 
    loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.amount.toString().includes(searchTerm)
  );

  const viewLoanDetails = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsDetailsOpen(true);
  };

  const handleRecordPayment = (loanId: number) => {
    recordPaymentMutation.mutate(loanId);
  };

  const handleCreateNewLoan = () => {
    toast.info("New loan creation would open a form here");
    // In a real app, this would open a form to create a new loan
  };

  // If there's an error fetching loans
  if (error) {
    toast.error(`Error fetching loans: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

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
              {loanStats?.activeLoans || 0}
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
              ${loanStats?.totalOutstanding?.toFixed(2) || '0.00'}
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
              {loanStats?.overdueLoans || 0}
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
              {loanStats?.completedLoans || 0}
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
                <TabsTrigger value="Active">Active</TabsTrigger>
                <TabsTrigger value="Overdue">Overdue</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="m-0">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <p>Loading loans...</p>
                  </div>
                ) : (
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
                        {filteredLoans.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No loans found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredLoans.map(loan => (
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
                )}
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
