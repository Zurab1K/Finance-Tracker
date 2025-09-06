import { FinancialCard } from "./FinancialCard";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "percentage" | "currency";
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "default" | "gain" | "loss";
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "percentage", 
  subtitle,
  icon,
  variant = "default" 
}: MetricCardProps) {
  const getChangeVariant = () => {
    if (change === undefined) return "default";
    if (change > 0) return "gain";
    if (change < 0) return "loss";
    return "default";
  };

  const changeVariant = variant !== "default" ? variant : getChangeVariant();

  const formatChange = (value: number) => {
    const prefix = value > 0 ? "+" : "";
    if (changeType === "percentage") {
      return `${prefix}${value.toFixed(2)}%`;
    }
    return `${prefix}$${Math.abs(value).toLocaleString()}`;
  };

  const getTrendIcon = () => {
    if (change === undefined || change === 0) return <Minus className="h-4 w-4" />;
    return change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <FinancialCard variant={changeVariant}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {icon}
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {typeof value === "number" ? `$${value.toLocaleString()}` : value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
            {
              "bg-gain/20 text-gain": changeVariant === "gain",
              "bg-loss/20 text-loss": changeVariant === "loss",
              "bg-muted/20 text-muted-foreground": changeVariant === "default",
            }
          )}>
            {getTrendIcon()}
            {formatChange(change)}
          </div>
        )}
      </div>
    </FinancialCard>
  );
}