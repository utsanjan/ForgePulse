import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AbcItem, ActivityItem, Alert, AttendanceRecord, AuthResponse, CapacityPoint, CategoryValue, DashboardKpis, Defect, DefectReason, DefectTrendPoint, DepartmentSummary, DepartmentUtilization, Employee, EmployeeInput, ExecutiveSummary, ForecastPoint, GetEmployeesParams, GetInspectionsParams, GetInventoryItemsParams, GetProductionOrdersParams, GetProductionReportParams, GetPurchaseOrdersParams, GetSuppliersParams, GetWorkOrdersParams, HealthStatus, Inspection, InspectionInput, InventoryItem, InventoryItemInput, InventoryItemList, InventoryItemUpdate, InventorySummary, LoginInput, OeeTrendPoint, ProcurementSummary, ProductionChartPoint, ProductionOrder, ProductionOrderInput, ProductionOrderList, ProductionOrderUpdate, ProductionReport, PurchaseOrder, PurchaseOrderInput, PurchaseOrderUpdate, QualitySummary, ScheduleItem, SpendAnalytics, Supplier, SupplierInput, SupplierScore, User, Warehouse, WorkOrder, WorkOrderInput, WorkforceSummary } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getLoginUrl: () => string;
/**
 * @summary Login
 */
export declare const login: (loginInput: LoginInput, options?: RequestInit) => Promise<AuthResponse>;
export declare const getLoginMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: BodyType<LoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
    data: BodyType<LoginInput>;
}, TContext>;
export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>;
export type LoginMutationBody = BodyType<LoginInput>;
export type LoginMutationError = ErrorType<void>;
/**
* @summary Login
*/
export declare const useLogin: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: BodyType<LoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof login>>, TError, {
    data: BodyType<LoginInput>;
}, TContext>;
export declare const getGetMeUrl: () => string;
/**
 * @summary Get current user
 */
export declare const getMe: (options?: RequestInit) => Promise<User>;
export declare const getGetMeQueryKey: () => readonly ["/api/auth/me"];
export declare const getGetMeQueryOptions: <TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>;
export type GetMeQueryError = ErrorType<unknown>;
/**
 * @summary Get current user
 */
export declare function useGetMe<TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDashboardKpisUrl: () => string;
/**
 * @summary Get dashboard KPI metrics
 */
export declare const getDashboardKpis: (options?: RequestInit) => Promise<DashboardKpis>;
export declare const getGetDashboardKpisQueryKey: () => readonly ["/api/dashboard/kpis"];
export declare const getGetDashboardKpisQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardKpis>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardKpis>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardKpis>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardKpisQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardKpis>>>;
export type GetDashboardKpisQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard KPI metrics
 */
export declare function useGetDashboardKpis<TData = Awaited<ReturnType<typeof getDashboardKpis>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardKpis>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProductionChartUrl: () => string;
/**
 * @summary Get production output vs target chart data
 */
export declare const getProductionChart: (options?: RequestInit) => Promise<ProductionChartPoint[]>;
export declare const getGetProductionChartQueryKey: () => readonly ["/api/dashboard/production-chart"];
export declare const getGetProductionChartQueryOptions: <TData = Awaited<ReturnType<typeof getProductionChart>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionChart>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProductionChart>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductionChartQueryResult = NonNullable<Awaited<ReturnType<typeof getProductionChart>>>;
export type GetProductionChartQueryError = ErrorType<unknown>;
/**
 * @summary Get production output vs target chart data
 */
export declare function useGetProductionChart<TData = Awaited<ReturnType<typeof getProductionChart>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionChart>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetOeeTrendUrl: () => string;
/**
 * @summary Get OEE trend data
 */
export declare const getOeeTrend: (options?: RequestInit) => Promise<OeeTrendPoint[]>;
export declare const getGetOeeTrendQueryKey: () => readonly ["/api/dashboard/oee-trend"];
export declare const getGetOeeTrendQueryOptions: <TData = Awaited<ReturnType<typeof getOeeTrend>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOeeTrend>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getOeeTrend>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetOeeTrendQueryResult = NonNullable<Awaited<ReturnType<typeof getOeeTrend>>>;
export type GetOeeTrendQueryError = ErrorType<unknown>;
/**
 * @summary Get OEE trend data
 */
export declare function useGetOeeTrend<TData = Awaited<ReturnType<typeof getOeeTrend>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOeeTrend>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetInventoryByCategoryUrl: () => string;
/**
 * @summary Get inventory value by category
 */
export declare const getInventoryByCategory: (options?: RequestInit) => Promise<CategoryValue[]>;
export declare const getGetInventoryByCategoryQueryKey: () => readonly ["/api/dashboard/inventory-by-category"];
export declare const getGetInventoryByCategoryQueryOptions: <TData = Awaited<ReturnType<typeof getInventoryByCategory>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventoryByCategory>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInventoryByCategory>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInventoryByCategoryQueryResult = NonNullable<Awaited<ReturnType<typeof getInventoryByCategory>>>;
export type GetInventoryByCategoryQueryError = ErrorType<unknown>;
/**
 * @summary Get inventory value by category
 */
