import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, MessageCircle, Heart, TrendingUp, HelpCircle, LogOut } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/companion", label: "Companion", icon: MessageCircle },
  { to: "/exercises", label: "Exercises", icon: Heart },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/help", label: "Help", icon: HelpCircle },
];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/dashboard" className="text-lg font-semibold text-foreground tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            MindAnchor
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
        {/* Mobile nav */}
        <nav className="flex items-center justify-around border-t border-border md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
};

export default AppLayout;
