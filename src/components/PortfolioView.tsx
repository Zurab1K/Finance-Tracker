import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { MetricCard } from "./MetricCard";
import { StockChart } from "./StockChart";
import { PortfolioChart } from "./PortfolioChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3,
  RefreshCw
} from "lucide-react";

// Mock portfolio data
const mockHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, avgPrice: 150.25, currentPrice: 175.23, change: 16.6 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, avgPrice: 2420.00, currentPrice: 2680.45, change: 10.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 40, avgPrice: 310.50, currentPrice: 378.45, change: 21.9 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 20, avgPrice: 215.30, currentPrice: 248.91, change: 15.6 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 15, avgPrice: 3205.00, currentPrice: 3456.78, change: 7.9 },
];

const mockPerformanceData = {
  labels: ['1M', '3M', '6M', '1Y', '2Y', '5Y'],
  datasets: [
    {
      label: 'Portfolio Return',
      data: [3.2, 8.7, 15.4, 22.1, 45.8, 120.5],
      borderColor: 'hsl(217 91% 60%)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
    },
    {
      label: 'S&P 500',
      data: [2.8, 7.2, 12.9, 18.5, 38.2, 95.3],
      borderColor: 'hsl(142 71% 45%)',
      backgroundColor: 'hsl(142 71% 45% / 0.1)',
      tension: 0.4,
    },
  ],
};

const mockAllocationData = {
  labels: ['Technology', 'Healthcare', 'Financial', 'Consumer', 'Energy'],
  datasets: [
    {
      data: [45, 20, 15, 12, 8],
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

export function PortfolioView() {
  const [holdings, setHoldings] = useState(mockHoldings);
  const [newHolding, setNewHolding] = useState({
    symbol: '',
    shares: '',
    avgPrice: '',
  });

  const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
  const totalCost = holdings.reduce((sum, holding) => sum + (holding.shares * holding.avgPrice), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalGainLoss / totalCost) * 100);

  const addHolding = () => {
    if (newHolding.symbol && newHolding.shares && newHolding.avgPrice) {
      // In a real app, you'd fetch current price from an API
      const mockCurrentPrice = parseFloat(newHolding.avgPrice) * (1 + (Math.random() * 0.4 - 0.2));
      const change = ((mockCurrentPrice - parseFloat(newHolding.avgPrice)) / parseFloat(newHolding.avgPrice)) * 100;
      
      setHoldings([
        ...holdings,
        {
          symbol: newHolding.symbol.toUpperCase(),
          name: `${newHolding.symbol.toUpperCase()} Inc.`,
          shares: parseInt(newHolding.shares),
          avgPrice: parseFloat(newHolding.avgPrice),
          currentPrice: mockCurrentPrice,
          change: change,
        },
      ]);
      setNewHolding({ symbol: '', shares: '', avgPrice: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Value"
          value={totalValue}
          subtitle="Current market value"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Gain/Loss"
          value={totalGainLoss}
          change={totalGainLossPercent}
          changeType="percentage"
          subtitle="vs cost basis"
          icon={totalGainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          variant={totalGainLoss >= 0 ? "gain" : "loss"}
        />
        <MetricCard
          title="Day Change"
          value={2840}
          change={5.2}
          changeType="percentage"
          subtitle="Today's P&L"
          icon={<BarChart3 className="h-4 w-4" />}
          variant="gain"
        />
        <MetricCard
          title="Holdings"
          value={holdings.length}
          subtitle="Unique positions"
          icon={<BarChart3 className="h-4 w-4" />}
        />
      </div>

      {/* Add New Holding */}
      <FinancialCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Add New Holding</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., AAPL"
                value={newHolding.symbol}
                onChange={(e) => setNewHolding({ ...newHolding, symbol: e.target.value.toUpperCase() })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shares">Shares</Label>
              <Input
                id="shares"
                type="number"
                placeholder="10"
                value={newHolding.shares}
                onChange={(e) => setNewHolding({ ...newHolding, shares: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="avgPrice">Avg Price</Label>
              <Input
                id="avgPrice"
                type="number"
                placeholder="150.00"
                value={newHolding.avgPrice}
                onChange={(e) => setNewHolding({ ...newHolding, avgPrice: e.target.value })}
              />
            </div>
            
            <div className="flex items-end gap-2">
              <Button onClick={addHolding} className="flex-1">
                Add Holding
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </FinancialCard>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Performance History</h3>
            <p className="text-sm text-muted-foreground">Returns over time vs S&P 500</p>
          </div>
          <StockChart data={mockPerformanceData} />
        </div>

        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Sector Allocation</h3>
            <p className="text-sm text-muted-foreground">Portfolio diversification</p>
          </div>
          <PortfolioChart data={mockAllocationData} />
        </div>
      </div>

      {/* Holdings Table */}
      <FinancialCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Symbol</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Shares</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Avg Price</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Current Price</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Market Value</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, index) => {
                  const marketValue = holding.shares * holding.currentPrice;
                  const costBasis = holding.shares * holding.avgPrice;
                  const gainLoss = marketValue - costBasis;
                  const gainLossPercent = ((gainLoss / costBasis) * 100);
                  
                  return (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-foreground">{holding.symbol}</p>
                          <p className="text-xs text-muted-foreground">{holding.name}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-foreground">{holding.shares}</td>
                      <td className="py-3 px-2 text-right text-foreground">${holding.avgPrice.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right text-foreground">${holding.currentPrice.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-medium text-foreground">${marketValue.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right">
                        <div className={`${gainLoss >= 0 ? 'text-gain' : 'text-loss'}`}>
                          <p className="font-medium">${Math.abs(gainLoss).toLocaleString()}</p>
                          <p className="text-xs">({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </FinancialCard>
    </div>
  );
}