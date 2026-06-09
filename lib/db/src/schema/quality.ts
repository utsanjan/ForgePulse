import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const inspectionsTable = pgTable("inspections", {
  id: serial("id").primaryKey(),
  inspectionNumber: text("inspection_number").notNull().unique(),
  type: text("type").notNull(),
  product: text("product").notNull(),
  batch: text("batch").notNull(),
  inspector: text("inspector").notNull(),
  status: text("status").notNull().default("Pending"),
  date: text("date").notNull(),
  result: text("result"),
  defectsFound: integer("defects_found").notNull().default(0),
  sampleSize: integer("sample_size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const defectsTable = pgTable("defects", {
  id: serial("id").primaryKey(),
  defectCode: text("defect_code").notNull().unique(),
  product: text("product").notNull(),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  reportedBy: text("reported_by").notNull(),
  date: text("date").notNull(),
  status: text("status").notNull().default("Open"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInspectionSchema = createInsertSchema(inspectionsTable).omit({ id: true, createdAt: true });
export type InsertInspection = z.infer<typeof insertInspectionSchema>;
export type Inspection = typeof inspectionsTable.$inferSelect;

export const insertDefectSchema = createInsertSchema(defectsTable).omit({ id: true, createdAt: true });
export type InsertDefect = z.infer<typeof insertDefectSchema>;
export type Defect = typeof defectsTable.$inferSelect;
