import { useState } from "react";
import { format } from "date-fns";
import {
  useGetQualitySummary,
  useGetInspections,
  useGetDefects,
  useGetDefectTrend,
  useGetSupplierQualityScores,
} from "@workspace/forgepulse-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Quality() {
  const [activeTab, setActiveTab] = useState("inspections");

  const { data: summary, isLoading: isLoadingSummary } = useGetQualitySummary();
  const { data: inspections, isLoading: isLoadingInspections } = useGetInspections();
  const { data: defects, isLoading: isLoadingDefects } = useGetDefects();
  const { data: trendData, isLoading: isLoadingTrend } = useGetDefectTrend();
  const { data: supplierScores, isLoading: isLoadingScores } = useGetSupplierQualityScores();

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quality Control</h2>
          <p className="text-slate-500">Monitor inspections, defects, and quality trends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 shrink-0">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Inspections</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-slate-900">{summary?.totalInspections.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-emerald-600">{summary?.passRate}%</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Defect Rate</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-rose-600">{summary?.defectRate}%</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Open CAPAs</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-amber-600">{summary?.openCapas}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Avg Resolution</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-slate-900">{summary?.avgResolutionDays} <span className="text-sm font-normal text-slate-500">days</span></div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
          <TabsTrigger value="inspections" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Inspections
          </TabsTrigger>
          <TabsTrigger value="defects" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Defect Log
          </TabsTrigger>
          <TabsTrigger value="spc" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            SPC Charts
          </TabsTrigger>
          <TabsTrigger value="supplier" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Supplier Quality
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 mt-6 overflow-hidden">
          <TabsContent value="inspections" className="h-full m-0 flex flex-col gap-4">
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Inspection #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingInspections ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 7 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : inspections?.map((insp) => (
                      <TableRow key={insp.id}>
                        <TableCell className="font-medium text-slate-900">{insp.inspectionNumber}</TableCell>
                        <TableCell>{format(new Date(insp.date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{insp.product}</TableCell>
                        <TableCell className="font-mono text-xs">{insp.batch}</TableCell>
                        <TableCell>{insp.inspector}</TableCell>
                        <TableCell>{insp.type}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            insp.status === 'Pass' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            insp.status === 'Fail' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                            'bg-slate-100 text-slate-800 border-slate-200'
                          }>
                            {insp.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="defects" className="h-full m-0 flex flex-col gap-4">
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Defect Code</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingDefects ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 6 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : defects?.map((defect) => (
                      <TableRow key={defect.id}>
                        <TableCell className="font-medium text-slate-900">{defect.defectCode}</TableCell>
                        <TableCell>{format(new Date(defect.date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{defect.product}</TableCell>
                        <TableCell>{defect.type}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            defect.severity === 'Critical' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                            defect.severity === 'Major' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-blue-100 text-blue-800 border-blue-200'
                          }>
                            {defect.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{defect.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="spc" className="h-full m-0">
            <Card className="h-full shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-slate-800">Defect Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-[400px]">
                {isLoadingTrend ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                      <Area type="monotone" dataKey="defectRate" name="Defect Rate %" stroke="#ef4444" fill="#fecdd3" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplier" className="h-full m-0 flex flex-col gap-4">
             <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">Quality Score</TableHead>
                      <TableHead className="text-right">Delivery Score</TableHead>
                      <TableHead className="text-right">Price Score</TableHead>
                      <TableHead className="text-right">Overall Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingScores ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : supplierScores?.map((score) => (
                      <TableRow key={score.supplier}>
                        <TableCell className="font-medium text-slate-900">{score.supplier}</TableCell>
                        <TableCell className="text-right">{score.qualityScore}</TableCell>
                        <TableCell className="text-right">{score.deliveryScore}</TableCell>
                        <TableCell className="text-right">{score.priceScore}</TableCell>
                        <TableCell className="text-right font-bold text-blue-600">{score.overallScore}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
