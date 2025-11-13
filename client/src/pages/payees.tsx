import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { UserPlus, Trash2, User } from "lucide-react";
import { useLocation } from "wouter";

const payeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  bsb: z.string().min(6, "BSB must be at least 6 characters"),
  nickname: z.string().optional(),
});

type PayeeForm = z.infer<typeof payeeSchema>;

export default function Payees() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const { data: payeesData } = useQuery<{payees: any[]}>({
    queryKey: ["/api/payees"],
  });

  const form = useForm<PayeeForm>({
    resolver: zodResolver(payeeSchema),
    defaultValues: {
      name: "",
      accountNumber: "",
      bsb: "",
      nickname: "",
    },
  });

  const addPayeeMutation = useMutation({
    mutationFn: (data: PayeeForm) => apiRequest("/api/payees", "POST", data),
    onSuccess: () => {
      toast({
        title: "Payee Added",
        description: "New payee has been added successfully.",
      });
      form.reset();
      setIsAdding(false);
      queryClient.invalidateQueries({ queryKey: ["/api/payees"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add Payee",
        description: error.message || "Could not add payee.",
        variant: "destructive",
      });
    },
  });

  const deletePayeeMutation = useMutation({
    mutationFn: (payeeId: string) => apiRequest(`/api/payees/${payeeId}`, "DELETE", {}),
    onSuccess: () => {
      toast({
        title: "Payee Deleted",
        description: "Payee has been removed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/payees"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Delete Payee",
        description: error.message || "Could not delete payee.",
        variant: "destructive",
      });
    },
  });

  const payees = payeesData?.payees || [];

  const onSubmit = (data: PayeeForm) => {
    addPayeeMutation.mutate(data);
  };

  const handleDelete = (payeeId: string) => {
    if (confirm("Are you sure you want to delete this payee?")) {
      deletePayeeMutation.mutate(payeeId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#DA1710] text-white sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">Payees</h1>
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/dashboard" className="hover:underline" data-testid="link-dashboard">Dashboard</a>
                <a href="/accounts" className="hover:underline" data-testid="link-accounts">Accounts</a>
                <a href="/transfers" className="hover:underline" data-testid="link-transfers">Transfers</a>
                <a href="/payees" className="hover:underline font-medium" data-testid="link-payees">Payees</a>
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
          <div>
            <Card data-testid="card-add-payee">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Add New Payee
                  </span>
                  {!isAdding && (
                    <Button
                      size="sm"
                      onClick={() => setIsAdding(true)}
                      data-testid="button-show-add-form"
                    >
                      Add Payee
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>Save account details for quick transfers</CardDescription>
              </CardHeader>
              {isAdding && (
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John Smith" data-testid="input-payee-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nickname (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John" data-testid="input-payee-nickname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bsb"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BSB</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123-456" data-testid="input-payee-bsb" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123456789" data-testid="input-payee-account" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          className="flex-1 bg-[#DA1710] hover:bg-[#B01410]"
                          disabled={addPayeeMutation.isPending}
                          data-testid="button-submit-payee"
                        >
                          {addPayeeMutation.isPending ? "Adding..." : "Add Payee"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsAdding(false);
                            form.reset();
                          }}
                          data-testid="button-cancel-payee"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              )}
            </Card>
          </div>

          <Card data-testid="card-payee-list">
            <CardHeader>
              <CardTitle>Saved Payees</CardTitle>
              <CardDescription>Manage your saved payee list</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payees.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No payees saved yet
                  </p>
                ) : (
                  payees.map((payee) => (
                    <div
                      key={payee.id}
                      className="flex items-center justify-between p-4 border rounded-md hover-elevate"
                      data-testid={`payee-item-${payee.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {payee.nickname || payee.name}
                            {payee.nickname && (
                              <span className="text-xs text-muted-foreground ml-2">({payee.name})</span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            BSB: {payee.bsb} | Acc: {payee.accountNumber}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(payee.id)}
                        disabled={deletePayeeMutation.isPending}
                        data-testid={`button-delete-payee-${payee.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
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
