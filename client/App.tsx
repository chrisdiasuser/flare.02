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

// Wrap ResizeObserver to safely swallow known benign "ResizeObserver loop" errors
// This avoids a noisy console error in some Chromium builds while keeping normal behavior intact.
if (typeof window !== "undefined") {
  try {
    const _RO = (window as any).ResizeObserver;
    if (_RO) {
      class SafeResizeObserver {
        private _inner: any;
        constructor(cb: ResizeObserverCallback) {
          const wrapped: ResizeObserverCallback = (entries, observer) => {
            try {
              // execute the original callback
              cb(entries, observer);
            } catch (err: any) {
              // swallow the benign ResizeObserver loop error
              if (err && typeof err.message === "string" && err.message.includes("ResizeObserver loop")) {
                return;
              }
              // rethrow any other errors
              throw err;
            }
          };
          this._inner = new _RO(wrapped);
        }
        observe(target: Element, options?: ResizeObserverOptions) {
          return this._inner.observe(target, options);
        }
        unobserve(target: Element) {
          return this._inner.unobserve(target);
        }
        disconnect() {
          return this._inner.disconnect();
        }
      }
      (window as any).ResizeObserver = SafeResizeObserver;
    }
  } catch (e) {
    // fallback: no-op
  }
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
