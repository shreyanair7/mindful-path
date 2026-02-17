import AppLayout from "@/components/AppLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingDown, Smile, Moon } from "lucide-react";
import { motion } from "framer-motion";

const data = [
  { day: "Mon", stress: 65 },
  { day: "Tue", stress: 58 },
  { day: "Wed", stress: 72 },
  { day: "Thu", stress: 55 },
  { day: "Fri", stress: 48 },
  { day: "Sat", stress: 40 },
  { day: "Sun", stress: 35 },
];

const insights = [
  { icon: TrendingDown, text: "Your stress has decreased by 15% over the past week.", positive: true },
  { icon: Smile, text: "Your mood has been mostly positive this week — keep it up.", positive: true },
  { icon: Moon, text: "Your sleep quality improved on days you used breathing exercises.", positive: true },
];

const Progress = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-xl font-bold text-foreground">Progress & Insights</h1>
        <p className="text-sm text-muted-foreground">Track your wellness trends over time.</p>

        {/* Chart */}
        <div className="mt-6 rounded-lg border border-border bg-card p-5 shadow-subtle">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Stress Level — Past Week</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 16% 89%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215 12% 50%)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(215 12% 50%)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "1px solid hsl(210 16% 89%)",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
              />
              <Line type="monotone" dataKey="stress" stroke="hsl(211 55% 48%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(211 55% 48%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="mt-6 space-y-3">
          {insights.map((ins, i) => {
            const Icon = ins.icon;
            return (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-subtle">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-foreground">{ins.text}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Progress;
