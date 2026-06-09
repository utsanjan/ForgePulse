import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

// Post-PMS KPIs from Case Study: Precision Engineering Works Pvt. Ltd. (PEW)
// Source: Capstone Report Table 7.2 — Post-implementation 6-month averages
router.get("/kpis", async (_req, res) => {
  try {
    res.json({
      oee: 79.8,              // Post-PMS: 79.8% (was 62.3% pre-PMS, +28.1%)
      oeeChange: 5.4,
      productionEfficiency: 91.2,  // Schedule adherence post-PMS
      productionEfficiencyChange: 4.8,
      onTimeDelivery: 93.8,   // Post-PMS: 93.8% (was 71.4%, +31.4%)
      onTimeDeliveryChange: 6.2,
      defectRate: 1.74,       // Post-PMS: 1.74% (was 3.82%, -54.5%)
      defectRateChange: -0.5,
      inventoryTurnover: 6.8, // Post-PMS: 6.8x (was 4.2x, +61.9%)
      inventoryTurnoverChange: 1.1,
      monthlyProduction: 125430,
      monthlyProductionChange: 3.8,
      pendingOrders: 128,
    });
  } catch (err) {
    logger.error({ err }, "Dashboard KPIs error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Production output chart — showing realistic ramp post-PMS implementation
// PMS deployed Oct 2024; data reflects Jul 2023 – Jun 2025 trajectory
router.get("/production-chart", async (_req, res) => {
  try {
    const data = [
      { month: "Jan", actual: 8800,  target: 9500 },
      { month: "Feb", actual: 9200,  target: 9500 },
      { month: "Mar", actual: 9000,  target: 9500 },
      { month: "Apr", actual: 9400,  target: 9800 },
      { month: "May", actual: 9600,  target: 9800 },
      { month: "Jun", actual: 9800,  target: 9800 },
      { month: "Jul", actual: 9500,  target: 10000 },
      { month: "Aug", actual: 9900,  target: 10000 },
      { month: "Sep", actual: 10100, target: 10000 },
      { month: "Oct", actual: 10200, target: 10200 },  // PMS go-live
      { month: "Nov", actual: 10350, target: 10200 },
      { month: "Dec", actual: 10490, target: 10200 },
    ];
    res.json(data);
  } catch (err) {
    logger.error({ err }, "Production chart error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// OEE Trend — showing improvement from 62.3% (pre-PMS) to 79.8% (post-PMS)
// Report Table 7.2: OEE improved by +28.1% after PMS
router.get("/oee-trend", async (_req, res) => {
  try {
    const data = [
      { month: "Jan", oee: 63.1 },
      { month: "Feb", oee: 62.8 },
      { month: "Mar", oee: 61.9 },
      { month: "Apr", oee: 63.5 },
      { month: "May", oee: 64.2 },
      { month: "Jun", oee: 63.8 },
      { month: "Jul", oee: 65.4 },  // gradual improvement starts
      { month: "Aug", oee: 68.2 },
      { month: "Sep", oee: 70.5 },
      { month: "Oct", oee: 73.8 },  // PMS go-live
      { month: "Nov", oee: 77.1 },
      { month: "Dec", oee: 79.8 },
    ];
    res.json(data);
  } catch (err) {
    logger.error({ err }, "OEE trend error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Inventory by Category — values in INR (total ₹2,45,60,000 approx)
router.get("/inventory-by-category", async (_req, res) => {
  try {
    res.json([
      { name: "Raw Materials", value: 10320000, percentage: 42 },
      { name: "WIP",           value: 5650000,  percentage: 23 },
      { name: "Finished Goods", value: 4920000, percentage: 20 },
      { name: "MRO Supplies",  value: 3690000,  percentage: 15 },
    ]);
  } catch (err) {
    logger.error({ err }, "Inventory by category error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Defect reasons — Pareto (3 types account for 71% of defects per Chapter 7)
router.get("/defect-reasons", async (_req, res) => {
  try {
    res.json([
      { reason: "Misalignment",    count: 32, percentage: 32 },
      { reason: "Surface Finish",  count: 24, percentage: 24 },
      { reason: "Dimension Error", count: 18, percentage: 18 },
      { reason: "Material Defect", count: 14, percentage: 14 },
      { reason: "Other",           count: 12, percentage: 12 },
    ]);
  } catch (err) {
    logger.error({ err }, "Defect reasons error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/alerts", async (_req, res) => {
  try {
    res.json([
      { id: 1, type: "Inventory",    message: "Steel Coil (RM-001) below reorder point — raise PR", severity: "High",   createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 2, type: "Production",   message: "Work Order WO-2025-1003 delayed by 2 hours on WC-Assm-01", severity: "Medium", createdAt: new Date(Date.now() - 7200000).toISOString() },
      { id: 3, type: "Quality",      message: "Defect rate exceeded 2% threshold on Assembly Line 2", severity: "Critical", createdAt: new Date(Date.now() - 10800000).toISOString() },
      { id: 4, type: "Maintenance",  message: "CNC Machine WC-Mach-01 predictive alert — vibration anomaly", severity: "High",   createdAt: new Date(Date.now() - 14400000).toISOString() },
      { id: 5, type: "Procurement",  message: "PO-2025-008 from Tata Steel delivery delayed by 3 days", severity: "Medium", createdAt: new Date(Date.now() - 18000000).toISOString() },
    ]);
  } catch (err) {
    logger.error({ err }, "Alerts error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/recent-activity", async (_req, res) => {
  try {
    res.json([
      { id: 1, module: "Production",  user: "Rajesh Kumar",    description: "approved Work Order WO-2025-1005 — Gear Assembly A (500 units)", timestamp: new Date(Date.now() - 1800000).toISOString() },
      { id: 2, module: "Inventory",   user: "Mary Chen",       description: "completed stock count adjustment for RM-003 Copper Wire (+50 KG)", timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 3, module: "Quality",     user: "Priya Sharma",    description: "closed CAPA for defect D-2024-003 — Copper Wire batch", timestamp: new Date(Date.now() - 5400000).toISOString() },
      { id: 4, module: "Procurement", user: "Arun Singh",      description: "raised PO-2025-010 to SAIL for INR 18,60,000 (3 items)", timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: 5, module: "Quality",     user: "Mohan Das",       description: "logged defect D-2024-008 — Motor Housing porosity on QI-2024-013", timestamp: new Date(Date.now() - 9000000).toISOString() },
      { id: 6, module: "Production",  user: "Suresh Patel",    description: "completed Gear Cutting operation on WO-2024-006 (100%)", timestamp: new Date(Date.now() - 10800000).toISOString() },
    ]);
  } catch (err) {
    logger.error({ err }, "Recent activity error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/capacity-utilization", async (_req, res) => {
  try {
    res.json([
      { department: "Machining",  capacity: 40000, utilized: 38200, utilization: 95.5 },
      { department: "Assembly",   capacity: 50000, utilized: 48900, utilization: 97.8 },
      { department: "Paint Shop", capacity: 20000, utilized: 19100, utilization: 95.5 },
      { department: "Quality",    capacity: 10000, utilized: 9800,  utilization: 98.0 },
      { department: "Packing",    capacity: 10000, utilized: 9430,  utilization: 94.3 },
    ]);
  } catch (err) {
    logger.error({ err }, "Capacity utilization error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
