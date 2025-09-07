# 📊 AI-Powered Personal Finance & Investment Dashboard

A comprehensive, full-stack web application that combines computer science and finance to help users track expenses, manage portfolios, optimize investments, and predict market trends using artificial intelligence.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC)

## ✨ Features

### 📈 Dashboard Overview
- **Real-time Portfolio Value**: Live tracking of total portfolio worth
- **Performance Metrics**: Daily, monthly, and yearly returns
- **Risk Assessment**: Portfolio risk analysis with visual indicators
- **Quick Actions**: Fast access to key functions

### 💰 Expense & Budget Tracking
- **Smart Categorization**: Automatic expense categorization (food, housing, entertainment, etc.)
- **Visual Analytics**: Interactive charts for spending patterns
- **Budget Monitoring**: Monthly/weekly spending vs. budget comparisons
- **Trend Analysis**: Historical spending insights

### 📊 Portfolio Management
- **Real-time Data**: Integration with financial APIs for live market data
- **Diversification Analysis**: Detailed breakdown of asset allocation
- **Performance Tracking**: Gains/losses with historical performance
- **Multi-Asset Support**: Stocks, ETFs, cryptocurrencies

### 🎯 Portfolio Optimization
- **Mean-Variance Optimization**: Implementation of Markowitz model
- **Risk Tolerance Settings**: Customizable Conservative → Aggressive slider
- **Efficient Frontier**: Visual risk vs. expected return analysis
- **Rebalancing Suggestions**: AI-powered portfolio recommendations

### 🔮 AI-Powered Predictions
- **Machine Learning Models**: Advanced algorithms for price forecasting
- **Confidence Intervals**: Statistical reliability indicators
- **Trend Analysis**: Market movement predictions
- **Historical Backtesting**: Model performance validation

### 🎨 User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Interactive Charts**: Powered by Chart.js and Recharts
- **Financial Color Coding**: Intuitive green/red profit/loss indicators

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Vite** - Fast build tool and development server

### UI Components
- **Shadcn/UI** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library

### Data Visualization
- **Chart.js** - Flexible charting library
- **React Chart.js 2** - React wrapper for Chart.js
- **Recharts** - Declarative charts for React

### Development Tools
- **ESLint** - Code linting and quality
- **React Hook Form** - Performant form handling
- **Date-fns** - Modern date utility library

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn)
│   ├── DashboardOverview.tsx
│   ├── ExpenseTracker.tsx
│   ├── PortfolioView.tsx
│   ├── OptimizationView.tsx
│   └── PredictionsView.tsx
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zurab1K/Finance-Tracker.git
   cd Finance-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Usage

### Navigation
- **Dashboard**: Overview of your financial health
- **Expenses**: Track and categorize your spending
- **Portfolio**: Monitor your investments
- **Optimization**: Optimize your portfolio allocation
- **Predictions**: View AI-generated market forecasts

### Key Actions
1. **Add Expenses**: Click the "+" button to log new expenses
2. **View Portfolio**: Monitor real-time portfolio performance
3. **Optimize Allocation**: Use the risk slider to find optimal asset allocation
4. **Check Predictions**: Review AI forecasts for informed decision-making

## 📋 Future Enhancements

- [ ] User authentication system
- [ ] Real-time financial data API integration
- [ ] Advanced ML models for predictions
- [ ] News sentiment analysis
- [ ] Investment simulation mode
- [ ] PDF report generation
- [ ] Mobile app version

## 🐛 Known Issues

- Currently uses mock data (real API integration pending)
- ML predictions are simulated (actual model training required)
- User authentication not yet implemented

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Created by **Zurabi Kochiashvili**