export declare function useGetInventoryByCategory<TData = Awaited<ReturnType<typeof getInventoryByCategory>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventoryByCategory>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDefectReasonsUrl: () => string;
/**
 * @summary Get top defect reasons
 */
export declare const getDefectReasons: (options?: RequestInit) => Promise<DefectReason[]>;
export declare const getGetDefectReasonsQueryKey: () => readonly ["/api/dashboard/defect-reasons"];
export declare const getGetDefectReasonsQueryOptions: <TData = Awaited<ReturnType<typeof getDefectReasons>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDefectReasons>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDefectReasons>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDefectReasonsQueryResult = NonNullable<Awaited<ReturnType<typeof getDefectReasons>>>;
export type GetDefectReasonsQueryError = ErrorType<unknown>;
/**
 * @summary Get top defect reasons
 */
export declare function useGetDefectReasons<TData = Awaited<ReturnType<typeof getDefectReasons>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDefectReasons>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDashboardAlertsUrl: () => string;
/**
 * @summary Get dashboard alerts
 */
export declare const getDashboardAlerts: (options?: RequestInit) => Promise<Alert[]>;
export declare const getGetDashboardAlertsQueryKey: () => readonly ["/api/dashboard/alerts"];
export declare const getGetDashboardAlertsQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardAlerts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardAlerts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardAlerts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardAlertsQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardAlerts>>>;
export type GetDashboardAlertsQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard alerts
 */
export declare function useGetDashboardAlerts<TData = Awaited<ReturnType<typeof getDashboardAlerts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardAlerts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetRecentActivityUrl: () => string;
/**
 * @summary Get recent activity feed
 */
export declare const getRecentActivity: (options?: RequestInit) => Promise<ActivityItem[]>;
export declare const getGetRecentActivityQueryKey: () => readonly ["/api/dashboard/recent-activity"];
export declare const getGetRecentActivityQueryOptions: <TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRecentActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getRecentActivity>>>;
export type GetRecentActivityQueryError = ErrorType<unknown>;
/**
 * @summary Get recent activity feed
 */
export declare function useGetRecentActivity<TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetCapacityUtilizationUrl: () => string;
/**
 * @summary Get capacity utilization by department
 */
export declare const getCapacityUtilization: (options?: RequestInit) => Promise<CapacityPoint[]>;
export declare const getGetCapacityUtilizationQueryKey: () => readonly ["/api/dashboard/capacity-utilization"];
export declare const getGetCapacityUtilizationQueryOptions: <TData = Awaited<ReturnType<typeof getCapacityUtilization>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCapacityUtilization>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCapacityUtilization>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCapacityUtilizationQueryResult = NonNullable<Awaited<ReturnType<typeof getCapacityUtilization>>>;
export type GetCapacityUtilizationQueryError = ErrorType<unknown>;
/**
 * @summary Get capacity utilization by department
 */
export declare function useGetCapacityUtilization<TData = Awaited<ReturnType<typeof getCapacityUtilization>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCapacityUtilization>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProductionOrdersUrl: (params?: GetProductionOrdersParams) => string;
/**
 * @summary List production orders
 */
