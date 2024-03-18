import React, { useEffect, useState } from "react";
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
} from "chart.js";
import axios from "axios";
import "./LineGraph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph: React.FC = () => {
  const [productData, setProductData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Product Sales",
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "blue", // Set point color
        pointBorderColor: "blue", // Set point color
      },
    ],
  });

  const [forecastMonths, setForecastMonths] = useState<number>(0);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [forecastData, setForecastData] = useState<any[]>([]);

  const handleForecastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setForecastMonths(value >= 0 ? value : 0);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setShowForecast(true);
    }
  };

  const handleForecastButtonClick = () => {
    setShowForecast(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const a = 5;
      const b = 6;
      const response = await axios.get(
        "http://127.0.0.1:8000/price_forecasting/" + a + "/" + b
      );
      const data = response.data;

      console.log("Fetched data:", data);

      // Extracting data from response
      const { graph, forecasted } = data;

      console.log("Forecasted data:", forecasted);

      // Extracting only the latest 12 months data
      const labels = Object.keys(graph).slice(-12);
      const salesData = labels.map((label) => parseInt(graph[label]));

      console.log("Actual sales data:", salesData);

      // Combining actual sales data and forecasted data initially
      let allLabels = [...labels];
      let allSalesData = [...salesData];

      // Update the state to show only the last 12 months initially
      setProductData({
        labels: allLabels,
        datasets: [
          {
            label: "Product Sales",
            data: allSalesData,
            borderColor: "blue",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointBackgroundColor: "blue",
            pointBorderColor: "blue",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (showForecast) {
      fetchDataWithForecast();
    }
  }, [showForecast, forecastMonths]);

  const fetchDataWithForecast = async () => {
    try {
      const a = 5;
      const b = 6;
      const response = await axios.get(
        "http://127.0.0.1:8000/price_forecasting/" + a + "/" + b
      );
      const data = response.data;

      // Extracting data from response
      const { forecasted } = data;

      // Extracting forecasted sales data based on user input
      const forecastedData: any[] = [];
      for (let i = 1; i <= forecastMonths; i++) {
        const monthKey = `month_${i}`;
        if (forecasted.hasOwnProperty(monthKey)) {
          forecastedData.push({
            label: `Forecast ${i}`,
            data: forecasted[monthKey],
          });
        }
      }

      // Clear existing forecast data and add new forecasted months
      setForecastData(forecastedData);
    } catch (error) {
      console.error("Error fetching forecasted data:", error);
    }
  };

  // Combine actual sales data and forecasted data
  const allLabels = [
    ...productData.labels,
    ...forecastData.map((item) => item.label),
  ];
  const allSalesData = [
    ...productData.datasets[0].data,
    ...forecastData.map((item) => item.data),
  ];

  const combinedLabels = [
    ...productData.labels,
    ...forecastData.map((item) => item.label),
  ];
  const combinedSalesData = [
    ...productData.datasets[0].data,
    ...forecastData.map((item) => item.data),
  ];

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
    <div className="container">
      <div className="chart-container">
        <div className="forecast-input">
          <label htmlFor="forecastMonths">Number of forecasted months:</label>
          <input
            type="number"
            id="forecastMonths"
            name="forecastMonths"
            value={forecastMonths}
            onChange={handleForecastChange}
            onKeyDown={handleKeyPress}
            inputMode="numeric" // Restrict input to numbers only
          />
        </div>
        <Line
          data={{
            labels: allLabels,
            datasets: [
              {
                label: "Product Sales",
                data: allSalesData,
                borderColor: "blue",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                pointBackgroundColor: "blue",
                pointBorderColor: "blue",
              },
            ],
          }}
          options={options}
        />
      </div>

      <div className="data-table-container">
        <div className="data-table">
          <table>
            <thead className="table-header">
              <tr>
                <th>Month</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {combinedLabels.map((label, index) => (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{combinedSalesData[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;

// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// interface GraphData {
//   [key: string]: number;
// }

// interface LineGraphProps {
//   graphData: GraphData;
// }

// const LineGraph: React.FC<LineGraphProps> = ({ graphData }) => {
//   const labels = Object.keys(graphData);
//   const data = Object.values(graphData);

//   // Get the last 12 elements from labels and data arrays
//   const last12Labels = labels.slice(-12);
//   const last12Data = data.slice(-12);

//   const chartData = {
//     labels: last12Labels,
//     datasets: [
//       {
//         label: 'Product Sales',
//         data: last12Data,
//         borderColor: 'blue',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         pointBackgroundColor: 'blue',
//         pointBorderColor: 'blue',
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Month',
//         },
//         ticks: {
//           autoSkip: false,
//           maxRotation: 45,
//           minRotation: 45,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Quantity',
//         },
//       },
//     },
//   };

//   return (
//     <div className="chart-container">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default LineGraph;
