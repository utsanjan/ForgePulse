import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productionOrdersTable = pgTable("production_orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  product: text("product").notNull(),
  quantity: integer("quantity").notNull(),
  completedQuantity: integer("completed_quantity").notNull().default(0),
  plannedStart: text("planned_start").notNull(),
  plannedEnd: text("planned_end").notNull(),
  actualStart: text("actual_start"),
  actualEnd: text("actual_end"),
  status: text("status").notNull().default("Planned"),
  department: text("department").notNull(),
  priority: text("priority").notNull().default("Medium"),
  oee: numeric("oee", { precision: 5, scale: 2 }),
  defectRate: numeric("defect_rate", { precision: 5, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workOrdersTable = pgTable("work_orders", {
  id: serial("id").primaryKey(),
  woNumber: text("wo_number").notNull().unique(),
  productionOrderId: integer("production_order_id").notNull(),
  operation: text("operation").notNull(),
  machine: text("machine").notNull(),
  operator: text("operator").notNull(),
  plannedStart: text("planned_start").notNull(),
  plannedEnd: text("planned_end").notNull(),
  status: text("status").notNull().default("Pending"),
  department: text("department").notNull(),
  progress: numeric("progress", { precision: 5, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductionOrderSchema = createInsertSchema(productionOrdersTable).omit({ id: true, createdAt: true });
export type InsertProductionOrder = z.infer<typeof insertProductionOrderSchema>;
export type ProductionOrder = typeof productionOrdersTable.$inferSelect;

export const insertWorkOrderSchema = createInsertSchema(workOrdersTable).omit({ id: true, createdAt: true });
export type InsertWorkOrder = z.infer<typeof insertWorkOrderSchema>;
export type WorkOrder = typeof workOrdersTable.$inferSelect;
