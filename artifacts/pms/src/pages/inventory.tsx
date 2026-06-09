import { useState } from "react";
import {
  useGetInventoryItems,
  useGetInventorySummary,
} from "@workspace/forgepulse-client-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";

const CATEGORIES = [
  "All Categories","Raw Materials","Finished Goods","WIP","MRO Supplies","Packaging","Chemicals",
];
const WAREHOUSES_LIST = [
  "All Warehouses","WH-01 Main Store","WH-02 Raw Materials","WH-03 Finished Goods","WH-04 MRO Store",
];

function StatusCell({ status }: { status: string }) {
  if (status === "Low Stock") return <span className="text-xs font-semibold text-red-600">Low Stock</span>;
  if (status === "Out of Stock") return <span className="text-xs font-semibold text-red-700">Out of Stock</span>;
  return <span className="text-xs font-semibold text-green-600">OK</span>;
}

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("overview");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");

  const { data: summary, isLoading: isLoadingSummary } = useGetInventorySummary();
  const { data: inventoryData, isLoading: isLoadingInventory } = useGetInventoryItems();

  const filteredItems = (inventoryData?.items || []).filter((item) => {
    const catOk = categoryFilter === "All Categories" || item.category === categoryFilter;
    const whOk = warehouseFilter === "All Warehouses" || item.warehouse === warehouseFilter;
    return catOk && whOk;
  });

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Inventory Management</h2>
        <Button variant="outline" size="sm" className="gap-2 bg-white">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 px-5 py-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">Total Inventory Value</div>
          {isLoadingSummary ? <Skeleton className="h-7 w-32" /> : (
            <div className="text-xl font-bold text-slate-900">₹{(summary?.totalValue ?? 0).toLocaleString("en-IN")}</div>
          )}
        </div>
        <div className="bg-white rounded-lg border border-slate-200 px-5 py-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">Total Items</div>
          {isLoadingSummary ? <Skeleton className="h-7 w-20" /> : (
            <div className="text-xl font-bold text-slate-900">{(summary?.totalItems ?? 0).toLocaleString()}</div>
          )}
        </div>
        <div className="bg-white rounded-lg border border-slate-200 px-5 py-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">Low Stock Items</div>
          {isLoadingSummary ? <Skeleton className="h-7 w-16" /> : (
            <div className="text-xl font-bold text-red-600">{summary?.lowStockItems ?? 0}</div>
          )}
        </div>
        <div className="bg-white rounded-lg border border-slate-200 px-5 py-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">Pending GRN</div>
          {isLoadingSummary ? <Skeleton className="h-7 w-16" /> : (
            <div className="text-xl font-bold text-slate-900">{summary?.pendingGrn ?? 0}</div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full justify-start border-b rounded-none h-10 bg-transparent p-0 shrink-0">
          {(["overview","ledger","reorder","transfers"] as const).map((tab, i) => {
            const labels = ["Stock Overview","Stock Ledger","Reorder Management","Stock Transfers"];
            return (
              <TabsTrigger key={tab} value={tab}
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 rounded-none h-full px-5 text-sm font-medium">
                {labels[i]}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="overview" className="flex-1 m-0 mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-44 h-8 text-sm bg-white"><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
              <SelectTrigger className="w-48 h-8 text-sm bg-white"><SelectValue /></SelectTrigger>
              <SelectContent>{WAREHOUSES_LIST.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
            </Select>
            <Button size="sm" className="h-8 px-5 text-sm bg-blue-600 hover:bg-blue-700 text-white">View</Button>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="overflow-auto flex-1">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    {["Item Code","Item Description","Category","Warehouse","UOM","On Hand Qty","Reserved Qty","Available Qty","Unit Cost (₹)","Total Value (₹)","Status"].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold text-slate-600 whitespace-nowrap py-2">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingInventory
                    ? Array.from({ length: 7 }).map((_, i) => (
                        <TableRow key={i}>{Array.from({ length: 11 }).map((_, j) => <TableCell key={j} className="py-2"><Skeleton className="h-4 w-full" /></TableCell>)}</TableRow>
                      ))
                    : filteredItems.map((item) => {
                        const available = item.onHandQty - item.reservedQty;
                        const totalValue = item.onHandQty * item.unitCost;
                        return (
                          <TableRow key={item.id} className="hover:bg-slate-50 text-xs">
                            <TableCell className="font-medium text-slate-900 whitespace-nowrap py-2">{item.itemCode}</TableCell>
                            <TableCell className="text-slate-700 py-2">{item.description}</TableCell>
                            <TableCell className="text-slate-600 py-2">{item.category}</TableCell>
                            <TableCell className="text-slate-600 whitespace-nowrap py-2">{item.warehouse}</TableCell>
                            <TableCell className="text-right text-slate-600 py-2">{item.uom}</TableCell>
                            <TableCell className="text-right font-medium py-2">{item.onHandQty.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-slate-600 py-2">{item.reservedQty.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-medium py-2">{available.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-slate-700 py-2">{item.unitCost.toLocaleString("en-IN")}</TableCell>
                            <TableCell className="text-right font-medium text-slate-800 py-2">{totalValue.toLocaleString("en-IN")}</TableCell>
                            <TableCell className="py-2"><StatusCell status={item.status} /></TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </div>
            <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>Showing 1 to {filteredItems.length} of {filteredItems.length} entries</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50">Previous</button>
                <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-medium">1</span>
                <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50">Next</button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ledger" className="m-0 mt-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-10 text-center text-slate-400 text-sm">Stock Ledger — coming soon</div>
        </TabsContent>

        <TabsContent value="reorder" className="m-0 mt-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {["Item Code","Item Description","UOM","On Hand Qty","Reorder Point","Safety Stock","Status"].map((h) => (
                    <TableHead key={h} className="text-xs font-semibold text-slate-600 whitespace-nowrap py-2">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingInventory
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>{Array.from({ length: 7 }).map((_, j) => <TableCell key={j} className="py-2"><Skeleton className="h-4 w-full" /></TableCell>)}</TableRow>
                    ))
                  : (inventoryData?.items || []).filter((i) => i.onHandQty <= i.reorderPoint).map((item) => (
                      <TableRow key={item.id} className="hover:bg-slate-50 text-xs">
                        <TableCell className="font-medium py-2">{item.itemCode}</TableCell>
                        <TableCell className="py-2">{item.description}</TableCell>
                        <TableCell className="py-2">{item.uom}</TableCell>
                        <TableCell className="text-right py-2">{item.onHandQty}</TableCell>
                        <TableCell className="text-right py-2">{item.reorderPoint}</TableCell>
                        <TableCell className="text-right py-2">{item.safetyStock}</TableCell>
                        <TableCell className="py-2"><StatusCell status={item.status} /></TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="transfers" className="m-0 mt-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-10 text-center text-slate-400 text-sm">Stock Transfers — coming soon</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
