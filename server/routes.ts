import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateUser, authenticateAdmin } from "./auth";
import { updateUserPhoneSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    adminId?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await authenticateUser(email, password);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      
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

  const httpServer = createServer(app);
  return httpServer;
}
