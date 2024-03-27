import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphData {
  [key: string]: number;
}

interface LineGraphProps {
  graphData: GraphData;
}

const Product_Insight_Graph: React.FC<LineGraphProps> = ({ graphData }) => {
  const labels = Object.keys(graphData);
  const data = Object.values(graphData);

  // Get the last 12 elements from labels and data arrays
  const last12Labels = labels.slice(-12);
  const last12Data = data.slice(-12);

  const chartData = {
    labels: last12Labels,
    datasets: [
      {
        width: "500px",
        label: "Product Sales",
        data: last12Data,
        borderColor: "blue",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "blue",
        pointBorderColor: "blue",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Product_Insight_Graph;