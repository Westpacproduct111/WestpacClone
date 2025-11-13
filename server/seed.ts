import { db } from "../db/index";
import { users, accounts, transactions, debitCards, admins } from "@shared/schema";
import { hashPassword } from "./auth";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    console.log("Creating user: Kelly Ann James...");
    const hashedPassword = await hashPassword("RyanJames10152003");
    
    const [user] = await db.insert(users).values({
      email: "cjatsspeedwaay@gmail.com",
      password: hashedPassword,
      fullName: "Kelly Ann James",
      address: "55 Benjamina Drive",
      suburb: "Redbank Plains",
      state: "QLD",
      postcode: "4301",
      country: "Australia",
      phoneNumber: null,
    }).returning();

    console.log("✅ User created:", user.email);

    console.log("Creating checking account...");
    const [checkingAccount] = await db.insert(accounts).values({
      userId: user.id,
      accountNumber: "123456789",
      accountName: "Westpac Choice",
      accountType: "Checking",
      balance: "720000.00",
      currency: "AUD",
      bsb: "032-123",
    }).returning();

    console.log("✅ Checking account created:", checkingAccount.accountNumber, "- Balance: $720,000");

    console.log("Creating savings account...");
    const [savingsAccount] = await db.insert(accounts).values({
      userId: user.id,
      accountNumber: "987654321",
      accountName: "Westpac eSaver",
      accountType: "Savings",
      balance: "150000.00",
      currency: "AUD",
      bsb: "032-123",
    }).returning();

    console.log("✅ Savings account created:", savingsAccount.accountNumber, "- Balance: $150,000");

    console.log("Creating transaction history for 2 months...");
    
    const merchants = [
      { name: "Woolworths", category: "Groceries", minAmount: 50, maxAmount: 250 },
      { name: "Coles", category: "Groceries", minAmount: 60, maxAmount: 200 },
      { name: "BP Service Station", category: "Fuel", minAmount: 60, maxAmount: 120 },
      { name: "Caltex", category: "Fuel", minAmount: 70, maxAmount: 130 },
      { name: "Netflix", category: "Entertainment", minAmount: 15, maxAmount: 25 },
      { name: "Spotify", category: "Entertainment", minAmount: 12, maxAmount: 18 },
      { name: "Amazon Australia", category: "Shopping", minAmount: 30, maxAmount: 500 },
      { name: "JB Hi-Fi", category: "Electronics", minAmount: 100, maxAmount: 800 },
      { name: "Kmart", category: "Shopping", minAmount: 40, maxAmount: 300 },
      { name: "Target", category: "Shopping", minAmount: 50, maxAmount: 250 },
      { name: "Bunnings", category: "Home & Garden", minAmount: 30, maxAmount: 400 },
      { name: "Dan Murphy's", category: "Liquor", minAmount: 40, maxAmount: 200 },
      { name: "Uber Eats", category: "Food & Dining", minAmount: 25, maxAmount: 80 },
      { name: "McDonald's", category: "Food & Dining", minAmount: 12, maxAmount: 35 },
      { name: "The Coffee Club", category: "Cafes", minAmount: 8, maxAmount: 25 },
      { name: "Chemist Warehouse", category: "Pharmacy", minAmount: 20, maxAmount: 150 },
      { name: "Priceline Pharmacy", category: "Pharmacy", minAmount: 25, maxAmount: 100 },
      { name: "Origin Energy", category: "Utilities", minAmount: 180, maxAmount: 350 },
      { name: "Telstra", category: "Telecommunications", minAmount: 80, maxAmount: 150 },
      { name: "Gym Membership", category: "Health & Fitness", minAmount: 50, maxAmount: 90 },
    ];

    const deposits = [
      { description: "Salary - Direct Deposit", amount: 5500 },
      { description: "Interest Payment", amount: 45.50 },
      { description: "Tax Refund", amount: 1200 },
      { description: "Freelance Payment", amount: 2500 },
    ];

    let currentCheckingBalance = 720000;
    let currentSavingsBalance = 150000;
    const checkingTransactions = [];
    const savingsTransactions = [];

    const now = new Date();
    
    for (let i = 0; i < 60; i++) {
      const daysAgo = Math.floor(Math.random() * 60);
      const transactionDate = new Date(now);
      transactionDate.setDate(transactionDate.getDate() - daysAgo);
      transactionDate.setHours(Math.floor(Math.random() * 24));
      transactionDate.setMinutes(Math.floor(Math.random() * 60));

      const randomMerchant = merchants[Math.floor(Math.random() * merchants.length)];
      const amount = (Math.random() * (randomMerchant.maxAmount - randomMerchant.minAmount) + randomMerchant.minAmount).toFixed(2);

      currentCheckingBalance -= parseFloat(amount);

      checkingTransactions.push({
        accountId: checkingAccount.id,
        type: "debit",
        amount: `-${amount}`,
        description: randomMerchant.name,
        merchant: randomMerchant.name,
        category: randomMerchant.category,
        balanceAfter: currentCheckingBalance.toFixed(2),
        transactionDate,
      });
    }

    for (let i = 0; i < 8; i++) {
      const daysAgo = Math.floor(Math.random() * 60);
      const transactionDate = new Date(now);
      transactionDate.setDate(transactionDate.getDate() - daysAgo);
      transactionDate.setHours(9 + Math.floor(Math.random() * 8));
      transactionDate.setMinutes(Math.floor(Math.random() * 60));

      const randomDeposit = deposits[Math.floor(Math.random() * deposits.length)];
      let amount = randomDeposit.amount;
      
      if (randomDeposit.description.includes("Interest")) {
        amount = (Math.random() * 100 + 30).toFixed(2);
      }

      currentCheckingBalance += parseFloat(amount.toString());

      checkingTransactions.push({
        accountId: checkingAccount.id,
        type: "credit",
        amount: amount.toString(),
        description: randomDeposit.description,
        merchant: null,
        category: "Income",
        balanceAfter: currentCheckingBalance.toFixed(2),
        transactionDate,
      });
    }

    for (let i = 0; i < 10; i++) {
      const daysAgo = Math.floor(Math.random() * 60);
      const transactionDate = new Date(now);
      transactionDate.setDate(transactionDate.getDate() - daysAgo);
      transactionDate.setHours(9 + Math.floor(Math.random() * 8));
      transactionDate.setMinutes(Math.floor(Math.random() * 60));

      const randomMerchant = merchants[Math.floor(Math.random() * merchants.length)];
      const amount = (Math.random() * (randomMerchant.maxAmount - randomMerchant.minAmount) + randomMerchant.minAmount).toFixed(2);

      currentSavingsBalance -= parseFloat(amount);

      savingsTransactions.push({
        accountId: savingsAccount.id,
        type: "debit",
        amount: `-${amount}`,
        description: randomMerchant.name,
        merchant: randomMerchant.name,
        category: randomMerchant.category,
        balanceAfter: currentSavingsBalance.toFixed(2),
        transactionDate,
      });
    }

    for (let i = 0; i < 4; i++) {
      const daysAgo = Math.floor(Math.random() * 60);
      const transactionDate = new Date(now);
      transactionDate.setDate(transactionDate.getDate() - daysAgo);
      transactionDate.setHours(9);
      transactionDate.setMinutes(0);

      const amount = (Math.random() * 200 + 100).toFixed(2);

      currentSavingsBalance += parseFloat(amount);

      savingsTransactions.push({
        accountId: savingsAccount.id,
        type: "credit",
        amount: amount,
        description: "Interest Payment",
        merchant: null,
        category: "Income",
        balanceAfter: currentSavingsBalance.toFixed(2),
        transactionDate,
      });
    }

    const allTransactions = [...checkingTransactions, ...savingsTransactions].sort(
      (a, b) => b.transactionDate.getTime() - a.transactionDate.getTime()
    );

    if (allTransactions.length > 0) {
      await db.insert(transactions).values(allTransactions);
      console.log(`✅ Created ${allTransactions.length} transactions`);
    }

    console.log("Creating debit cards...");
    
    const currentYear = new Date().getFullYear();
    const expiryYear = (currentYear + 3).toString();

    await db.insert(debitCards).values([
      {
        accountId: checkingAccount.id,
        cardNumber: "4532 1234 5678 9010",
        cardholderName: "KELLY ANN JAMES",
        expiryMonth: "08",
        expiryYear: expiryYear,
        cvv: "842",
        cardType: "Debit Visa",
        status: "Active",
      },
      {
        accountId: savingsAccount.id,
        cardNumber: "5425 2334 3010 9903",
        cardholderName: "KELLY ANN JAMES",
        expiryMonth: "12",
        expiryYear: expiryYear,
        cvv: "517",
        cardType: "Debit Mastercard",
        status: "Active",
      },
    ]);

    console.log("✅ Created 2 debit cards");

    console.log("Creating admin user...");
    const adminHashedPassword = await hashPassword("Admin@Westpac2024");
    
    await db.insert(admins).values({
      email: "admin@westpac.com.au",
      password: adminHashedPassword,
      fullName: "Westpac Administrator",
      role: "admin",
    });

    console.log("✅ Admin user created: admin@westpac.com.au");
    console.log("   Password: Admin@Westpac2024");

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log("   User: cjatsspeedwaay@gmail.com");
    console.log("   Password: RyanJames10152003");
    console.log("   Checking Account: $720,000.00 AUD");
    console.log("   Savings Account: $150,000.00 AUD");
    console.log(`   Total Transactions: ${allTransactions.length}`);
    console.log("   Debit Cards: 2");
    console.log("   Admin: admin@westpac.com.au");

  } catch (error) {
    console.error("❌ Seeding error:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
