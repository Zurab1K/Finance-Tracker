import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { MetricCard } from "./MetricCard";
import { ScatterChart } from "./ScatterChart";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Calculator,
  Zap
} from "lucide-react";

// Mock efficient frontier data
const mockEfficientFrontierData = {
  datasets: [
    {
      label: 'Efficient Frontier',
      data: [
        { x: 8, y: 6 },
        { x: 12, y: 8 },
        { x: 16, y: 10 },
        { x: 22, y: 12 },
        { x: 28, y: 14 }
      ],
      borderColor: 'hsl(217 91% 60%)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
      showLine: true,
      pointRadius: 6,
      pointBackgroundColor: 'hsl(217 91% 60%)',
    },
    {
      label: 'Current Portfolio',
      data: [{ x: 18, y: 11 }],
      borderColor: 'hsl(142 71% 45%)',
      backgroundColor: 'hsl(142 71% 45%)',
      pointRadius: 8,
      pointBackgroundColor: 'hsl(142 71% 45%)',
    },
  ],
};

const optimizedAllocations = [
  { name: 'Conservative', stocks: 30, bonds: 60, commodities: 5, cash: 5, expectedReturn: 6.2, risk: 8.1 },
  { name: 'Moderate Conservative', stocks: 40, bonds: 50, commodities: 5, cash: 5, expectedReturn: 7.8, risk: 11.5 },
  { name: 'Moderate', stocks: 60, bonds: 30, commodities: 8, cash: 2, expectedReturn: 9.8, risk: 15.8 },
  { name: 'Moderate Aggressive', stocks: 75, bonds: 15, commodities: 8, cash: 2, expectedReturn: 11.5, risk: 21.2 },
  { name: 'Aggressive', stocks: 85, bonds: 5, commodities: 8, cash: 2, expectedReturn: 13.2, risk: 27.5 },
];

export function OptimizationView() {
  const [riskTolerance, setRiskTolerance] = useState([50]);
  const [selectedAllocation, setSelectedAllocation] = useState(2); // Moderate by default

  const getRiskLevel = (value: number) => {
    if (value <= 20) return 'Very Conservative';
    if (value <= 40) return 'Conservative';
    if (value <= 60) return 'Moderate';
    if (value <= 80) return 'Aggressive';
    return 'Very Aggressive';
  };

  const currentAllocation = optimizedAllocations[selectedAllocation];

  return (
    <div className="space-y-6">
      {/* Risk Assessment */}
      <FinancialCard>
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Risk Tolerance Assessment</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Risk Level: <span className="font-semibold text-primary">{getRiskLevel(riskTolerance[0])}</span></Label>
              <span className="text-sm text-muted-foreground">{riskTolerance[0]}%</span>
            </div>
            
            <div className="px-4">
              <Slider
                value={riskTolerance}
                onValueChange={setRiskTolerance}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Capital Preservation</p>
                <p className="text-xs text-muted-foreground">Low risk, stable returns</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <BarChart3 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Balanced Growth</p>
                <p className="text-xs text-muted-foreground">Moderate risk & return</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Maximum Growth</p>
                <p className="text-xs text-muted-foreground">High risk, high potential</p>
              </div>
            </div>
          </div>
        </div>
      </FinancialCard>

      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Expected Return"
          value={`${currentAllocation.expectedReturn}%`}
          subtitle="Annual expected"
          icon={<TrendingUp className="h-4 w-4" />}
          variant="gain"
        />
        <MetricCard
          title="Risk (Volatility)"
          value={`${currentAllocation.risk}%`}
          subtitle="Standard deviation"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <MetricCard
          title="Sharpe Ratio"
          value="1.42"
          subtitle="Risk-adjusted return"
          icon={<Calculator className="h-4 w-4" />}
          variant="gain"
        />
        <MetricCard
          title="Max Drawdown"
          value="-12.5%"
          subtitle="Worst case scenario"
          icon={<Shield className="h-4 w-4" />}
          variant="loss"
        />
      </div>

      {/* Efficient Frontier Chart */}
      <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Efficient Frontier</h3>
          <p className="text-sm text-muted-foreground">Risk vs Expected Return optimization</p>
        </div>
        <ScatterChart data={mockEfficientFrontierData} />
      </div>

      {/* Portfolio Allocations */}
      <FinancialCard>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Optimized Allocations</h3>
            <Button size="sm" className="gap-2">
              <Zap className="h-4 w-4" />
              Apply Optimization
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {optimizedAllocations.map((allocation, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedAllocation === index 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-muted/30 hover:bg-muted/50'
                }`}
                onClick={() => setSelectedAllocation(index)}
              >
                <div className="text-center space-y-2">
                  <h4 className="font-semibold text-sm">{allocation.name}</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Stocks:</span>
                      <span className="font-medium">{allocation.stocks}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonds:</span>
                      <span className="font-medium">{allocation.bonds}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commodities:</span>
                      <span className="font-medium">{allocation.commodities}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash:</span>
                      <span className="font-medium">{allocation.cash}%</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-gain font-medium">Return: {allocation.expectedReturn}%</p>
                    <p className="text-xs text-muted-foreground">Risk: {allocation.risk}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FinancialCard>

      {/* Rebalancing Recommendations */}
      <FinancialCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rebalancing Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gain/10 border border-gain/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gain/20">
                  <TrendingUp className="h-4 w-4 text-gain" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Increase Technology Allocation</p>
                  <p className="text-sm text-muted-foreground">Current: 35% → Recommended: 40%</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Apply</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Shield className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Reduce Energy Exposure</p>
                  <p className="text-sm text-muted-foreground">Current: 15% → Recommended: 8%</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Apply</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Add International Diversification</p>
                  <p className="text-sm text-muted-foreground">Current: 5% → Recommended: 12%</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Apply</Button>
            </div>
          </div>
        </div>
      </FinancialCard>
    </div>
  );
}