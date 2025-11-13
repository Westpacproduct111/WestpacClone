import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LogOut, Lock, Unlock, Ban, CheckCircle, Clock, X, Plus, Minus } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";
import { format } from "date-fns";
import { formatAUD } from "@/lib/currency";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [adjustAmount, setAdjustAmount] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const { data: usersData } = useQuery<{users: any[]}>({
    queryKey: ["/api/admin/users"],
  });

  const { data: accountsData } = useQuery<{accounts: any[]}>({
    queryKey: ["/api/admin/accounts"],
  });

  const { data: transactionsData } = useQuery<{transactions: any[]}>({
    queryKey: ["/api/admin/transactions"],
  });

  const toggleUserLockMutation = useMutation({
    mutationFn: async ({ userId, lock }: { userId: string; lock: boolean }) => {
      return apiRequest("PATCH", `/api/admin/users/${userId}/lock`, { lock });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Success", description: "User lock status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user lock status", variant: "destructive" });
    },
  });

  const toggleAccountBlockMutation = useMutation({
    mutationFn: async ({ accountId, block }: { accountId: string; block: boolean }) => {
      return apiRequest("PATCH", `/api/admin/accounts/${accountId}/block`, { block });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/accounts"] });
      toast({ title: "Success", description: "Account block status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update account block status", variant: "destructive" });
    },
  });

  const toggleTransactionHoldMutation = useMutation({
    mutationFn: async ({ transactionId, hold }: { transactionId: string; hold: boolean }) => {
      return apiRequest("PATCH", `/api/admin/transactions/${transactionId}/hold`, { hold });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
      toast({ title: "Success", description: "Transaction hold status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update transaction hold status", variant: "destructive" });
    },
  });

  const adjustBalanceMutation = useMutation({
    mutationFn: async ({ accountId, amount, type }: { accountId: string; amount: string; type: 'credit' | 'debit' }) => {
      return apiRequest("POST", `/api/admin/accounts/${accountId}/adjust`, { amount, type });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
      setAdjustAmount("");
      toast({ title: "Success", description: "Account balance adjusted" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to adjust account balance", variant: "destructive" });
    },
  });

  const handleLogout = async () => {
    await apiRequest("POST", "/api/auth/logout", {});
    setLocation("/login");
  };

  const users = usersData?.users || [];
  const accounts = accountsData?.accounts || [];
  const transactions = transactionsData?.transactions || [];
  const onHoldTransactions = transactions.filter((t: any) => t.isOnHold);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#DA1710] text-white sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src={logoImage} alt="Westpac" className="h-8" data-testid="img-logo" />
              <nav className="hidden md:flex gap-6 text-sm">
                <span className="font-medium">Admin Panel</span>
              </nav>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, accounts, and transactions</p>
        </div>

        {/* On Hold Transactions */}
        <Card className="mb-8" data-testid="card-hold-transactions">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Transactions On Hold ({onHoldTransactions.length})
            </CardTitle>
            <CardDescription>Review and release held transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {onHoldTransactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No transactions on hold</p>
            ) : (
              <div className="space-y-2">
                {onHoldTransactions.map((transaction: any) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-md border bg-card">
                    <div className="flex-1">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground mt-1">{transaction.holdReason}</div>
                      <div className="text-sm text-muted-foreground">
                        Amount: <span className="font-semibold text-green-600">{formatAUD(transaction.amount)}</span>
                        {' • '}
                        {format(new Date(transaction.transactionDate), "PPp")}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => toggleTransactionHoldMutation.mutate({ transactionId: transaction.id, hold: false })}
                      disabled={toggleTransactionHoldMutation.isPending}
                      data-testid={`button-release-hold-${transaction.id}`}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Release Hold
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Management */}
          <Card data-testid="card-users">
            <CardHeader>
              <CardTitle>Users ({users.length})</CardTitle>
              <CardDescription>Manage user accounts and lock status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {users.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-md border bg-card">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium flex items-center gap-2">
                        <span className="truncate">{user.fullName}</span>
                        {user.isLocked && (
                          <Badge variant="destructive" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-xs text-muted-foreground">ID: {user.customerId}</div>
                    </div>
                    <Button
                      size="sm"
                      variant={user.isLocked ? "default" : "outline"}
                      onClick={() => toggleUserLockMutation.mutate({ userId: user.id, lock: !user.isLocked })}
                      disabled={toggleUserLockMutation.isPending}
                      data-testid={`button-toggle-lock-${user.id}`}
                    >
                      {user.isLocked ? (
                        <><Unlock className="h-4 w-4 mr-2" />Unlock</>
                      ) : (
                        <><Lock className="h-4 w-4 mr-2" />Lock</>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accounts Management */}
          <Card data-testid="card-accounts">
            <CardHeader>
              <CardTitle>Accounts ({accounts.length})</CardTitle>
              <CardDescription>Manage account blocking and balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {accounts.map((account: any) => (
                  <div key={account.id} className="p-3 rounded-md border bg-card space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium flex items-center gap-2">
                          <span className="truncate">{account.accountName}</span>
                          {account.isBlocked && (
                            <Badge variant="destructive" className="text-xs">
                              <Ban className="h-3 w-3 mr-1" />
                              Blocked
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {account.accountNumber} • {formatAUD(account.balance)}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={account.isBlocked ? "default" : "outline"}
                        onClick={() => toggleAccountBlockMutation.mutate({ accountId: account.id, block: !account.isBlocked })}
                        disabled={toggleAccountBlockMutation.isPending}
                        data-testid={`button-toggle-block-${account.id}`}
                      >
                        {account.isBlocked ? (
                          <><CheckCircle className="h-4 w-4 mr-2" />Unblock</>
                        ) : (
                          <><Ban className="h-4 w-4 mr-2" />Block</>
                        )}
                      </Button>
                    </div>
                    
                    {/* Balance Adjustment */}
                    <div className="pt-2 border-t space-y-2">
                      <Label className="text-xs text-muted-foreground">Adjust Balance</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={selectedAccountId === account.id ? adjustAmount : ""}
                          onChange={(e) => {
                            setSelectedAccountId(account.id);
                            setAdjustAmount(e.target.value);
                          }}
                          className="h-8"
                          data-testid={`input-adjust-${account.id}`}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          onClick={() => {
                            if (adjustAmount && parseFloat(adjustAmount) > 0) {
                              adjustBalanceMutation.mutate({ accountId: account.id, amount: adjustAmount, type: 'credit' });
                            }
                          }}
                          disabled={!adjustAmount || parseFloat(adjustAmount) <= 0 || adjustBalanceMutation.isPending}
                          data-testid={`button-credit-${account.id}`}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Credit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          onClick={() => {
                            if (adjustAmount && parseFloat(adjustAmount) > 0) {
                              adjustBalanceMutation.mutate({ accountId: account.id, amount: adjustAmount, type: 'debit' });
                            }
                          }}
                          disabled={!adjustAmount || parseFloat(adjustAmount) <= 0 || adjustBalanceMutation.isPending}
                          data-testid={`button-debit-${account.id}`}
                        >
                          <Minus className="h-3 w-3 mr-1" />
                          Debit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
