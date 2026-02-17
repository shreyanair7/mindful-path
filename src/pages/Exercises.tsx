import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Wind, Eye, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Exercise {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: string[];
}

const exercises: Exercise[] = [
  {
    id: "breathing",
    title: "Box Breathing",
    desc: "A simple technique to calm your nervous system in minutes.",
    icon: Wind,
    steps: [
      "Find a comfortable seated position and close your eyes.",
      "Breathe in slowly through your nose for 4 seconds.",
      "Hold your breath gently for 4 seconds.",
      "Exhale slowly through your mouth for 4 seconds.",
      "Hold your breath again for 4 seconds.",
      "Repeat this cycle 4–6 times, or until you feel calmer.",
    ],
  },
  {
    id: "grounding",
    title: "5-4-3-2-1 Grounding",
    desc: "Reconnect with the present moment using your senses.",
    icon: Eye,
    steps: [
      "Look around and name 5 things you can see.",
      "Touch 4 different textures and notice how they feel.",
      "Listen carefully and identify 3 sounds you can hear.",
      "Notice 2 things you can smell right now.",
      "Identify 1 thing you can taste.",
      "Take a deep breath. You are here, in this moment.",
    ],
  },
  {
    id: "reframing",
    title: "Cognitive Reframing",
    desc: "Challenge negative thoughts by looking at them from a new angle.",
    icon: RefreshCw,
    steps: [
      "Identify a thought that's causing you stress or worry.",
      "Write it down or say it out loud.",
      "Ask yourself: Is this thought based on facts, or assumptions?",
      "Consider an alternative, more balanced perspective.",
      "Imagine what advice you'd give a friend in the same situation.",
      "Replace the original thought with the balanced alternative.",
    ],
  },
];

const Exercises = () => {
  const [selected, setSelected] = useState<Exercise | null>(null);

  return (
    <AppLayout>
      <h1 className="text-xl font-bold text-foreground">Coping Exercises</h1>
      <p className="text-sm text-muted-foreground">Evidence-based exercises to help manage stress and anxiety.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {exercises.map((ex) => {
          const Icon = ex.icon;
          return (
            <button
              key={ex.id}
              onClick={() => setSelected(ex)}
              className="group rounded-lg border border-border bg-card p-5 text-left shadow-subtle transition-shadow hover:shadow-card"
            >
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{ex.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{ex.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm px-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold text-foreground">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{selected.desc}</p>
              <ol className="mt-5 space-y-3">
                {selected.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
              <Button onClick={() => setSelected(null)} className="mt-6 w-full" variant="outline">
                Done
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Exercises;
