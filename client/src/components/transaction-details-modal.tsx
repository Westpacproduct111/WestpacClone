import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { formatAUD } from "@/lib/currency";
import { AlertCircle, ArrowDown, ArrowUp, Clock } from "lucide-react";

interface TransactionDetailsModalProps {
  transaction: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsModal({ transaction, open, onOpenChange }: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const isCredit = transaction.type === 'credit';
  const isOnHold = transaction.isOnHold;
  const hasExchangeInfo = transaction.amountUsd && transaction.exchangeRate;
  const isPending = transaction.status === 'pending';
  const isApproved = transaction.status === 'approved';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-transaction-details">
        <DialogHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <DialogTitle className="text-2xl">Transaction Details</DialogTitle>
            <div className="flex gap-2">
              {isPending && (
                <Badge variant="secondary" className="gap-1" data-testid="badge-status-pending">
                  <Clock className="h-3 w-3" />
                  Processing - Awaiting Approval
                </Badge>
              )}
              {isApproved && (
                <Badge variant="default" className="gap-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800" data-testid="badge-status-approved">
                  Approved
                </Badge>
              )}
              {isOnHold && (
                <Badge variant="destructive" className="gap-1" data-testid="badge-on-hold">
                  <Clock className="h-3 w-3" />
                  On Hold
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {isOnHold && transaction.holdReason && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4" data-testid="alert-hold-reason">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Hold Reason</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">{transaction.holdReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Type & Amount */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className={`inline-flex p-4 rounded-full mb-4 ${isCredit ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
              {isCredit ? <ArrowDown className="h-8 w-8" /> : <ArrowUp className="h-8 w-8" />}
            </div>
            <div className="text-sm text-muted-foreground mb-2">{isCredit ? 'Credit' : 'Debit'}</div>
            <div className={`text-4xl font-bold ${isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} data-testid="text-amount">
              {isCredit ? '+' : ''}{formatAUD(transaction.amount)}
            </div>
            <div className="text-sm text-muted-foreground mt-2">AUD</div>
          </div>

          {/* Exchange Rate Information */}
          {hasExchangeInfo && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Exchange Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-md p-4">
                    <div className="text-sm text-muted-foreground mb-1">Original Amount (USD)</div>
                    <div className="text-2xl font-bold text-foreground" data-testid="text-usd-amount">
                      ${parseFloat(transaction.amountUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-md p-4">
                    <div className="text-sm text-muted-foreground mb-1">Exchange Rate</div>
                    <div className="text-2xl font-bold text-foreground" data-testid="text-exchange-rate">
                      {parseFloat(transaction.exchangeRate).toFixed(6)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Sender & Receiver Information */}
          {(transaction.senderName || transaction.receiverName) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Transfer Details</h3>
                <div className="grid gap-4">
                  {transaction.senderName && (
                    <div className="bg-muted/30 rounded-md p-4" data-testid="section-sender">
                      <div className="text-sm text-muted-foreground mb-2">From</div>
                      <div className="font-semibold text-foreground">{transaction.senderName}</div>
                      {transaction.senderAccountNumber && (
                        <div className="text-sm text-muted-foreground mt-1">Account: {transaction.senderAccountNumber}</div>
                      )}
                    </div>
                  )}
                  {transaction.receiverName && (
                    <div className="bg-muted/30 rounded-md p-4" data-testid="section-receiver">
                      <div className="text-sm text-muted-foreground mb-2">To</div>
                      <div className="font-semibold text-foreground">{transaction.receiverName}</div>
                      {transaction.receiverAccountNumber && (
                        <div className="text-sm text-muted-foreground mt-1">Account: {transaction.receiverAccountNumber}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Transaction Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Transaction Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Description</span>
                <span className="font-medium text-right" data-testid="text-description">{transaction.description}</span>
              </div>
              {transaction.merchant && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Merchant</span>
                  <span className="font-medium">{transaction.merchant}</span>
                </div>
              )}
              {transaction.category && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{transaction.category}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-medium" data-testid="text-datetime">{format(new Date(transaction.transactionDate), "PPpp")}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Balance After</span>
                <span className="font-medium">{formatAUD(transaction.balanceAfter)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-xs">{transaction.id}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
