import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import MedicineInventory from "./pages/MedicineInventory";
import Suppliers from "./pages/Suppliers";
import UsageLogs from "./pages/UsageLogs";
import Expenses from "./pages/Expenses";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
import DigitalTwin from "./pages/DigitalTwin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<MedicineInventory />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/usage-logs" element={<UsageLogs />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/analytics" element={<PredictiveAnalytics />} />
            <Route path="/simulation" element={<DigitalTwin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
