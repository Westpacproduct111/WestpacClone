import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Login from "@/pages/login";
import AdminLogin from "@/pages/admin-login";
import Dashboard from "@/pages/dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminUserDetails from "@/pages/admin-user-details";
import Accounts from "@/pages/accounts";
import Cards from "@/pages/cards";
import Profile from "@/pages/profile";
import Transfers from "@/pages/transfers";
import Payees from "@/pages/payees";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/users/:id" component={AdminUserDetails} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/cards" component={Cards} />
      <Route path="/profile" component={Profile} />
      <Route path="/transfers" component={Transfers} />
      <Route path="/payees" component={Payees} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
