import { Router } from "express";
import { db, inventoryItemsTable, warehousesTable } from "@workspace/forgepulse-db";
import { eq, and, like, sql, lte } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

function mapItem(i: typeof inventoryItemsTable.$inferSelect) {
  const onHand = Number(i.onHandQty);
  const reserved = Number(i.reservedQty);
  const unitCost = Number(i.unitCost);
  return {
    ...i,
    onHandQty: onHand,
    reservedQty: reserved,
    availableQty: onHand - reserved,
    reorderPoint: Number(i.reorderPoint),
    safetyStock: Number(i.safetyStock),
    unitCost,
    inventoryValue: onHand * unitCost,
  };
}

router.get("/items", async (req, res) => {
  try {
    const { category, warehouse, status, search, page = "1", limit = "20" } = req.query as Record<string, string>;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    if (category) conditions.push(eq(inventoryItemsTable.category, category));
    if (warehouse) conditions.push(eq(inventoryItemsTable.warehouse, warehouse));
    if (status) conditions.push(eq(inventoryItemsTable.status, status));
    if (search) conditions.push(like(inventoryItemsTable.description, `%${search}%`));

    const [items, countResult] = await Promise.all([
      db.select().from(inventoryItemsTable)
        .where(conditions.length ? and(...conditions) : undefined)
        .orderBy(inventoryItemsTable.itemCode)
        .limit(limitNum).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(inventoryItemsTable)
        .where(conditions.length ? and(...conditions) : undefined),
    ]);

    res.json({
      items: items.map(mapItem),
      total: Number(countResult[0].count),
      page: pageNum,
      limit: limitNum,
    });
  } catch (err) {
    logger.error({ err }, "Get inventory items error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/items", async (req, res) => {
  try {
    const { itemCode, description, category, warehouse, uom, onHandQty, reorderPoint, safetyStock, unitCost } = req.body;
    const onHand = Number(onHandQty);
    const rp = Number(reorderPoint);
    const status = onHand <= 0 ? "Out of Stock" : onHand <= rp ? "Low Stock" : "OK";
    const [item] = await db.insert(inventoryItemsTable).values({
      itemCode, description, category, warehouse, uom,
      onHandQty: String(onHandQty),
      reorderPoint: String(reorderPoint),
      safetyStock: String(safetyStock),
      unitCost: String(unitCost),
      status,
    }).returning();
    res.status(201).json(mapItem(item));
  } catch (err) {
    logger.error({ err }, "Create inventory item error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const items = await db.select().from(inventoryItemsTable).where(eq(inventoryItemsTable.id, id));
    if (!items[0]) return res.status(404).json({ error: "Not found" });
    return res.json(mapItem(items[0]));
  } catch (err) {
    logger.error({ err }, "Get inventory item error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates: Record<string, unknown> = {};
    const { description, category, warehouse, onHandQty, reorderPoint, safetyStock, unitCost, status } = req.body;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (warehouse !== undefined) updates.warehouse = warehouse;
    if (onHandQty !== undefined) {
      updates.onHandQty = String(onHandQty);
      const rp = reorderPoint || 0;
      updates.status = Number(onHandQty) <= 0 ? "Out of Stock" : Number(onHandQty) <= Number(rp) ? "Low Stock" : "OK";
    }
    if (reorderPoint !== undefined) updates.reorderPoint = String(reorderPoint);
    if (safetyStock !== undefined) updates.safetyStock = String(safetyStock);
    if (unitCost !== undefined) updates.unitCost = String(unitCost);
    if (status !== undefined) updates.status = status;
    const [updated] = await db.update(inventoryItemsTable).set(updates).where(eq(inventoryItemsTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Not found" });
    return res.json(mapItem(updated));
  } catch (err) {
    logger.error({ err }, "Update inventory item error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    const items = await db.select().from(inventoryItemsTable);
    const totalValue = items.reduce((sum, i) => sum + Number(i.onHandQty) * Number(i.unitCost), 0);
    const lowStockItems = items.filter(i => i.status === "Low Stock" || i.status === "Out of Stock").length;
    res.json({
      totalValue,
      totalItems: items.length,
      lowStockItems,
      pendingGrn: 14,
    });
  } catch (err) {
    logger.error({ err }, "Inventory summary error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/low-stock", async (_req, res) => {
  try {
    const items = await db.select().from(inventoryItemsTable)
      .where(eq(inventoryItemsTable.status, "Low Stock"));
    res.json(items.map(mapItem));
  } catch (err) {
    logger.error({ err }, "Low stock items error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/abc-analysis", async (_req, res) => {
  try {
    const items = await db.select().from(inventoryItemsTable).orderBy(inventoryItemsTable.itemCode);
    const withValue = items.map(i => ({
      itemCode: i.itemCode,
      description: i.description,
      annualValue: Number(i.onHandQty) * Number(i.unitCost) * 12,
    })).sort((a, b) => b.annualValue - a.annualValue);
    const totalValue = withValue.reduce((s, i) => s + i.annualValue, 0);
    let cumulative = 0;
    const result = withValue.map(item => {
      cumulative += item.annualValue;
      const cumulativePercentage = (cumulative / totalValue) * 100;
      return {
        ...item,
        cumulativePercentage: Math.round(cumulativePercentage * 10) / 10,
        class: cumulativePercentage <= 70 ? "A" : cumulativePercentage <= 90 ? "B" : "C",
      };
    });
    res.json(result);
  } catch (err) {
    logger.error({ err }, "ABC analysis error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/warehouses", async (_req, res) => {
  try {
    const warehouses = await db.select().from(warehousesTable);
    res.json(warehouses.map(w => ({
      ...w,
      capacity: Number(w.capacity),
      utilized: Number(w.utilized),
    })));
  } catch (err) {
    logger.error({ err }, "Warehouses error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
