import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, User, LogOut, DollarSign, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { formatAUD } from "@/lib/currency";
import { apiRequest } from "@/lib/queryClient";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const { data: userData, isLoading: userLoading } = useQuery<{user: any}>({
    queryKey: ["/api/auth/me"],
  });

  const { data: accountsData, isLoading: accountsLoading } = useQuery<{accounts: any[]}>({
    queryKey: ["/api/accounts"],
  });

  const handleLogout = async () => {
    await apiRequest("/api/auth/logout", "POST", {});
    setLocation("/login");
  };

  if (userLoading || accountsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA1710] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your accounts...</p>
        </div>
      </div>
    );
  }

  const user = userData?.user;
  const accounts = accountsData?.accounts || [];
  const totalBalance = accounts.reduce((sum, acc) => sum + parseFloat(acc.balance), 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#DA1710] text-white sticky top-0 z-50" data-testid="header-dashboard">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src={logoImage} alt="Westpac" className="h-8" data-testid="img-logo" />
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/dashboard" className="hover:underline font-medium" data-testid="link-dashboard">Dashboard</a>
                <a href="/accounts" className="hover:underline" data-testid="link-accounts">Accounts</a>
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
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-welcome">
            Welcome back, {user?.fullName?.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground" data-testid="text-subtitle">
            Here's an overview of your accounts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="md:col-span-2" data-testid="card-total-balance">
            <CardHeader>
              <CardDescription>Total Balance</CardDescription>
              <CardTitle className="text-4xl text-[#DA1710]" data-testid="text-total-balance">
                {formatAUD(totalBalance)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                <span>Across {accounts.length} accounts</span>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-quick-actions">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setLocation("/accounts")} data-testid="button-view-accounts">
                <DollarSign className="h-4 w-4 mr-2" />
                View Accounts
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setLocation("/cards")} data-testid="button-manage-cards">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Cards
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setLocation("/profile")} data-testid="button-edit-profile">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold" data-testid="text-your-accounts">Your Accounts</h2>
            <Button variant="link" className="text-[#DA1710]" onClick={() => setLocation("/accounts")} data-testid="button-view-all">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account) => (
              <Card key={account.id} className="hover-elevate cursor-pointer" onClick={() => setLocation("/accounts")} data-testid={`card-account-${account.accountType.toLowerCase()}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardDescription className="text-xs">{account.accountType}</CardDescription>
                      <CardTitle className="text-lg" data-testid={`text-account-name-${account.accountType.toLowerCase()}`}>
                        {account.accountName}
                      </CardTitle>
                    </div>
                    <DollarSign className="h-8 w-8 text-[#DA1710] opacity-20" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <div className="text-2xl font-bold" data-testid={`text-balance-${account.accountType.toLowerCase()}`}>
                        {formatAUD(account.balance)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        BSB: {account.bsb} | Account: {account.accountNumber}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
