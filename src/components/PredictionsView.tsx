import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { MetricCard } from "./MetricCard";
import { StockChart } from "./StockChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap,
  BarChart3,
  Clock,
  AlertTriangle
} from "lucide-react";

// Mock prediction data
const mockPredictionData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      label: 'Historical Price',
      data: [175.23, 177.45, 174.89, 176.12, 178.34, 175.67, 177.89],
      borderColor: 'hsl(213 31% 65%)',
      backgroundColor: 'hsl(213 31% 65% / 0.1)',
      tension: 0.4,
    },
    {
      label: 'AI Prediction',
      data: [null, null, null, null, null, 179.23, 181.45],
      borderColor: 'hsl(217 91% 60%)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
      borderDash: [5, 5],
    },
    {
      label: 'Confidence Upper',
      data: [null, null, null, null, null, 185.50, 188.20],
      borderColor: 'hsl(217 91% 60% / 0.3)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
      borderDash: [2, 2],
    },
    {
      label: 'Confidence Lower',
      data: [null, null, null, null, null, 172.96, 174.70],
      borderColor: 'hsl(217 91% 60% / 0.3)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
      borderDash: [2, 2],
    },
  ],
};

const mockSentimentData = {
  labels: ['Very Bearish', 'Bearish', 'Neutral', 'Bullish', 'Very Bullish'],
  datasets: [
    {
      label: 'Market Sentiment',
      data: [5, 15, 35, 30, 15],
      borderColor: 'hsl(217 91% 60%)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
    },
  ],
};

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
];

export function PredictionsView() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [predictionDays, setPredictionDays] = useState('7');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePrediction = async () => {
    setIsGenerating(true);
    // Simulate AI model processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Prediction Controls */}
      <FinancialCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Stock Prediction</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Stock Symbol</Label>
              <Select value={selectedStock} onValueChange={setSelectedStock}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent>
                  {stocks.map((stock) => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stock.symbol}</span>
                        <span className="text-muted-foreground text-sm">{stock.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Prediction Period</Label>
              <Select value={predictionDays} onValueChange={setPredictionDays}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="7">1 Week</SelectItem>
                  <SelectItem value="30">1 Month</SelectItem>
                  <SelectItem value="90">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Model Type</Label>
              <Select defaultValue="lstm">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                  <SelectItem value="regression">Linear Regression</SelectItem>
                  <SelectItem value="ensemble">Ensemble Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={generatePrediction} 
                disabled={isGenerating}
                className="w-full gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Generate Prediction
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </FinancialCard>

      {/* Prediction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Predicted Price"
          value="$181.45"
          change={2.4}
          changeType="percentage"
          subtitle="7-day forecast"
          icon={<Target className="h-4 w-4" />}
          variant="gain"
        />
        <MetricCard
          title="Confidence Level"
          value="78%"
          subtitle="Model accuracy"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <MetricCard
          title="Volatility"
          value="$6.24"
          subtitle="Expected range"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Last Updated"
          value="2 min ago"
          subtitle="Real-time model"
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      {/* Prediction Chart */}
      <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Price Prediction with Confidence Intervals</h3>
          <p className="text-sm text-muted-foreground">{selectedStock} - {predictionDays} day forecast</p>
        </div>
        <StockChart data={mockPredictionData} />
      </div>

      {/* Model Performance & Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance */}
        <FinancialCard>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Model Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Accuracy (7-day)</span>
                <span className="font-medium text-gain">78.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">MAE (Mean Absolute Error)</span>
                <span className="font-medium">$2.34</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">RMSE (Root Mean Square Error)</span>
                <span className="font-medium">$3.12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">R² Score</span>
                <span className="font-medium text-gain">0.85</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm">Disclaimer: Predictions are based on historical data and should not be considered as financial advice.</p>
              </div>
            </div>
          </div>
        </FinancialCard>

        {/* Market Sentiment */}
        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Market Sentiment Analysis</h3>
            <p className="text-sm text-muted-foreground">Based on news and social media</p>
          </div>
          <StockChart data={mockSentimentData} />
        </div>
      </div>

      {/* AI Insights */}
      <FinancialCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">AI Insights & Recommendations</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-gain/10 border border-gain/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gain/20">
                  <TrendingUp className="h-4 w-4 text-gain" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Bullish Signal Detected</p>
                  <p className="text-sm text-muted-foreground">
                    Technical indicators suggest upward momentum. RSI oversold, MACD crossover positive.
                  </p>
                  <p className="text-xs text-gain mt-1">Confidence: 82%</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">High Volatility Warning</p>
                  <p className="text-sm text-muted-foreground">
                    Earnings announcement next week may cause significant price movements.
                  </p>
                  <p className="text-xs text-warning mt-1">Expected volatility: +/-8%</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sector Correlation Alert</p>
                  <p className="text-sm text-muted-foreground">
                    Technology sector showing strong correlation. Consider diversification.
                  </p>
                  <p className="text-xs text-primary mt-1">Correlation: 0.78</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FinancialCard>
    </div>
  );
}