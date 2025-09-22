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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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

function CreateLectureDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [system, setSystem] = useState<string>("");
  const [beacon, setBeacon] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Lecture</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Lecture</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lec-title">Title</Label>
            <Input id="lec-title" placeholder="e.g., Introduction to Algorithms" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>System</Label>
              <Select value={system} onValueChange={setSystem}>
                <SelectTrigger><SelectValue placeholder="Select a system" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sys-a">System A</SelectItem>
                  <SelectItem value="sys-b">System B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Beacon</Label>
              <Select value={beacon} onValueChange={setBeacon}>
                <SelectTrigger><SelectValue placeholder="Select a beacon" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="b-101">Beacon 101</SelectItem>
                  <SelectItem value="b-102">Beacon 102</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Time</Label>
              <Input id="start" type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Time</Label>
              <Input id="end" type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Lecture</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddBeaconDialog() {
  const [open, setOpen] = useState(false);
  const [system, setSystem] = useState<string>("");
  const [name, setName] = useState("");
  const [beaconId, setBeaconId] = useState("");
  const [rssi, setRssi] = useState<number>(-70);

  const scan = () => {
    // Placeholder scan action
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Beacon</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Beacon</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>System</Label>
            <Select value={system} onValueChange={setSystem}>
              <SelectTrigger><SelectValue placeholder="Select a system" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sys-a">System A</SelectItem>
                <SelectItem value="sys-b">System B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bname">Beacon Name</Label>
            <Input id="bname" placeholder="e.g., Room A101 Beacon" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bid">Beacon ID</Label>
            <div className="flex gap-2">
              <Input id="bid" placeholder="UUID or MAC Address" value={beaconId} onChange={(e) => setBeaconId(e.target.value)} />
              <Button type="button" variant="secondary" onClick={scan}>Scan</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rssi">Min RSSI (dBm)</Label>
            <Input id="rssi" type="number" value={rssi} onChange={(e) => setRssi(parseInt(e.target.value || "0", 10))} />
          </div>
          <DialogFooter>
            <Button type="submit">Add Beacon</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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
              action={<AddBeaconDialog />}
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
              action={<CreateLectureDialog />}
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
              title="Approve Student Requests"
              desc="Staff approve student join requests"
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
