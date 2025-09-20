import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, BarChart3, Radio, Boxes, Users, QrCode, ClipboardCopy, CheckCircle2 } from "lucide-react";

function FeatureCard({ title, desc, icon, action }: { title: string; desc: string; icon: React.ReactNode; action?: React.ReactNode }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
      </CardHeader>
      {action && <CardContent>{action}</CardContent>}
    </Card>
  );
}

export default function Dashboard() {
  const [systemName, setSystemName] = useState("");
  const [systemCode, setSystemCode] = useState("8Z3K-L1A2");

  const copyCode = async () => {
    await navigator.clipboard.writeText(systemCode);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Role-based controls for Students and HR/Admins</p>
      </div>

      <Tabs defaultValue="student">
        <TabsList>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="hr">HR / Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Join System"
              desc="Enter the 8-character code provided by your HR"
              icon={<Boxes className="h-5 w-5" />}
              action={
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="join-code">System Code</Label>
                      <Input id="join-code" placeholder="e.g. 1A2B-3C4D" />
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Request</Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Requests must be approved by system HR.</p>
                </div>
              }
            />

            <FeatureCard
              title="Mark Attendance"
              desc="Use your camera + nearby beacon to check-in"
              icon={<QrCode className="h-5 w-5" />}
              action={<Button variant="secondary" className="w-full">Open Camera</Button>}
            />

            <FeatureCard
              title="Attendance History"
              desc="See all your past records"
              icon={<Calendar className="h-5 w-5" />}
              action={<Button variant="ghost">View History</Button>}
            />
          </div>
        </TabsContent>

        <TabsContent value="hr" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Create System"
              desc="Name and describe the attendance system"
              icon={<Boxes className="h-5 w-5" />}
              action={
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" value={systemName} onChange={(e) => setSystemName(e.target.value)} placeholder="e.g. CS101 Attendance" />
                  </div>
                  <Button>Create</Button>
                </div>
              }
            />

            <FeatureCard
              title="System Code"
              desc="Share with students to join"
              icon={<ClipboardCopy className="h-5 w-5" />}
              action={
                <div className="flex items-center gap-2">
                  <Input readOnly value={systemCode} className="font-mono" />
                  <Button variant="secondary" onClick={copyCode}>Copy</Button>
                </div>
              }
            />

            <FeatureCard
              title="Add Beacon"
              desc="Register a Bluetooth beacon"
              icon={<Radio className="h-5 w-5" />}
              action={<Button variant="secondary" className="w-full">Add Beacon</Button>}
            />

            <FeatureCard
              title="Schedule Lecture"
              desc="Set title, time and associated beacon"
              icon={<Calendar className="h-5 w-5" />}
              action={<Button variant="secondary" className="w-full">Create Lecture</Button>}
            />

            <FeatureCard
              title="Manage Members"
              desc="Approve requests and set roles"
              icon={<Users className="h-5 w-5" />}
              action={<Button variant="secondary" className="w-full">Open Members</Button>}
            />

            <FeatureCard
              title="Analytics"
              desc="Systems, beacons, lectures, attendance"
              icon={<BarChart3 className="h-5 w-5" />}
              action={<Button variant="ghost">View Reports</Button>}
            />
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            This is a functional UI skeleton. Connect your backend to wire up actions and data.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
