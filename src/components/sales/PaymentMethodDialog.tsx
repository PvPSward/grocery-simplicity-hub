
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, CreditCard, Receipt, CalendarClock } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const paymentSchema = z.object({
  method: z.enum(["cash", "credit", "loan"]),
  amountTendered: z.string().optional(),
  changeAmount: z.string().optional(),
  creditDetails: z.string().optional(),
  loanDueDate: z.string().optional(),
  notes: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
  onComplete: (paymentData: PaymentData) => void;
}

export interface PaymentData {
  method: "cash" | "credit" | "loan";
  amountTendered?: number;
  changeAmount?: number;
  creditDetails?: string;
  loanDueDate?: string;
  notes?: string;
}

export default function PaymentMethodDialog({ 
  open, 
  onOpenChange, 
  totalAmount,
  onComplete
}: PaymentMethodDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "credit" | "loan">("cash");
  const [amountTendered, setAmountTendered] = useState<string>("");
  const [changeAmount, setChangeAmount] = useState<number>(0);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: "cash",
      amountTendered: "",
      changeAmount: "0.00",
      creditDetails: "",
      loanDueDate: "",
      notes: "",
    },
  });

  const handleAmountChange = (value: string) => {
    setAmountTendered(value);
    const numValue = parseFloat(value) || 0;
    const change = numValue - totalAmount;
    setChangeAmount(change > 0 ? change : 0);
    form.setValue("changeAmount", change > 0 ? change.toFixed(2) : "0.00");
  };

  const onSubmit = (data: PaymentFormValues) => {
    const paymentData: PaymentData = {
      method: data.method,
    };

    if (data.method === "cash") {
      paymentData.amountTendered = parseFloat(data.amountTendered || "0");
      paymentData.changeAmount = changeAmount;
    } else if (data.method === "credit") {
      paymentData.creditDetails = data.creditDetails;
    } else if (data.method === "loan") {
      paymentData.loanDueDate = data.loanDueDate;
    }

    paymentData.notes = data.notes;
    
    onComplete(paymentData);
    toast.success("Payment processed successfully");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Payment Method</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-xl font-bold text-center">
              Total: ${totalAmount.toFixed(2)}
            </div>
            
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value: "cash" | "credit" | "loan") => {
                        field.onChange(value);
                        setPaymentMethod(value);
                      }}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="cash" className="sr-only" />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer">
                            <Banknote className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm font-medium">Cash</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="credit" className="sr-only" />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer">
                            <CreditCard className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm font-medium">Credit</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="loan" className="sr-only" />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer">
                            <CalendarClock className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm font-medium">Loan</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {paymentMethod === "cash" && (
              <>
                <FormField
                  control={form.control}
                  name="amountTendered"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Tendered</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          min={totalAmount}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleAmountChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="changeAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          value={`$${changeAmount.toFixed(2)}`}
                          className="bg-muted"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {paymentMethod === "credit" && (
              <FormField
                control={form.control}
                name="creditDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Details</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer name or account details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {paymentMethod === "loan" && (
              <FormField
                control={form.control}
                name="loanDueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="Additional notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Complete Payment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
