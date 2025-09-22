import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Staff from "./pages/Staff";
import Student from "./pages/Student";
import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/routing/ProtectedRoute";

// Suppress known benign ResizeObserver errors in some Chromium versions
// This prevents the console from being flooded with "ResizeObserver loop completed with undelivered notifications." messages
if (typeof window !== "undefined") {
  window.addEventListener("error", (event: ErrorEvent) => {
    const msg = String(event?.message || "");
    if (msg.includes("ResizeObserver loop")) {
      // Stop this error from reaching the console/other global handlers
      try {
        event.stopImmediatePropagation();
      } catch (e) {
        // ignore
      }
    }
  });
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
              <Route path="/student" element={<ProtectedRoute><Student /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
