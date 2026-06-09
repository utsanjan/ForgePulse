import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const warehousesTable = pgTable("warehouses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  capacity: numeric("capacity", { precision: 10, scale: 2 }).notNull(),
  utilized: numeric("utilized", { precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inventoryItemsTable = pgTable("inventory_items", {
  id: serial("id").primaryKey(),
  itemCode: text("item_code").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  warehouse: text("warehouse").notNull(),
  uom: text("uom").notNull(),
  onHandQty: numeric("on_hand_qty", { precision: 10, scale: 2 }).notNull().default("0"),
  reservedQty: numeric("reserved_qty", { precision: 10, scale: 2 }).notNull().default("0"),
  reorderPoint: numeric("reorder_point", { precision: 10, scale: 2 }).notNull(),
  safetyStock: numeric("safety_stock", { precision: 10, scale: 2 }).notNull(),
  unitCost: numeric("unit_cost", { precision: 10, scale: 2 }).notNull(),
  abcClass: text("abc_class"),
  status: text("status").notNull().default("OK"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWarehouseSchema = createInsertSchema(warehousesTable).omit({ id: true, createdAt: true });
export type InsertWarehouse = z.infer<typeof insertWarehouseSchema>;
export type Warehouse = typeof warehousesTable.$inferSelect;

export const insertInventoryItemSchema = createInsertSchema(inventoryItemsTable).omit({ id: true, createdAt: true });
export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;
export type InventoryItem = typeof inventoryItemsTable.$inferSelect;
