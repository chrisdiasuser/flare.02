import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Flame, LayoutDashboard, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  return (
    <NavLink
      to={to}
      className={({ isActive: _ }) =>
        cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive ? "text-primary-foreground bg-primary/90" : "text-foreground/70 hover:text-foreground hover:bg-muted",
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default function AppLayout() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#0b225f] to-[#1d4ed8] text-white transition-colors duration-300 dark">
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-blue-900/30 backdrop-blur supports-[backdrop-filter]:bg-blue-900/25 transition-colors duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-white transition-opacity hover:opacity-90">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow">
              <Flame className="h-5 w-5" />
            </span>
            <span className="text-lg text-white">F.L.A.R.E</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1" />
        </div>
      </header>
      <main className="flex-1 transition-opacity duration-300">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-blue-950/30 transition-colors duration-300 text-white/80">
        <div className="container mx-auto py-8 text-sm text-muted-foreground flex items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} F.L.A.R.E Attendance. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#roles" className="hover:text-white">Roles</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
