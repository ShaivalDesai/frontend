import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for demonstration; replace with your data
const productData = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "Future 1", "Future 2", "Future 3"],
  datasets: [
    {
      label: 'Product Sales',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75], // Example data
      borderColor: (context) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;

        if (!chartArea) {
          // This case happens on initial chart load
          return;
        }
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        const index = context.dataIndex;
        const total = context.dataset.data.length;
        const divideAt = total - 3; // Assuming last 3 points are future predictions

        if (index < divideAt) {
          gradient.addColorStop(0, 'red');
        } else {
          gradient.addColorStop(0, 'blue');
        }
        return gradient;
      },
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const ProductLineGraph: React.FC = () => {
  return <Line data={productData} options={options} />;
};

export default ProductLineGraph;
