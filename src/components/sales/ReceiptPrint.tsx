
import React from "react";
import { format } from "date-fns";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  barcode?: string;
};

type ReceiptProps = {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentDetails: any;
  timestamp: Date;
};

export const ReceiptPrint: React.FC<ReceiptProps> = ({
  items,
  subtotal,
  tax,
  total,
  paymentMethod,
  paymentDetails,
  timestamp,
}) => {
  return (
    <div className="receipt-print p-4" style={{ width: "72mm", fontFamily: "monospace" }}>
      <div className="text-center mb-4">
        <h2 className="font-bold text-lg">Lovable Store</h2>
        <p>123 Main Street</p>
        <p>City, State 12345</p>
        <p>Tel: (123) 456-7890</p>
        <p>{format(timestamp, "MMM dd, yyyy h:mm a")}</p>
      </div>

      <div className="border-t border-b border-dashed py-2 my-2">
        <div className="flex justify-between font-bold">
          <span>Item</span>
          <span>Price</span>
        </div>
      </div>

      <div className="mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between mb-1">
            <div>
              <span>{item.name} </span>
              <span className="text-xs">x{item.quantity}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed pt-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (7%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-dashed py-2 mt-2">
        <div className="text-center">
          <p>Payment Method: {paymentMethod}</p>
          {paymentMethod === "Cash" && (
            <>
              <p>Amount Paid: ${paymentDetails.amountPaid?.toFixed(2)}</p>
              <p>Change: ${paymentDetails.change?.toFixed(2)}</p>
            </>
          )}
          {paymentMethod === "Card" && (
            <p>Card: **** **** **** {paymentDetails.lastFour}</p>
          )}
        </div>
      </div>

      <div className="text-center mt-4">
        <p>Thank you for your purchase!</p>
        <p>Please come again</p>
      </div>
    </div>
  );
};

export default ReceiptPrint;
