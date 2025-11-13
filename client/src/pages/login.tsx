import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";
import { Lock, ChevronRight, HelpCircle, FileText, Shield } from "lucide-react";

const loginSchema = z.object({
  customerId: z.string().min(1, "Please enter your Customer ID"),
  password: z.string().min(1, "Please enter your password"),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      customerId: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginForm) => apiRequest("POST", "/api/auth/login", { customerId: data.customerId, password: data.password }),
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const onSubmit = (data: LoginForm) => {
    setIsLoading(true);
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-[#DA1710] text-white py-2.5 border-b border-[#B01410]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img src={logoImage} alt="Westpac" className="h-7" data-testid="img-logo" />
              <nav className="hidden md:flex gap-5 text-sm">
                <a href="/" className="hover:underline">Home</a>
                <a href="/" className="hover:underline">Personal</a>
                <a href="/" className="hover:underline">Business</a>
                <a href="/" className="hover:underline">Corporate</a>
                <a href="/" className="hover:underline">About us</a>
              </nav>
            </div>
            <a href="/" className="text-white hover:underline text-sm" data-testid="link-back-home">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 dark:bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-8" data-testid="text-page-title">
            Sign in to Westpac Online Banking
          </h1>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="bg-card rounded-md border p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Customer ID</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder=""
                            disabled={isLoading}
                            data-testid="input-customer-id"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder=""
                            disabled={isLoading}
                            data-testid="input-password"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-remember-me"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Remember customer ID
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#DA1710] hover:bg-[#B01410] h-11 text-base font-medium"
                    disabled={isLoading}
                    data-testid="button-login"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 space-y-3">
                <a href="#" className="text-sm text-[#DA1710] hover:underline block" data-testid="link-forgot-id">
                  Forgot customer ID or password?
                </a>
                <a href="#" className="text-sm text-[#DA1710] hover:underline block" data-testid="link-learn-safe">
                  Learn more about staying safe
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-md border p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Lock className="h-6 w-6 text-[#DA1710] flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-base mb-1">Security reminder</h2>
                    <p className="text-sm font-medium">Westpac Protect™</p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex gap-2">
                    <span className="text-[#DA1710] flex-shrink-0">•</span>
                    <span>Don't sign in if you are sharing access to your computer</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#DA1710] flex-shrink-0">•</span>
                    <span>Never share your security codes or passwords with anyone</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#DA1710] flex-shrink-0">•</span>
                    <span>Call us on 132 032 if you are being asked to do this</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#DA1710] text-white rounded-md p-6">
                <h2 className="font-semibold text-base mb-4">Need help?</h2>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between hover:underline group" data-testid="link-register">
                    <span className="text-sm">Register for Online Banking</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-between hover:underline group" data-testid="link-help">
                    <span className="text-sm">Online Help</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-between hover:underline group" data-testid="link-whats-new">
                    <span className="text-sm">What's new</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-between hover:underline group" data-testid="link-features">
                    <span className="text-sm">Online Banking features</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <a href="#" className="flex items-center gap-2 text-sm text-[#DA1710] hover:underline">
                  <HelpCircle className="h-4 w-4" />
                  <span>Register for Online Banking</span>
                </a>
              </div>
              <div>
                <a href="#" className="flex items-center gap-2 text-sm text-[#DA1710] hover:underline">
                  <FileText className="h-4 w-4" />
                  <span>Online Banking Help</span>
                </a>
              </div>
              <div>
                <a href="#" className="flex items-center gap-2 text-sm text-[#DA1710] hover:underline">
                  <Shield className="h-4 w-4" />
                  <span>Online security</span>
                </a>
              </div>
              <div>
                <a href="#" className="flex items-center gap-2 text-sm text-[#DA1710] hover:underline">
                  <ChevronRight className="h-4 w-4" />
                  <span>What's new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
