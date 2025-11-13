import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronRight, MapPin, Globe, MessageSquare, HeartHandshake, Menu, Search, ChevronDown, Home as HomeIcon, CreditCard, PiggyBank, Car, Building2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";
import heroImage from "@assets/ruby-necklace.jpg";
import investPropertyImage from "@assets/generated_images/Investment_property_house_exterior_917d55c2.png";
import rentalYieldImage from "@assets/generated_images/Financial_calculation_rental_yield_e2a56491.png";
import businessFinanceImage from "@assets/generated_images/Business_finance_meeting_guide_61c0e275.png";
import businessBankingImage from "@assets/generated_images/Business_banking_startup_workspace_159b163f.png";
import weaveImage from "@assets/generated_images/Indigenous_weave_pattern_banner_599100b2.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Red Banner */}
      <div className="bg-[#DA1710] text-white" data-testid="banner-top">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-end h-10 gap-4 text-xs font-medium" data-testid="nav-utility">
            <a href="#" className="hover:underline" data-testid="link-contact-us">
              Contact us
            </a>
            <span className="text-white/60">|</span>
            <a href="#" className="hover:underline" data-testid="link-locate-us">
              Locate us
            </a>
            <span className="text-white/60">|</span>
            <a href="#" className="hover:underline" data-testid="link-lost-stolen">
              Lost or stolen cards
            </a>
            <span className="text-white/60">|</span>
            <a href="#" className="hover:underline" data-testid="link-register">
              Register
            </a>
          </nav>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-4 border-[#DA1710] sticky top-0 z-50" data-testid="header-main">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src={logoImage} alt="Westpac" className="h-8" data-testid="img-logo" />
            </div>

            {/* Main Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-normal" data-testid="nav-main">
              <a 
                href="#" 
                className="text-foreground hover:text-[#DA1710] px-2" 
                data-testid="link-nav-home"
              >
                Home
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="#" 
                className="text-foreground hover:text-[#DA1710] px-2" 
                data-testid="link-nav-personal"
              >
                Personal
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="#" 
                className="text-foreground hover:text-[#DA1710] px-2" 
                data-testid="link-nav-business"
              >
                Business
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="#" 
                className="text-foreground hover:text-[#DA1710] px-2" 
                data-testid="link-nav-corporate"
              >
                Corporate
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="#" 
                className="text-foreground hover:text-[#DA1710] px-2" 
                data-testid="link-nav-about"
              >
                About us
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="#" 
                className="text-foreground hover:text-[#DA1710] px-2" 
                data-testid="link-nav-help"
              >
                Help
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Online Banking Dropdown - Desktop */}
              <Button
                variant="ghost"
                className="hidden lg:flex items-center gap-1 text-xs font-normal"
                data-testid="button-online-banking"
              >
                Online Banking - Personal
                <ChevronDown className="h-3 w-3" />
              </Button>

              {/* Sign In Button */}
              <Button 
                size="sm"
                className="bg-[#DA1710] hover:bg-[#C01309] text-white hidden sm:flex text-xs font-medium" 
                data-testid="button-signin"
              >
                Sign in
              </Button>

              {/* Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-8 w-8"
                data-testid="button-search"
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden border-t border-border py-4 space-y-2" data-testid="nav-mobile-menu">
              <a href="#" className="block py-2 text-foreground hover:text-[#DA1710]" data-testid="link-mobile-home">
                Home
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-[#DA1710]" data-testid="link-mobile-personal">
                Personal
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-[#DA1710]" data-testid="link-mobile-business">
                Business
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-[#DA1710]" data-testid="link-mobile-corporate">
                Corporate
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-[#DA1710]" data-testid="link-mobile-about">
                About us
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-[#DA1710]" data-testid="link-mobile-help">
                Help
              </a>
              <Button className="w-full bg-[#DA1710] hover:bg-[#C01309] text-white mt-4" data-testid="button-mobile-signin">
                Sign in to Mobile Banking
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative bg-[#7A1810]" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Ruby necklace on textured background" 
            className="w-full h-full object-cover mix-blend-overlay opacity-70" 
            data-testid="img-hero-background"
          />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight uppercase" data-testid="text-hero-headline">
              50 BUCKS FEELING LUXE
            </h1>
            <p className="text-base sm:text-lg mb-6 text-white/95 leading-relaxed" data-testid="text-hero-description">
              Get $50 cashback when you open a Westpac Choice account and spend $50 using your mobile wallet. T&Cs, eligibility, fees and charges apply.
            </p>
            <Button 
              size="lg"
              className="bg-[#DA1710] text-white hover:bg-[#C01309] font-semibold px-8" 
              data-testid="button-hero-cta"
            >
              Find out more
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* IT TAKES A LITTLE Section */}
      <section className="bg-white py-12 border-b border-border" data-testid="section-branding">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#2C2C2C] tracking-wide" data-testid="text-tagline">
              IT TAKES A LITTLE
            </h2>
            <div className="w-12 h-12 lg:w-16 lg:h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,0 100,50 50,100 0,50" fill="#DA1710"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Six Column Product Showcase */}
      <section className="bg-white py-12 lg:py-16 border-b border-border" data-testid="section-products-showcase">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Home Loans */}
            <div className="text-left" data-testid="card-product-home-loans">
              <div className="mb-4 flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mr-4">
                  <HomeIcon className="w-6 h-6 text-[#DA1710]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground" data-testid="text-product-home-title">
                    Home loans
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-compare-loans">
                        Compare loans and rates
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-repayment-calc">
                        Repayment calculator
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-invest-property">
                        Invest in property
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bank Accounts */}
            <div className="text-left" data-testid="card-product-bank-accounts">
              <div className="mb-4 flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mr-4">
                  <PiggyBank className="w-6 h-6 text-[#DA1710]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground" data-testid="text-product-bank-title">
                    Bank accounts
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-transaction-accounts">
                        Transaction accounts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-savings-accounts">
                        Savings accounts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-term-deposit">
                        Term deposit
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Credit Cards */}
            <div className="text-left" data-testid="card-product-credit-cards">
              <div className="mb-4 flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mr-4">
                  <CreditCard className="w-6 h-6 text-[#DA1710]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground" data-testid="text-product-credit-title">
                    Credit cards
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-rewards-cards">
                        Rewards credit cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-low-rate-cards">
                        Low rate credit cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-low-fee-card">
                        Low fee credit card
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Personal Loans */}
            <div className="text-left" data-testid="card-product-personal-loans">
              <div className="mb-4 flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mr-4">
                  <Car className="w-6 h-6 text-[#DA1710]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground" data-testid="text-product-personal-title">
                    Personal loans
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-debt-consolidation">
                        Debt Consolidation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-car-loan">
                        Car Loan
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-personal-calc">
                        Repayment Calculator
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business */}
            <div className="text-left" data-testid="card-product-business">
              <div className="mb-4 flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mr-4">
                  <Building2 className="w-6 h-6 text-[#DA1710]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground" data-testid="text-product-business-title">
                    Business
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-business-accounts">
                        Bank accounts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-business-loans">
                        Business loans
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-eftpos">
                        EFTPOS & eCommerce
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* More Options */}
            <div className="text-left" data-testid="card-product-more-options">
              <div className="mb-4 flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mr-4">
                  <MoreHorizontal className="w-6 h-6 text-[#DA1710]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground" data-testid="text-product-more-title">
                    More options
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-share-trading">
                        Share trading
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-insurance">
                        Insurance
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-foreground hover:underline" data-testid="link-international">
                        International & Travel
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Banking App Section */}
      <section className="bg-muted/30 py-16 lg:py-20" data-testid="section-banking-app">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Phone Mockup - Left Side */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                <div className="w-[280px] bg-[#4A3F6B] rounded-[40px] p-4 shadow-2xl">
                  <div className="bg-white rounded-[32px] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-3 bg-foreground/80 rounded-sm"></div>
                        <div className="w-4 h-3 bg-foreground/80 rounded-sm"></div>
                        <div className="w-4 h-3 bg-foreground/80 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">Cash flow</span>
                        <span className="text-xs text-[#DA1710]">Filter</span>
                      </div>
                      <div className="h-32 flex items-end gap-2">
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="h-16 bg-[#2C2C2C] rounded-sm"></div>
                          <div className="h-10 bg-[#DA1710] rounded-sm"></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="h-20 bg-[#2C2C2C] rounded-sm"></div>
                          <div className="h-8 bg-[#DA1710] rounded-sm"></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="h-24 bg-[#2C2C2C] rounded-sm"></div>
                          <div className="h-12 bg-[#DA1710] rounded-sm"></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="h-20 bg-[#2C2C2C] rounded-sm"></div>
                          <div className="h-10 bg-[#DA1710] rounded-sm"></div>
                        </div>
                      </div>
                      <div className="text-center pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-1">September 2024</p>
                        <p className="text-lg font-bold">$3,028.15</p>
                        <p className="text-xs text-muted-foreground">From eligible accounts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground" data-testid="text-banking-app-title">
                <span className="text-[#DA1710]">Best Banking App</span>
                <span className="text-[#DA1710]">*</span>, three years running
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground mb-6" data-testid="text-banking-app-description">
                Rest assured knowing the smart budgeting and savings tools on Australia's best banking app can help you get more from your dollars.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-[#DA1710] hover:bg-[#C01309] text-white font-semibold" 
                  data-testid="button-explore-app"
                >
                  Explore App budget tools
                </Button>
                <Button 
                  variant="outline" 
                  className="font-semibold border-2" 
                  data-testid="button-get-app"
                >
                  Get the Westpac App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Sketchy to Secure Section */}
      <section className="bg-white py-16 lg:py-20" data-testid="section-security">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2" data-testid="text-security-title">
              From sketchy to secure
            </h2>
            <p className="text-2xl lg:text-3xl text-[#DA1710] font-bold" data-testid="text-security-subtitle">
              with layers and layers of defence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
            {/* Westpac Verify */}
            <div className="text-center" data-testid="card-security-verify">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FFE5E5] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-4 border-[#DA1710] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#DA1710]"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground" data-testid="text-verify-title">
                <span className="font-bold">Westpac Verify</span> with Confirmation of Payee checks the BSB and account details of new payees and alerts you to potential scams or incorrect information.
              </h3>
            </div>

            {/* Digital Card */}
            <div className="text-center" data-testid="card-security-digital">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FFE5E5] flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-[#DA1710]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground" data-testid="text-digital-title">
                Access a <span className="font-bold">digital version of your card</span> through the Westpac App. The dynamic CVC changes every 24 hours - making your card details even more secure.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column - Product Sections */}
          <div className="lg:col-span-3 space-y-12">
            {/* Personal Banking Section */}
            <section data-testid="section-personal">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-foreground" data-testid="text-heading-personal">
                Personal
              </h2>
              <nav className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3" data-testid="nav-personal-products">
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-bank-accounts">
                  Bank accounts
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-home-loans">
                  Home loans
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-credit-cards">
                  Credit cards
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-personal-loans">
                  Personal loans
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-share-trading">
                  Share Trading
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-investments">
                  Investments
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-insurance">
                  Insurance
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-international-travel">
                  International &amp; Travel
                </a>
                <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-superannuation">
                  Superannuation
                </a>
              </nav>
            </section>

            {/* Latest Articles Section */}
            <section data-testid="section-articles">
              <header className="flex items-center justify-between mb-6" data-testid="header-articles">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground" data-testid="text-heading-articles">
                  Latest articles for you
                </h2>
              </header>
              <div className="grid sm:grid-cols-2 gap-6" data-testid="grid-articles">
                {/* Article 1 */}
                <Card className="overflow-hidden hover-elevate" data-testid="card-article-1">
                  <a href="#" className="block" data-testid="link-article-1">
                    <img 
                      src={investPropertyImage} 
                      alt="Investment property strategies" 
                      className="w-full h-48 object-cover" 
                      data-testid="img-article-1"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-article-1-title">
                        Investment property strategies
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid="text-article-1-description">
                        Tips to invest smarter.
                      </p>
                    </div>
                  </a>
                </Card>

                {/* Article 2 */}
                <Card className="overflow-hidden hover-elevate" data-testid="card-article-2">
                  <a href="#" className="block" data-testid="link-article-2">
                    <img 
                      src={rentalYieldImage} 
                      alt="Calculating rental yield" 
                      className="w-full h-48 object-cover" 
                      data-testid="img-article-2"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-article-2-title">
                        Calculating rental yield
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid="text-article-2-description">
                        Learn if a property is worth investing in and how much you could earn.
                      </p>
                    </div>
                  </a>
                </Card>

                {/* Article 3 */}
                <Card className="p-5 hover-elevate" data-testid="card-article-3">
                  <a href="#" className="block" data-testid="link-article-3">
                    <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-article-3-title">
                      Home equity for investment
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid="text-article-3-description">
                      Explore how to use your home's equity to buy an investment property.
                    </p>
                  </a>
                </Card>

                {/* Article 4 */}
                <Card className="p-5 hover-elevate" data-testid="card-article-4">
                  <a href="#" className="block" data-testid="link-article-4">
                    <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-article-4-title">
                      Investment property costs
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid="text-article-4-description">
                      Get a clear view of the fees and expenses involved in property investment.
                    </p>
                  </a>
                </Card>
              </div>
              <div className="mt-6">
                <a href="#" className="text-[#DA1710] hover:underline font-medium inline-flex items-center" data-testid="link-more-articles">
                  More articles
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </section>

            {/* Business Banking Section */}
            <section className="bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-md" data-testid="section-business">
              <div className="max-w-[1200px] mx-auto">
                <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-foreground" data-testid="text-heading-business">
                  Business
                </h2>
                <nav className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-12" data-testid="nav-business-products">
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-business-bank-accounts">
                    Bank accounts
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-business-savings">
                    Savings accounts
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-business-credit-cards">
                    Credit cards
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-fx-international">
                    FX &amp; international
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-business-loans">
                    Business loans
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-eftpos">
                    EFTPOS &amp; eCommerce
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-business-super">
                    Superannuation
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-invoicing">
                    Invoicing
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-business-insurance">
                    Insurance for business
                  </a>
                  <a href="#" className="text-foreground hover:text-[#DA1710] hover:underline text-sm" data-testid="link-business-help">
                    Help for your business
                  </a>
                </nav>

                {/* Business Articles */}
                <div data-testid="container-business-help">
                  <header className="mb-6" data-testid="header-business-help">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground" data-testid="text-heading-business-help">
                      Help for your business
                    </h3>
                  </header>
                  <div className="grid sm:grid-cols-2 gap-6" data-testid="grid-business-articles">
                    {/* Business Article 1 */}
                    <Card className="overflow-hidden hover-elevate" data-testid="card-business-article-1">
                      <a href="#" className="block" data-testid="link-business-article-1">
                        <img 
                          src={businessFinanceImage} 
                          alt="A simple guide to business finance" 
                          className="w-full h-48 object-cover" 
                          data-testid="img-business-article-1"
                        />
                        <div className="p-5">
                          <h4 className="text-lg font-bold mb-2 text-foreground" data-testid="text-business-article-1-title">
                            A simple guide to business finance
                          </h4>
                          <p className="text-muted-foreground text-sm" data-testid="text-business-article-1-description">
                            Learn what's involved in getting a business loan and how to prepare if you're considering applying.
                          </p>
                        </div>
                      </a>
                    </Card>

                    {/* Business Article 2 */}
                    <Card className="overflow-hidden hover-elevate" data-testid="card-business-article-2">
                      <a href="#" className="block" data-testid="link-business-article-2">
                        <img 
                          src={businessBankingImage} 
                          alt="Business banking 101" 
                          className="w-full h-48 object-cover" 
                          data-testid="img-business-article-2"
                        />
                        <div className="p-5">
                          <h4 className="text-lg font-bold mb-2 text-foreground" data-testid="text-business-article-2-title">
                            Business banking 101
                          </h4>
                          <p className="text-muted-foreground text-sm" data-testid="text-business-article-2-description">
                            4 reasons to keep personal and business separate.
                          </p>
                        </div>
                      </a>
                    </Card>

                    {/* Business Article 3 */}
                    <Card className="p-5 hover-elevate" data-testid="card-business-article-3">
                      <a href="#" className="block" data-testid="link-business-article-3">
                        <h4 className="text-lg font-bold mb-2 text-foreground" data-testid="text-business-article-3-title">
                          International payments
                        </h4>
                        <p className="text-muted-foreground text-sm" data-testid="text-business-article-3-description">
                          What you need to receive money from overseas, including our SWIFT code.
                        </p>
                      </a>
                    </Card>

                    {/* Business Article 4 */}
                    <Card className="p-5 hover-elevate" data-testid="card-business-article-4">
                      <a href="#" className="block" data-testid="link-business-article-4">
                        <h4 className="text-lg font-bold mb-2 text-foreground" data-testid="text-business-article-4-title">
                          Industry insights
                        </h4>
                        <p className="text-muted-foreground text-sm" data-testid="text-business-article-4-description">
                          Explore resources designed to help you improve your business.
                        </p>
                      </a>
                    </Card>
                  </div>
                  <div className="mt-6">
                    <a href="#" className="text-[#DA1710] hover:underline font-medium inline-flex items-center" data-testid="link-more-business-help">
                      More help for your business
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Widgets */}
          <aside className="lg:col-span-1 space-y-6" data-testid="sidebar-widgets">
            {/* Branches & ATMs Widget */}
            <Card className="p-5" data-testid="card-branches-atms">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-foreground" data-testid="text-widget-branches">
                <MapPin className="h-5 w-5 text-[#DA1710]" />
                Branches &amp; ATMs
              </h3>
              <div className="space-y-3">
                <Input 
                  type="search" 
                  placeholder="Suburb / postcode" 
                  className="w-full" 
                  data-testid="input-branch-search"
                />
                <Button 
                  className="w-full bg-[#DA1710] hover:bg-[#C01309] text-white" 
                  data-testid="button-find-branch"
                >
                  Search
                </Button>
              </div>
            </Card>

            {/* Overseas ATMs Widget */}
            <Card className="p-5" data-testid="card-overseas-atms">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-foreground" data-testid="text-widget-overseas">
                <Globe className="h-5 w-5 text-[#DA1710]" />
                Overseas ATMs
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-overseas-description">
                Use the{" "}
                <a href="#" className="text-[#DA1710] hover:underline font-medium" data-testid="link-global-atm-finder">
                  Global ATM finder
                </a>
                {" "}to search our Global ATM Alliance network.
              </p>
            </Card>

            {/* Have Your Say Widget */}
            <Card className="p-5" data-testid="card-feedback">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-foreground" data-testid="text-widget-feedback">
                <MessageSquare className="h-5 w-5 text-[#DA1710]" />
                Have your say
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-feedback-description">
                We welcome your feedback whether it's a compliment, suggestion or a complaint.{" "}
                <a href="#" className="text-[#DA1710] hover:underline font-medium" data-testid="link-feedback">
                  Find out more
                </a>
                .
              </p>
            </Card>

            {/* Westpac Assist Widget */}
            <Card className="p-5" data-testid="card-assist">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-foreground" data-testid="text-widget-assist">
                <HeartHandshake className="h-5 w-5 text-[#DA1710]" />
                Westpac Assist
              </h3>
              <p className="text-sm text-muted-foreground mb-1" data-testid="text-assist-question">
                Experiencing financial hardship?
              </p>
              <a href="#" className="text-[#DA1710] hover:underline text-sm font-medium block" data-testid="link-assist">
                We are here to help
              </a>
            </Card>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border mt-16" data-testid="footer-main">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-start gap-8">
            <div className="flex-shrink-0">
              <img 
                src={weaveImage} 
                alt="Indigenous weave pattern" 
                className="h-24 lg:h-28 w-auto" 
                data-testid="img-footer-weave"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl" data-testid="text-acknowledgment">
                Westpac acknowledges the Traditional Owners as the custodians of this land, recognising their connection to land, waters and community. We pay our respects to Australia's First Peoples, and to their Elders past and present.{" "}
                <a href="#" className="text-[#DA1710] hover:underline font-medium" data-testid="link-indigenous-hub">
                  View our Indigenous Hub
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
