import { useState } from "react";
import {
  useGetProductionReport,
  useGetExecutiveSummary,
  useGetForecast,
} from "@workspace/forgepulse-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, ComposedChart, BarChart, Bar, Legend,
} from "recharts";
import {
  Download, FileText, CheckCircle2, ArrowUpRight, Package,
  TrendingUp, Users, TrendingDown, IndianRupee, Award, Target,
} from "lucide-react";

const MONTHS = ["Jan-2025","Feb-2025","Mar-2025","Apr-2025","May-2025","Jun-2025","Jul-2025","Aug-2025","Sep-2025","Oct-2025","Nov-2025","Dec-2025"];
const DEPARTMENTS = ["All Departments","Machining","Assembly","Paint Shop","Quality Control","Packing"];

// Before vs After KPI data from Report Table 7.2 — PEW Case Study
const KPI_COMPARISON = [
  { kpi: "On-Time Delivery Rate",            prePms: "71.4%",    postPms: "93.8%",   change: "+31.4%",  target: "≥ 95%",    status: "improving" },
  { kpi: "Overall Equipment Effectiveness",  prePms: "62.3%",    postPms: "79.8%",   change: "+28.1%",  target: "≥ 85%",    status: "improving" },
  { kpi: "Production Schedule Adherence",    prePms: "68.5%",    postPms: "91.2%",   change: "+33.1%",  target: "≥ 95%",    status: "improving" },
  { kpi: "Defect Rate",                      prePms: "3.82%",    postPms: "1.74%",   change: "−54.5%",  target: "< 2%",     status: "achieved"  },
  { kpi: "First Pass Yield (FPY)",           prePms: "82.4%",    postPms: "94.6%",   change: "+14.8%",  target: "≥ 95%",    status: "improving" },
  { kpi: "Inventory Turnover Ratio",         prePms: "4.2x/yr",  postPms: "6.8x/yr", change: "+61.9%",  target: "≥ 7x/yr",  status: "improving" },
  { kpi: "Inventory Holding Cost (₹L/mo)",   prePms: "₹18.4 L",  postPms: "₹14.9 L", change: "−19.0%",  target: "< ₹15 L",  status: "achieved"  },
  { kpi: "Production Downtime (% of time)",  prePms: "11.8%",    postPms: "6.2%",    change: "−47.5%",  target: "< 5%",     status: "improving" },
  { kpi: "Avg Production Cycle Time (hrs)",  prePms: "7.4 hrs",  postPms: "5.1 hrs", change: "−31.1%",  target: "< 4 hrs",  status: "improving" },
  { kpi: "Forecast Accuracy (MAPE)",         prePms: "N/A",      postPms: "8.3%",    change: "New",     target: "< 10%",    status: "achieved"  },
];

// Cost Reduction Analysis from Report Table 7.3
const COST_DATA = [
  { category: "Inventory Holding",   prePms: 220.8, postPms: 178.8, savings: 42.0,  reduction: 19.0 },
  { category: "Rework & Scrap",      prePms: 62.4,  postPms: 28.7,  savings: 33.7,  reduction: 54.0 },
  { category: "Unplanned Maint.",    prePms: 38.5,  postPms: 21.2,  savings: 17.3,  reduction: 44.9 },
  { category: "Overtime Cost",       prePms: 54.0,  postPms: 31.5,  savings: 22.5,  reduction: 41.7 },
  { category: "Manual Reporting",    prePms: 12.8,  postPms: 3.2,   savings: 9.6,   reduction: 75.0 },
  { category: "Emergency Procure.",  prePms: 28.3,  postPms: 9.8,   savings: 18.5,  reduction: 65.4 },
];

