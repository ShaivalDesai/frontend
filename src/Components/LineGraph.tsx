// SalesPredictionGraph.tsx
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface SalesData {
  [key: string]: number[];
}

const initialData: SalesData = {
  // Example data structure, assuming each year has 12 months of sales data
  '2020': Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
  '2021': Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
  '2022': Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
  '2023': Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
};

const SalesPredictionGraph: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2020');
  const [monthPrediction, setMonthPrediction] = useState<number>(12);
  const [salesData, setSalesData] = useState<SalesData>(initialData);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      const labels = Array.from({ length: monthPrediction }, (_, i) => `${i + 1}`);
      const data = salesData[selectedYear].slice(0, monthPrediction);
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: `Sales in ${selectedYear}`,
              data: data,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Sales Quantity',
              },
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [selectedYear, monthPrediction, salesData]);

  return (
    <div>
      <h2>Sales Prediction Graph</h2>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        {Object.keys(salesData).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select value={monthPrediction} onChange={(e) => setMonthPrediction(parseInt(e.target.value))}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {month} month(s)
          </option>
        ))}
      </select>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SalesPredictionGraph;