export declare const getProductionOrders: (params?: GetProductionOrdersParams, options?: RequestInit) => Promise<ProductionOrderList>;
export declare const getGetProductionOrdersQueryKey: (params?: GetProductionOrdersParams) => readonly ["/api/production/orders", ...GetProductionOrdersParams[]];
export declare const getGetProductionOrdersQueryOptions: <TData = Awaited<ReturnType<typeof getProductionOrders>>, TError = ErrorType<unknown>>(params?: GetProductionOrdersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProductionOrders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductionOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof getProductionOrders>>>;
export type GetProductionOrdersQueryError = ErrorType<unknown>;
/**
 * @summary List production orders
 */
export declare function useGetProductionOrders<TData = Awaited<ReturnType<typeof getProductionOrders>>, TError = ErrorType<unknown>>(params?: GetProductionOrdersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateProductionOrderUrl: () => string;
/**
 * @summary Create production order
 */
export declare const createProductionOrder: (productionOrderInput: ProductionOrderInput, options?: RequestInit) => Promise<ProductionOrder>;
export declare const getCreateProductionOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProductionOrder>>, TError, {
        data: BodyType<ProductionOrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProductionOrder>>, TError, {
    data: BodyType<ProductionOrderInput>;
}, TContext>;
export type CreateProductionOrderMutationResult = NonNullable<Awaited<ReturnType<typeof createProductionOrder>>>;
export type CreateProductionOrderMutationBody = BodyType<ProductionOrderInput>;
export type CreateProductionOrderMutationError = ErrorType<unknown>;
/**
* @summary Create production order
*/
export declare const useCreateProductionOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProductionOrder>>, TError, {
        data: BodyType<ProductionOrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProductionOrder>>, TError, {
    data: BodyType<ProductionOrderInput>;
}, TContext>;
export declare const getGetProductionOrderUrl: (id: number) => string;
/**
 * @summary Get production order
 */
export declare const getProductionOrder: (id: number, options?: RequestInit) => Promise<ProductionOrder>;
export declare const getGetProductionOrderQueryKey: (id: number) => readonly [`/api/production/orders/${number}`];
export declare const getGetProductionOrderQueryOptions: <TData = Awaited<ReturnType<typeof getProductionOrder>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProductionOrder>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductionOrderQueryResult = NonNullable<Awaited<ReturnType<typeof getProductionOrder>>>;
export type GetProductionOrderQueryError = ErrorType<unknown>;
/**
 * @summary Get production order
 */
export declare function useGetProductionOrder<TData = Awaited<ReturnType<typeof getProductionOrder>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateProductionOrderUrl: (id: number) => string;
/**
 * @summary Update production order
 */
export declare const updateProductionOrder: (id: number, productionOrderUpdate: ProductionOrderUpdate, options?: RequestInit) => Promise<ProductionOrder>;
export declare const getUpdateProductionOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProductionOrder>>, TError, {
        id: number;
        data: BodyType<ProductionOrderUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProductionOrder>>, TError, {
    id: number;
    data: BodyType<ProductionOrderUpdate>;
}, TContext>;
export type UpdateProductionOrderMutationResult = NonNullable<Awaited<ReturnType<typeof updateProductionOrder>>>;
export type UpdateProductionOrderMutationBody = BodyType<ProductionOrderUpdate>;
export type UpdateProductionOrderMutationError = ErrorType<unknown>;
/**
* @summary Update production order
*/
export declare const useUpdateProductionOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProductionOrder>>, TError, {
        id: number;
        data: BodyType<ProductionOrderUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProductionOrder>>, TError, {
    id: number;
    data: BodyType<ProductionOrderUpdate>;
}, TContext>;
export declare const getGetWorkOrdersUrl: (params?: GetWorkOrdersParams) => string;
/**
 * @summary List work orders
 */
export declare const getWorkOrders: (params?: GetWorkOrdersParams, options?: RequestInit) => Promise<WorkOrder[]>;
export declare const getGetWorkOrdersQueryKey: (params?: GetWorkOrdersParams) => readonly ["/api/production/work-orders", ...GetWorkOrdersParams[]];
export declare const getGetWorkOrdersQueryOptions: <TData = Awaited<ReturnType<typeof getWorkOrders>>, TError = ErrorType<unknown>>(params?: GetWorkOrdersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWorkOrders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWorkOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof getWorkOrders>>>;
export type GetWorkOrdersQueryError = ErrorType<unknown>;
/**
 * @summary List work orders
 */
export declare function useGetWorkOrders<TData = Awaited<ReturnType<typeof getWorkOrders>>, TError = ErrorType<unknown>>(params?: GetWorkOrdersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateWorkOrderUrl: () => string;
/**
 * @summary Create work order
 */
export declare const createWorkOrder: (workOrderInput: WorkOrderInput, options?: RequestInit) => Promise<WorkOrder>;
export declare const getCreateWorkOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWorkOrder>>, TError, {
        data: BodyType<WorkOrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createWorkOrder>>, TError, {
    data: BodyType<WorkOrderInput>;
}, TContext>;
export type CreateWorkOrderMutationResult = NonNullable<Awaited<ReturnType<typeof createWorkOrder>>>;
export type CreateWorkOrderMutationBody = BodyType<WorkOrderInput>;
export type CreateWorkOrderMutationError = ErrorType<unknown>;
/**
* @summary Create work order
*/
export declare const useCreateWorkOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWorkOrder>>, TError, {
        data: BodyType<WorkOrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createWorkOrder>>, TError, {
    data: BodyType<WorkOrderInput>;
}, TContext>;
export declare const getGetProductionScheduleUrl: () => string;
/**
 * @summary Get production schedule (Gantt data)
 */
export declare const getProductionSchedule: (options?: RequestInit) => Promise<ScheduleItem[]>;
export declare const getGetProductionScheduleQueryKey: () => readonly ["/api/production/schedule"];
export declare const getGetProductionScheduleQueryOptions: <TData = Awaited<ReturnType<typeof getProductionSchedule>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionSchedule>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProductionSchedule>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductionScheduleQueryResult = NonNullable<Awaited<ReturnType<typeof getProductionSchedule>>>;
export type GetProductionScheduleQueryError = ErrorType<unknown>;
/**
 * @summary Get production schedule (Gantt data)
 */
export declare function useGetProductionSchedule<TData = Awaited<ReturnType<typeof getProductionSchedule>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionSchedule>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProductionSummaryUrl: () => string;
/**
 * @summary Get production summary by department
 */
export declare const getProductionSummary: (options?: RequestInit) => Promise<DepartmentSummary[]>;
export declare const getGetProductionSummaryQueryKey: () => readonly ["/api/production/summary"];
export declare const getGetProductionSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getProductionSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProductionSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductionSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getProductionSummary>>>;
export type GetProductionSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get production summary by department
 */
export declare function useGetProductionSummary<TData = Awaited<ReturnType<typeof getProductionSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetInventoryItemsUrl: (params?: GetInventoryItemsParams) => string;
/**
 * @summary List inventory items
 */
export declare const getInventoryItems: (params?: GetInventoryItemsParams, options?: RequestInit) => Promise<InventoryItemList>;
export declare const getGetInventoryItemsQueryKey: (params?: GetInventoryItemsParams) => readonly ["/api/inventory/items", ...GetInventoryItemsParams[]];
export declare const getGetInventoryItemsQueryOptions: <TData = Awaited<ReturnType<typeof getInventoryItems>>, TError = ErrorType<unknown>>(params?: GetInventoryItemsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventoryItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInventoryItems>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInventoryItemsQueryResult = NonNullable<Awaited<ReturnType<typeof getInventoryItems>>>;
export type GetInventoryItemsQueryError = ErrorType<unknown>;
/**
 * @summary List inventory items
 */
export declare function useGetInventoryItems<TData = Awaited<ReturnType<typeof getInventoryItems>>, TError = ErrorType<unknown>>(params?: GetInventoryItemsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventoryItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateInventoryItemUrl: () => string;
/**
 * @summary Create inventory item
 */
export declare const createInventoryItem: (inventoryItemInput: InventoryItemInput, options?: RequestInit) => Promise<InventoryItem>;
export declare const getCreateInventoryItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInventoryItem>>, TError, {
        data: BodyType<InventoryItemInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createInventoryItem>>, TError, {
    data: BodyType<InventoryItemInput>;
}, TContext>;
export type CreateInventoryItemMutationResult = NonNullable<Awaited<ReturnType<typeof createInventoryItem>>>;
export type CreateInventoryItemMutationBody = BodyType<InventoryItemInput>;
export type CreateInventoryItemMutationError = ErrorType<unknown>;
/**
* @summary Create inventory item
*/
export declare const useCreateInventoryItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInventoryItem>>, TError, {
        data: BodyType<InventoryItemInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createInventoryItem>>, TError, {
    data: BodyType<InventoryItemInput>;
}, TContext>;
export declare const getGetInventoryItemUrl: (id: number) => string;
/**
 * @summary Get inventory item
 */
export declare const getInventoryItem: (id: number, options?: RequestInit) => Promise<InventoryItem>;
export declare const getGetInventoryItemQueryKey: (id: number) => readonly [`/api/inventory/items/${number}`];
export declare const getGetInventoryItemQueryOptions: <TData = Awaited<ReturnType<typeof getInventoryItem>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventoryItem>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInventoryItem>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInventoryItemQueryResult = NonNullable<Awaited<ReturnType<typeof getInventoryItem>>>;
export type GetInventoryItemQueryError = ErrorType<unknown>;
/**
 * @summary Get inventory item
 */
export declare function useGetInventoryItem<TData = Awaited<ReturnType<typeof getInventoryItem>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventoryItem>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateInventoryItemUrl: (id: number) => string;
/**
 * @summary Update inventory item
 */
export declare const updateInventoryItem: (id: number, inventoryItemUpdate: InventoryItemUpdate, options?: RequestInit) => Promise<InventoryItem>;
export declare const getUpdateInventoryItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateInventoryItem>>, TError, {
        id: number;
        data: BodyType<InventoryItemUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateInventoryItem>>, TError, {
    id: number;
    data: BodyType<InventoryItemUpdate>;
}, TContext>;
export type UpdateInventoryItemMutationResult = NonNullable<Awaited<ReturnType<typeof updateInventoryItem>>>;
export type UpdateInventoryItemMutationBody = BodyType<InventoryItemUpdate>;
export type UpdateInventoryItemMutationError = ErrorType<unknown>;
/**
* @summary Update inventory item
*/
export declare const useUpdateInventoryItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateInventoryItem>>, TError, {
        id: number;
        data: BodyType<InventoryItemUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateInventoryItem>>, TError, {
    id: number;
    data: BodyType<InventoryItemUpdate>;
}, TContext>;
export declare const getGetInventorySummaryUrl: () => string;
/**
 * @summary Get inventory summary stats
 */
export declare const getInventorySummary: (options?: RequestInit) => Promise<InventorySummary>;
export declare const getGetInventorySummaryQueryKey: () => readonly ["/api/inventory/summary"];
export declare const getGetInventorySummaryQueryOptions: <TData = Awaited<ReturnType<typeof getInventorySummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventorySummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInventorySummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInventorySummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getInventorySummary>>>;
export type GetInventorySummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get inventory summary stats
 */
export declare function useGetInventorySummary<TData = Awaited<ReturnType<typeof getInventorySummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInventorySummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetLowStockItemsUrl: () => string;
/**
 * @summary Get low stock alerts
 */
export declare const getLowStockItems: (options?: RequestInit) => Promise<InventoryItem[]>;
export declare const getGetLowStockItemsQueryKey: () => readonly ["/api/inventory/low-stock"];
export declare const getGetLowStockItemsQueryOptions: <TData = Awaited<ReturnType<typeof getLowStockItems>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLowStockItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getLowStockItems>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetLowStockItemsQueryResult = NonNullable<Awaited<ReturnType<typeof getLowStockItems>>>;
export type GetLowStockItemsQueryError = ErrorType<unknown>;
/**
 * @summary Get low stock alerts
 */
export declare function useGetLowStockItems<TData = Awaited<ReturnType<typeof getLowStockItems>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLowStockItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetAbcAnalysisUrl: () => string;
/**
 * @summary Get ABC analysis data
 */
export declare const getAbcAnalysis: (options?: RequestInit) => Promise<AbcItem[]>;
export declare const getGetAbcAnalysisQueryKey: () => readonly ["/api/inventory/abc-analysis"];
export declare const getGetAbcAnalysisQueryOptions: <TData = Awaited<ReturnType<typeof getAbcAnalysis>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAbcAnalysis>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAbcAnalysis>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAbcAnalysisQueryResult = NonNullable<Awaited<ReturnType<typeof getAbcAnalysis>>>;
export type GetAbcAnalysisQueryError = ErrorType<unknown>;
/**
 * @summary Get ABC analysis data
 */
export declare function useGetAbcAnalysis<TData = Awaited<ReturnType<typeof getAbcAnalysis>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAbcAnalysis>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetWarehousesUrl: () => string;
/**
 * @summary List warehouses
 */
export declare const getWarehouses: (options?: RequestInit) => Promise<Warehouse[]>;
export declare const getGetWarehousesQueryKey: () => readonly ["/api/inventory/warehouses"];
export declare const getGetWarehousesQueryOptions: <TData = Awaited<ReturnType<typeof getWarehouses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWarehouses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWarehouses>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWarehousesQueryResult = NonNullable<Awaited<ReturnType<typeof getWarehouses>>>;
export type GetWarehousesQueryError = ErrorType<unknown>;
/**
 * @summary List warehouses
 */
export declare function useGetWarehouses<TData = Awaited<ReturnType<typeof getWarehouses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWarehouses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetInspectionsUrl: (params?: GetInspectionsParams) => string;
/**
 * @summary List quality inspections
 */
export declare const getInspections: (params?: GetInspectionsParams, options?: RequestInit) => Promise<Inspection[]>;
export declare const getGetInspectionsQueryKey: (params?: GetInspectionsParams) => readonly ["/api/quality/inspections", ...GetInspectionsParams[]];
export declare const getGetInspectionsQueryOptions: <TData = Awaited<ReturnType<typeof getInspections>>, TError = ErrorType<unknown>>(params?: GetInspectionsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInspections>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInspections>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInspectionsQueryResult = NonNullable<Awaited<ReturnType<typeof getInspections>>>;
export type GetInspectionsQueryError = ErrorType<unknown>;
/**
 * @summary List quality inspections
 */
export declare function useGetInspections<TData = Awaited<ReturnType<typeof getInspections>>, TError = ErrorType<unknown>>(params?: GetInspectionsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInspections>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateInspectionUrl: () => string;
/**
 * @summary Create inspection
 */
export declare const createInspection: (inspectionInput: InspectionInput, options?: RequestInit) => Promise<Inspection>;
export declare const getCreateInspectionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInspection>>, TError, {
        data: BodyType<InspectionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createInspection>>, TError, {
    data: BodyType<InspectionInput>;
}, TContext>;
export type CreateInspectionMutationResult = NonNullable<Awaited<ReturnType<typeof createInspection>>>;
export type CreateInspectionMutationBody = BodyType<InspectionInput>;
export type CreateInspectionMutationError = ErrorType<unknown>;
/**
* @summary Create inspection
*/
export declare const useCreateInspection: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInspection>>, TError, {
        data: BodyType<InspectionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createInspection>>, TError, {
    data: BodyType<InspectionInput>;
}, TContext>;
export declare const getGetDefectsUrl: () => string;
/**
 * @summary List defects
 */
export declare const getDefects: (options?: RequestInit) => Promise<Defect[]>;
export declare const getGetDefectsQueryKey: () => readonly ["/api/quality/defects"];
export declare const getGetDefectsQueryOptions: <TData = Awaited<ReturnType<typeof getDefects>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDefects>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDefects>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDefectsQueryResult = NonNullable<Awaited<ReturnType<typeof getDefects>>>;
export type GetDefectsQueryError = ErrorType<unknown>;
/**
 * @summary List defects
 */
export declare function useGetDefects<TData = Awaited<ReturnType<typeof getDefects>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDefects>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDefectTrendUrl: () => string;
/**
 * @summary Get defect trend over time
 */
export declare const getDefectTrend: (options?: RequestInit) => Promise<DefectTrendPoint[]>;
export declare const getGetDefectTrendQueryKey: () => readonly ["/api/quality/defect-trend"];
export declare const getGetDefectTrendQueryOptions: <TData = Awaited<ReturnType<typeof getDefectTrend>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDefectTrend>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDefectTrend>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDefectTrendQueryResult = NonNullable<Awaited<ReturnType<typeof getDefectTrend>>>;
export type GetDefectTrendQueryError = ErrorType<unknown>;
/**
 * @summary Get defect trend over time
 */
export declare function useGetDefectTrend<TData = Awaited<ReturnType<typeof getDefectTrend>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDefectTrend>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetQualitySummaryUrl: () => string;
/**
 * @summary Get quality summary KPIs
 */
export declare const getQualitySummary: (options?: RequestInit) => Promise<QualitySummary>;
export declare const getGetQualitySummaryQueryKey: () => readonly ["/api/quality/summary"];
export declare const getGetQualitySummaryQueryOptions: <TData = Awaited<ReturnType<typeof getQualitySummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getQualitySummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getQualitySummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetQualitySummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getQualitySummary>>>;
export type GetQualitySummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get quality summary KPIs
 */
export declare function useGetQualitySummary<TData = Awaited<ReturnType<typeof getQualitySummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getQualitySummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetSupplierQualityScoresUrl: () => string;
/**
 * @summary Get supplier quality performance scores
 */
export declare const getSupplierQualityScores: (options?: RequestInit) => Promise<SupplierScore[]>;
export declare const getGetSupplierQualityScoresQueryKey: () => readonly ["/api/quality/supplier-scores"];
export declare const getGetSupplierQualityScoresQueryOptions: <TData = Awaited<ReturnType<typeof getSupplierQualityScores>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSupplierQualityScores>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSupplierQualityScores>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSupplierQualityScoresQueryResult = NonNullable<Awaited<ReturnType<typeof getSupplierQualityScores>>>;
export type GetSupplierQualityScoresQueryError = ErrorType<unknown>;
/**
 * @summary Get supplier quality performance scores
 */
export declare function useGetSupplierQualityScores<TData = Awaited<ReturnType<typeof getSupplierQualityScores>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSupplierQualityScores>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetSuppliersUrl: (params?: GetSuppliersParams) => string;
/**
 * @summary List suppliers
 */
export declare const getSuppliers: (params?: GetSuppliersParams, options?: RequestInit) => Promise<Supplier[]>;
export declare const getGetSuppliersQueryKey: (params?: GetSuppliersParams) => readonly ["/api/procurement/suppliers", ...GetSuppliersParams[]];
export declare const getGetSuppliersQueryOptions: <TData = Awaited<ReturnType<typeof getSuppliers>>, TError = ErrorType<unknown>>(params?: GetSuppliersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSuppliers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSuppliers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSuppliersQueryResult = NonNullable<Awaited<ReturnType<typeof getSuppliers>>>;
export type GetSuppliersQueryError = ErrorType<unknown>;
/**
 * @summary List suppliers
 */
export declare function useGetSuppliers<TData = Awaited<ReturnType<typeof getSuppliers>>, TError = ErrorType<unknown>>(params?: GetSuppliersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSuppliers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateSupplierUrl: () => string;
/**
 * @summary Create supplier
 */
export declare const createSupplier: (supplierInput: SupplierInput, options?: RequestInit) => Promise<Supplier>;
export declare const getCreateSupplierMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createSupplier>>, TError, {
        data: BodyType<SupplierInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createSupplier>>, TError, {
    data: BodyType<SupplierInput>;
}, TContext>;
export type CreateSupplierMutationResult = NonNullable<Awaited<ReturnType<typeof createSupplier>>>;
export type CreateSupplierMutationBody = BodyType<SupplierInput>;
export type CreateSupplierMutationError = ErrorType<unknown>;
/**
* @summary Create supplier
*/
export declare const useCreateSupplier: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createSupplier>>, TError, {
        data: BodyType<SupplierInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createSupplier>>, TError, {
    data: BodyType<SupplierInput>;
}, TContext>;
export declare const getGetPurchaseOrdersUrl: (params?: GetPurchaseOrdersParams) => string;
/**
 * @summary List purchase orders
 */
export declare const getPurchaseOrders: (params?: GetPurchaseOrdersParams, options?: RequestInit) => Promise<PurchaseOrder[]>;
export declare const getGetPurchaseOrdersQueryKey: (params?: GetPurchaseOrdersParams) => readonly ["/api/procurement/purchase-orders", ...GetPurchaseOrdersParams[]];
export declare const getGetPurchaseOrdersQueryOptions: <TData = Awaited<ReturnType<typeof getPurchaseOrders>>, TError = ErrorType<unknown>>(params?: GetPurchaseOrdersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPurchaseOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPurchaseOrders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPurchaseOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof getPurchaseOrders>>>;
export type GetPurchaseOrdersQueryError = ErrorType<unknown>;
/**
 * @summary List purchase orders
 */
export declare function useGetPurchaseOrders<TData = Awaited<ReturnType<typeof getPurchaseOrders>>, TError = ErrorType<unknown>>(params?: GetPurchaseOrdersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPurchaseOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreatePurchaseOrderUrl: () => string;
/**
 * @summary Create purchase order
 */
export declare const createPurchaseOrder: (purchaseOrderInput: PurchaseOrderInput, options?: RequestInit) => Promise<PurchaseOrder>;
export declare const getCreatePurchaseOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPurchaseOrder>>, TError, {
        data: BodyType<PurchaseOrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createPurchaseOrder>>, TError, {
    data: BodyType<PurchaseOrderInput>;
}, TContext>;
export type CreatePurchaseOrderMutationResult = NonNullable<Awaited<ReturnType<typeof createPurchaseOrder>>>;
export type CreatePurchaseOrderMutationBody = BodyType<PurchaseOrderInput>;
export type CreatePurchaseOrderMutationError = ErrorType<unknown>;
/**
* @summary Create purchase order
*/
export declare const useCreatePurchaseOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPurchaseOrder>>, TError, {
        data: BodyType<PurchaseOrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createPurchaseOrder>>, TError, {
    data: BodyType<PurchaseOrderInput>;
}, TContext>;
export declare const getUpdatePurchaseOrderUrl: (id: number) => string;
/**
 * @summary Update purchase order status
 */
export declare const updatePurchaseOrder: (id: number, purchaseOrderUpdate: PurchaseOrderUpdate, options?: RequestInit) => Promise<PurchaseOrder>;
export declare const getUpdatePurchaseOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePurchaseOrder>>, TError, {
        id: number;
        data: BodyType<PurchaseOrderUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updatePurchaseOrder>>, TError, {
    id: number;
    data: BodyType<PurchaseOrderUpdate>;
}, TContext>;
export type UpdatePurchaseOrderMutationResult = NonNullable<Awaited<ReturnType<typeof updatePurchaseOrder>>>;
export type UpdatePurchaseOrderMutationBody = BodyType<PurchaseOrderUpdate>;
export type UpdatePurchaseOrderMutationError = ErrorType<unknown>;
/**
* @summary Update purchase order status
*/
export declare const useUpdatePurchaseOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePurchaseOrder>>, TError, {
        id: number;
        data: BodyType<PurchaseOrderUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updatePurchaseOrder>>, TError, {
    id: number;
    data: BodyType<PurchaseOrderUpdate>;
}, TContext>;
export declare const getGetSpendAnalyticsUrl: () => string;
/**
 * @summary Get spend analytics by category and month
 */
export declare const getSpendAnalytics: (options?: RequestInit) => Promise<SpendAnalytics>;
export declare const getGetSpendAnalyticsQueryKey: () => readonly ["/api/procurement/spend-analytics"];
export declare const getGetSpendAnalyticsQueryOptions: <TData = Awaited<ReturnType<typeof getSpendAnalytics>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSpendAnalytics>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSpendAnalytics>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSpendAnalyticsQueryResult = NonNullable<Awaited<ReturnType<typeof getSpendAnalytics>>>;
export type GetSpendAnalyticsQueryError = ErrorType<unknown>;
/**
 * @summary Get spend analytics by category and month
 */
export declare function useGetSpendAnalytics<TData = Awaited<ReturnType<typeof getSpendAnalytics>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSpendAnalytics>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProcurementSummaryUrl: () => string;
/**
 * @summary Get procurement summary KPIs
 */
export declare const getProcurementSummary: (options?: RequestInit) => Promise<ProcurementSummary>;
export declare const getGetProcurementSummaryQueryKey: () => readonly ["/api/procurement/summary"];
export declare const getGetProcurementSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getProcurementSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProcurementSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProcurementSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProcurementSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getProcurementSummary>>>;
export type GetProcurementSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get procurement summary KPIs
 */
export declare function useGetProcurementSummary<TData = Awaited<ReturnType<typeof getProcurementSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProcurementSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetEmployeesUrl: (params?: GetEmployeesParams) => string;
/**
 * @summary List employees
 */
export declare const getEmployees: (params?: GetEmployeesParams, options?: RequestInit) => Promise<Employee[]>;
export declare const getGetEmployeesQueryKey: (params?: GetEmployeesParams) => readonly ["/api/workforce/employees", ...GetEmployeesParams[]];
export declare const getGetEmployeesQueryOptions: <TData = Awaited<ReturnType<typeof getEmployees>>, TError = ErrorType<unknown>>(params?: GetEmployeesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEmployees>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getEmployees>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetEmployeesQueryResult = NonNullable<Awaited<ReturnType<typeof getEmployees>>>;
export type GetEmployeesQueryError = ErrorType<unknown>;
/**
 * @summary List employees
 */
export declare function useGetEmployees<TData = Awaited<ReturnType<typeof getEmployees>>, TError = ErrorType<unknown>>(params?: GetEmployeesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEmployees>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateEmployeeUrl: () => string;
/**
 * @summary Create employee
 */
export declare const createEmployee: (employeeInput: EmployeeInput, options?: RequestInit) => Promise<Employee>;
export declare const getCreateEmployeeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError, {
        data: BodyType<EmployeeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError, {
    data: BodyType<EmployeeInput>;
}, TContext>;
export type CreateEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof createEmployee>>>;
export type CreateEmployeeMutationBody = BodyType<EmployeeInput>;
export type CreateEmployeeMutationError = ErrorType<unknown>;
/**
* @summary Create employee
*/
export declare const useCreateEmployee: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError, {
        data: BodyType<EmployeeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createEmployee>>, TError, {
    data: BodyType<EmployeeInput>;
}, TContext>;
export declare const getGetWorkforceSummaryUrl: () => string;
/**
 * @summary Get workforce summary KPIs
 */
export declare const getWorkforceSummary: (options?: RequestInit) => Promise<WorkforceSummary>;
export declare const getGetWorkforceSummaryQueryKey: () => readonly ["/api/workforce/summary"];
export declare const getGetWorkforceSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getWorkforceSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkforceSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWorkforceSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWorkforceSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getWorkforceSummary>>>;
export type GetWorkforceSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get workforce summary KPIs
 */
export declare function useGetWorkforceSummary<TData = Awaited<ReturnType<typeof getWorkforceSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkforceSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetAttendanceUrl: () => string;
/**
 * @summary Get attendance records
 */
export declare const getAttendance: (options?: RequestInit) => Promise<AttendanceRecord[]>;
export declare const getGetAttendanceQueryKey: () => readonly ["/api/workforce/attendance"];
export declare const getGetAttendanceQueryOptions: <TData = Awaited<ReturnType<typeof getAttendance>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAttendance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAttendance>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAttendanceQueryResult = NonNullable<Awaited<ReturnType<typeof getAttendance>>>;
export type GetAttendanceQueryError = ErrorType<unknown>;
/**
 * @summary Get attendance records
 */
export declare function useGetAttendance<TData = Awaited<ReturnType<typeof getAttendance>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAttendance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDepartmentUtilizationUrl: () => string;
/**
 * @summary Get department labor utilization
 */
export declare const getDepartmentUtilization: (options?: RequestInit) => Promise<DepartmentUtilization[]>;
export declare const getGetDepartmentUtilizationQueryKey: () => readonly ["/api/workforce/department-utilization"];
export declare const getGetDepartmentUtilizationQueryOptions: <TData = Awaited<ReturnType<typeof getDepartmentUtilization>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDepartmentUtilization>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDepartmentUtilization>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDepartmentUtilizationQueryResult = NonNullable<Awaited<ReturnType<typeof getDepartmentUtilization>>>;
export type GetDepartmentUtilizationQueryError = ErrorType<unknown>;
/**
 * @summary Get department labor utilization
 */
export declare function useGetDepartmentUtilization<TData = Awaited<ReturnType<typeof getDepartmentUtilization>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDepartmentUtilization>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProductionReportUrl: (params?: GetProductionReportParams) => string;
/**
 * @summary Get production report data
 */
export declare const getProductionReport: (params?: GetProductionReportParams, options?: RequestInit) => Promise<ProductionReport>;
export declare const getGetProductionReportQueryKey: (params?: GetProductionReportParams) => readonly ["/api/reports/production", ...GetProductionReportParams[]];
export declare const getGetProductionReportQueryOptions: <TData = Awaited<ReturnType<typeof getProductionReport>>, TError = ErrorType<unknown>>(params?: GetProductionReportParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionReport>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProductionReport>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductionReportQueryResult = NonNullable<Awaited<ReturnType<typeof getProductionReport>>>;
export type GetProductionReportQueryError = ErrorType<unknown>;
/**
 * @summary Get production report data
 */
export declare function useGetProductionReport<TData = Awaited<ReturnType<typeof getProductionReport>>, TError = ErrorType<unknown>>(params?: GetProductionReportParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductionReport>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetExecutiveSummaryUrl: () => string;
/**
 * @summary Get executive summary report
 */
export declare const getExecutiveSummary: (options?: RequestInit) => Promise<ExecutiveSummary>;
export declare const getGetExecutiveSummaryQueryKey: () => readonly ["/api/reports/executive-summary"];
export declare const getGetExecutiveSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getExecutiveSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getExecutiveSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getExecutiveSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetExecutiveSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getExecutiveSummary>>>;
export type GetExecutiveSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get executive summary report
 */
export declare function useGetExecutiveSummary<TData = Awaited<ReturnType<typeof getExecutiveSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getExecutiveSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetForecastUrl: () => string;
/**
 * @summary Get demand forecast data
 */
export declare const getForecast: (options?: RequestInit) => Promise<ForecastPoint[]>;
export declare const getGetForecastQueryKey: () => readonly ["/api/reports/forecast"];
export declare const getGetForecastQueryOptions: <TData = Awaited<ReturnType<typeof getForecast>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getForecast>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getForecast>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetForecastQueryResult = NonNullable<Awaited<ReturnType<typeof getForecast>>>;
export type GetForecastQueryError = ErrorType<unknown>;
/**
 * @summary Get demand forecast data
 */
export declare function useGetForecast<TData = Awaited<ReturnType<typeof getForecast>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getForecast>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map