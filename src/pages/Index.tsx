import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { PortfolioView } from "@/components/PortfolioView";
import { OptimizationView } from "@/components/OptimizationView";
import { PredictionsView } from "@/components/PredictionsView";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="mt-0">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-0">
            <ExpenseTracker />
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-0">
            <PortfolioView />
          </TabsContent>
          
          <TabsContent value="optimization" className="mt-0">
            <OptimizationView />
          </TabsContent>
          
          <TabsContent value="predictions" className="mt-0">
            <PredictionsView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
