import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const employeesTable = pgTable("employees", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id").notNull().unique(),
  name: text("name").notNull(),
  department: text("department").notNull(),
  position: text("position").notNull(),
  shift: text("shift").notNull(),
  status: text("status").notNull().default("Active"),
  joinDate: text("join_date").notNull(),
  email: text("email"),
  phone: text("phone"),
  skills: text("skills"),
  productivity: numeric("productivity", { precision: 5, scale: 2 }).notNull().default("85"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attendanceTable = pgTable("attendance", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id").notNull(),
  employeeName: text("employee_name").notNull(),
  date: text("date").notNull(),
  status: text("status").notNull(),
  shift: text("shift").notNull(),
  hoursWorked: numeric("hours_worked", { precision: 4, scale: 1 }).notNull().default("8"),
  checkIn: text("check_in"),
  checkOut: text("check_out"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmployeeSchema = createInsertSchema(employeesTable).omit({ id: true, createdAt: true });
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employeesTable.$inferSelect;

export const insertAttendanceSchema = createInsertSchema(attendanceTable).omit({ id: true, createdAt: true });
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type Attendance = typeof attendanceTable.$inferSelect;
