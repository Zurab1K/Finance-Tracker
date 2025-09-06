import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension?: number;
    }[];
  };
  title?: string;
}

export function StockChart({ data, title }: StockChartProps) {
  const options: ChartOptions<'line'> = {
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
        ticks: {
          color: 'hsl(213 31% 65%)',
        },
        grid: {
          color: 'hsl(214 32% 18%)',
        },
      },
      y: {
        ticks: {
          color: 'hsl(213 31% 65%)',
          callback: function(value) {
            return '$' + value;
          },
        },
        grid: {
          color: 'hsl(214 32% 18%)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={data} options={options} />
    </div>
  );
}