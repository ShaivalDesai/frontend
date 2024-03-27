
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
import { Select, MenuItem } from "@mui/material";

interface ProductDetails {
  product_id: number;
  price: number;
  brand: string;
  product_type: string;
  image: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph2: React.FC = () => {
  const [productData, setProductData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Product Sales",
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "blue",
        pointBorderColor: "blue",
      },
    ],
  });

  const [forecastMonths, setForecastMonths] = useState<number>(0);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [vendorProducts, setVendorProducts] = useState<ProductDetails[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const handleForecastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setForecastMonths(value >= 0 ? value : 0);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setShowForecast(true);
    }
  };

  const fetchVendorProducts = async (vendorId: number): Promise<void> => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/view/${vendorId}`
      );
      const data: ProductDetails[] = response.data;
      console.log("Received data from backend:", data);
      setVendorProducts(data);
    } catch (error) {
      console.error("Error fetching vendor products:", error);
    }
  };

  const handleForecastButtonClick = () => {
    setShowForecast(true);
  };

  useEffect(() => {
    fetchData();
  }, [selectedProductId]);

  const fetchProductData = async (productId: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/sale_forecasting/${productId}/${forecastMonths}`
      );
      const data = response.data;
      const { graph, forecasted } = data;

      const labels = Object.keys(graph).slice(-12);
      const salesData = labels.map((label) => parseInt(graph[label]));

      const allLabels = [
        ...labels,
        ...forecasted.map((item: any) => item.label),
      ];
      const allSalesData = [
        ...salesData,
        ...forecasted.map((item: any) => item.data),
      ];

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
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (showForecast && selectedProductId) {
      fetchDataWithForecast();
    }
  }, [showForecast, forecastMonths, selectedProductId]);

  const fetchData = async () => {
    try {
      if (selectedProductId) {
        let response;
        if (forecastMonths > 0) {
          response = await axios.get(
            `http://127.0.0.1:8000/sale_forecasting/${selectedProductId}/${forecastMonths}`
          );
        } else {
          response = await axios.get(
            `http://127.0.0.1:8000/sale_forecasting/${selectedProductId}/1`
          );
        }
        const data = response.data;

        console.log("Fetched data:", data);

        // Extracting data from response
        const { graph, forecasted } = data;

        console.log("Forecasted data:", forecasted);

        // Extracting only the latest 12 months data if no forecasted months are selected
        const labels =
          forecastMonths > 0
            ? Object.keys(graph)
            : Object.keys(graph).slice(-12);
        const salesData = labels.map((label) => parseInt(graph[label]));

        console.log("Actual sales data:", salesData);

        // Combining actual sales data and forecasted data initially
        let allLabels = [...labels];
        let allSalesData = [...salesData];

        // Update the state to show only the last 12 months initially if no forecasted months are selected
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataWithForecast = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/sale_forecasting/${selectedProductId}/${forecastMonths}`
      );
      const data = response.data;
      const { forecasted } = data;

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

      setForecastData(forecastedData);
    } catch (error) {
      console.error("Error fetching forecasted data:", error);
    }
  };

  const handleDropdownOpen = () => {
    fetchVendorProducts(3);
  };

  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
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

  // return (
  //   <>
  //     <div className="select-container">
  //       <Select
  //         onOpen={handleDropdownOpen}
  //         onChange={(e) => handleProductSelect(Number(e.target.value))}
  //         value={selectedProductId !== null ? selectedProductId.toString() : ""}
  //       >
  //         {Object.entries(vendorProducts).map(([key, product]) => (
  //           <MenuItem key={product.product_id} value={product.product_id}>
  //             {" "}
  //             {product.brand} - {product.product_type}
  //           </MenuItem>
  //         ))}
  //       </Select>
  //     </div>

  //     <div className="container">
  //       <div className="chart-container">
  //         <Line
  //           data={{
  //             labels: [
  //               ...productData.labels,
  //               ...forecastData.map((item) => item.label),
  //             ],
  //             datasets: [
  //               {
  //                 label: "Product Sales",
  //                 data: [
  //                   ...productData.datasets[0].data,
  //                   ...forecastData.map((item) => item.data),
  //                 ],
  //                 borderColor: "blue",
  //                 backgroundColor: "rgba(255, 99, 132, 0.2)",
  //                 pointBackgroundColor: "blue",
  //                 pointBorderColor: "blue",
  //               },
  //             ],
  //           }}
  //           options={options}
  //         />
  //       </div>

  //       <div className="data-table-container">
  //         <table>
  //           <thead className="table-header">
  //             <tr>
  //               <th>Month</th>
  //               <th>Quantity</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {productData.labels.map((label: any, index: any) => (
  //               <tr key={index}>
  //                 <td>{label}</td>
  //                 <td>{productData.datasets[0].data[index]}</td>
  //               </tr>
  //             ))}
  //             {forecastData.map((item, index) => (
  //               <tr key={index + productData.labels.length}>
  //                 <td>{item.label}</td>
  //                 <td>{item.data}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </>
  // );









   return (
    <>
      <Select
        onOpen={handleDropdownOpen}
        onChange={(e) => handleProductSelect(Number(e.target.value))}
        value={selectedProductId !== null ? selectedProductId.toString() : ""}
      >
        {Object.entries(vendorProducts).map(([key, product]) => (
          <MenuItem key={product.product_id} value={product.product_id}>
            {" "}
            {product.brand} - {product.product_type}
          </MenuItem>
        ))}
      </Select>

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
              inputMode="numeric"
            />
          </div>
          <Line
            data={{
              labels: [
                ...productData.labels,
                ...forecastData.map((item) => item.label),
              ],
              datasets: [
                {
                  label: "Product Sales",
                  data: [
                    ...productData.datasets[0].data,
                    ...forecastData.map((item) => item.data),
                  ],
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
                {productData.labels.map((label: any, index: any) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{productData.datasets[0].data[index]}</td>
                  </tr>
                ))}
                {forecastData.map((item, index) => (
                  <tr key={index + productData.labels.length}>
                    <td>{item.label}</td>
                    <td>{item.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LineGraph2;

<style>
  {`
  .select-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%; /* Ensure it takes full width */
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; /* Ensures container is full width */
  }
  
  .chart-container, .data-table-container {
    width: 100%;
    max-width: 800px; /* Adjust based on your design */
    margin: 0 auto;
  }
  
`}
</style>;
