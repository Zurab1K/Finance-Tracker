import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FinancialCardProps {
  children: ReactNode;
  variant?: "default" | "gain" | "loss" | "warning";
  className?: string;
}

export function FinancialCard({ children, variant = "default", className }: FinancialCardProps) {
  return (
    <Card 
      className={cn(
        "bg-gradient-to-br backdrop-blur-sm border-border/50 transition-all duration-300 hover:shadow-lg",
        {
          "from-card to-card/80 hover:shadow-card": variant === "default",
          "from-gain/10 to-gain/5 border-gain/20 hover:shadow-gain": variant === "gain",
          "from-loss/10 to-loss/5 border-loss/20 hover:shadow-loss": variant === "loss",
          "from-warning/10 to-warning/5 border-warning/20": variant === "warning",
        },
        className
      )}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}