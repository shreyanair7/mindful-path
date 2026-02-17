import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { MessageCircle, TrendingUp, Heart } from "lucide-react";
import { motion } from "framer-motion";

const stressLevels = ["Low", "Moderate", "High"] as const;
const stressColors = {
  Low: "bg-success text-success-foreground",
  Moderate: "bg-warning text-warning-foreground",
  High: "bg-destructive text-destructive-foreground",
};

const Dashboard = () => {
  const { user } = useAuth();
  const stressLevel: typeof stressLevels[number] = "Moderate";
  const greeting = user?.name ? `Hi, ${user.name}` : "Welcome back";

  const actions = [
    { to: "/companion", label: "Open AI Companion", icon: MessageCircle, desc: "Talk through what's on your mind" },
    { to: "/progress", label: "View Progress", icon: TrendingUp, desc: "Check your wellness trends" },
    { to: "/exercises", label: "Try a Coping Exercise", icon: Heart, desc: "Guided breathing & grounding" },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-foreground">{greeting}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's your wellness snapshot for today.</p>

        {/* Stress card */}
        <div className="mt-6 rounded-lg border border-border bg-card p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Today's Stress Level</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${stressColors[stressLevel]}`}>
                  {stressLevel}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            You're doing okay. Remember to take short breaks and stay hydrated throughout the day.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.to}
                to={a.to}
                className="group rounded-lg border border-border bg-card p-4 shadow-subtle transition-shadow hover:shadow-card"
              >
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{a.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.desc}</p>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Dashboard;
