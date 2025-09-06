import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ScatterChartProps {
  data: {
    datasets: {
      label: string;
      data: { x: number; y: number }[];
      borderColor: string;
      backgroundColor: string;
      showLine?: boolean;
      tension?: number;
      pointRadius?: number;
      pointBackgroundColor?: string;
    }[];
  };
  title?: string;
}

export function ScatterChart({ data, title }: ScatterChartProps) {
  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(213 31% 91%)',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: 'hsl(213 31% 91%)',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Risk (Volatility %)',
          color: 'hsl(213 31% 91%)',
        },
        ticks: {
          color: 'hsl(213 31% 65%)',
        },
        grid: {
          color: 'hsl(214 32% 18%)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expected Return (%)',
          color: 'hsl(213 31% 91%)',
        },
        ticks: {
          color: 'hsl(213 31% 65%)',
        },
        grid: {
          color: 'hsl(214 32% 18%)',
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Scatter data={data} options={options} />
    </div>
  );
}