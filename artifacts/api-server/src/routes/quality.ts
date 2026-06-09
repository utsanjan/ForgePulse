import { Router } from "express";
import { db, inspectionsTable, defectsTable } from "@workspace/forgepulse-db";
import { eq, and } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

router.get("/inspections", async (req, res) => {
  try {
    const { type, status } = req.query as Record<string, string>;
    const conditions = [];
    if (type) conditions.push(eq(inspectionsTable.type, type));
    if (status) conditions.push(eq(inspectionsTable.status, status));
    const items = await db.select().from(inspectionsTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(inspectionsTable.date);
    res.json(items);
  } catch (err) {
    logger.error({ err }, "Get inspections error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/inspections", async (req, res) => {
  try {
    const { type, product, batch, inspector, date, sampleSize } = req.body;
    const inspectionNumber = `QI-${Date.now().toString().slice(-6)}`;
    const [inspection] = await db.insert(inspectionsTable).values({
      inspectionNumber, type, product, batch, inspector, date, sampleSize,
    }).returning();
    res.status(201).json(inspection);
  } catch (err) {
    logger.error({ err }, "Create inspection error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/defects", async (_req, res) => {
  try {
    const defects = await db.select().from(defectsTable).orderBy(defectsTable.date);
    res.json(defects);
  } catch (err) {
    logger.error({ err }, "Get defects error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/defect-trend", async (_req, res) => {
  try {
    const weeks = ["W1 Jan","W2 Jan","W3 Jan","W4 Jan","W1 Feb","W2 Feb","W3 Feb","W4 Feb",
      "W1 Mar","W2 Mar","W3 Mar","W4 Mar"];
    const data = weeks.map((week, i) => {
      const inspections = 80 + i * 3;
      const defects = 8 - Math.floor(i * 0.3);
      return {
        week,
        defects: Math.max(defects, 3),
        inspections,
        defectRate: Math.round((defects / inspections) * 100 * 10) / 10,
      };
    });
    res.json(data);
  } catch (err) {
    logger.error({ err }, "Defect trend error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    const inspections = await db.select().from(inspectionsTable);
    const total = inspections.length;
    const passed = inspections.filter(i => i.result === "Pass").length;
    res.json({
      totalInspections: total,
      passRate: total > 0 ? Math.round((passed / total) * 100 * 10) / 10 : 98.2,
      defectRate: 1.8,
      openCapas: 7,
      avgResolutionDays: 4.2,
    });
  } catch (err) {
    logger.error({ err }, "Quality summary error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/supplier-scores", async (_req, res) => {
  try {
    res.json([
      { supplier: "Tata Steel", qualityScore: 94, deliveryScore: 92, priceScore: 88, overallScore: 91.3 },
      { supplier: "Reliance Industries", qualityScore: 88, deliveryScore: 85, priceScore: 90, overallScore: 87.7 },
      { supplier: "SAIL", qualityScore: 92, deliveryScore: 89, priceScore: 85, overallScore: 88.7 },
      { supplier: "Hindalco", qualityScore: 90, deliveryScore: 88, priceScore: 87, overallScore: 88.3 },
      { supplier: "Bharat Forge", qualityScore: 96, deliveryScore: 94, priceScore: 82, overallScore: 90.7 },
    ]);
  } catch (err) {
    logger.error({ err }, "Supplier quality scores error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
