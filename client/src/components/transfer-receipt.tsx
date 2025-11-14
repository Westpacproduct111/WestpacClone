import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, X } from "lucide-react";
import { formatAUD } from "@/lib/currency";
import { format } from "date-fns";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";

interface TransferReceiptProps {
  transfer: any;
  fromAccount: any;
  toAccount?: any;
  userFullName: string;
  onClose: () => void;
}

export function TransferReceipt({ transfer, fromAccount, toAccount, userFullName, onClose }: TransferReceiptProps) {
  const referenceNumber = `WBC${transfer.id.substring(0, 8).toUpperCase()}`;
  const transferDate = new Date(transfer.createdAt);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="transfer-receipt-modal">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b bg-gradient-to-r from-[#DA1710] to-[#B8140E] text-white print:bg-white print:text-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Westpac" className="h-8 print:h-10" />
              <div>
                <CardTitle className="text-2xl">Transfer Receipt</CardTitle>
                <CardDescription className="text-white/90 print:text-gray-600">
                  Transaction Confirmation
                </CardDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 print:hidden"
              data-testid="button-close-receipt"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">Transfer Successful</p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your funds have been transferred successfully
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Reference Number</p>
                <p className="font-mono font-semibold text-lg" data-testid="text-reference-number">{referenceNumber}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date & Time</p>
                <p className="font-medium" data-testid="text-transfer-date">
                  {format(transferDate, 'dd MMM yyyy, h:mm a')}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                <p className="font-medium text-green-600" data-testid="text-status">Completed</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Amount</p>
                <p className="font-bold text-3xl text-[#DA1710]" data-testid="text-amount">
                  {formatAUD(transfer.amount)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
                <p className="font-medium" data-testid="text-description">{transfer.description}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold text-lg">Transfer Details</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">From</p>
                <p className="font-semibold" data-testid="text-sender-name">{userFullName}</p>
                <p className="text-sm text-muted-foreground mt-1">{fromAccount.accountName}</p>
                <p className="text-sm text-muted-foreground font-mono">
                  BSB: {fromAccount.bsb} | Account: {fromAccount.accountNumber}
                </p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">To</p>
                {transfer.transferType === 'internal' && toAccount ? (
                  <>
                    <p className="font-semibold" data-testid="text-recipient-name">{userFullName}</p>
                    <p className="text-sm text-muted-foreground mt-1">{toAccount.accountName}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      BSB: {toAccount.bsb} | Account: {toAccount.accountNumber}
                    </p>
                  </>
                ) : (
                  <>
                    {transfer.beneficiaryName && (
                      <p className="font-semibold" data-testid="text-recipient-name">{transfer.beneficiaryName}</p>
                    )}
                    {transfer.toAccountNumber && transfer.toBsb && (
                      <p className="text-sm text-muted-foreground font-mono mt-1">
                        BSB: {transfer.toBsb} | Account: {transfer.toAccountNumber}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-semibold">Important:</span> Please keep this receipt for your records. 
                If you have any questions about this transaction, please contact us with reference number {referenceNumber}.
              </p>
            </div>
          </div>

          <div className="flex gap-3 print:hidden">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1"
              data-testid="button-print-receipt"
            >
              <Download className="h-4 w-4 mr-2" />
              Print / Save as PDF
            </Button>
            <Button
              onClick={onClose}
              variant="default"
              className="flex-1"
              data-testid="button-done"
            >
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
