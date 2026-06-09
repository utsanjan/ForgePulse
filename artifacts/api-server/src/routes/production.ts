import { Router } from "express";
import { db, productionOrdersTable, workOrdersTable } from "@workspace/forgepulse-db";
import { eq, like, and, sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

router.get("/orders", async (req, res) => {
  try {
    const { status, page = "1", limit = "20" } = req.query as Record<string, string>;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const conditions = status ? [eq(productionOrdersTable.status, status)] : [];
    const [items, countResult] = await Promise.all([
      db.select().from(productionOrdersTable)
        .where(conditions.length ? and(...conditions) : undefined)
        .orderBy(sql`${productionOrdersTable.createdAt} DESC`)
        .limit(limitNum).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(productionOrdersTable)
        .where(conditions.length ? and(...conditions) : undefined),
    ]);

    res.json({
      items: items.map(o => ({
        ...o,
        oee: o.oee ? Number(o.oee) : null,
        defectRate: o.defectRate ? Number(o.defectRate) : null,
      })),
      total: Number(countResult[0].count),
      page: pageNum,
      limit: limitNum,
    });
  } catch (err) {
    logger.error({ err }, "Get production orders error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { product, quantity, plannedStart, plannedEnd, department, priority, notes } = req.body;
    const orderNumber = `PO-${Date.now().toString().slice(-6)}`;
    const [order] = await db.insert(productionOrdersTable).values({
      orderNumber,
      product,
      quantity,
      plannedStart,
      plannedEnd,
      department,
      priority: priority || "Medium",
      notes,
    }).returning();
    res.status(201).json(order);
  } catch (err) {
    logger.error({ err }, "Create production order error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const orders = await db.select().from(productionOrdersTable).where(eq(productionOrdersTable.id, id));
    if (!orders[0]) return res.status(404).json({ error: "Not found" });
    const o = orders[0];
    return res.json({ ...o, oee: o.oee ? Number(o.oee) : null, defectRate: o.defectRate ? Number(o.defectRate) : null });
  } catch (err) {
    logger.error({ err }, "Get production order error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates: Record<string, unknown> = {};
    const { status, completedQuantity, actualStart, actualEnd, oee, defectRate } = req.body;
    if (status !== undefined) updates.status = status;
    if (completedQuantity !== undefined) updates.completedQuantity = completedQuantity;
    if (actualStart !== undefined) updates.actualStart = actualStart;
    if (actualEnd !== undefined) updates.actualEnd = actualEnd;
    if (oee !== undefined) updates.oee = String(oee);
    if (defectRate !== undefined) updates.defectRate = String(defectRate);
    const [updated] = await db.update(productionOrdersTable).set(updates).where(eq(productionOrdersTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Not found" });
    return res.json({ ...updated, oee: updated.oee ? Number(updated.oee) : null, defectRate: updated.defectRate ? Number(updated.defectRate) : null });
  } catch (err) {
    logger.error({ err }, "Update production order error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/work-orders", async (req, res) => {
  try {
    const { status, department } = req.query as Record<string, string>;
    const conditions = [];
    if (status) conditions.push(eq(workOrdersTable.status, status));
    if (department) conditions.push(eq(workOrdersTable.department, department));
    const items = await db.select().from(workOrdersTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(sql`${workOrdersTable.createdAt} DESC`);
    res.json(items.map(w => ({ ...w, progress: Number(w.progress) })));
  } catch (err) {
    logger.error({ err }, "Get work orders error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/work-orders", async (req, res) => {
  try {
    const { productionOrderId, operation, machine, operator, plannedStart, plannedEnd, department } = req.body;
    const woNumber = `WO-${Date.now().toString().slice(-6)}`;
    const [wo] = await db.insert(workOrdersTable).values({
      woNumber,
      productionOrderId,
      operation,
      machine,
      operator,
      plannedStart,
      plannedEnd,
      department,
    }).returning();
    res.status(201).json({ ...wo, progress: Number(wo.progress) });
  } catch (err) {
    logger.error({ err }, "Create work order error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/schedule", async (_req, res) => {
  try {
    const orders = await db.select().from(productionOrdersTable).limit(20);
    const schedule = orders.map(o => ({
      id: o.id,
      name: `${o.orderNumber} - ${o.product}`,
      start: o.plannedStart,
      end: o.plannedEnd,
      department: o.department,
      status: o.status,
      progress: o.completedQuantity && o.quantity ? Math.round((o.completedQuantity / o.quantity) * 100) : 0,
    }));
    res.json(schedule);
  } catch (err) {
    logger.error({ err }, "Production schedule error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    res.json([
      { department: "Machining", planned: 40000, actual: 38200, achievement: 95.5, oee: 86.1, defectRate: 1.9, downtime: 45.5 },
      { department: "Assembly", planned: 50000, actual: 48900, achievement: 97.8, oee: 88.3, defectRate: 1.6, downtime: 32.0 },
      { department: "Paint Shop", planned: 20000, actual: 19100, achievement: 95.5, oee: 85.4, defectRate: 2.2, downtime: 22.0 },
      { department: "Quality", planned: 10000, actual: 9800, achievement: 98.0, oee: 92.5, defectRate: 1.0, downtime: 10.5 },
      { department: "Packing", planned: 10000, actual: 9430, achievement: 94.3, oee: 83.0, defectRate: 2.1, downtime: 12.0 },
    ]);
  } catch (err) {
    logger.error({ err }, "Production summary error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
