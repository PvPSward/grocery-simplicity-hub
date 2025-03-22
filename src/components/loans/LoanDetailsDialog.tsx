
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Loan } from "@/pages/Loans";
import { Separator } from "@/components/ui/separator";
import { BadgeDollarSign, Calendar, Phone, FileText } from "lucide-react";

interface LoanDetailsDialogProps {
  loan: Loan;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoanDetailsDialog({
  loan,
  open,
  onOpenChange,
}: LoanDetailsDialogProps) {
  const calculateRemainingAmount = () => {
    const totalAmount = loan.amount * (1 + loan.interestRate / 100);
    const paymentAmount = totalAmount / loan.totalPayments;
    const remainingAmount = totalAmount - (paymentAmount * loan.paymentsMade);
    return remainingAmount.toFixed(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Loan Details</DialogTitle>
          <DialogDescription>
            Detailed information for loan #{loan.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{loan.customerName}</h3>
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                loan.status === 'Active' ? 'bg-blue-100 text-blue-800' : 
                loan.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                'bg-green-100 text-green-800'
              }`}
            >
              {loan.status}
            </span>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <BadgeDollarSign className="h-4 w-4 mr-1.5" />
                Original Amount
              </label>
              <p className="font-medium">${loan.amount.toFixed(2)}</p>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <BadgeDollarSign className="h-4 w-4 mr-1.5" />
                Remaining Amount
              </label>
              <p className="font-medium">${calculateRemainingAmount()}</p>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                Issued Date
              </label>
              <p className="font-medium">{loan.issuedDate}</p>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                Due Date
              </label>
              <p className="font-medium">{loan.dueDate}</p>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <BadgeDollarSign className="h-4 w-4 mr-1.5" />
                Interest Rate
              </label>
              <p className="font-medium">{loan.interestRate}%</p>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <Phone className="h-4 w-4 mr-1.5" />
                Phone Number
              </label>
              <p className="font-medium">{loan.phone}</p>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground flex items-center">
              <FileText className="h-4 w-4 mr-1.5" />
              Payment Schedule
            </label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {Array.from({ length: loan.totalPayments }).map((_, index) => (
                <div 
                  key={index}
                  className={`border rounded-md p-2 text-center ${
                    index < loan.paymentsMade 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p className="text-xs text-muted-foreground">Payment {index + 1}</p>
                  <p className="font-medium text-sm">
                    ${(loan.amount * (1 + loan.interestRate / 100) / loan.totalPayments).toFixed(2)}
                  </p>
                  {index < loan.paymentsMade && (
                    <p className="text-xs text-green-600">Paid</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {loan.notes && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <FileText className="h-4 w-4 mr-1.5" />
                Notes
              </label>
              <p className="text-sm">{loan.notes}</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          {loan.status !== "Completed" && (
            <Button>Record Payment</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
