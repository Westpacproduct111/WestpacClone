import { db } from "../db/index";
import { users, accounts, transactions, debitCards, admins } from "@shared/schema";
import type { User, InsertUser, Account, InsertAccount, Transaction, InsertTransaction, DebitCard, InsertDebitCard, Admin, InsertAdmin } from "@shared/schema";
import { eq, desc, and, gte } from "drizzle-orm";

export interface IStorage {
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPhone(userId: string, phoneNumber: string): Promise<User | undefined>;
  
  getAccountsByUserId(userId: string): Promise<Account[]>;
  getAccountById(id: string): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccountBalance(accountId: string, newBalance: string): Promise<Account | undefined>;
  
  getTransactionsByAccountId(accountId: string, limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  getDebitCardsByAccountId(accountId: string): Promise<DebitCard[]>;
  createDebitCard(card: InsertDebitCard): Promise<DebitCard>;
  
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  getAllUsers(): Promise<User[]>;
  getAllAccounts(): Promise<Account[]>;
  getTotalBalance(): Promise<string>;
}

export class DatabaseStorage implements IStorage {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserPhone(userId: string, phoneNumber: string): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ phoneNumber })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getAccountsByUserId(userId: string): Promise<Account[]> {
    return db.select().from(accounts).where(eq(accounts.userId, userId));
  }

  async getAccountById(id: string): Promise<Account | undefined> {
    const [account] = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
    return account;
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const [account] = await db.insert(accounts).values(insertAccount).returning();
    return account;
  }

  async updateAccountBalance(accountId: string, newBalance: string): Promise<Account | undefined> {
    const [account] = await db.update(accounts)
      .set({ balance: newBalance })
      .where(eq(accounts.id, accountId))
      .returning();
    return account;
  }

  async getTransactionsByAccountId(accountId: string, limit?: number): Promise<Transaction[]> {
    const query = db.select().from(transactions)
      .where(eq(transactions.accountId, accountId))
      .orderBy(desc(transactions.transactionDate));
    
    if (limit) {
      return query.limit(limit);
    }
    return query;
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(insertTransaction).returning();
    return transaction;
  }

  async getDebitCardsByAccountId(accountId: string): Promise<DebitCard[]> {
    return db.select().from(debitCards).where(eq(debitCards.accountId, accountId));
  }

  async createDebitCard(insertCard: InsertDebitCard): Promise<DebitCard> {
    const [card] = await db.insert(debitCards).values(insertCard).returning();
    return card;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
    return admin;
  }

  async getAdminById(id: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.id, id)).limit(1);
    return admin;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getAllAccounts(): Promise<Account[]> {
    return db.select().from(accounts);
  }

  async getTotalBalance(): Promise<string> {
    const allAccounts = await this.getAllAccounts();
    const total = allAccounts.reduce((sum, account) => {
      return sum + parseFloat(account.balance);
    }, 0);
    return total.toFixed(2);
  }
}

export const storage = new DatabaseStorage();
