import { Router } from "express";
import { db, employeesTable, attendanceTable } from "@workspace/forgepulse-db";
import { eq, and, like, sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

function mapEmployee(e: typeof employeesTable.$inferSelect) {
  return {
    ...e,
    productivity: Number(e.productivity),
    skills: e.skills ? e.skills.split(",").map(s => s.trim()) : [],
  };
}

router.get("/employees", async (req, res) => {
  try {
    const { department, search, status } = req.query as Record<string, string>;
    const conditions = [];
    if (department) conditions.push(eq(employeesTable.department, department));
    if (status) conditions.push(eq(employeesTable.status, status));
    if (search) conditions.push(like(employeesTable.name, `%${search}%`));
    const items = await db.select().from(employeesTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(employeesTable.name);
    res.json(items.map(mapEmployee));
  } catch (err) {
    logger.error({ err }, "Get employees error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/employees", async (req, res) => {
  try {
    const { employeeId, name, department, position, shift, joinDate, email, phone } = req.body;
    const [emp] = await db.insert(employeesTable).values({
      employeeId, name, department, position, shift, joinDate, email, phone,
    }).returning();
    res.status(201).json(mapEmployee(emp));
  } catch (err) {
    logger.error({ err }, "Create employee error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    const employees = await db.select().from(employeesTable);
    const total = employees.length;
    const active = employees.filter(e => e.status === "Active").length;
    const onLeave = employees.filter(e => e.status === "On Leave").length;
    const avgProductivity = total > 0
      ? Math.round(employees.reduce((s, e) => s + Number(e.productivity), 0) / total * 10) / 10
      : 87.5;
    res.json({
      totalEmployees: total,
      presentToday: active,
      onLeave,
      avgProductivity,
      laborUtilization: 91.2,
    });
  } catch (err) {
    logger.error({ err }, "Workforce summary error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/attendance", async (_req, res) => {
  try {
    const records = await db.select().from(attendanceTable).orderBy(attendanceTable.date).limit(50);
    res.json(records.map(r => ({ ...r, hoursWorked: Number(r.hoursWorked) })));
  } catch (err) {
    logger.error({ err }, "Attendance error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/department-utilization", async (_req, res) => {
  try {
    const employees = await db.select().from(employeesTable);
    const departments = [...new Set(employees.map(e => e.department))];
    const result = departments.map(dept => {
      const deptEmps = employees.filter(e => e.department === dept);
      const present = deptEmps.filter(e => e.status === "Active").length;
      const avgProductivity = deptEmps.length > 0
        ? Math.round(deptEmps.reduce((s, e) => s + Number(e.productivity), 0) / deptEmps.length * 10) / 10
        : 85;
      return {
        department: dept,
        totalEmployees: deptEmps.length,
        present,
        utilization: deptEmps.length > 0 ? Math.round((present / deptEmps.length) * 100 * 10) / 10 : 90,
        avgProductivity,
      };
    });
    res.json(result);
  } catch (err) {
    logger.error({ err }, "Department utilization error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
