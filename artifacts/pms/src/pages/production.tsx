import { useState } from "react";
import { format } from "date-fns";
import {
  useGetProductionOrders,
  useGetWorkOrders,
  useGetProductionSchedule,
  useGetProductionSummary,
} from "@workspace/forgepulse-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";

export default function Production() {
  const [activeTab, setActiveTab] = useState("orders");
  
  const { data: ordersData, isLoading: isLoadingOrders } = useGetProductionOrders();
  const { data: workOrders, isLoading: isLoadingWorkOrders } = useGetWorkOrders();
  const { data: schedule, isLoading: isLoadingSchedule } = useGetProductionSchedule();
  const { data: summary, isLoading: isLoadingSummary } = useGetProductionSummary();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "In Progress": return "bg-amber-100 text-amber-800 border-amber-200";
      case "On Hold": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-rose-100 text-rose-800 border-rose-200";
      case "Medium": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Production Planning</h2>
          <p className="text-slate-500">Manage production orders, work centers, and schedules.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
          <Plus className="mr-2 h-4 w-4" /> New Production Order
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
          <TabsTrigger value="orders" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Production Orders
          </TabsTrigger>
          <TabsTrigger value="work-orders" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Work Orders
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="summary" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Department Summary
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 mt-6 overflow-hidden">
          <TabsContent value="orders" className="h-full m-0 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Search orders..." className="pl-9 bg-white" />
              </div>
              <Button variant="outline" className="bg-white">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
            
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Planned Start</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingOrders ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 7 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : ordersData?.items.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-slate-900">{order.orderNumber}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{format(new Date(order.plannedStart), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{order.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(order.priority)}>
                            {order.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="work-orders" className="h-full m-0 flex flex-col gap-4">
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>WO #</TableHead>
                      <TableHead>Operation</TableHead>
                      <TableHead>Machine</TableHead>
                      <TableHead>Operator</TableHead>
                      <TableHead>Planned Start</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingWorkOrders ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 7 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : workOrders?.map((wo) => (
                      <TableRow key={wo.id}>
                        <TableCell className="font-medium text-slate-900">{wo.woNumber}</TableCell>
                        <TableCell>{wo.operation}</TableCell>
                        <TableCell>{wo.machine}</TableCell>
                        <TableCell>{wo.operator}</TableCell>
                        <TableCell>{format(new Date(wo.plannedStart), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(wo.status)}>
                            {wo.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${wo.progress || 0}%` }} />
                            </div>
                            <span className="text-xs text-slate-500">{wo.progress || 0}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="h-full m-0">
            <Card className="h-full shadow-sm">
              <CardContent className="p-6 h-full overflow-auto">
                <div className="space-y-6">
                  {isLoadingSchedule ? (
                    <Skeleton className="h-[400px] w-full" />
                  ) : (
                    schedule?.map((item) => {
                      const start = new Date(item.start);
                      const end = new Date(item.end);
                      // Extremely basic Gantt visualization
                      const duration = end.getTime() - start.getTime();
                      const width = Math.max(10, (duration / (1000 * 60 * 60 * 24)) * 20); // 20px per day
                      
                      return (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-48 shrink-0">
                            <p className="text-sm font-medium text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.department}</p>
                          </div>
                          <div className="flex-1 bg-slate-50 h-10 rounded-md relative overflow-hidden border border-slate-100">
                            <div 
                              className={`absolute h-full top-0 ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'} flex items-center px-2`}
                              style={{ left: '0%', width: `${width}px`, minWidth: '100px' }}
                            >
                              <span className="text-[10px] text-white font-medium truncate">
                                {format(start, 'MMM d')} - {format(end, 'MMM d')}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="h-full m-0">
            <Card className="h-full shadow-sm flex flex-col overflow-hidden">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Planned</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead className="text-right">Achievement</TableHead>
                      <TableHead className="text-right">OEE</TableHead>
                      <TableHead className="text-right">Defect Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingSummary ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 6 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : summary?.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell className="font-medium text-slate-900">{dept.department}</TableCell>
                        <TableCell className="text-right">{dept.planned.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{dept.actual.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium text-blue-600">{dept.achievement}%</TableCell>
                        <TableCell className="text-right">{dept.oee}%</TableCell>
                        <TableCell className="text-right text-rose-600">{dept.defectRate}%</TableCell>
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
