import { db } from "../db/index";
import { users, accounts, transactions, debitCards, admins, payees, transfers } from "@shared/schema";
import type { User, InsertUser, Account, InsertAccount, Transaction, InsertTransaction, DebitCard, InsertDebitCard, Admin, InsertAdmin, Payee, InsertPayee, Transfer, InsertTransfer } from "@shared/schema";
import { eq, desc, and, gte, or } from "drizzle-orm";

export interface IStorage {
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPhone(userId: string, phoneNumber: string): Promise<User | undefined>;
  updateUser(userId: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(userId: string): Promise<void>;
  
  getAccountsByUserId(userId: string): Promise<Account[]>;
  getAccountById(id: string): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccountBalance(accountId: string, newBalance: string): Promise<Account | undefined>;
  deleteAccount(accountId: string): Promise<void>;
  
  getTransactionsByAccountId(accountId: string, limit?: number): Promise<Transaction[]>;
  getAllTransactions(limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  getDebitCardsByAccountId(accountId: string): Promise<DebitCard[]>;
  getAllDebitCards(): Promise<DebitCard[]>;
  createDebitCard(card: InsertDebitCard): Promise<DebitCard>;
  updateDebitCardStatus(cardId: string, status: string): Promise<DebitCard | undefined>;
  
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  getAdminById(id: string): Promise<Admin | undefined>;
  getAllUsers(): Promise<User[]>;
  getAllAccounts(): Promise<Account[]>;
  getTotalBalance(): Promise<string>;
  
  getPayeesByUserId(userId: string): Promise<Payee[]>;
  createPayee(payee: InsertPayee): Promise<Payee>;
  deletePayee(payeeId: string): Promise<void>;
  
  getTransfersByAccountId(accountId: string): Promise<Transfer[]>;
  getAllTransfers(): Promise<Transfer[]>;
  createTransfer(transfer: InsertTransfer): Promise<Transfer>;
  
  executeInternalTransfer(params: {
    fromAccountId: string;
    toAccountId: string;
    amount: string;
    description: string;
    fromAccountName: string;
  }): Promise<Transfer>;
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

  async updateUser(userId: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set(updates)
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    await db.delete(users).where(eq(users.id, userId));
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

  async deleteAccount(accountId: string): Promise<void> {
    await db.delete(accounts).where(eq(accounts.id, accountId));
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

  async getAllTransactions(limit?: number): Promise<Transaction[]> {
    const query = db.select().from(transactions).orderBy(desc(transactions.transactionDate));
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

  async getAllDebitCards(): Promise<DebitCard[]> {
    return db.select().from(debitCards);
  }

  async createDebitCard(insertCard: InsertDebitCard): Promise<DebitCard> {
    const [card] = await db.insert(debitCards).values(insertCard).returning();
    return card;
  }

  async updateDebitCardStatus(cardId: string, status: string): Promise<DebitCard | undefined> {
    const [card] = await db.update(debitCards)
      .set({ status })
      .where(eq(debitCards.id, cardId))
      .returning();
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

  async getPayeesByUserId(userId: string): Promise<Payee[]> {
    return db.select().from(payees).where(eq(payees.userId, userId));
  }

  async createPayee(insertPayee: InsertPayee): Promise<Payee> {
    const [payee] = await db.insert(payees).values(insertPayee).returning();
    return payee;
  }

  async deletePayee(payeeId: string): Promise<void> {
    await db.delete(payees).where(eq(payees.id, payeeId));
  }

  async getTransfersByAccountId(accountId: string): Promise<Transfer[]> {
    return db.select().from(transfers)
      .where(or(eq(transfers.fromAccountId, accountId), eq(transfers.toAccountId, accountId)))
      .orderBy(desc(transfers.createdAt));
  }

  async getAllTransfers(): Promise<Transfer[]> {
    return db.select().from(transfers).orderBy(desc(transfers.createdAt));
  }

  async createTransfer(insertTransfer: InsertTransfer): Promise<Transfer> {
    const [transfer] = await db.insert(transfers).values(insertTransfer).returning();
    return transfer;
  }

  async executeInternalTransfer(params: {
    fromAccountId: string;
    toAccountId: string;
    amount: string;
    description: string;
    fromAccountName: string;
  }): Promise<Transfer> {
    return await db.transaction(async (tx) => {
      const accountIds = [params.fromAccountId, params.toAccountId].sort();
      
      const [firstLockedAccount] = await tx
        .select()
        .from(accounts)
        .where(eq(accounts.id, accountIds[0]))
        .for('update');
      
      const [secondLockedAccount] = await tx
        .select()
        .from(accounts)
        .where(eq(accounts.id, accountIds[1]))
        .for('update');

      if (!firstLockedAccount || !secondLockedAccount) {
        throw new Error("Account not found");
      }

      const fromAcc = firstLockedAccount.id === params.fromAccountId ? firstLockedAccount : secondLockedAccount;
      const toAcc = firstLockedAccount.id === params.toAccountId ? firstLockedAccount : secondLockedAccount;

      const transferAmount = parseFloat(params.amount);
      const fromBalance = parseFloat(fromAcc.balance);
      const toBalance = parseFloat(toAcc.balance);

      const newFromBalance = fromBalance - transferAmount;
      
      if (newFromBalance < 0) {
        throw new Error("Insufficient funds");
      }

      const newFromBalanceStr = newFromBalance.toFixed(2);
      const newToBalanceStr = (toBalance + transferAmount).toFixed(2);

      await tx.update(accounts)
        .set({ balance: newFromBalanceStr })
        .where(eq(accounts.id, params.fromAccountId));

      await tx.insert(transactions).values({
        accountId: params.fromAccountId,
        type: "debit",
        amount: `-${params.amount}`,
        description: params.description,
        merchant: null,
        category: "Transfer",
        balanceAfter: newFromBalanceStr,
        transactionDate: new Date(),
      });

      await tx.update(accounts)
        .set({ balance: newToBalanceStr })
        .where(eq(accounts.id, params.toAccountId));

      await tx.insert(transactions).values({
        accountId: params.toAccountId,
        type: "credit",
        amount: params.amount,
        description: `Transfer from ${params.fromAccountName}`,
        merchant: null,
        category: "Transfer",
        balanceAfter: newToBalanceStr,
        transactionDate: new Date(),
      });

      const [transfer] = await tx.insert(transfers).values({
        fromAccountId: params.fromAccountId,
        toAccountId: params.toAccountId,
        toAccountNumber: null,
        toBsb: null,
        amount: params.amount,
        description: params.description,
        status: "completed",
        transferType: "internal",
      }).returning();

      return transfer;
    });
  }
}

export const storage = new DatabaseStorage();
