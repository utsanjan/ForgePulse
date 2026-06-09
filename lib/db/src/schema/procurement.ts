import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const suppliersTable = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  supplierCode: text("supplier_code").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  country: text("country").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  status: text("status").notNull().default("Active"),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull().default("3.0"),
  totalOrders: integer("total_orders").notNull().default(0),
  totalValue: numeric("total_value", { precision: 15, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const purchaseOrdersTable = pgTable("purchase_orders", {
  id: serial("id").primaryKey(),
  poNumber: text("po_number").notNull().unique(),
  supplierId: integer("supplier_id").notNull(),
  supplierName: text("supplier_name").notNull(),
  items: integer("items").notNull().default(1),
  totalAmount: numeric("total_amount", { precision: 15, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("Draft"),
  orderDate: text("order_date").notNull(),
  expectedDelivery: text("expected_delivery").notNull(),
  actualDelivery: text("actual_delivery"),
  currency: text("currency").notNull().default("USD"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSupplierSchema = createInsertSchema(suppliersTable).omit({ id: true, createdAt: true });
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type Supplier = typeof suppliersTable.$inferSelect;

export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrdersTable).omit({ id: true, createdAt: true });
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type PurchaseOrder = typeof purchaseOrdersTable.$inferSelect;
