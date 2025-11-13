import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronRight, MapPin, Globe, MessageSquare, HeartHandshake, Menu, Search, ChevronDown, Home as HomeIcon, CreditCard, PiggyBank, Car, Building2, MoreHorizontal, Phone, Umbrella } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/generated_images/Westpac_red_W_logo_4eaff681.png";
import heroImage from "@assets/ruby-necklace.jpg";
import investPropertyImage from "@assets/investment-property-strategies.jpg";
import rentalYieldImage from "@assets/calculating-rental-yield.jpg";
import homeEquityImage from "@assets/home-equity-investment.jpg";
import propertyCostsImage from "@assets/investment-property-costs.jpg";
import businessFinanceImage from "@assets/generated_images/Business_finance_meeting_guide_61c0e275.png";
import businessBankingImage from "@assets/generated_images/Business_banking_startup_workspace_159b163f.png";
import weaveImage from "@assets/generated_images/Indigenous_weave_pattern_banner_599100b2.png";
import appImage from "@assets/westpac_app.jpg";

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
              asChild
            >
              <a href="https://www.westpac.com.au/personal-banking/bank-accounts/transaction/choice/?fid=hp:card-4:tran:wbc:www:pers:bank-accounts:transaction:choice" target="_blank" rel="noopener noreferrer">
                Find out more
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
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
                      <a href="https://www.westpac.com.au/personal-banking/home-loans/all-interest-rates/?fid=HP:product:hl:subhead:wbc:www:pers:home-loans:all-interest-rates" className="text-sm text-foreground hover:underline" data-testid="link-compare-loans">
                        Compare loans and rates
                      </a>
                    </li>
                    <li>
                      <a href="https://www.westpac.com.au/personal-banking/home-loans/calculator/mortgage-repayment/?fid=HP:product:hl:subhead:wbc:www:pers:home-loans:calculator:mortgage-repayment" className="text-sm text-foreground hover:underline" data-testid="link-repayment-calc">
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
                <img 
                  src={appImage} 
                  alt="Westpac mobile banking app showing cash flow features" 
                  className="w-full max-w-md h-auto rounded-md shadow-2xl"
                  data-testid="img-banking-app"
                />
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

      {/* Start the property investment conversation with confidence */}
      <section className="bg-muted/30 py-16 lg:py-20" data-testid="section-property-investment">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-foreground" data-testid="text-property-investment-title">
              Start the property investment conversation
            </h2>
            <p className="text-2xl lg:text-3xl text-[#DA1710] font-bold" data-testid="text-property-investment-subtitle">
              with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Article 1 */}
            <Card className="overflow-hidden hover-elevate" data-testid="card-investment-1">
              <a href="#" className="block" data-testid="link-investment-1">
                <img 
                  src={investPropertyImage} 
                  alt="Investment property strategies" 
                  className="w-full h-48 object-cover" 
                  data-testid="img-investment-1"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-investment-1-title">
                    Investment property strategies
                  </h3>
                  <p className="text-muted-foreground text-sm" data-testid="text-investment-1-description">
                    Tips that could help you make the most of potential profits.
                  </p>
                </div>
              </a>
            </Card>

            {/* Article 2 */}
            <Card className="overflow-hidden hover-elevate" data-testid="card-investment-2">
              <a href="#" className="block" data-testid="link-investment-2">
                <img 
                  src={rentalYieldImage} 
                  alt="Calculating rental yield" 
                  className="w-full h-48 object-cover" 
                  data-testid="img-investment-2"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-investment-2-title">
                    Calculating rental yield
                  </h3>
                  <p className="text-muted-foreground text-sm" data-testid="text-investment-2-description">
                    Learn if a property is worth investing in and how much you could earn.
                  </p>
                </div>
              </a>
            </Card>

            {/* Article 3 */}
            <Card className="overflow-hidden hover-elevate" data-testid="card-investment-3">
              <a href="#" className="block" data-testid="link-investment-3">
                <img 
                  src={homeEquityImage} 
                  alt="Home equity for investment" 
                  className="w-full h-48 object-cover" 
                  data-testid="img-investment-3"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-investment-3-title">
                    Home equity for investment
                  </h3>
                  <p className="text-muted-foreground text-sm" data-testid="text-investment-3-description">
                    Explore how to use your home's equity to buy an investment property.
                  </p>
                </div>
              </a>
            </Card>

            {/* Article 4 */}
            <Card className="overflow-hidden hover-elevate" data-testid="card-investment-4">
              <a href="#" className="block" data-testid="link-investment-4">
                <img 
                  src={propertyCostsImage} 
                  alt="Investment property costs" 
                  className="w-full h-48 object-cover" 
                  data-testid="img-investment-4"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-foreground" data-testid="text-investment-4-title">
                    Investment property costs
                  </h3>
                  <p className="text-muted-foreground text-sm" data-testid="text-investment-4-description">
                    Get a clear view of the fees and expenses involved in property investment.
                  </p>
                </div>
              </a>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              className="font-semibold border-2" 
              data-testid="button-investment-journey"
            >
              Start your investment journey
            </Button>
          </div>
        </div>
      </section>

      {/* We're Here to Help You Section */}
      <section className="bg-background py-16 lg:py-20" data-testid="section-help">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-[#9B1D6F]" data-testid="text-heading-help">
            We're here to help you
          </h2>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Online Banking Help */}
            <Card className="p-8 bg-muted/30" data-testid="card-online-banking-help">
              <h3 className="text-xl lg:text-2xl font-black mb-6 uppercase text-[#2C2C2C]" data-testid="text-heading-online-help">
                Online Banking Help
              </h3>
              <nav className="space-y-4" data-testid="nav-online-help">
                <a href="#" className="flex items-center justify-between group text-foreground hover:text-[#DA1710]" data-testid="link-register-online">
                  <span className="text-sm">Register for Online Banking</span>
                  <ChevronRight className="h-4 w-4 text-[#DA1710]" />
                </a>
                <a href="#" className="flex items-center justify-between group text-foreground hover:text-[#DA1710]" data-testid="link-reset-password">
                  <span className="text-sm">Reset your password</span>
                  <ChevronRight className="h-4 w-4 text-[#DA1710]" />
                </a>
                <a href="#" className="flex items-center justify-between group text-foreground hover:text-[#DA1710]" data-testid="link-activate-card">
                  <span className="text-sm">Activate your card</span>
                  <ChevronRight className="h-4 w-4 text-[#DA1710]" />
                </a>
                <a href="#" className="flex items-center justify-between group text-foreground hover:text-[#DA1710]" data-testid="link-security-hub">
                  <span className="text-sm">Stay safe online with Security Hub</span>
                  <ChevronRight className="h-4 w-4 text-[#DA1710]" />
                </a>
                <a href="#" className="flex items-center justify-between group text-foreground hover:text-[#DA1710]" data-testid="link-help-faqs">
                  <span className="text-sm">Online Banking help and FAQs</span>
                  <ChevronRight className="h-4 w-4 text-[#DA1710]" />
                </a>
              </nav>
            </Card>

            {/* Contact Through App */}
            <Card className="p-8 bg-[#E8D5F0] relative overflow-hidden" data-testid="card-contact-app">
              <div className="relative z-10">
                <h3 className="text-xl lg:text-2xl font-black mb-4 uppercase text-[#2C2C2C]" data-testid="text-heading-contact-app">
                  Contact us through the Westpac app
                </h3>
                <p className="text-sm text-foreground mb-6" data-testid="text-app-description">
                  Sign into the app, skip the automated questions and get through to the right person, fast.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a href="#" className="inline-block" data-testid="link-google-play">
                    <div className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
                      <span className="text-xs font-semibold">GET IT ON Google Play</span>
                    </div>
                  </a>
                  <a href="#" className="inline-block" data-testid="link-app-store">
                    <div className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
                      <span className="text-xs font-semibold">Download on the App Store</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 lg:w-56 lg:h-56">
                <img 
                  src="https://www.westpac.com.au/content/dam/public/wbc/images/home/exp/wbc_hp_mobile_banking_app_max_706x630.webp" 
                  alt="Westpac mobile banking app" 
                  className="w-full h-full object-contain"
                  data-testid="img-mobile-app"
                />
              </div>
            </Card>
          </div>

          {/* Three Support Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Talk to Us */}
            <Card className="p-8 text-center" data-testid="card-talk-to-us">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE5F5] flex items-center justify-center">
                  <Phone className="h-6 w-6 text-[#9B1D6F]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-4 text-foreground" data-testid="text-talk-to-us">
                Talk to us
              </h3>
              <Button 
                variant="outline" 
                className="border-2" 
                data-testid="button-contact-us"
              >
                Contact us
              </Button>
            </Card>

            {/* Find Your Local Branch */}
            <Card className="p-8 text-center" data-testid="card-find-branch">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE5F5] flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-[#9B1D6F]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-4 text-foreground" data-testid="text-find-branch">
                Find your local branch
              </h3>
              <Button 
                variant="outline" 
                className="border-2" 
                data-testid="button-find-branch-help"
              >
                Find a branch
              </Button>
            </Card>

            {/* Financial Hardship Support */}
            <Card className="p-8 text-center" data-testid="card-hardship">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE5F5] flex items-center justify-center">
                  <Umbrella className="h-6 w-6 text-[#9B1D6F]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-4 text-foreground" data-testid="text-hardship">
                Financial hardship support
              </h3>
              <Button 
                variant="outline" 
                className="border-2" 
                data-testid="button-hardship"
              >
                Find out more
              </Button>
            </Card>
          </div>

          {/* IT TAKES A LITTLE Banner */}
          <div className="relative rounded-lg overflow-hidden" data-testid="banner-cloud">
            <div className="bg-gradient-to-r from-[#4A90C8] to-[#87CEEB] py-16 px-8 relative">
              <div className="flex items-center justify-between">
                <div className="text-white text-6xl lg:text-7xl font-black tracking-wider" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                  W
                </div>
                <div className="flex-1 text-center">
                  <h2 className="text-white text-3xl lg:text-4xl font-black tracking-wide" data-testid="text-cloud-tagline">
                    IT TAKES A LITTLE
                  </h2>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-16 bg-[#DA1710] transform -skew-x-12"></div>
                  <div className="w-8 h-16 bg-[#DA1710] transform -skew-x-12"></div>
                  <div className="w-8 h-16 bg-[#DA1710] transform -skew-x-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Have Your Say Widget */}
          <Card className="p-6 bg-muted/30" data-testid="card-feedback">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground" data-testid="text-widget-feedback">
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
          <Card className="p-6 bg-muted/30" data-testid="card-assist">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground" data-testid="text-widget-assist">
              <HeartHandshake className="h-5 w-5 text-[#DA1710]" />
              Westpac Assist
            </h3>
            <p className="text-sm text-muted-foreground mb-2" data-testid="text-assist-question">
              Experiencing financial hardship?
            </p>
            <a href="#" className="text-[#DA1710] hover:underline text-sm font-medium block" data-testid="link-assist">
              We are here to help
            </a>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white" data-testid="footer-main">
        {/* Footer Links */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <nav className="space-y-2">
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-complaints">
                  <ChevronRight className="h-3 w-3" />
                  Complaints and compliments
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-contact">
                  <ChevronRight className="h-3 w-3" />
                  Contact us
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-careers">
                  <ChevronRight className="h-3 w-3" />
                  Careers
                </a>
              </nav>
            </div>
            <div>
              <nav className="space-y-2">
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-access">
                  <ChevronRight className="h-3 w-3" />
                  Access and Inclusion
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-investor">
                  <ChevronRight className="h-3 w-3" />
                  Investor centre
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-westpac-group">
                  <ChevronRight className="h-3 w-3" />
                  Westpac Group
                </a>
              </nav>
            </div>
            <div>
              <nav className="space-y-2">
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-security">
                  <ChevronRight className="h-3 w-3" />
                  Security
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-faqs">
                  <ChevronRight className="h-3 w-3" />
                  FAQs
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-privacy">
                  <ChevronRight className="h-3 w-3" />
                  Privacy
                </a>
              </nav>
            </div>
            <div>
              <nav className="space-y-2">
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-website-terms">
                  <ChevronRight className="h-3 w-3" />
                  Website terms and conditions
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-terms">
                  <ChevronRight className="h-3 w-3" />
                  Terms and conditions
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-site-index">
                  <ChevronRight className="h-3 w-3" />
                  Site index
                </a>
                <a href="#" className="text-sm text-foreground hover:text-[#DA1710] flex items-center gap-1" data-testid="link-slavery">
                  <ChevronRight className="h-3 w-3" />
                  Modern Slavery Statement
                </a>
              </nav>
            </div>
          </div>

          {/* Social Icons and Logo */}
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="flex gap-3">
              <a href="#" className="text-[#3b5998] hover:opacity-80" data-testid="link-facebook">
                <div className="w-8 h-8 bg-[#3b5998] rounded flex items-center justify-center text-white font-bold text-xs">f</div>
              </a>
              <a href="#" className="text-[#000000] hover:opacity-80" data-testid="link-x">
                <div className="w-8 h-8 bg-[#000000] rounded flex items-center justify-center text-white font-bold text-xs">X</div>
              </a>
              <a href="#" className="text-[#ff0000] hover:opacity-80" data-testid="link-youtube">
                <div className="w-8 h-8 bg-[#ff0000] rounded flex items-center justify-center text-white font-bold text-xs">▶</div>
              </a>
              <a href="#" className="text-[#0077b5] hover:opacity-80" data-testid="link-linkedin">
                <div className="w-8 h-8 bg-[#0077b5] rounded flex items-center justify-center text-white font-bold text-xs">in</div>
              </a>
              <a href="#" className="text-[#e4405f] hover:opacity-80" data-testid="link-instagram">
                <div className="w-8 h-8 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded flex items-center justify-center text-white font-bold text-xs">📷</div>
              </a>
            </div>
            <div>
              <img src={logoImage} alt="Westpac" className="h-8" data-testid="img-footer-logo" />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed" data-testid="text-disclaimer">
              For Westpac-issued products, conditions, fees and charges apply. These may change or we may introduce new ones in the future. Full details are available on request. Lending criteria apply to approval of credit products. This information does not take your personal objectives, circumstances or needs into account. Consider its appropriateness to these factors before acting on it. Read the disclosure documents for your selected product or service, including the{" "}
              <a href="#" className="text-[#DA1710] hover:underline">Terms and Conditions</a>, before deciding.{" "}
              <a href="#" className="text-[#DA1710] hover:underline">Target Market Determinations</a> for the products are available. Unless otherwise specified, the products and services described on this website are available only in Australia from © Westpac Banking Corporation ABN 33 007 457 141 AFSL and Australian credit licence 233714.
            </p>
          </div>
        </div>

        {/* Indigenous Hub Banner */}
        <div className="relative w-full">
          <img 
            src="https://www.westpac.com.au/content/dam/public/wbc/images/home/exp/wbc_hp_indigenous_hub_max_1920x370.webp"
            alt="Indigenous Hub" 
            className="w-full h-auto" 
            data-testid="img-indigenous-hub"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <p className="text-sm text-foreground leading-relaxed" data-testid="text-acknowledgment">
                Westpac acknowledges the Traditional Owners as the custodians of this land, recognising their connection to land, waters and community. We pay our respects to Australia's First Peoples, and to their Elders past and present. View our{" "}
                <a href="#" className="text-[#DA1710] hover:underline font-medium" data-testid="link-indigenous-hub">
                  Indigenous Hub
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
