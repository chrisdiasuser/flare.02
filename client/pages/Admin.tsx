import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Boxes, Radio, Calendar, Users, BarChart3, ClipboardCopy, Settings } from "lucide-react";

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

export default function Admin() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
        <p className="text-muted-foreground">Full administrative access across systems, beacons, lectures, and members.</p>
      </div>

      <Tabs defaultValue="systems">
        <TabsList>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="beacons">Beacons</TabsTrigger>
          <TabsTrigger value="lectures">Lectures</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="systems">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Create System" desc="Create a new attendance system with unique 8‑char code" action={<Button>Create</Button>} />
            <Feature title="Update System" desc="Edit name/description and ownership" action={<Button variant="secondary">Edit</Button>} />
            <Feature title="Delete System" desc="Remove systems permanently (irreversible)" action={<Button variant="destructive">Delete</Button>} />
            <Feature title="Codes" desc="Copy/share codes with staff & students" action={<Button variant="outline" className="gap-2"><ClipboardCopy className="h-4 w-4"/>Copy</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="beacons">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Add Beacon" desc="Register UUID/MAC and RSSI threshold" action={<Button>Add Beacon</Button>} />
            <Feature title="Discover" desc="Scan and monitor RSSI in real‑time" action={<Button variant="secondary">Scan</Button>} />
            <Feature title="Manage" desc="View, disable or remove beacons" action={<Button variant="outline">Manage</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="lectures">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Create Lecture" desc="Title, start/end time, beacon association" action={<Button>Create</Button>} />
            <Feature title="View Lectures" desc="Upcoming and past sessions" action={<Button variant="secondary">View</Button>} />
            <Feature title="Delete Lecture" desc="Remove with confirmation" action={<Button variant="destructive">Delete</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Approve Requests" desc="Handle join requests" action={<Button>Open Queue</Button>} />
            <Feature title="Set Roles" desc="Promote/demote members" action={<Button variant="secondary">Manage Roles</Button>} />
            <Feature title="Remove Members" desc="Remove from system" action={<Button variant="outline">Remove</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="System Stats" desc="Systems, active beacons, lectures" action={<Button className="gap-2"><BarChart3 className="h-4 w-4"/>Open</Button>} />
            <Feature title="Attendance Reports" desc="Lecture‑wise presence and images" action={<Button variant="secondary">Reports</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Global Settings" desc="Compliance, CSRF, retention" action={<Button className="gap-2"><Settings className="h-4 w-4"/>Open</Button>} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
