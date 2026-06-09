import { useState } from "react";
import { format } from "date-fns";
import {
  useGetWorkforceSummary,
  useGetEmployees,
  useGetAttendance,
  useGetDepartmentUtilization,
} from "@workspace/forgepulse-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Workforce() {
  const [activeTab, setActiveTab] = useState("directory");

  const { data: summary, isLoading: isLoadingSummary } = useGetWorkforceSummary();
  const { data: employeesData, isLoading: isLoadingEmployees } = useGetEmployees();
  const { data: attendanceData, isLoading: isLoadingAttendance } = useGetAttendance();
  const { data: utilizationData, isLoading: isLoadingUtilization } = useGetDepartmentUtilization();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "On Leave": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Inactive": return "bg-slate-100 text-slate-800 border-slate-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Workforce Management</h2>
          <p className="text-slate-500">Manage employees, attendance, and department utilization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 shrink-0">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Total Employees</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-slate-900">{summary?.totalEmployees}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Present Today</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-emerald-600">{summary?.presentToday}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">On Leave</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-amber-600">{summary?.onLeave}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Avg Productivity</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-blue-600">{summary?.avgProductivity}%</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-slate-500">Labor Utilization</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-slate-900">{summary?.laborUtilization}%</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
          <TabsTrigger value="directory" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Employee Directory
          </TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Attendance Records
          </TabsTrigger>
          <TabsTrigger value="utilization" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-6">
            Department Utilization
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 mt-6 overflow-hidden">
          <TabsContent value="directory" className="h-full m-0 flex flex-col gap-4">
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Productivity</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingEmployees ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 7 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : employeesData?.items.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell className="font-mono text-xs text-slate-500">{emp.employeeId}</TableCell>
                        <TableCell className="font-medium text-slate-900">{emp.name}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>{emp.position}</TableCell>
                        <TableCell>{emp.shift}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 w-8">{emp.productivity || 0}%</span>
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${(emp.productivity || 0) > 85 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                style={{ width: `${emp.productivity || 0}%` }} 
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(emp.status)}>
                            {emp.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="h-full m-0 flex flex-col gap-4">
            <Card className="flex-1 overflow-hidden flex flex-col shadow-sm">
              <div className="overflow-auto flex-1">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Employee Name</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead className="text-right">Hours Worked</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingAttendance ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 7 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : attendanceData?.map((att) => (
                      <TableRow key={att.id}>
                        <TableCell>{format(new Date(att.date), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="font-medium text-slate-900">{att.employeeName}</TableCell>
                        <TableCell>{att.shift}</TableCell>
                        <TableCell className="font-mono text-xs">{att.checkIn || '-'}</TableCell>
                        <TableCell className="font-mono text-xs">{att.checkOut || '-'}</TableCell>
                        <TableCell className="text-right">{att.hoursWorked}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            att.status === 'Present' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            att.status === 'Late' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-rose-100 text-rose-800 border-rose-200'
                          }>
                            {att.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="utilization" className="h-full m-0">
            <Card className="h-full shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-slate-800">Department Utilization</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-[400px]">
                {isLoadingUtilization ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={utilizationData || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                      <Bar dataKey="utilization" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={60} name="Utilization %" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
