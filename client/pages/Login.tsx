import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

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

  const demoLogin = () => {
    login({ username: "demo@flare.app", roles: ["admin", "staff", "student"] });
    navigate(from, { replace: true });
  };

  return (
    <div className={cn(
      "min-h-[calc(100vh-4rem)] flex items-center justify-center", // header is 64px
      "bg-gradient-to-br from-[#0f172a] via-[#0b225f] to-[#1d4ed8]",
      "px-4 py-10"
    )}>
      <div className="w-full max-w-md">
        <Card className="backdrop-blur border-white/20 bg-white/10 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Sign in to F.L.A.R.E</CardTitle>
            <CardDescription className="text-white/70">Facial Recognition & Location-based Attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
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
                <Label htmlFor="password" className="text-white">Password</Label>
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
              <Button type="submit" className="w-full bg-white text-[#0b225f] hover:bg-white/90" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>
            <div className="my-4 flex items-center gap-3 text-white/70">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-xs">OR</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>
            
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-white/80 text-sm">
          Don’t have an account? <a className="underline underline-offset-4" href="#">Request access</a>
        </p>
      </div>
    </div>
  );
}
