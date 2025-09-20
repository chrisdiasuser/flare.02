import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

export default function Index() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-primary/20 blur-3xl" />
        <div className="container mx-auto flex flex-col items-center text-center py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Flame className="h-3.5 w-3.5 text-primary" /> F.L.A.R.E • Facial + Location Attendance
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Next‑gen Attendance Tracking
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground text-base md:text-lg">
            Multi‑role system with facial recognition, Bluetooth beacon proximity, and real‑time analytics. Built for students, staff, and admins.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/dashboard"><Button size="lg">Open Dashboard</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
