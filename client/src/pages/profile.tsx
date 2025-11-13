import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, User, MapPin, Phone } from "lucide-react";
import { useLocation } from "wouter";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data: userData, isLoading } = useQuery<{user: any}>({
    queryKey: ["/api/auth/me"],
    onSuccess: (data) => {
      if (data?.user?.phoneNumber) {
        setPhoneNumber(data.user.phoneNumber);
      }
    },
  });

  const updatePhoneMutation = useMutation({
    mutationFn: (phone: string) => apiRequest("/api/profile/phone", "PATCH", { phoneNumber: phone }),
    onSuccess: () => {
      toast({
        title: "Phone number updated",
        description: "Your phone number has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update phone number.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = async () => {
    await apiRequest("/api/auth/logout", "POST", {});
    setLocation("/login");
  };

  const handleSavePhone = () => {
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number (at least 10 digits).",
        variant: "destructive",
      });
      return;
    }
    updatePhoneMutation.mutate(phoneNumber);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA1710] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const user = userData?.user;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#DA1710] text-white sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src={logoImage} alt="Westpac" className="h-8" data-testid="img-logo" />
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/dashboard" className="hover:underline" data-testid="link-dashboard">Dashboard</a>
                <a href="/accounts" className="hover:underline" data-testid="link-accounts">Accounts</a>
                <a href="/cards" className="hover:underline" data-testid="link-cards">Cards</a>
                <a href="/profile" className="hover:underline font-medium" data-testid="link-profile">Profile</a>
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
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">Your Profile</h1>
          <p className="text-muted-foreground" data-testid="text-subtitle">View and manage your personal information</p>
        </div>

        <div className="grid gap-6 max-w-2xl">
          <Card data-testid="card-personal-info">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#DA1710]" />
                <CardTitle>Personal Information</CardTitle>
              </div>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                <p className="font-semibold text-lg" data-testid="text-full-name">{user?.fullName}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                <p className="font-semibold" data-testid="text-email">{user?.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-address">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#DA1710]" />
                <CardTitle>Address</CardTitle>
              </div>
              <CardDescription>Your registered address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-semibold" data-testid="text-address">{user?.address}</p>
                <p className="text-muted-foreground" data-testid="text-suburb">
                  {user?.suburb}, {user?.state} {user?.postcode}
                </p>
                <p className="text-muted-foreground" data-testid="text-country">{user?.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-phone">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#DA1710]" />
                <CardTitle>Contact Number</CardTitle>
              </div>
              <CardDescription>Update your phone number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    disabled={!isEditing}
                    data-testid="input-phone"
                    className="flex-1"
                  />
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      data-testid="button-edit-phone"
                    >
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSavePhone}
                        disabled={updatePhoneMutation.isPending}
                        className="bg-[#DA1710] hover:bg-[#B01410]"
                        data-testid="button-save-phone"
                      >
                        {updatePhoneMutation.isPending ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          setPhoneNumber(user?.phoneNumber || "");
                        }}
                        variant="ghost"
                        data-testid="button-cancel-phone"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
                {!user?.phoneNumber && !isEditing && (
                  <p className="text-sm text-muted-foreground">
                    No phone number on file. Click Edit to add one.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