// OEE component breakdown from Report Section 7.4
const OEE_COMPONENTS = [
  { component: "Availability",   prePms: 76.1, postPms: 88.4, target: 90.0 },
  { component: "Performance",    prePms: 82.3, postPms: 90.4, target: 93.0 },
  { component: "Quality Rate",   prePms: 99.4, postPms: 99.6, target: 99.8 },
  { component: "OEE (overall)",  prePms: 62.3, postPms: 79.8, target: 85.0 },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("production");
  const [reportType, setReportType] = useState("Monthly Summary");
  const [month, setMonth] = useState("May-2025");
  const [department, setDepartment] = useState("All Departments");

  const { data: execSummary, isLoading: isLoadingExec } = useGetExecutiveSummary();
  const { data: prodReport, isLoading: isLoadingProd } = useGetProductionReport();
  const { data: forecast, isLoading: isLoadingForecast } = useGetForecast();

  return (
    <div className="flex flex-col gap-5 h-full">
      <h2 className="text-xl font-bold text-slate-800">Reports &amp; Analytics</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full justify-start border-b rounded-none h-10 bg-transparent p-0 shrink-0">
          {[
            ["production", "Production Report"],
            ["executive",  "Executive Summary"],
            ["impact",     "PMS Impact"],
            ["forecast",   "Demand Forecast"],
          ].map(([val, label]) => (
            <TabsTrigger key={val} value={val}
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 rounded-none h-full px-5 text-sm font-medium">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Production Report ── */}
        <TabsContent value="production" className="flex-1 m-0 mt-4 flex flex-col gap-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">Production Report - Monthly Summary</h3>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-44 h-8 text-sm bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Monthly Summary","Weekly Summary","Quarterly Summary"].map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-36 h-8 text-sm bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>{MONTHS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>

              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-44 h-8 text-sm bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>

              <Button size="sm" className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm gap-2">
                <FileText className="h-3.5 w-3.5" /> Generate Report
              </Button>
              <Button size="sm" variant="outline" className="h-8 px-4 text-sm gap-2 bg-white">
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
              {[
                { label: "Total Production (Units)", value: prodReport?.summary?.totalProduction?.toLocaleString("en-IN") ?? "1,25,430", color: "text-slate-900" },
                { label: "Target Production (Units)", value: prodReport?.summary?.targetProduction?.toLocaleString("en-IN") ?? "1,30,000", color: "text-slate-900" },
                { label: "Achievement (%)", value: `${prodReport?.summary?.achievement ?? "96.48"}%`, color: "text-blue-600" },
                { label: "Total Downtime (Hrs)", value: `${prodReport?.summary?.totalDowntime ?? "142.50"}`, color: "text-amber-600" },
                { label: "Avg OEE (%)", value: `${prodReport?.summary?.avgOee ?? "79.8"}%`, color: "text-emerald-600" },
                { label: "Defect Rate (%)", value: `${prodReport?.summary?.defectRate ?? "1.74"}%`, color: "text-red-600" },
              ].map(({ label, value, color }) => (
                <div key={label} className="border border-slate-200 rounded-lg px-4 py-3 bg-slate-50/50">
                  <div className="text-xs text-slate-500 mb-1 leading-tight">{label}</div>
                  {isLoadingProd
                    ? <Skeleton className="h-6 w-20" />
                    : <div className={`text-lg font-bold ${color}`}>{value}</div>}
                </div>
              ))}
            </div>

            {/* Department Wise table */}
            <div className="font-semibold text-sm text-slate-700 mb-2">Department Wise Production Summary</div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    {["Department","Planned Production","Actual Production","Achievement (%)","OEE (%)","Defect Rate (%)","Downtime (Hrs)"].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold text-slate-600 whitespace-nowrap py-2">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingProd
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>{Array.from({ length: 7 }).map((_, j) => <TableCell key={j} className="py-2"><Skeleton className="h-4 w-full" /></TableCell>)}</TableRow>
                      ))
                    : (prodReport?.departmentBreakdown ?? [
                        { department: "Machining",       planned: 40000, actual: 38200, achievement: 95.50, oee: 86.10, defectRate: 1.90, downtime: 45.50 },
                        { department: "Assembly",        planned: 50000, actual: 48900, achievement: 97.80, oee: 88.30, defectRate: 1.60, downtime: 32.00 },
                        { department: "Paint Shop",      planned: 20000, actual: 19100, achievement: 95.50, oee: 85.40, defectRate: 2.20, downtime: 22.00 },
                        { department: "Quality Control", planned: 10000, actual: 9800,  achievement: 98.00, oee: 92.50, defectRate: 1.00, downtime: 10.50 },
                        { department: "Packing",         planned: 10000, actual: 9430,  achievement: 94.30, oee: 83.00, defectRate: 2.10, downtime: 12.00 },
                      ]).map((dept) => (
                        <TableRow key={dept.department} className="text-xs hover:bg-slate-50">
                          <TableCell className="py-2 font-medium text-slate-800">{dept.department}</TableCell>
                          <TableCell className="py-2 text-right">{dept.planned.toLocaleString("en-IN")}</TableCell>
                          <TableCell className="py-2 text-right">{dept.actual.toLocaleString("en-IN")}</TableCell>
                          <TableCell className="py-2 text-right text-blue-600">{dept.achievement.toFixed(1)}%</TableCell>
                          <TableCell className="py-2 text-right">{dept.oee}%</TableCell>
                          <TableCell className="py-2 text-right text-red-600">{dept.defectRate}%</TableCell>
                          <TableCell className="py-2 text-right text-amber-600">{dept.downtime}</TableCell>
                        </TableRow>
                      ))}
                  {!isLoadingProd && (
                    <TableRow className="text-xs font-bold bg-slate-100 border-t-2 border-slate-300">
                      <TableCell className="py-2 text-slate-900">Total</TableCell>
                      <TableCell className="py-2 text-right">1,30,000</TableCell>
                      <TableCell className="py-2 text-right">1,25,430</TableCell>
                      <TableCell className="py-2 text-right text-blue-700">96.48%</TableCell>
                      <TableCell className="py-2 text-right">79.8%</TableCell>
                      <TableCell className="py-2 text-right text-red-700">1.74%</TableCell>
                      <TableCell className="py-2 text-right text-amber-700">122.00</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* ── Executive Summary ── */}
        <TabsContent value="executive" className="m-0 mt-4 overflow-y-auto pr-1 pb-6">
          {/* Company banner */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg p-5 mb-5 text-white">
            <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">Case Study Company</div>
            <div className="text-xl font-bold">Precision Engineering Works Pvt. Ltd.</div>
            <div className="text-sm text-slate-300 mt-1">Medium-scale engineering manufacturer · Pune, India · Annual Revenue: ₹850 Lakhs</div>
            <div className="mt-3 text-xs text-blue-200">
              PMS implemented Oct 2024 — Phase 1: Core Modules (Months 1–3) · Phase 2: Quality &amp; Procurement (Months 4–6) · Phase 3: Analytics (Months 7–9)
            </div>
          </div>

          {/* Top KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { label: "Annual Revenue",       value: "₹850 Lakhs",  sub: "+14.1% (new contracts)", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "On-Time Delivery",      value: "93.8%",        sub: "Target ≥ 95%",           icon: Target,      color: "text-blue-600",    bg: "bg-blue-50"   },
              { label: "Annual Cost Savings",   value: "₹143.6 L",    sub: "ROI: 278% in Year 1",    icon: TrendingDown, color: "text-purple-600",  bg: "bg-purple-50" },
              { label: "Quality Index (FPY)",   value: "94.6%",        sub: "Target ≥ 95%",           icon: Award,       color: "text-amber-600",   bg: "bg-amber-50"  },
            ].map(({ label, value, sub, icon: Icon, color, bg }) => (
              <Card key={label} className="shadow-sm">
                <CardContent className="p-4">
                  <div className={`inline-flex p-2 rounded-lg ${bg} mb-3`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className={`text-2xl font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-slate-400 mt-1">{sub}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Key Highlights */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">Key Performance Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingExec
                  ? <div className="space-y-4"><Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-5/6" /><Skeleton className="h-5 w-4/5" /></div>
                  : (
                    <ul className="space-y-3">
                      {(execSummary?.highlights ?? [
                        "OEE improved from 62.3% to 79.8% (+28.1%) after PMS implementation",
                        "On-time delivery rate jumped from 71.4% to 93.8% — target ≥95%",
                        "Defect rate reduced by 54.5%: from 3.82% to 1.74% — below 2% target",
                        "Inventory turnover improved from 4.2x to 6.8x, releasing ₹85 Lakhs working capital",
                        "Total annual cost savings of ₹143.6 Lakhs — ROI of 278% in Year 1",
                        "Customer quality complaints reduced from 8.3 to 2.1 per month (−74.7%)",
                      ]).map((h, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Production Volume", value: "1,25,430 units", sub: "May 2025", icon: Package, color: "text-slate-900" },
                { label: "Inventory Value",   value: "₹2.46 Cr",      sub: "Current stock", icon: IndianRupee, color: "text-slate-900" },
                { label: "OEE",               value: "79.8%",          sub: "Target ≥ 85%",  icon: TrendingUp, color: "text-emerald-600" },
                { label: "Total Workforce",   value: "20 employees",   sub: "PMS active users", icon: Users, color: "text-slate-900" },
              ].map(({ label, value, sub, icon: Icon, color }) => (
                <Card key={label} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-medium text-slate-500">{label}</span>
                    </div>
                    <div className={`text-xl font-bold ${color}`}>{value}</div>
                    <div className="text-xs text-slate-400 mt-1">{sub}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional context */}
          <Card className="mt-5 shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700">Business Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-emerald-50 rounded-lg p-3">
                  <div className="font-semibold text-emerald-800 mb-1">Revenue Enablement</div>
                  <div className="text-emerald-700">New contracts won through improved OTD &amp; quality — est. ₹120 Lakhs new annual revenue</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="font-semibold text-blue-800 mb-1">Working Capital Released</div>
                  <div className="text-blue-700">Inventory turnover improvement (4.2x → 6.8x) freed ≈₹85 Lakhs previously tied in excess stock</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="font-semibold text-purple-800 mb-1">Margin Improvement</div>
                  <div className="text-purple-700">₹143.6 L savings on ₹850 L revenue = +1.7 percentage point margin improvement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── PMS Impact (Before vs After) ── */}
        <TabsContent value="impact" className="m-0 mt-4 overflow-y-auto pr-1 pb-6 flex flex-col gap-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-lg p-5 text-white">
            <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">Capstone Case Study — Precision Engineering Works Pvt. Ltd.</div>
            <div className="text-xl font-bold mb-1">PMS Implementation Impact Analysis</div>
            <div className="text-sm text-blue-200">
              Pre-PMS period: Jul–Dec 2023 (6-month avg) · Post-PMS period: Oct 2024–Mar 2025 (6-month avg, after 1-month stabilisation)
            </div>
            <div className="mt-3 flex flex-wrap gap-4">
              {[
                { label: "Cost Savings", val: "₹143.6 L/yr" },
                { label: "ROI (Year 1)", val: "278%" },
                { label: "OEE Gain",     val: "+28.1%" },
                { label: "OTD Gain",     val: "+31.4%" },
              ].map(({ label, val }) => (
                <div key={label} className="bg-white/10 rounded-lg px-3 py-2">
                  <div className="text-xs text-blue-200">{label}</div>
                  <div className="text-base font-bold">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Before vs After KPI table */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700">
                Before vs. After KPI Comparison <span className="text-xs font-normal text-slate-400 ml-2">— Report Table 7.2</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 pl-5 w-[35%]">KPI</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-center">Pre-PMS (6-mo avg)</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-center">Post-PMS (6-mo avg)</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-center">% Change</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-center">Target Benchmark</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-center pr-5">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {KPI_COMPARISON.map((row) => (
                      <TableRow key={row.kpi} className="text-xs hover:bg-slate-50">
                        <TableCell className="py-2.5 pl-5 font-medium text-slate-800">{row.kpi}</TableCell>
                        <TableCell className="py-2.5 text-center text-red-600 font-medium">{row.prePms}</TableCell>
                        <TableCell className="py-2.5 text-center text-emerald-700 font-bold">{row.postPms}</TableCell>
                        <TableCell className="py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            row.change.startsWith("+") ? "bg-emerald-100 text-emerald-700" :
                            row.change.startsWith("−") ? "bg-blue-100 text-blue-700" :
                            "bg-slate-100 text-slate-600"
                          }`}>{row.change}</span>
                        </TableCell>
                        <TableCell className="py-2.5 text-center text-slate-500">{row.target}</TableCell>
                        <TableCell className="py-2.5 text-center pr-5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            row.status === "achieved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {row.status === "achieved" ? "✓ Achieved" : "↑ Improving"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Cost Reduction + OEE breakdown side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Cost Reduction table */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Cost Reduction Analysis <span className="text-xs font-normal text-slate-400 ml-1">— Table 7.3 (₹ Lakhs/year)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 pl-4">Category</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-right">Pre-PMS</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-right">Post-PMS</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-right">Savings</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-600 py-2 text-right pr-4">Cut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COST_DATA.map((row) => (
                      <TableRow key={row.category} className="text-xs hover:bg-slate-50">
                        <TableCell className="py-2 pl-4 text-slate-700">{row.category}</TableCell>
                        <TableCell className="py-2 text-right text-red-600">₹{row.prePms}</TableCell>
                        <TableCell className="py-2 text-right text-emerald-700">₹{row.postPms}</TableCell>
                        <TableCell className="py-2 text-right font-semibold text-blue-700">₹{row.savings}</TableCell>
                        <TableCell className="py-2 text-right pr-4">
                          <span className="text-xs font-bold text-emerald-600">−{row.reduction}%</span>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="text-xs font-bold bg-slate-100 border-t-2 border-slate-300">
                      <TableCell className="py-2.5 pl-4 text-slate-900">Total</TableCell>
                      <TableCell className="py-2.5 text-right text-red-700">₹416.8</TableCell>
                      <TableCell className="py-2.5 text-right text-emerald-700">₹273.2</TableCell>
                      <TableCell className="py-2.5 text-right text-blue-800">₹143.6</TableCell>
                      <TableCell className="py-2.5 text-right pr-4 text-emerald-700">−34.5%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="px-4 py-3 bg-blue-50 rounded-b-lg border-t border-blue-100">
                  <div className="text-xs text-blue-700 font-medium">
                    Implementation cost: ₹38 Lakhs · Annual savings: ₹143.6 Lakhs ·{" "}
                    <span className="font-bold">ROI = 278%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OEE Component Breakdown bar chart */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  OEE Component Breakdown <span className="text-xs font-normal text-slate-400 ml-1">— Report Section 7.4</span>
                </CardTitle>
                <CardDescription className="text-xs">Availability × Performance × Quality Rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={OEE_COMPONENTS} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="component" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[55, 100]} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
                        formatter={(val: number) => [`${val}%`]}
                      />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="prePms"  name="Pre-PMS"  fill="#fca5a5" radius={[4,4,0,0]} />
                      <Bar dataKey="postPms" name="Post-PMS" fill="#34d399" radius={[4,4,0,0]} />
                      <Bar dataKey="target"  name="Target"   fill="#93c5fd" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {OEE_COMPONENTS.map((c) => (
                    <div key={c.component} className="flex items-center gap-3 text-xs">
                      <span className="text-slate-500 w-28 shrink-0">{c.component}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-emerald-500"
                          style={{ width: `${Math.min(c.postPms, 100)}%` }}
                        />
                      </div>
                      <span className="text-slate-500 w-12 text-right">{c.postPms}%</span>
                      <span className="text-slate-300">→</span>
                      <span className="text-slate-400 w-12 text-right">{c.target}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost savings bar chart */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700">Annual Cost: Pre-PMS vs Post-PMS (₹ Lakhs)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={COST_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} unit="L" />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
                    formatter={(val: number) => [`₹${val} Lakhs`]}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="prePms"  name="Pre-PMS Cost"  fill="#fca5a5" radius={[4,4,0,0]} />
                  <Bar dataKey="postPms" name="Post-PMS Cost" fill="#34d399" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Survey findings */}
          <Card className="shadow-sm border-amber-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700">
                Primary Research Findings <span className="text-xs font-normal text-slate-400 ml-1">— Survey of 50 Manufacturing Companies, India</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { stat: "68%", label: "report frequent production schedule deviations due to poor planning" },
                  { stat: "74%", label: "face simultaneous stockout and excess inventory situations" },
                  { stat: "62%", label: "maintain production, quality and inventory data in disconnected systems" },
                  { stat: "58%", label: "perform quality checks reactively (post-production), not proactively" },
                  { stat: "Only 24%", label: "have any form of advanced analytics or BI tools deployed" },
                  { stat: "81%", label: "spend 5+ hours/week manually compiling production reports" },
                ].map(({ stat, label }) => (
                  <div key={stat} className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <div className="text-2xl font-bold text-amber-700 mb-1">{stat}</div>
                    <div className="text-xs text-amber-800">{label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Demand Forecast ── */}
        <TabsContent value="forecast" className="m-0 mt-4 flex-1 flex flex-col gap-4 pb-4">
          <Card className="shadow-sm flex flex-col flex-1">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-800">Demand Forecast vs Actuals</CardTitle>
              <CardDescription>
                Holt-Winters Triple Exponential Smoothing model · MAPE = 8.3% (target &lt;10%) ·
                Historical actuals (Jul 2024 – May 2025) with 6-month projection and 95% confidence band.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[400px]">
              {isLoadingForecast
                ? <Skeleton className="h-full w-full" />
                : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={forecast || []} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} domain={[8000, 13000]} />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
                        formatter={(val: number | null, name: string) => {
                          if (val === null) return ["—", name];
                          if (name === "lowerBound" || name === "upperBound") return [`${val.toLocaleString()} units`, "Confidence Band"];
                          return [`${val.toLocaleString()} units`, name === "actual" ? "Actual Demand" : "Forecast (HW-TES)"];
                        }}
                      />
                      <Area type="monotone" dataKey="upperBound" stroke="none" fill="#e0e7ff" opacity={0.5} />
                      <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#ffffff" opacity={1} />
                      <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      <Line type="monotone" dataKey="actual"   name="Actual"   stroke="#0f172a" strokeWidth={3} dot={{ r: 4 }} connectNulls={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
            </CardContent>
          </Card>

          {/* Forecast accuracy info */}
          <Card className="shadow-sm border-indigo-100">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Forecasting Method",   value: "Holt-Winters TES" },
                  { label: "MAPE",                 value: "8.3%", note: "Target < 10%" },
                  { label: "Projection Horizon",   value: "6 months" },
                  { label: "Forecast vs Target",   value: "✓ On Track" },
                ].map(({ label, value, note }) => (
                  <div key={label} className="bg-indigo-50 rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">{label}</div>
                    <div className="text-base font-bold text-indigo-700">{value}</div>
                    {note && <div className="text-xs text-slate-400 mt-0.5">{note}</div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
