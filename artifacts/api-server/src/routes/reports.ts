import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

// Production Report — Monthly Summary (May 2025)
// Figures based on PEW post-PMS data (Report Table 6.3 & 7.2)
router.get("/production", async (_req, res) => {
  try {
    res.json({
      summary: {
        totalProduction: 125430,
        targetProduction: 130000,
        achievement: 96.48,
        totalDowntime: 142.5,
        avgOee: 79.8,
        defectRate: 1.74,
      },
      departmentBreakdown: [
        { department: "Machining",   planned: 40000, actual: 38200, achievement: 95.5,  oee: 86.1, defectRate: 1.9, downtime: 45.5 },
        { department: "Assembly",    planned: 50000, actual: 48900, achievement: 97.8,  oee: 88.3, defectRate: 1.6, downtime: 32.0 },
        { department: "Paint Shop",  planned: 20000, actual: 19100, achievement: 95.5,  oee: 85.4, defectRate: 2.2, downtime: 22.0 },
        { department: "Quality Control", planned: 10000, actual: 9800, achievement: 98.0, oee: 92.5, defectRate: 1.0, downtime: 10.5 },
        { department: "Packing",     planned: 10000, actual: 9430,  achievement: 94.3,  oee: 83.0, defectRate: 2.1, downtime: 12.0 },
      ],
    });
  } catch (err) {
    logger.error({ err }, "Production report error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Executive Summary — PEW company data (Report Chapters 7 & 8)
// Revenue: INR 850 Lakhs/year (₹8.5 Cr) per Report Section 8.2
router.get("/executive-summary", async (_req, res) => {
  try {
    res.json({
      revenue: 85000000,          // INR 850 Lakhs = ₹8.5 Crore
      revenueGrowth: 14.1,        // New contracts won post-PMS
      productionVolume: 125430,
      qualityIndex: 98.26,        // 100 - defect rate 1.74%
      onTimeDelivery: 93.8,
      inventoryValue: 24560000,   // ₹2,45,60,000
      employeeCount: 20,
      highlights: [
        "OEE improved from 62.3% to 79.8% (+28.1%) after PMS implementation",
        "On-time delivery rate jumped from 71.4% to 93.8% — target ≥95%",
        "Defect rate reduced by 54.5%: from 3.82% to 1.74% — below 2% target",
        "Inventory turnover improved from 4.2x to 6.8x, releasing ₹85 Lakhs working capital",
        "Total annual cost savings of ₹143.6 Lakhs — ROI of 278% in Year 1",
        "Customer quality complaints reduced from 8.3 to 2.1 per month (−74.7%)",
      ],
    });
  } catch (err) {
    logger.error({ err }, "Executive summary error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Before vs After KPI Comparison — Report Table 7.2
router.get("/kpi-comparison", async (_req, res) => {
  try {
    res.json([
      { kpi: "On-Time Delivery Rate",          prePms: "71.4%",    postPms: "93.8%",   change: "+31.4%",  target: "≥ 95%",  status: "improving" },
      { kpi: "Overall Equipment Effectiveness", prePms: "62.3%",    postPms: "79.8%",   change: "+28.1%",  target: "≥ 85%",  status: "improving" },
      { kpi: "Production Schedule Adherence",   prePms: "68.5%",    postPms: "91.2%",   change: "+33.1%",  target: "≥ 95%",  status: "improving" },
      { kpi: "Defect Rate",                     prePms: "3.82%",    postPms: "1.74%",   change: "−54.5%",  target: "< 2%",   status: "achieved" },
      { kpi: "First Pass Yield",                prePms: "82.4%",    postPms: "94.6%",   change: "+14.8%",  target: "≥ 95%",  status: "improving" },
      { kpi: "Inventory Turnover Ratio",        prePms: "4.2x/yr",  postPms: "6.8x/yr", change: "+61.9%",  target: "≥ 7x",   status: "improving" },
      { kpi: "Inventory Holding Cost (₹L/mo)",  prePms: "18.4",     postPms: "14.9",    change: "−19.0%",  target: "< 15",   status: "achieved" },
      { kpi: "Production Downtime (% time)",    prePms: "11.8%",    postPms: "6.2%",    change: "−47.5%",  target: "< 5%",   status: "improving" },
      { kpi: "Avg Production Cycle Time (hrs)", prePms: "7.4 hrs",  postPms: "5.1 hrs", change: "−31.1%",  target: "< 4 hrs", status: "improving" },
      { kpi: "Forecast Accuracy (MAPE)",        prePms: "N/A",      postPms: "8.3%",    change: "New",     target: "< 10%",  status: "achieved" },
    ]);
  } catch (err) {
    logger.error({ err }, "KPI comparison error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cost Reduction Analysis — Report Table 7.3
router.get("/cost-analysis", async (_req, res) => {
  try {
    res.json({
      items: [
        { category: "Inventory Holding Cost",    prePms: 220.8, postPms: 178.8, savings: 42.0,  reduction: 19.0 },
        { category: "Rework and Scrap Cost",     prePms: 62.4,  postPms: 28.7,  savings: 33.7,  reduction: 54.0 },
        { category: "Unplanned Maintenance",     prePms: 38.5,  postPms: 21.2,  savings: 17.3,  reduction: 44.9 },
        { category: "Overtime Cost",             prePms: 54.0,  postPms: 31.5,  savings: 22.5,  reduction: 41.7 },
        { category: "Manual Reporting Labour",   prePms: 12.8,  postPms: 3.2,   savings: 9.6,   reduction: 75.0 },
        { category: "Emergency Procurement",     prePms: 28.3,  postPms: 9.8,   savings: 18.5,  reduction: 65.4 },
      ],
      totalPrePms: 416.8,
      totalPostPms: 273.2,
      totalSavings: 143.6,
      totalReduction: 34.5,
      roi: 278,
      implementationCost: 38,
    });
  } catch (err) {
    logger.error({ err }, "Cost analysis error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Demand Forecast — Holt-Winters Triple Exponential Smoothing (MAPE: 8.3%)
// Based on PEW production volumes with seasonal pattern
router.get("/forecast", async (_req, res) => {
  try {
    const data = [
      { month: "Jul'24",  actual: 9500,  forecast: 9480,  upperBound: 9955,  lowerBound: 9005 },
      { month: "Aug'24",  actual: 9900,  forecast: 9780,  upperBound: 10269, lowerBound: 9291 },
      { month: "Sep'24",  actual: 10100, forecast: 10050, upperBound: 10553, lowerBound: 9548 },
      { month: "Oct'24",  actual: 10200, forecast: 10320, upperBound: 10836, lowerBound: 9804 },
      { month: "Nov'24",  actual: 10350, forecast: 10490, upperBound: 11015, lowerBound: 9966 },
      { month: "Dec'24",  actual: 10490, forecast: 10650, upperBound: 11183, lowerBound: 10118 },
      { month: "Jan'25",  actual: 10300, forecast: 10200, upperBound: 10710, lowerBound: 9690 },
      { month: "Feb'25",  actual: 10450, forecast: 10380, upperBound: 10899, lowerBound: 9861 },
      { month: "Mar'25",  actual: 10600, forecast: 10560, upperBound: 11088, lowerBound: 10032 },
      { month: "Apr'25",  actual: 10750, forecast: 10720, upperBound: 11256, lowerBound: 10184 },
      { month: "May'25",  actual: 10850, forecast: 10880, upperBound: 11424, lowerBound: 10336 },
      { month: "Jun'25",  actual: null,  forecast: 11040, upperBound: 11592, lowerBound: 10488 },
      { month: "Jul'25",  actual: null,  forecast: 11200, upperBound: 11760, lowerBound: 10640 },
      { month: "Aug'25",  actual: null,  forecast: 11350, upperBound: 11918, lowerBound: 10783 },
      { month: "Sep'25",  actual: null,  forecast: 11500, upperBound: 12075, lowerBound: 10925 },
      { month: "Oct'25",  actual: null,  forecast: 11640, upperBound: 12222, lowerBound: 11058 },
      { month: "Nov'25",  actual: null,  forecast: 11780, upperBound: 12369, lowerBound: 11191 },
      { month: "Dec'25",  actual: null,  forecast: 11920, upperBound: 12516, lowerBound: 11324 },
    ];
    res.json(data);
  } catch (err) {
    logger.error({ err }, "Forecast error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
