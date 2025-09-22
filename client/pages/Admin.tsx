import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ClipboardCopy, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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

function CreateSystemDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New System</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sys-name">System Name</Label>
            <Input id="sys-name" placeholder="e.g., Computer Science 101" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button type="submit">Create System</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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
        <Button>Create</Button>
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

  const scan = () => {};

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
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="systems">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Create System" desc="Create a new attendance system with unique 8‑char code" action={<CreateSystemDialog />} />
            <Feature title="Update System" desc="Edit name/description and ownership" action={<Button variant="secondary">Edit</Button>} />
            <Feature title="Delete System" desc="Remove systems permanently (irreversible)" action={<Button variant="destructive">Delete</Button>} />
            <Feature title="Codes" desc="Copy/share codes with staff & students" action={<Button variant="outline" className="gap-2"><ClipboardCopy className="h-4 w-4"/>Copy</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="beacons">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Add Beacon" desc="Register UUID/MAC and RSSI threshold" action={<AddBeaconDialog />} />
            <Feature title="Discover" desc="Scan and monitor RSSI in real‑time" action={<Button variant="secondary">Scan</Button>} />
            <Feature title="Manage" desc="View, disable or remove beacons" action={<Button variant="outline">Manage</Button>} />
          </div>
        </TabsContent>

        <TabsContent value="lectures">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Create Lecture" desc="Title, start/end time, beacon association" action={<CreateLectureDialog />} />
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
