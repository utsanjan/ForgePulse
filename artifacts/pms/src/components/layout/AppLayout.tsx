import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Factory,
  Package,
  ShieldCheck,
  ShoppingCart,
  Users,
  LineChart,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/production", label: "Production Planning", icon: Factory },
    { href: "/inventory", label: "Inventory Management", icon: Package },
    { href: "/quality", label: "Quality Control", icon: ShieldCheck },
    { href: "/procurement", label: "Procurement", icon: ShoppingCart },
    { href: "/workforce", label: "Workforce Management", icon: Users },
    { href: "/reports", label: "Reports & Analytics", icon: LineChart },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside className="w-56 flex flex-col shrink-0 bg-slate-950 text-slate-100">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 gap-3 border-b border-slate-900">
          <div className="h-9 w-9 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm tracking-wide shrink-0">
            FP
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">ForgePulse</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">Operations</div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 flex flex-col overflow-y-auto">
          {navItems.map((item) => {
            const active = location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm font-medium rounded-r-xl ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-auto px-4 pb-4">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3 flex-1">
            <Menu className="h-5 w-5 text-slate-500 cursor-pointer" />
            <div>
              <p className="text-sm font-semibold text-slate-800">ForgePulse</p>
              <p className="text-xs text-slate-500">Real-time production visibility</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.[0] || "A"}
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">{user?.name || "Admin User"}</div>
              <div className="text-[11px] text-slate-500">{user?.role ?? "Plant Supervisor"}</div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
