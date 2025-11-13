import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowUp, ArrowDown } from "lucide-react";
import { useLocation } from "wouter";
import { formatAUD } from "@/lib/currency";
import { apiRequest } from "@/lib/queryClient";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";
import { format } from "date-fns";

export default function Accounts() {
  const [, setLocation] = useLocation();

  const { data: accountsData, isLoading: accountsLoading } = useQuery<{accounts: any[]}>({
    queryKey: ["/api/accounts"],
  });

  const { data: checkingTransactions } = useQuery<{transactions: any[]}>({
    queryKey: ["/api/accounts", accountsData?.accounts?.[0]?.id, "transactions"],
    queryFn: () => {
      const checkingAccount = accountsData?.accounts?.find(a => a.accountType === "Checking");
      return checkingAccount ? fetch(`/api/accounts/${checkingAccount.id}/transactions`).then(r => r.json()) : null;
    },
    enabled: !!accountsData?.accounts,
  });

  const { data: savingsTransactions } = useQuery<{transactions: any[]}>({
    queryKey: ["/api/accounts", accountsData?.accounts?.[1]?.id, "transactions"],
    queryFn: () => {
      const savingsAccount = accountsData?.accounts?.find(a => a.accountType === "Savings");
      return savingsAccount ? fetch(`/api/accounts/${savingsAccount.id}/transactions`).then(r => r.json()) : null;
    },
    enabled: !!accountsData?.accounts,
  });

  const handleLogout = async () => {
    await apiRequest("POST", "/api/auth/logout", {});
    setLocation("/login");
  };

  if (accountsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA1710] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your accounts...</p>
        </div>
      </div>
    );
  }

  const accounts = accountsData?.accounts || [];
  const checkingAccount = accounts.find(a => a.accountType === "Checking");
  const savingsAccount = accounts.find(a => a.accountType === "Savings");

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#DA1710] text-white sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src={logoImage} alt="Westpac" className="h-8" data-testid="img-logo" />
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/dashboard" className="hover:underline" data-testid="link-dashboard">Dashboard</a>
                <a href="/accounts" className="hover:underline font-medium" data-testid="link-accounts">Accounts</a>
                <a href="/cards" className="hover:underline" data-testid="link-cards">Cards</a>
                <a href="/profile" className="hover:underline" data-testid="link-profile">Profile</a>
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

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">Your Accounts</h1>
          <p className="text-muted-foreground" data-testid="text-subtitle">View and manage your accounts and transactions</p>
        </div>

        {checkingAccount && (
          <div className="mb-8">
            <Card data-testid="card-checking-account">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription>Checking Account</CardDescription>
                    <CardTitle className="text-2xl" data-testid="text-checking-name">{checkingAccount.accountName}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#DA1710]" data-testid="text-checking-balance">
                      {formatAUD(checkingAccount.balance)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      BSB: {checkingAccount.bsb} | Acc: {checkingAccount.accountNumber}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold mb-3">Recent Transactions</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {checkingTransactions?.transactions?.map((transaction: any, index: number) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50"
                        data-testid={`transaction-checking-${index}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {transaction.type === 'credit' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(transaction.transactionDate), "PPp")}
                            </div>
                          </div>
                        </div>
                        <div className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'credit' ? '+' : ''}{formatAUD(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {savingsAccount && (
          <div className="mb-8">
            <Card data-testid="card-savings-account">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription>Savings Account</CardDescription>
                    <CardTitle className="text-2xl" data-testid="text-savings-name">{savingsAccount.accountName}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#DA1710]" data-testid="text-savings-balance">
                      {formatAUD(savingsAccount.balance)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      BSB: {savingsAccount.bsb} | Acc: {savingsAccount.accountNumber}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold mb-3">Recent Transactions</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {savingsTransactions?.transactions?.map((transaction: any, index: number) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50"
                        data-testid={`transaction-savings-${index}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {transaction.type === 'credit' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(transaction.transactionDate), "PPp")}
                            </div>
                          </div>
                        </div>
                        <div className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'credit' ? '+' : ''}{formatAUD(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
