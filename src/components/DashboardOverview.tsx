import { MetricCard } from "./MetricCard";
import { StockChart } from "./StockChart";
import { PortfolioChart } from "./PortfolioChart";
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Target,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Mock data - in a real app, this would come from your backend/API
const mockPortfolioData = {
  labels: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'],
  datasets: [
    {
      data: [35, 25, 20, 12, 8],
      backgroundColor: [
        'hsl(217 91% 60%)',
        'hsl(142 71% 45%)',
        'hsl(45 93% 58%)',
        'hsl(0 72% 51%)',
        'hsl(267 84% 58%)',
      ],
      borderColor: [
        'hsl(217 91% 70%)',
        'hsl(142 71% 55%)',
        'hsl(45 93% 68%)',
        'hsl(0 72% 61%)',
        'hsl(267 84% 68%)',
      ],
      borderWidth: 2,
    },
  ],
};

const mockPerformanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Portfolio Value',
      data: [45000, 47500, 46200, 49800, 52300, 54200],
      borderColor: 'hsl(217 91% 60%)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
    },
    {
      label: 'S&P 500',
      data: [44000, 46000, 45500, 48000, 50200, 51800],
      borderColor: 'hsl(142 71% 45%)',
      backgroundColor: 'hsl(142 71% 45% / 0.1)',
      tension: 0.4,
    },
  ],
};

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio"
          value={54200}
          change={8.7}
          changeType="percentage"
          subtitle="vs last month"
          icon={<DollarSign className="h-4 w-4" />}
          variant="gain"
        />
        <MetricCard
          title="Monthly Gain"
          value={3420}
          change={12.3}
          changeType="percentage"
          subtitle="+$420 this week"
          icon={<TrendingUp className="h-4 w-4" />}
          variant="gain"
        />
        <MetricCard
          title="Monthly Expenses"
          value={2850}
          change={-5.2}
          changeType="percentage"
          subtitle="Budget: $3200"
          icon={<Target className="h-4 w-4" />}
          variant="gain"
        />
        <MetricCard
          title="Best Performer"
          value="TSLA"
          change={15.7}
          changeType="percentage"
          subtitle="This month"
          icon={<ArrowUpRight className="h-4 w-4" />}
          variant="gain"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Portfolio Performance</h3>
            <p className="text-sm text-muted-foreground">6-month comparison vs S&P 500</p>
          </div>
          <StockChart data={mockPerformanceData} />
        </div>

        {/* Portfolio Allocation Chart */}
        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Portfolio Allocation</h3>
            <p className="text-sm text-muted-foreground">Current asset distribution</p>
          </div>
          <PortfolioChart data={mockPortfolioData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Buy", stock: "AAPL", shares: 10, price: 175.23, change: "+2.4%" },
            { action: "Sell", stock: "TSLA", shares: 5, price: 248.91, change: "+15.7%" },
            { action: "Buy", stock: "MSFT", shares: 15, price: 378.45, change: "+1.8%" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {activity.action === "Buy" ? (
                  <ArrowUpRight className="h-4 w-4 text-gain" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-loss" />
                )}
                <div>
                  <p className="font-medium text-foreground">
                    {activity.action} {activity.shares} shares of {activity.stock}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${activity.price} per share
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  activity.change.startsWith("+") ? "text-gain" : "text-loss"
                }`}>
                  {activity.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}