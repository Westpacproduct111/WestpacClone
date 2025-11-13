import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, CreditCard, DollarSign, TrendingUp, ArrowUpDown, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { formatAUD } from "@/lib/currency";
import { apiRequest } from "@/lib/queryClient";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const { data: adminData, isLoading: adminLoading } = useQuery<{admin: any}>({
    queryKey: ["/api/admin/me"],
  });

  const { data: statsData, isLoading: statsLoading } = useQuery<{stats: any}>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: usersData } = useQuery<{users: any[]}>({
    queryKey: ["/api/admin/users"],
  });

  const { data: accountsData } = useQuery<{accounts: any[]}>({
    queryKey: ["/api/admin/accounts"],
  });

  const { data: transfersData } = useQuery<{transfers: any[]}>({
    queryKey: ["/api/admin/transfers"],
  });

  const { data: cardsData } = useQuery<{cards: any[]}>({
    queryKey: ["/api/admin/cards"],
  });

  const handleLogout = async () => {
    await apiRequest("POST", "/api/auth/logout", {});
    setLocation("/admin/login");
  };

  if (adminLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C2C2C] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const admin = adminData?.admin;
  const stats = statsData?.stats;
  const users = usersData?.users || [];
  const accounts = accountsData?.accounts || [];
  const transfers = transfersData?.transfers || [];
  const cards = cardsData?.cards || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="bg-[#2C2C2C] text-white sticky top-0 z-50 shadow-lg" data-testid="header-admin-dashboard">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">Admin Portal</span>
              </div>
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/admin/dashboard" className="hover:underline font-medium" data-testid="link-dashboard">Dashboard</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{admin?.email}</span>
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
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-welcome">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground" data-testid="text-subtitle">
            System overview and management
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card data-testid="card-total-users">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">Registered customers</p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-accounts">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalAccounts || 0}</div>
              <p className="text-xs text-muted-foreground">Active accounts</p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-balance">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#DA1710]">{formatAUD(stats?.totalBalance || 0)}</div>
              <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-transfers">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transfers.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card data-testid="card-users-list" className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#DA1710]" />
                Users
              </CardTitle>
              <CardDescription>All registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.slice(0, 10).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-start justify-between p-4 border-2 rounded-lg hover-elevate bg-white dark:bg-slate-900"
                    data-testid={`user-item-${user.id}`}
                  >
                    <div className="flex-1">
                      <p className="font-bold text-lg mb-1">{user.fullName}</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Customer ID:</span> <span className="font-mono text-[#DA1710]">{user.customerId}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.suburb}, {user.state} {user.postcode}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setLocation(`/admin/users/${user.id}`)}
                      data-testid={`button-view-user-${user.id}`}
                      className="bg-[#DA1710] hover:bg-[#B01410]"
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-accounts-list">
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
              <CardDescription>All customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accounts.slice(0, 10).map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                    data-testid={`account-item-${account.id}`}
                  >
                    <div>
                      <p className="font-medium">{account.accountName}</p>
                      <p className="text-xs text-muted-foreground">
                        {account.accountType} - {account.accountNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatAUD(account.balance)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-recent-transfers">
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
              <CardDescription>Latest transfer activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transfers.slice(0, 8).map((transfer) => (
                  <div
                    key={transfer.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                    data-testid={`transfer-item-${transfer.id}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{transfer.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transfer.createdAt).toLocaleString()} - {transfer.transferType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#DA1710]">{formatAUD(transfer.amount)}</p>
                      <p className="text-xs text-muted-foreground capitalize">{transfer.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-debit-cards">
            <CardHeader>
              <CardTitle>Debit Cards</CardTitle>
              <CardDescription>All issued cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cards.slice(0, 8).map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                    data-testid={`card-item-${card.id}`}
                  >
                    <div>
                      <p className="font-medium">{card.cardholderName}</p>
                      <p className="text-xs text-muted-foreground">
                        {card.cardNumber.replace(/\d(?=\d{4})/g, "*")} - {card.cardType}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        card.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {card.status}
                      </span>
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
