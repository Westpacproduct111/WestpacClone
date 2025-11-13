import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateUser, authenticateAdmin } from "./auth";
import { updateUserPhoneSchema, transferFundsSchema, insertPayeeSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    adminId?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { customerId, password } = req.body;
      
      console.log("Login attempt:", { customerId, passwordLength: password?.length });
      
      if (!customerId || !password) {
        console.log("Missing credentials");
        return res.status(400).json({ error: "Customer ID and password are required" });
      }

      const user = await authenticateUser(customerId, password);
      
      if (!user) {
        console.log("Authentication failed for:", customerId);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      console.log("User authenticated:", user.id);
      
      // Regenerate session to ensure fresh session after login
      await new Promise<void>((resolve, reject) => {
        req.session.regenerate((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      req.session.userId = user.id;
      
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      console.log("Session saved:", req.session.userId);
      
      const { password: _, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUserById(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Get user error:", error);
      return res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const admin = await authenticateAdmin(email, password);
      
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.adminId = admin.id;
      
      const { password: _, ...adminWithoutPassword } = admin;
      return res.json({ admin: adminWithoutPassword });
    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/admin/me", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const admin = await storage.getAdminById(req.session.adminId);
      
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const { password: _, ...adminWithoutPassword } = admin;
      return res.json({ admin: adminWithoutPassword });
    } catch (error) {
      console.error("Get admin error:", error);
      return res.status(500).json({ error: "Failed to get admin" });
    }
  });

  app.get("/api/accounts", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const accounts = await storage.getAccountsByUserId(req.session.userId);
      return res.json({ accounts });
    } catch (error) {
      console.error("Get accounts error:", error);
      return res.status(500).json({ error: "Failed to get accounts" });
    }
  });

  app.get("/api/accounts/:id", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const account = await storage.getAccountById(req.params.id);
      
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      if (account.userId !== req.session.userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      return res.json({ account });
    } catch (error) {
      console.error("Get account error:", error);
      return res.status(500).json({ error: "Failed to get account" });
    }
  });

  app.get("/api/accounts/:id/transactions", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const account = await storage.getAccountById(req.params.id);
      
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      if (account.userId !== req.session.userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const transactions = await storage.getTransactionsByAccountId(req.params.id, limit);
      
      return res.json({ transactions });
    } catch (error) {
      console.error("Get transactions error:", error);
      return res.status(500).json({ error: "Failed to get transactions" });
    }
  });

  app.get("/api/cards", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const accounts = await storage.getAccountsByUserId(req.session.userId);
      const allCards = [];
      
      for (const account of accounts) {
        const cards = await storage.getDebitCardsByAccountId(account.id);
        allCards.push(...cards.map(card => ({ ...card, account })));
      }

      return res.json({ cards: allCards });
    } catch (error) {
      console.error("Get cards error:", error);
      return res.status(500).json({ error: "Failed to get cards" });
    }
  });

  app.patch("/api/profile/phone", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const result = updateUserPhoneSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message });
      }

      const user = await storage.updateUserPhone(req.session.userId, result.data.phoneNumber);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Update phone error:", error);
      return res.status(500).json({ error: "Failed to update phone number" });
    }
  });

  app.get("/api/admin/users", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
      
      return res.json({ users: usersWithoutPasswords });
    } catch (error) {
      console.error("Get users error:", error);
      return res.status(500).json({ error: "Failed to get users" });
    }
  });

  app.get("/api/admin/accounts", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const accounts = await storage.getAllAccounts();
      return res.json({ accounts });
    } catch (error) {
      console.error("Get all accounts error:", error);
      return res.status(500).json({ error: "Failed to get accounts" });
    }
  });

  app.get("/api/admin/stats", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const users = await storage.getAllUsers();
      const accounts = await storage.getAllAccounts();
      const totalBalance = await storage.getTotalBalance();

      return res.json({
        stats: {
          totalUsers: users.length,
          totalAccounts: accounts.length,
          totalBalance: parseFloat(totalBalance),
        }
      });
    } catch (error) {
      console.error("Get stats error:", error);
      return res.status(500).json({ error: "Failed to get stats" });
    }
  });

  app.get("/api/payees", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const payees = await storage.getPayeesByUserId(req.session.userId);
      return res.json({ payees });
    } catch (error) {
      console.error("Get payees error:", error);
      return res.status(500).json({ error: "Failed to get payees" });
    }
  });

  app.post("/api/payees", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const result = insertPayeeSchema.safeParse({ ...req.body, userId: req.session.userId });
      
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message });
      }

      const payee = await storage.createPayee(result.data);
      return res.json({ payee });
    } catch (error) {
      console.error("Create payee error:", error);
      return res.status(500).json({ error: "Failed to create payee" });
    }
  });

  app.delete("/api/payees/:id", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      await storage.deletePayee(req.params.id);
      return res.json({ message: "Payee deleted successfully" });
    } catch (error) {
      console.error("Delete payee error:", error);
      return res.status(500).json({ error: "Failed to delete payee" });
    }
  });

  app.post("/api/transfers", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const result = transferFundsSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message });
      }

      const fromAccount = await storage.getAccountById(result.data.fromAccountId);
      
      if (!fromAccount || fromAccount.userId !== req.session.userId) {
        return res.status(403).json({ error: "Access denied to source account" });
      }

      const transferAmount = parseFloat(result.data.amount);
      if (isNaN(transferAmount) || transferAmount <= 0) {
        return res.status(400).json({ error: "Invalid transfer amount" });
      }

      const currentBalance = parseFloat(fromAccount.balance);

      if (currentBalance < transferAmount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }

      if (result.data.transferType === 'internal') {
        if (!result.data.toAccountId) {
          return res.status(400).json({ error: "Destination account is required for internal transfers" });
        }
        
        const toAccount = await storage.getAccountById(result.data.toAccountId);
        
        if (!toAccount) {
          return res.status(404).json({ error: "Destination account not found" });
        }

        if (toAccount.userId !== req.session.userId) {
          return res.status(403).json({ error: "Access denied to destination account" });
        }

        if (fromAccount.id === toAccount.id) {
          return res.status(400).json({ error: "Cannot transfer to the same account" });
        }

        const transfer = await storage.executeInternalTransfer({
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id,
          amount: result.data.amount,
          description: result.data.description,
          fromAccountName: fromAccount.accountName,
        });

        return res.json({ transfer, message: "Transfer completed successfully" });
      } else {
        if (!result.data.toAccountNumber || !result.data.toBsb) {
          return res.status(400).json({ error: "Account number and BSB are required for external transfers" });
        }

        const newFromBalance = (currentBalance - transferAmount).toFixed(2);
        await storage.updateAccountBalance(fromAccount.id, newFromBalance);

        await storage.createTransaction({
          accountId: fromAccount.id,
          type: "debit",
          amount: `-${result.data.amount}`,
          description: result.data.description,
          merchant: null,
          category: "Transfer",
          balanceAfter: newFromBalance,
          transactionDate: new Date(),
        });

        const transfer = await storage.createTransfer({
          fromAccountId: result.data.fromAccountId,
          toAccountId: null,
          toAccountNumber: result.data.toAccountNumber,
          toBsb: result.data.toBsb,
          amount: result.data.amount,
          description: result.data.description,
          status: "completed",
          transferType: result.data.transferType,
        });

        return res.json({ transfer, message: "Transfer completed successfully" });
      }
    } catch (error) {
      console.error("Transfer error:", error);
      return res.status(500).json({ error: "Failed to complete transfer" });
    }
  });

  app.get("/api/transfers", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const accounts = await storage.getAccountsByUserId(req.session.userId);
      const allTransfers = [];

      for (const account of accounts) {
        const transfers = await storage.getTransfersByAccountId(account.id);
        allTransfers.push(...transfers);
      }

      const uniqueTransfers = Array.from(new Map(allTransfers.map(t => [t.id, t])).values());

      return res.json({ transfers: uniqueTransfers });
    } catch (error) {
      console.error("Get transfers error:", error);
      return res.status(500).json({ error: "Failed to get transfers" });
    }
  });

  app.get("/api/admin/users/:id", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const user = await storage.getUserById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      const accounts = await storage.getAccountsByUserId(user.id);
      
      return res.json({ user: userWithoutPassword, accounts });
    } catch (error) {
      console.error("Get user error:", error);
      return res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/admin/transactions", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const transactions = await storage.getAllTransactions(limit);
      
      return res.json({ transactions });
    } catch (error) {
      console.error("Get transactions error:", error);
      return res.status(500).json({ error: "Failed to get transactions" });
    }
  });

  app.get("/api/admin/transfers", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const transfers = await storage.getAllTransfers();
      return res.json({ transfers });
    } catch (error) {
      console.error("Get transfers error:", error);
      return res.status(500).json({ error: "Failed to get transfers" });
    }
  });

  app.get("/api/admin/cards", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const cards = await storage.getAllDebitCards();
      return res.json({ cards });
    } catch (error) {
      console.error("Get cards error:", error);
      return res.status(500).json({ error: "Failed to get cards" });
    }
  });

  app.patch("/api/admin/cards/:id/status", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const card = await storage.updateDebitCardStatus(req.params.id, status);
      
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }

      return res.json({ card, message: "Card status updated successfully" });
    } catch (error) {
      console.error("Update card status error:", error);
      return res.status(500).json({ error: "Failed to update card status" });
    }
  });

  app.patch("/api/admin/accounts/:id/balance", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const { balance } = req.body;
      
      if (!balance) {
        return res.status(400).json({ error: "Balance is required" });
      }

      const account = await storage.getAccountById(req.params.id);
      
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      const updatedAccount = await storage.updateAccountBalance(req.params.id, balance);
      
      return res.json({ account: updatedAccount, message: "Balance updated successfully" });
    } catch (error) {
      console.error("Update balance error:", error);
      return res.status(500).json({ error: "Failed to update balance" });
    }
  });

  app.patch("/api/admin/users/:id/lock", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const { lock } = req.body;
      
      if (typeof lock !== 'boolean') {
        return res.status(400).json({ error: "Lock must be a boolean" });
      }

      const user = await storage.updateUserLock(req.params.id, lock);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword, message: lock ? "User locked successfully" : "User unlocked successfully" });
    } catch (error) {
      console.error("Update user lock error:", error);
      return res.status(500).json({ error: "Failed to update user lock status" });
    }
  });

  app.patch("/api/admin/accounts/:id/block", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const { block } = req.body;
      
      if (typeof block !== 'boolean') {
        return res.status(400).json({ error: "Block must be a boolean" });
      }

      const account = await storage.updateAccountBlock(req.params.id, block);
      
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      return res.json({ account, message: block ? "Account blocked successfully" : "Account unblocked successfully" });
    } catch (error) {
      console.error("Update account block error:", error);
      return res.status(500).json({ error: "Failed to update account block status" });
    }
  });

  app.patch("/api/admin/transactions/:id/hold", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const { hold } = req.body;
      
      if (typeof hold !== 'boolean') {
        return res.status(400).json({ error: "Hold must be a boolean" });
      }

      const transaction = await storage.updateTransactionHold(req.params.id, hold);
      
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      return res.json({ transaction, message: hold ? "Transaction put on hold" : "Hold released successfully" });
    } catch (error) {
      console.error("Update transaction hold error:", error);
      return res.status(500).json({ error: "Failed to update transaction hold status" });
    }
  });

  app.post("/api/admin/accounts/:id/adjust", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated as admin" });
      }

      const { amount, type } = req.body;
      
      if (!amount || !type) {
        return res.status(400).json({ error: "Amount and type are required" });
      }

      if (type !== 'credit' && type !== 'debit') {
        return res.status(400).json({ error: "Type must be 'credit' or 'debit'" });
      }

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ error: "Amount must be a positive number" });
      }

      const description = `Admin ${type} - Manual adjustment`;
      const account = await storage.adjustAccountBalance(req.params.id, amount, type, description);
      
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      return res.json({ account, message: `Account ${type}ed successfully` });
    } catch (error: any) {
      console.error("Adjust balance error:", error);
      if (error.message === "Insufficient funds") {
        return res.status(400).json({ error: "Insufficient funds for debit" });
      }
      return res.status(500).json({ error: "Failed to adjust account balance" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
