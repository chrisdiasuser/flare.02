import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, ShieldCheck, Radio, Camera, CalendarRange, Users, Cpu, BarChart3 } from "lucide-react";

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
            Multi‑role system with facial recognition, Bluetooth beacon proximity, and real‑time analytics. Built for students, HR, and admins.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/dashboard"><Button size="lg">Open Dashboard</Button></Link>
            <Link to="/login"><Button size="lg" variant="outline">Sign In</Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<Camera className="h-5 w-5" />} title="Facial Recognition" desc="Verify identity with a reference photo for secure check‑in." />
          <Feature icon={<Radio className="h-5 w-5" />} title="Beacon Proximity" desc="Bluetooth RSSI ensures you are physically present." />
          <Feature icon={<CalendarRange className="h-5 w-5" />} title="Lectures & Sessions" desc="Schedule windows and track live attendance status." />
          <Feature icon={<BarChart3 className="h-5 w-5" />} title="Analytics" desc="System stats, member counts, upcoming sessions, and more." />
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="container mx-auto py-16 md:py-24">
        <Tabs defaultValue="student">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Role‑based experience</h2>
            <TabsList>
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="hr">HR</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="student">
            <RoleCard
              title="Student"
              points={["Join systems with code", "Camera + beacon check‑in", "Attendance history", "Manage profile & reference photo"]}
              cta={{ label: "Try Dashboard", to: "/dashboard" }}
            />
          </TabsContent>
          <TabsContent value="hr">
            <RoleCard
              title="HR"
              points={["Create systems", "Manage beacons & lectures", "Approve members", "Attendance reports"]}
              cta={{ label: "Manage Now", to: "/dashboard" }}
            />
          </TabsContent>
          <TabsContent value="admin">
            <RoleCard
              title="Admin"
              points={["Full control", "System‑wide settings", "Advanced analytics", "Member administration"]}
              cta={{ label: "Open Admin", to: "/dashboard" }}
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Security */}
      <section className="container mx-auto pb-16 md:pb-24">
        <Card>
          <CardContent className="py-8 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><ShieldCheck className="h-6 w-6" /></div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold">Privacy‑first design</h3>
              <p className="text-muted-foreground mt-2">Role‑based access, CSRF protection, and secure image handling. Integrate your preferred backend (Django, Express) easily.</p>
            </div>
            <Link to="/login"><Button>Sign In</Button></Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </CardContent>
    </Card>
  );
}

function RoleCard({ title, points, cta }: { title: string; points: string[]; cta: { label: string; to: string } }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
              <Cpu className="h-4 w-4 text-primary mt-0.5" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link to={cta.to}><Button>{cta.label}</Button></Link>
        </div>
      </CardContent>
    </Card>
  );
}
