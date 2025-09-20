import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Boxes, Calendar, Camera, Image, Radio } from "lucide-react";

function Feature({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      {action && <CardContent>{action}</CardContent>}
    </Card>
  );
}

export default function Student() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student</h1>
        <p className="text-muted-foreground">Join systems, mark attendance with camera + beacon proximity, and manage your profile.</p>
      </div>

      <Tabs defaultValue="attendance">
        <TabsList>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Mark Attendance" desc="Use camera + nearby beacon" action={<Button className="gap-2"><Camera className="h-4 w-4"/>Open Camera</Button>} />
            <Feature title="History" desc="View past attendance" action={<Button variant="secondary">Open History</Button>} />
            <Feature title="Discover Beacon" desc="Scan Bluetooth RSSI" action={<Button variant="outline" className="gap-2"><Radio className="h-4 w-4"/>Scan</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="systems">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Join System</CardTitle>
                <CardDescription>Enter the 8‑character code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="code">System Code</Label>
                    <Input id="code" placeholder="1A2B-3C4D" />
                  </div>
                  <div className="flex items-end"><Button className="w-full">Request</Button></div>
                </div>
              </CardContent>
            </Card>
            <Feature title="My Systems" desc="View systems you joined" action={<Button variant="secondary">Open</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Reference Photo" desc="Upload for face match" action={<Button className="gap-2"><Image className="h-4 w-4"/>Upload</Button>} />
            <Feature title="Profile" desc="Manage personal info" action={<Button variant="secondary">Open</Button>} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
