import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Boxes, Radio, Calendar, Users, ClipboardCopy } from "lucide-react";

function Feature({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
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

export default function Staff() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
        <p className="text-muted-foreground">
          Create and manage systems, beacons and lectures. Approve members and
          review attendance.
        </p>
      </div>

      <Tabs defaultValue="systems">
        <TabsList>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="beacons">Beacons</TabsTrigger>
          <TabsTrigger value="lectures">Lectures</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="systems">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Create System"
              desc="Name and describe your system"
              action={<Button>Create</Button>}
            />
            <Feature
              title="Share Code"
              desc="Copy and share 8‑char code"
              action={
                <Button variant="outline" className="gap-2">
                  <ClipboardCopy className="h-4 w-4" />
                  Copy
                </Button>
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="beacons">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Register Beacon"
              desc="UUID/MAC + RSSI threshold"
              action={<Button>Add Beacon</Button>}
            />
            <Feature
              title="Scan Nearby"
              desc="Discover and monitor RSSI"
              action={<Button variant="secondary">Scan</Button>}
            />
          </div>
        </TabsContent>

        <TabsContent value="lectures">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Schedule Lecture"
              desc="Title, time window, beacon"
              action={<Button>Create</Button>}
            />
            <Feature
              title="View Sessions"
              desc="Upcoming & past"
              action={<Button variant="secondary">View</Button>}
            />
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Approve Requests"
              desc="Accept or reject joins"
              action={<Button>Open Queue</Button>}
            />
            <Feature
              title="Remove Member"
              desc="Remove from system"
              action={<Button variant="outline">Remove</Button>}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
