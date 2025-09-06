import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StockChart } from "./StockChart";
import { 
  Upload, 
  Plus, 
  ShoppingCart, 
  Home, 
  Car, 
  Utensils,
  Gamepad2,
  Heart
} from "lucide-react";

// Mock expense data
const mockExpenseData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Spending',
      data: [650, 720, 580, 690],
      borderColor: 'hsl(217 91% 60%)',
      backgroundColor: 'hsl(217 91% 60% / 0.1)',
      tension: 0.4,
    },
    {
      label: 'Budget',
      data: [800, 800, 800, 800],
      borderColor: 'hsl(45 93% 58%)',
      backgroundColor: 'hsl(45 93% 58% / 0.1)',
      tension: 0,
    },
  ],
};

const categories = [
  { id: 'food', label: 'Food & Dining', icon: Utensils, color: 'hsl(217 91% 60%)' },
  { id: 'housing', label: 'Housing', icon: Home, color: 'hsl(142 71% 45%)' },
  { id: 'transportation', label: 'Transportation', icon: Car, color: 'hsl(45 93% 58%)' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingCart, color: 'hsl(0 72% 51%)' },
  { id: 'entertainment', label: 'Entertainment', icon: Gamepad2, color: 'hsl(267 84% 58%)' },
  { id: 'healthcare', label: 'Healthcare', icon: Heart, color: 'hsl(347 77% 50%)' },
];

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Grocery Store', amount: 120.50, category: 'food', date: '2024-01-15' },
    { id: 2, description: 'Gas Station', amount: 45.20, category: 'transportation', date: '2024-01-14' },
    { id: 3, description: 'Netflix Subscription', amount: 15.99, category: 'entertainment', date: '2024-01-13' },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
  });

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          description: newExpense.description,
          amount: parseFloat(newExpense.amount),
          category: newExpense.category,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewExpense({ description: '', amount: '', category: '' });
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return ShoppingCart;
    return category.icon;
  };

  return (
    <div className="space-y-6">
      {/* Add Expense Form */}
      <FinancialCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Add New Expense</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Grocery Store"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newExpense.category} onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end gap-2">
              <Button onClick={addExpense} className="flex-1">
                Add Expense
              </Button>
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </FinancialCard>

      {/* Spending Chart */}
      <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Monthly Spending vs Budget</h3>
          <p className="text-sm text-muted-foreground">Weekly breakdown</p>
        </div>
        <StockChart data={mockExpenseData} />
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const categoryExpenses = expenses.filter(exp => exp.category === category.id);
          const categoryTotal = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
          
          return (
            <FinancialCard key={category.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: category.color }} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{category.label}</p>
                    <p className="text-sm text-muted-foreground">{categoryExpenses.length} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${categoryTotal.toFixed(2)}</p>
                </div>
              </div>
            </FinancialCard>
          );
        })}
      </div>

      {/* Recent Expenses */}
      <FinancialCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Expenses</h3>
          <div className="space-y-3">
            {expenses.slice().reverse().map((expense) => {
              const Icon = getCategoryIcon(expense.category);
              const category = categories.find(cat => cat.id === expense.category);
              
              return (
                <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${category?.color || 'hsl(217 91% 60%)'}20` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: category?.color || 'hsl(217 91% 60%)' }} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">{expense.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-foreground">${expense.amount.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </FinancialCard>
    </div>
  );
}