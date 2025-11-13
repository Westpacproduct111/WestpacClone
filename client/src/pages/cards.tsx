import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, CreditCard, Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function Cards() {
  const [, setLocation] = useLocation();
  const [showCVV, setShowCVV] = useState<Record<string, boolean>>({});

  const { data: cardsData, isLoading } = useQuery<{cards: any[]}>({
    queryKey: ["/api/cards"],
  });

  const handleLogout = async () => {
    await apiRequest("/api/auth/logout", "POST", {});
    setLocation("/login");
  };

  const toggleCVV = (cardId: string) => {
    setShowCVV(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA1710] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your cards...</p>
        </div>
      </div>
    );
  }

  const cards = cardsData?.cards || [];

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
                <a href="/cards" className="hover:underline font-medium" data-testid="link-cards">Cards</a>
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
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">Your Cards</h1>
          <p className="text-muted-foreground" data-testid="text-subtitle">Manage your debit cards and view details</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card: any) => (
            <Card 
              key={card.id} 
              className="relative overflow-hidden"
              data-testid={`card-${card.cardType.toLowerCase().replace(' ', '-')}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#DA1710]/10 to-transparent rounded-full -mr-16 -mt-16" />
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-[#DA1710]" />
                    <CardTitle className="text-xl">{card.cardType}</CardTitle>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    card.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`} data-testid={`status-${card.id}`}>
                    {card.status}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Card Number</p>
                  <p className="text-2xl font-mono font-semibold tracking-wider" data-testid={`card-number-${card.id}`}>
                    {card.cardNumber}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Cardholder Name</p>
                    <p className="font-semibold" data-testid={`cardholder-${card.id}`}>
                      {card.cardholderName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expiry Date</p>
                    <p className="font-semibold" data-testid={`expiry-${card.id}`}>
                      {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">CVV</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCVV(card.id)}
                      className="h-6 px-2"
                      data-testid={`button-toggle-cvv-${card.id}`}
                    >
                      {showCVV[card.id] ? (
                        <><EyeOff className="h-3 w-3 mr-1" /> Hide</>
                      ) : (
                        <><Eye className="h-3 w-3 mr-1" /> Show</>
                      )}
                    </Button>
                  </div>
                  <p className="font-mono font-semibold text-lg" data-testid={`cvv-${card.id}`}>
                    {showCVV[card.id] ? card.cvv : '•••'}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Linked Account</p>
                  <p className="font-medium" data-testid={`linked-account-${card.id}`}>
                    {card.account.accountName} - {card.account.accountNumber}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {cards.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No cards found</h3>
            <p className="text-muted-foreground">You don't have any cards yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
