import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Brain, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Understand your stress patterns through intelligent analysis of your daily check-ins and conversations.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays on your device. We use federated learning — no personal data ever leaves your phone.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description: "Whether you're a student, professional, or caregiver — MindAnchor adapts to your needs.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-lg font-semibold text-foreground tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            MindAnchor
          </span>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pb-16 pt-20 text-center">
        <motion.h1
          className="text-4xl font-bold leading-tight text-foreground sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your personal companion for{" "}
          <span className="text-primary">mental wellness</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          MindAnchor helps you understand and manage stress through AI-powered conversations, personalized insights, and evidence-based exercises — all with complete privacy.
        </motion.p>
        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            How It Works
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            How MindAnchor works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            A simple, research-backed approach to everyday mental wellness.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { step: "1", title: "Check In", desc: "Answer a few quick questions about your mood and stress levels." },
              { step: "2", title: "Get Support", desc: "Chat with your AI companion or try guided coping exercises." },
              { step: "3", title: "Track Progress", desc: "View insights and trends to understand your wellness journey." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Built with care
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="rounded-lg border border-border bg-card p-6 shadow-subtle"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-base font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Who is MindAnchor for?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Anyone who wants a private, judgment-free space to manage everyday stress.
          </p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            {[
              "Students managing academic pressure",
              "Professionals navigating workplace stress",
              "Caregivers who need support too",
              "Anyone exploring better mental health habits",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-md border border-border bg-background p-4">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MindAnchor. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
