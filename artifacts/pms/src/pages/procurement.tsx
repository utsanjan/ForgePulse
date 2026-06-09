import { useState } from "react";
import { format } from "date-fns";
import {
  useGetProcurementSummary,
  useGetPurchaseOrders,
  useGetSuppliers,
  useGetSpendAnalytics,
} from "@workspace/forgepulse-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#f43f5e", "#6366f1", "#8b5cf6"];

export default function Procurement() {
  const [activeTab, setActiveTab] = useState("po");

  const { data: summary, isLoading: isLoadingSummary } = useGetProcurementSummary();
  const { data: poData, isLoading: isLoadingPo } = useGetPurchaseOrders();
  const { data: suppliersData, isLoading: isLoadingSuppliers } = useGetSuppliers();
  const { data: spendData, isLoading: isLoadingSpend } = useGetSpendAnalytics();

  const getPoStatusColor = (status: string) => {
    switch (status) {
      case "Received": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Approved": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Draft": return "bg-slate-100 text-slate-800 border-slate-200";
      case "Cancelled": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Procurement</h2>
          <p className="text-slate-500">Manage suppliers, purchase orders, and spending.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 shrink-0">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-slate-900">{summary?.totalSuppliers}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Active POs</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-blue-600">{summary?.activeOrders}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-amber-600">{summary?.pendingApprovals}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Spend YTD</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-slate-900">${summary?.totalSpendYtd.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Savings YTD</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-emerald-600">${summary?.savingsYtd.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
          <TabsTrigger value="po" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Purchase Orders
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="spend" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Spend Analytics
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 mt-6 overflow-hidden">
          <TabsContent value="po" className="h-full m-0 flex flex-col gap-4">
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>PO Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Expected Delivery</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingPo ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 6 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : poData?.items.map((po) => (
                      <TableRow key={po.id}>
                        <TableCell className="font-medium text-slate-900">{po.poNumber}</TableCell>
                        <TableCell>{po.supplierName}</TableCell>
                        <TableCell>{format(new Date(po.orderDate), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{format(new Date(po.expectedDelivery), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="text-right font-medium">${po.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPoStatusColor(po.status)}>
                            {po.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="h-full m-0 flex flex-col gap-4">
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Supplier Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingSuppliers ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 6 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : suppliersData?.items.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium text-slate-900">{supplier.supplierCode}</TableCell>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.category}</TableCell>
                        <TableCell>{supplier.country}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{supplier.rating}/5</span>
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600" style={{ width: `${(supplier.rating / 5) * 100}%` }} />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            supplier.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                          }>
                            {supplier.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="spend" className="h-full m-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <Card className="shadow-sm flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-800">Monthly Spend Trend</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-[300px]">
                  {isLoadingSpend ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={spendData?.monthlyTrend || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-800">Spend by Category</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-[300px]">
                  {isLoadingSpend ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={spendData?.byCategory || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="amount"
                          nameKey="category"
                        >
                          {(spendData?.byCategory || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
