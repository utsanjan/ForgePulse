import {
  useGetDashboardKpis,
  useGetProductionChart,
  useGetOeeTrend,
  useGetInventoryByCategory,
  useGetDefectReasons,
} from "@workspace/forgepulse-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PIE_COLORS = ["#2563eb", "#3b82f6", "#22c55e", "#f59e0b"];

function ColorKpiCard({
  title,
  value,
  change,
  suffix = "",
  bg,
  loading,
}: {
  title: string;
  value?: number | string;
  change?: number;
  suffix?: string;
  bg: string;
  loading?: boolean;
}) {
  if (loading) return <Skeleton className="h-28 w-full rounded-lg" />;
  const isUp = change !== undefined && change > 0;
  const isDown = change !== undefined && change < 0;

  return (
    <div
      className="rounded-lg px-5 py-4 flex flex-col justify-between h-28 text-white"
      style={{ background: bg }}
    >
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{title}</div>
      <div>
        <div className="text-3xl font-bold leading-tight">
          {value !== undefined ? `${value}${suffix}` : "-"}
        </div>
        {change !== undefined && (
          <div className="flex items-center text-xs mt-1 opacity-90 gap-1">
            {isUp ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : isDown ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : null}
            <span>
              {isDown ? "" : "+"}
              {change}% vs Last Month
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: kpis, isLoading: isLoadingKpis } = useGetDashboardKpis();
  const { data: prodChart, isLoading: isLoadingProdChart } = useGetProductionChart();
  const { data: oeeTrend, isLoading: isLoadingOeeTrend } = useGetOeeTrend();
  const { data: invCategory, isLoading: isLoadingInvCategory } = useGetInventoryByCategory();
  const { data: defectReasons, isLoading: isLoadingDefectReasons } = useGetDefectReasons();

  const pendingOrders = kpis?.pendingOrders ?? 128;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-slate-800">Production Planning Dashboard</h2>

      {/* 4 Colored KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ColorKpiCard
          title="OEE"
          value={kpis?.oee ?? 87.2}
          suffix="%"
          change={kpis?.oeeChange ?? 5.4}
          bg="#1a2340"
          loading={isLoadingKpis}
        />
        <ColorKpiCard
          title="On-Time Delivery"
          value={kpis?.onTimeDelivery ?? 94.6}
          suffix="%"
          change={kpis?.onTimeDeliveryChange ?? 6.2}
          bg="#16a34a"
          loading={isLoadingKpis}
        />
        <ColorKpiCard
          title="Defect Rate"
          value={kpis?.defectRate ?? 1.8}
          suffix="%"
          change={kpis?.defectRateChange ?? -0.5}
          bg="#dc2626"
          loading={isLoadingKpis}
        />
        <ColorKpiCard
          title="Inventory Turnover"
          value={kpis?.inventoryTurnover ?? 8.4}
          suffix="x"
          change={kpis?.inventoryTurnoverChange ?? 1.1}
          bg="#7c3aed"
          loading={isLoadingKpis}
        />
      </div>

      {/* Charts row 1: Production vs Target + OEE Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 shadow-sm border border-slate-200">
          <CardHeader className="py-3 px-5 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Production Output vs Target (Units)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="h-[240px]">
              {isLoadingProdChart ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prodChart || []}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: 11, paddingTop: "12px" }}
                    />
                    <Bar
                      dataKey="actual"
                      name="Actual Output"
                      fill="#2563eb"
                      radius={[3, 3, 0, 0]}
                      maxBarSize={30}
                    />
                    <Bar
                      dataKey="target"
                      name="Target Output"
                      fill="#93c5fd"
                      radius={[3, 3, 0, 0]}
                      maxBarSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="py-3 px-5 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Overall Equipment Effectiveness (OEE) Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="h-[240px]">
              {isLoadingOeeTrend ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={oeeTrend || []}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      dy={8}
                    />
                    <YAxis
                      domain={[60, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [`${v}%`, "OEE"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="oee"
                      name="OEE %"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ r: 3, strokeWidth: 2, fill: "#fff", stroke: "#2563eb" }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2: Defect Reasons + Inventory by Category + Pending Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top 5 Defect Reasons */}
        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="py-3 px-5 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Top 5 Defect Reasons (Pareto)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="h-[200px]">
              {isLoadingDefectReasons ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={defectReasons || []}
                    layout="vertical"
                    margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      vertical={true}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <YAxis
                      dataKey="reason"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#475569" }}
                      width={88}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      formatter={(v: number) => [`${v}%`, "Share"]}
                      contentStyle={{
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="count" fill="#2563eb" radius={[0, 3, 3, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Value by Category */}
        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="py-3 px-5 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Inventory Value by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="h-[200px]">
              {isLoadingInvCategory ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invCategory || []}
                      cx="40%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {(invCategory || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]}
                      contentStyle={{
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ fontSize: 11 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Orders Gauge */}
        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="py-3 px-5 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold text-slate-700">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[260px]">
              <div className="relative mx-auto" style={{ width: 200, height: 100, top: 30}}>
                <svg viewBox="0 0 240 120" className="w-full h-full overflow-visible">
                  <path
                    d="M 20 100 A 100 100 0 0 1 220 100"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 100 A 100 100 0 0 1 220 100"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="20"
                    strokeLinecap="round"
                    pathLength="1"
                    strokeDasharray={`${Math.min(Math.round((pendingOrders / 200) * 100), 100) / 100} 1`}
                  />
                </svg>
                <div className="absolute inset-x-0 top-10 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900 leading-none">{pendingOrders}</span>
                  <span className="text-sm text-slate-500 mt-1">Orders</span>
                </div>
              </div>
              <div className="flex justify-between mt-7 px-10 text-xs text-slate-400">
                <span>0</span>
                <span>200</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
