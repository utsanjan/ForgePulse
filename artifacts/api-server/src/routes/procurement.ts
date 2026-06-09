import { Router } from "express";
import { db, suppliersTable, purchaseOrdersTable } from "@workspace/forgepulse-db";
import { eq, and, like, sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

function mapSupplier(s: typeof suppliersTable.$inferSelect) {
  return { ...s, rating: Number(s.rating), totalValue: Number(s.totalValue) };
}

function mapPO(p: typeof purchaseOrdersTable.$inferSelect) {
  return { ...p, totalAmount: Number(p.totalAmount) };
}

router.get("/suppliers", async (req, res) => {
  try {
    const { search, status } = req.query as Record<string, string>;
    const conditions = [];
    if (status) conditions.push(eq(suppliersTable.status, status));
    if (search) conditions.push(like(suppliersTable.name, `%${search}%`));
    const items = await db.select().from(suppliersTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(suppliersTable.name);
    res.json(items.map(mapSupplier));
  } catch (err) {
    logger.error({ err }, "Get suppliers error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/suppliers", async (req, res) => {
  try {
    const { supplierCode, name, category, country, contactName, contactEmail, contactPhone } = req.body;
    const [supplier] = await db.insert(suppliersTable).values({
      supplierCode, name, category, country, contactName, contactEmail, contactPhone,
    }).returning();
    res.status(201).json(mapSupplier(supplier));
  } catch (err) {
    logger.error({ err }, "Create supplier error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/purchase-orders", async (req, res) => {
  try {
    const { status, supplierId } = req.query as Record<string, string>;
    const conditions = [];
    if (status) conditions.push(eq(purchaseOrdersTable.status, status));
    if (supplierId) conditions.push(eq(purchaseOrdersTable.supplierId, parseInt(supplierId)));
    const items = await db.select().from(purchaseOrdersTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(sql`${purchaseOrdersTable.createdAt} DESC`);
    res.json(items.map(mapPO));
  } catch (err) {
    logger.error({ err }, "Get purchase orders error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/purchase-orders", async (req, res) => {
  try {
    const { supplierId, expectedDelivery, currency, notes } = req.body;
    const suppliers = await db.select().from(suppliersTable).where(eq(suppliersTable.id, supplierId));
    const supplier = suppliers[0];
    const poNumber = `PO-${Date.now().toString().slice(-6)}`;
    const [po] = await db.insert(purchaseOrdersTable).values({
      poNumber,
      supplierId,
      supplierName: supplier?.name || "Unknown",
      expectedDelivery,
      currency: currency || "USD",
      notes,
      orderDate: new Date().toISOString().split("T")[0],
    }).returning();
    res.status(201).json(mapPO(po));
  } catch (err) {
    logger.error({ err }, "Create purchase order error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/purchase-orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, actualDelivery } = req.body;
    const updates: Record<string, unknown> = {};
    if (status) updates.status = status;
    if (actualDelivery) updates.actualDelivery = actualDelivery;
    const [updated] = await db.update(purchaseOrdersTable).set(updates).where(eq(purchaseOrdersTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Not found" });
    return res.json(mapPO(updated));
  } catch (err) {
    logger.error({ err }, "Update purchase order error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/spend-analytics", async (_req, res) => {
  try {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    res.json({
      totalSpend: 48500000,
      monthlyTrend: months.map((month, i) => ({
        month,
        amount: 3500000 + Math.sin(i) * 400000 + i * 100000,
      })),
      byCategory: [
        { category: "Raw Materials", amount: 22000000, percentage: 45.4 },
        { category: "MRO & Spares", amount: 9700000, percentage: 20.0 },
        { category: "Packaging", amount: 7280000, percentage: 15.0 },
        { category: "Services", amount: 5820000, percentage: 12.0 },
        { category: "Utilities", amount: 3700000, percentage: 7.6 },
      ],
    });
  } catch (err) {
    logger.error({ err }, "Spend analytics error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    const [suppliers, pos] = await Promise.all([
      db.select().from(suppliersTable),
      db.select().from(purchaseOrdersTable),
    ]);
    res.json({
      totalSuppliers: suppliers.length,
      activeOrders: pos.filter(p => p.status === "Approved" || p.status === "In Transit").length,
      pendingApprovals: pos.filter(p => p.status === "Draft").length,
      totalSpendYtd: 48500000,
      savingsYtd: 2400000,
    });
  } catch (err) {
    logger.error({ err }, "Procurement summary error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
