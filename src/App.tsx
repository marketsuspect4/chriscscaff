import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { LoadingFallback } from "@/components/LoadingFallback";
import { Header } from "@/components/Header";
import Index from "./pages/Index";

// Lazy load routes for better performance
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const QuoteSelection = lazy(() => import("./pages/QuoteSelection"));
const QuickEstimate = lazy(() => import("./pages/QuickEstimate"));
const AccurateQuote = lazy(() => import("./pages/AccurateQuote"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} errorElement={<RouteErrorBoundary />} />
              <Route path="/auth" element={<Auth />} errorElement={<RouteErrorBoundary />} />
              <Route path="/dashboard" element={<Dashboard />} errorElement={<RouteErrorBoundary />} />
              <Route path="/quote-selection" element={<QuoteSelection />} errorElement={<RouteErrorBoundary />} />
              <Route path="/quick-estimate" element={<QuickEstimate />} errorElement={<RouteErrorBoundary />} />
              <Route path="/accurate-quote" element={<AccurateQuote />} errorElement={<RouteErrorBoundary />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
