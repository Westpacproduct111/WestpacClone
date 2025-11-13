import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Wallet, Calendar } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { formatAUD } from "@/lib/currency";
import { apiRequest } from "@/lib/queryClient";

export default function AdminUserDetails() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/users/:id");
  
  const userId = params?.id;

  const { data: userData, isLoading } = useQuery<{user: any; accounts: any[]}>({
    queryKey: [`/api/admin/users/${userId}`],
    enabled: !!userId,
  });

  const handleLogout = async () => {
    await apiRequest("POST", "/api/auth/logout", {});
    setLocation("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA1710] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading user details...</p>
        </div>
      </div>
    );
  }

  const user = userData?.user;
  const accounts = userData?.accounts || [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
          <Button onClick={() => setLocation("/admin/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + parseFloat(acc.balance), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="bg-[#2C2C2C] text-white sticky top-0 z-50 shadow-lg" data-testid="header-admin-user-details">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">Admin Portal</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
              data-testid="button-logout"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => setLocation("/admin/dashboard")}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">
            User Details
          </h1>
          <p className="text-muted-foreground">Complete customer information and account overview</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-2" data-testid="card-personal-info">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#DA1710]" />
                Personal Information
              </CardTitle>
              <CardDescription>Customer profile and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Full Name</p>
                    <p className="text-lg font-semibold" data-testid="text-fullname">{user.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </p>
                    <p className="text-base" data-testid="text-email">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </p>
                    <p className="text-base" data-testid="text-phone">{user.phoneNumber || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Customer ID</p>
                    <p className="text-base font-mono font-semibold text-[#DA1710]" data-testid="text-customer-id">{user.customerId}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Address
                    </p>
                    <div className="text-base space-y-1" data-testid="text-address">
                      <p>{user.address}</p>
                      <p>{user.suburb}, {user.state} {user.postcode}</p>
                      <p>{user.country}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member Since
                    </p>
                    <p className="text-base" data-testid="text-created-at">
                      {new Date(user.createdAt).toLocaleDateString('en-AU', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#DA1710] to-[#B01410] text-white border-0 shadow-xl" data-testid="card-total-balance">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wallet className="h-5 w-5" />
                Total Balance
              </CardTitle>
              <CardDescription className="text-white/80">Across all accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2" data-testid="text-total-balance">
                {formatAUD(totalBalance)}
              </div>
              <p className="text-sm text-white/90">{accounts.length} active account{accounts.length !== 1 ? 's' : ''}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-2" data-testid="card-accounts">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#DA1710]" />
              Bank Accounts
            </CardTitle>
            <CardDescription>All accounts associated with this customer</CardDescription>
          </CardHeader>
          <CardContent>
            {accounts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No accounts found</p>
            ) : (
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="p-5 border-2 rounded-lg hover-elevate bg-white dark:bg-slate-900"
                    data-testid={`account-${account.id}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1" data-testid={`account-name-${account.id}`}>
                          {account.accountName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {account.accountType} Account
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#DA1710]" data-testid={`account-balance-${account.id}`}>
                          {formatAUD(account.balance)}
                        </p>
                        <p className="text-xs text-muted-foreground">{account.currency}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                        <p className="font-mono font-semibold" data-testid={`account-number-${account.id}`}>
                          {account.accountNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">BSB</p>
                        <p className="font-mono font-semibold" data-testid={`account-bsb-${account.id}`}>
                          {account.bsb}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
