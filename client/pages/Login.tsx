import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateAccountDialog({
  onCreated,
}: {
  onCreated: (username: string, role: "admin" | "staff" | "student") => void;
}) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<"admin" | "staff" | "student">("student");
  const [error, setError] = useState<string | null>(null);
  const canSubmit = useMemo(
    () =>
      username.trim().length >= 3 &&
      password.length >= 6 &&
      confirm === password,
    [username, password, confirm],
  );

  const USERS_KEY = "flare_users";
  const readUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as {
        username: string;
        role: "admin" | "staff" | "student";
      }[];
    } catch {
      return [] as { username: string; role: "admin" | "staff" | "student" }[];
    }
  };
  const adminCount = useMemo(
    () => readUsers().filter((u) => u.role === "admin").length,
    [open],
  );
  const adminLimitReached = adminCount >= 3;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) {
      setError("Please complete all fields correctly");
      return;
    }
    if (role === "admin" && adminLimitReached) {
      setError("Only 3 admins can be created");
      return;
    }
    const users = readUsers();
    users.push({ username: username.trim(), role });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    onCreated(username.trim(), role);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="px-0 text-white underline underline-offset-4"
        >
          Create account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-username">Username</Label>
            <Input
              id="new-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="jane.doe"
              autoComplete="username"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">Password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="admin" disabled={adminLimitReached}>
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Admin seats available: {Math.max(0, 3 - adminCount)}
            </p>
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={!canSubmit}>
              Create account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/student";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      login({ username, roles: ["student"] });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCreated = (
    newUsername: string,
    role: "admin" | "staff" | "student",
  ) => {
    login({ username: newUsername, roles: [role] });
    if (role === "admin") navigate("/admin", { replace: true });
    else if (role === "staff") navigate("/staff", { replace: true });
    else navigate(from, { replace: true });
  };

  return (
    <div
      className={cn(
        "min-h-[calc(100vh-4rem)] flex items-center justify-center",
        "bg-gradient-to-br from-[#0f172a] via-[#0b225f] to-[#1d4ed8]",
        "px-4 py-10",
      )}
    >
      <div className="w-full max-w-md">
        <Card className="backdrop-blur border-white/20 bg-white/10 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Sign in to F.L.A.R.E</CardTitle>
            <CardDescription className="text-white/70">
              Facial Recognition & Location-based Attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="jane.doe"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-md p-2">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-white text-[#0b225f] hover:bg-white/90"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>
            <div className="my-4 flex items-center gap-3 text-white/70">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-xs">OR</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>
            <div className="grid gap-3">
              <p className="text-center text-white/90 text-sm">
                Don’t have an account?{" "}
                <CreateAccountDialog onCreated={handleCreated} />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
