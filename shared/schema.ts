import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: text("customer_id").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  address: text("address").notNull(),
  suburb: text("suburb").notNull(),
  state: text("state").notNull(),
  postcode: text("postcode").notNull(),
  country: text("country").notNull().default('Australia'),
  phoneNumber: text("phone_number"),
  isLocked: text("is_locked").default('false').notNull(),
  lockedAt: timestamp("locked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountNumber: text("account_number").notNull().unique(),
  accountName: text("account_name").notNull(),
  accountType: text("account_type").notNull(),
  balance: decimal("balance", { precision: 15, scale: 2 }).notNull().default('0'),
  currency: text("currency").notNull().default('AUD'),
  bsb: text("bsb").notNull(),
  isBlocked: text("is_blocked").default('false').notNull(),
  blockedAt: timestamp("blocked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").notNull().references(() => accounts.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: text("description").notNull(),
  merchant: text("merchant"),
  category: text("category"),
  balanceAfter: decimal("balance_after", { precision: 15, scale: 2 }).notNull(),
  transactionDate: timestamp("transaction_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isOnHold: text("is_on_hold").default('false').notNull(),
  holdReason: text("hold_reason"),
  senderName: text("sender_name"),
  senderAccountNumber: text("sender_account_number"),
  receiverName: text("receiver_name"),
  receiverAccountNumber: text("receiver_account_number"),
  amountUsd: decimal("amount_usd", { precision: 15, scale: 2 }),
  exchangeRate: decimal("exchange_rate", { precision: 10, scale: 6 }),
});

export const debitCards = pgTable("debit_cards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").notNull().references(() => accounts.id, { onDelete: "cascade" }),
  cardNumber: text("card_number").notNull().unique(),
  cardholderName: text("cardholder_name").notNull(),
  expiryMonth: text("expiry_month").notNull(),
  expiryYear: text("expiry_year").notNull(),
  cvv: text("cvv").notNull(),
  cardType: text("card_type").notNull().default('Debit'),
  status: text("status").notNull().default('Active'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default('admin'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payees = pgTable("payees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  accountNumber: text("account_number").notNull(),
  bsb: text("bsb").notNull(),
  nickname: text("nickname"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transfers = pgTable("transfers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromAccountId: varchar("from_account_id").notNull().references(() => accounts.id, { onDelete: "cascade" }),
  toAccountId: varchar("to_account_id").references(() => accounts.id, { onDelete: "cascade" }),
  toAccountNumber: text("to_account_number"),
  toBsb: text("to_bsb"),
  beneficiaryName: text("beneficiary_name"),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default('completed'),
  transferType: text("transfer_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertDebitCardSchema = createInsertSchema(debitCards).omit({
  id: true,
  createdAt: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
});

export const insertPayeeSchema = createInsertSchema(payees).omit({
  id: true,
  createdAt: true,
});

export const insertTransferSchema = createInsertSchema(transfers).omit({
  id: true,
  createdAt: true,
});

export const updateUserPhoneSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const transferFundsSchema = z.object({
  fromAccountId: z.string().min(1, "From account is required"),
  toAccountId: z.string().optional(),
  toAccountNumber: z.string().optional(),
  toBsb: z.string().optional(),
  beneficiaryName: z.string().optional(),
  amount: z.string().min(1, "Amount is required").refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  transferType: z.enum(['internal', 'external']),
}).refine((data) => {
  if (data.transferType === 'internal') {
    return data.toAccountId && data.toAccountId.length > 0;
  }
  if (data.transferType === 'external') {
    return data.toAccountNumber && data.toAccountNumber.length > 0 && data.toBsb && data.toBsb.length > 0 && data.beneficiaryName && data.beneficiaryName.length > 0;
  }
  return true;
}, {
  message: "For internal transfers, destination account is required. For external transfers, account number, BSB, and beneficiary name are required.",
  path: ["toAccountId"],
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Account = typeof accounts.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertDebitCard = z.infer<typeof insertDebitCardSchema>;
export type DebitCard = typeof debitCards.$inferSelect;

export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;

export type InsertPayee = z.infer<typeof insertPayeeSchema>;
export type Payee = typeof payees.$inferSelect;

export type InsertTransfer = z.infer<typeof insertTransferSchema>;
export type Transfer = typeof transfers.$inferSelect;

export type UpdateUserPhone = z.infer<typeof updateUserPhoneSchema>;
export type TransferFunds = z.infer<typeof transferFundsSchema>;
