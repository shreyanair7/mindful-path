import { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const aiResponses = [
  "I hear you. It sounds like you're carrying a lot right now. What feels most pressing?",
  "That's completely valid. Stress can feel overwhelming, but recognizing it is an important first step.",
  "Let's work through this together. Have you tried any breathing exercises today? I can guide you through one.",
  "It sounds like sleep has been tough. Even small changes to your routine can make a big difference over time.",
  "Remember, it's okay to not be okay. Would you like to try a grounding exercise right now?",
  "Thank you for sharing that with me. You're being really brave by talking about this.",
];

const stressKeywords = ["stress", "anxious", "overwhelm", "panic", "worried", "can't sleep", "tired"];

const Companion = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: "Hi there. I'm here whenever you'd like to talk. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const hasStressKeyword = stressKeywords.some((kw) => text.toLowerCase().includes(kw));

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const suffix = hasStressKeyword
        ? "\n\nI noticed you might be feeling stressed. Would you like to try a coping exercise? Head over to the Exercises section anytime."
        : "";
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: response + suffix }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-10rem)] flex-col">
        <h1 className="text-xl font-bold text-foreground">AI Companion</h1>
        <p className="text-sm text-muted-foreground">A private space to talk through your thoughts.</p>

        <div className="mt-4 flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4">
          <div className="space-y-3">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-secondary px-3.5 py-2.5 text-sm text-muted-foreground">
                  Typing…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-3 flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Companion;
