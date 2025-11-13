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
    await apiRequest("POST", "/api/auth/logout", {});
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <header className="bg-[#DA1710] text-white sticky top-0 z-50 shadow-md">
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
          {cards.map((card: any) => {
            const isVisa = card.cardType.toLowerCase().includes('visa');
            const isMastercard = card.cardType.toLowerCase().includes('mastercard');
            
            return (
              <div key={card.id} data-testid={`card-${card.cardType.toLowerCase().replace(' ', '-')}`}>
                <div 
                  className="relative overflow-hidden rounded-2xl p-8 shadow-2xl"
                  style={{
                    aspectRatio: '1.586',
                    maxWidth: '450px',
                    background: isVisa 
                      ? 'linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #42A5F5 100%)'
                      : isMastercard
                      ? 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)'
                      : 'linear-gradient(135deg, #DA1710 0%, #E63946 50%, #F77F00 100%)',
                    color: '#ffffff'
                  }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24" />
                  
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-11 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 rounded-lg shadow-lg relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-lg"></div>
                          <div className="absolute inset-1 border border-amber-600/30 rounded"></div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                          card.status === 'Active' 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-400 text-white'
                        }`} data-testid={`status-${card.id}`}>
                          {card.status}
                        </div>
                      </div>
                      <div className="text-right">
                        {isVisa && (
                          <div className="text-4xl font-bold tracking-wider italic drop-shadow-lg" style={{ color: '#ffffff' }}>VISA</div>
                        )}
                        {isMastercard && (
                          <div className="flex items-center">
                            <div className="w-11 h-11 rounded-full shadow-lg" style={{ backgroundColor: '#EB001B' }}></div>
                            <div className="w-11 h-11 rounded-full shadow-lg -ml-5" style={{ backgroundColor: '#FF5F00' }}></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6 mt-8">
                      <div>
                        <p className="text-3xl font-mono font-bold tracking-[0.3em] drop-shadow-lg" style={{ color: '#ffffff' }} data-testid={`card-number-${card.id}`}>
                          {card.cardNumber}
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <div className="flex-1">
                          <p className="text-xs uppercase mb-1.5 tracking-wide font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>Cardholder</p>
                          <p className="text-lg font-bold tracking-wide uppercase" style={{ color: '#ffffff' }} data-testid={`cardholder-${card.id}`}>
                            {card.cardholderName}
                          </p>
                        </div>
                        <div className="flex gap-6">
                          <div>
                            <p className="text-xs uppercase mb-1.5 tracking-wide font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>Expires</p>
                            <p className="text-lg font-bold" style={{ color: '#ffffff' }} data-testid={`expiry-${card.id}`}>
                              {card.expiryMonth}/{card.expiryYear.slice(-2)}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <p className="text-xs uppercase tracking-wide font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>CVV</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleCVV(card.id)}
                                className="h-5 w-5 p-0 hover:bg-white/20"
                                style={{ color: 'rgba(255,255,255,0.9)' }}
                                data-testid={`button-toggle-cvv-${card.id}`}
                              >
                                {showCVV[card.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                              </Button>
                            </div>
                            <p className="text-lg font-mono font-bold" style={{ color: '#ffffff' }} data-testid={`cvv-${card.id}`}>
                              {showCVV[card.id] ? card.cvv : '•••'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-card rounded-md border p-4">
                  <p className="text-xs text-muted-foreground mb-1">Linked Account</p>
                  <p className="font-medium text-sm" data-testid={`linked-account-${card.id}`}>
                    {card.account.accountName} - {card.account.accountNumber}
                  </p>
                </div>
              </div>
            );
          })}
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
