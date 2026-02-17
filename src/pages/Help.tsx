import AppLayout from "@/components/AppLayout";
import { AlertTriangle, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <AppLayout>
      <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
      <p className="text-sm text-muted-foreground">Resources and information when you need extra support.</p>

      {/* Disclaimer */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <div>
            <p className="text-sm font-semibold text-foreground">Important Disclaimer</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              MindAnchor is not a replacement for professional mental health care. If you are in crisis or experiencing a mental health emergency, please contact a professional immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="mt-6">
        <h2 className="text-base font-semibold text-foreground">Crisis Resources</h2>
        <div className="mt-3 space-y-3">
          {[
            { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988 (US)", phone: "988" },
            { name: "Crisis Text Line", detail: "Text HOME to 741741 (US)", phone: "741741" },
            { name: "International Association for Suicide Prevention", detail: "https://www.iasp.info/resources/Crisis_Centres/", phone: null },
          ].map((r) => (
            <div key={r.name} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-subtle">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Talk to professional */}
      <div className="mt-6 rounded-lg border border-border bg-card p-5 shadow-subtle">
        <h2 className="text-base font-semibold text-foreground">Need Professional Support?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Connecting with a licensed therapist or counselor can provide the personalized guidance you deserve.
        </p>
        <Button className="mt-4" variant="outline" disabled>
          <ExternalLink className="mr-2 h-4 w-4" />
          Talk to a Professional
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">Coming soon — this feature is under development.</p>
      </div>
    </AppLayout>
  );
};

export default Help;
