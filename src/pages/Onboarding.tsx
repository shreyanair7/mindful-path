import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  label: string;
  type: "slider" | "choice";
  options?: string[];
  min?: string;
  max?: string;
}

const questions: Question[] = [
  { id: "stress", label: "How would you rate your current stress level?", type: "slider", min: "Very low", max: "Very high" },
  { id: "sleep", label: "How has your sleep quality been recently?", type: "choice", options: ["Poor", "Fair", "Good", "Excellent"] },
  { id: "mood", label: "How would you describe your mood today?", type: "choice", options: ["Low", "Neutral", "Good", "Great"] },
  { id: "workload", label: "How manageable is your current workload?", type: "slider", min: "Overwhelming", max: "Very manageable" },
  { id: "support", label: "Do you feel you have adequate support around you?", type: "choice", options: ["Not at all", "Somewhat", "Mostly", "Absolutely"] },
  { id: "goal", label: "What's your primary goal with MindAnchor?", type: "choice", options: ["Reduce stress", "Better sleep", "Track mood", "Learn coping skills"] },
];

const Onboarding = () => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});

  const q = questions[step];
  const isLast = step === questions.length - 1;

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
      navigate("/dashboard");
    } else {
      setStep(step + 1);
    }
  };

  const setAnswer = (val: number | string) => {
    setAnswers({ ...answers, [q.id]: val });
  };

  const currentAnswer = answers[q.id];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Step {step + 1} of {questions.length}
        </p>
        <div className="mt-2 flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-foreground">{q.label}</h2>

            {q.type === "slider" && (
              <div className="mt-8">
                <Slider
                  value={[typeof currentAnswer === "number" ? currentAnswer : 50]}
                  onValueChange={([v]) => setAnswer(v)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{q.min}</span>
                  <span>{q.max}</span>
                </div>
              </div>
            )}

            {q.type === "choice" && (
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {q.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(opt)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                      currentAnswer === opt
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {isLast ? "Continue to Dashboard" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
