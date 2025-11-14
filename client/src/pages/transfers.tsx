import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatAUD } from "@/lib/currency";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import { useLocation } from "wouter";
import { TransferReceipt } from "@/components/transfer-receipt";

const transferSchema = z.object({
  fromAccountId: z.string().min(1, "Please select an account"),
  toAccountId: z.string().optional(),
  toAccountNumber: z.string().optional(),
  toBsb: z.string().optional(),
  beneficiaryName: z.string().optional(),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(1, "Description is required"),
  transferType: z.enum(['internal', 'external']),
});

type TransferForm = z.infer<typeof transferSchema>;

export default function Transfers() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [transferType, setTransferType] = useState<'internal' | 'external'>('internal');
  const [completedTransfer, setCompletedTransfer] = useState<any>(null);

  const { data: accountsData } = useQuery<{accounts: any[]}>({
    queryKey: ["/api/accounts"],
  });

  const { data: transfersData } = useQuery<{transfers: any[]}>({
    queryKey: ["/api/transfers"],
  });

  const { data: userData } = useQuery<{user: any}>({
    queryKey: ["/api/auth/me"],
  });

  const form = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccountId: "",
      toAccountId: "",
      toAccountNumber: "",
      toBsb: "",
      beneficiaryName: "",
      amount: "",
      description: "",
      transferType: 'internal',
    },
  });

  const transferMutation = useMutation({
    mutationFn: (data: TransferForm) => apiRequest("POST", "/api/transfers", data),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transfers"] });
      
      if (response.transfer && accounts.length > 0 && user) {
        setCompletedTransfer(response.transfer);
      } else {
        toast({
          title: "Transfer Successful",
          description: "Your transfer has been completed.",
        });
      }
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Transfer Failed",
        description: error.message || "Failed to complete transfer.",
        variant: "destructive",
      });
    },
  });

  const accounts = accountsData?.accounts || [];
  const transfers = transfersData?.transfers || [];
  const user = userData?.user;

  const onSubmit = (data: TransferForm) => {
    transferMutation.mutate({ ...data, transferType });
  };

  const fromAccount = accounts.find(acc => acc.id === completedTransfer?.fromAccountId);
  const toAccount = completedTransfer?.toAccountId 
    ? accounts.find(acc => acc.id === completedTransfer.toAccountId)
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      {completedTransfer && fromAccount && user && (
        <TransferReceipt
          transfer={completedTransfer}
          fromAccount={fromAccount}
          toAccount={toAccount}
          userFullName={user.fullName}
          onClose={() => setCompletedTransfer(null)}
        />
      )}
      <header className="bg-[#DA1710] text-white sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">Transfers</h1>
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/dashboard" className="hover:underline" data-testid="link-dashboard">Dashboard</a>
                <a href="/accounts" className="hover:underline" data-testid="link-accounts">Accounts</a>
                <a href="/transfers" className="hover:underline font-medium" data-testid="link-transfers">Transfers</a>
                <a href="/payees" className="hover:underline" data-testid="link-payees">Payees</a>
              </nav>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocation("/dashboard")}
              className="text-white hover:bg-white/20"
              data-testid="button-back"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card data-testid="card-new-transfer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5" />
                New Transfer
              </CardTitle>
              <CardDescription>Transfer funds between your accounts or to another account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <Button
                  variant={transferType === 'internal' ? 'default' : 'outline'}
                  onClick={() => {
                    setTransferType('internal');
                    form.setValue('transferType', 'internal');
                  }}
                  className="flex-1"
                  data-testid="button-internal-transfer"
                >
                  Between My Accounts
                </Button>
                <Button
                  variant={transferType === 'external' ? 'default' : 'outline'}
                  onClick={() => {
                    setTransferType('external');
                    form.setValue('transferType', 'external');
                  }}
                  className="flex-1"
                  data-testid="button-external-transfer"
                >
                  To Another Account
                </Button>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fromAccountId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Account</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-from-account">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accounts.map((acc) => (
                              <SelectItem key={acc.id} value={acc.id}>
                                {acc.accountName} - {formatAUD(acc.balance)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {transferType === 'internal' ? (
                    <FormField
                      control={form.control}
                      name="toAccountId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>To Account</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-to-account">
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {accounts.filter(acc => acc.id !== form.watch('fromAccountId')).map((acc) => (
                                <SelectItem key={acc.id} value={acc.id}>
                                  {acc.accountName} - {formatAUD(acc.balance)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="beneficiaryName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipient Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Full name of recipient" data-testid="input-beneficiary-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="toBsb"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BSB</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123-456" data-testid="input-bsb" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="toAccountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123456789" data-testid="input-account-number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            data-testid="input-amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter description" data-testid="input-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#DA1710] hover:bg-[#B01410]"
                    disabled={transferMutation.isPending}
                    data-testid="button-submit-transfer"
                  >
                    {transferMutation.isPending ? "Processing..." : "Transfer Funds"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card data-testid="card-transfer-history">
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
              <CardDescription>Your latest transfer activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transfers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No transfers yet
                  </p>
                ) : (
                  transfers.slice(0, 10).map((transfer) => (
                    <div
                      key={transfer.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                      data-testid={`transfer-item-${transfer.id}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium text-sm">{transfer.description}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(transfer.createdAt).toLocaleDateString()} - {transfer.transferType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#DA1710]">{formatAUD(transfer.amount)}</p>
                        <p className="text-xs text-muted-foreground capitalize">{transfer.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
