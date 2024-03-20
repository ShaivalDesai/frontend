// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";
// import "./LineGraph.css";
// import { Select, MenuItem } from "@mui/material";
// import { Container } from "react-bootstrap";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineGraph: React.FC = () => {

//   const [productData, setProductData] = useState<any>({
//     labels: [],
//     datasets: [
//       {
//         label: "Product Sales",
//         data: [],
//         borderColor: "blue",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         pointBackgroundColor: "blue", // Set point color
//         pointBorderColor: "blue", // Set point color
//       },
//     ],
//   });

//   const [forecastMonths, setForecastMonths] = useState<number>(0);
//   const [showForecast, setShowForecast] = useState<boolean>(false);
//   const [forecastData, setForecastData] = useState<any[]>([]);

//   const handleForecastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value);
//     setForecastMonths(value >= 0 ? value : 0);
//   };

//   const handleKeyPress = (event: React.KeyboardEvent) => {
//     if (event.key === "Enter") {
//       setShowForecast(true);
//     }
//   };

//   const handleForecastButtonClick = () => {
//     setShowForecast(true);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const a = 5;
//       const b = 6;
//       const response = await axios.get(
//         "http://127.0.0.1:8000/sale_forecasting/" + a + "/" + b
//       );
//       const data = response.data;

//       console.log("Fetched data:", data);

//       // Extracting data from response
//       const { graph, forecasted } = data;

//       console.log("Forecasted data:", forecasted);

//       // Extracting only the latest 12 months data
//       const labels = Object.keys(graph).slice(-12);
//       const salesData = labels.map((label) => parseInt(graph[label]));

//       console.log("Actual sales data:", salesData);

//       // Combining actual sales data and forecasted data initially
//       let allLabels = [...labels];
//       let allSalesData = [...salesData];

//       // Update the state to show only the last 12 months initially
//       setProductData({
//         labels: allLabels,
//         datasets: [
//           {
//             label: "Product Sales",
//             data: allSalesData,
//             borderColor: "blue",
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             pointBackgroundColor: "blue",
//             pointBorderColor: "blue",
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     if (showForecast) {
//       fetchDataWithForecast();
//     }
//   }, [showForecast, forecastMonths]);

//   const fetchDataWithForecast = async () => {
//     try {
//       const a = 5;
//       const b = 6;
//       const response = await axios.get(
//         "http://127.0.0.1:8000/sale_forecasting/" + a + "/" + b
//       );
//       const data = response.data;

//       // Extracting data from response
//       const { forecasted } = data;

//       // Extracting forecasted sales data based on user input
//       const forecastedData: any[] = [];
//       for (let i = 1; i <= forecastMonths; i++) {
//         const monthKey = `month_${i}`;
//         if (forecasted.hasOwnProperty(monthKey)) {
//           forecastedData.push({
//             label: `Forecast ${i}`,
//             data: forecasted[monthKey],
//           });
//         }
//       }

//       // Clear existing forecast data and add new forecasted months
//       setForecastData(forecastedData);
//     } catch (error) {
//       console.error("Error fetching forecasted data:", error);
//     }
//   };

//   // Combine actual sales data and forecasted data
//   const allLabels = [
//     ...productData.labels,
//     ...forecastData.map((item) => item.label),
//   ];
//   const allSalesData = [
//     ...productData.datasets[0].data,
//     ...forecastData.map((item) => item.data),
//   ];

//   const combinedLabels = [
//     ...productData.labels,
//     ...forecastData.map((item) => item.label),
//   ];
//   const combinedSalesData = [
//     ...productData.datasets[0].data,
//     ...forecastData.map((item) => item.data),
//   ];

//   const options = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Month",
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
//           text: "Quantity",
//         },
//       },
//     },
//   };

//   return (
//     <>

//       <div className="container">
//         <div className="chart-container">
//           <div className="forecast-input">
//             <label htmlFor="forecastMonths">Number of forecasted months:</label>
//             <input
//               type="number"
//               id="forecastMonths"
//               name="forecastMonths"
//               value={forecastMonths}
//               onChange={handleForecastChange}
//               onKeyDown={handleKeyPress}
//               inputMode="numeric" // Restrict input to numbers only
//             />
//           </div>
//           <Line
//             data={{
//               labels: allLabels,
//               datasets: [
//                 {
//                   label: "Product Sales",
//                   data: allSalesData,
//                   borderColor: "blue",
//                   backgroundColor: "rgba(255, 99, 132, 0.2)",
//                   pointBackgroundColor: "blue",
//                   pointBorderColor: "blue",
//                 },
//               ],
//             }}
//             options={options}
//           />
//         </div>

//         <div className="data-table-container">
//           <div className="data-table">
//             <table>
//               <thead className="table-header">
//                 <tr>
//                   <th>Month</th>
//                   <th>Quantity</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {combinedLabels.map((label, index) => (
//                   <tr key={index}>
//                     <td>{label}</td>
//                     <td>{combinedSalesData[index]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LineGraph;

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

const LineGraph: React.FC<LineGraphProps> = ({ graphData }) => {
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

export default LineGraph;

// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";
// import "./LineGraph.css";
// import { Select, MenuItem } from "@mui/material";
// // Removed import { Container } from "react-bootstrap"; since it's commented out later

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface GraphData {
//   [key: string]: number;
// }

// interface BackendData {
//   graph_data: GraphData;
//   product_details: ProductDetails;
//   product_quantity: number;
//   sale_last_month: number;
//   price_last_month: number;
// }

// interface ProductDetails {
//   product_id: number; // Add product ID
//   price: number;
//   brand: string;
//   product_type: string;
//   image: string;
// }

// const LineGraph: React.FC = () => {
//   const [productData, setProductData] = useState<any>({
//     labels: [],
//     datasets: [
//       {
//         label: "Product Sales",
//         data: [],
//         borderColor: "blue",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         pointBackgroundColor: "blue", // Set point color
//         pointBorderColor: "blue", // Set point color
//       },
//     ],
//   });

//   const [forecastMonths, setForecastMonths] = useState<number>(0);
//   const [showForecast, setShowForecast] = useState<boolean>(false);
//   const [forecastData, setForecastData] = useState<any[]>([]);
//   const [backendData, setBackendData] = useState<BackendData | null>(null);

//   const [selectedProductId, setSelectedProductId] = useState<string>("");
//   const [vendorProducts, setVendorProducts] = useState<ProductDetails[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchDataFromBackend = async () => {
//       setIsLoading(true);
//       try {
//         const products = await fetchVendorProducts(1); // Assuming the vendor ID is 1 for demo
//         setVendorProducts(products);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching vendor products:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchDataFromBackend();
//   }, []);

//   useEffect(() => {
//     if (selectedProductId) {
//       handleProductChange(selectedProductId);
//     }
//     // Added dependency on selectedProductId
//   }, [selectedProductId]);

//   const handleForecastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value);
//     setForecastMonths(value >= 0 ? value : 0);
//   };

//   const handleProductChange = async (productId: string) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/product_insights/${productId}`);
//       const data = response.data;
//       setBackendData(data);
//       setShowForecast(false); // Reset showForecast state to false whenever a new product is selected
//       // Call fetch data related to this product
//       fetchData(productId); // Pass productId to fetchData method
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     }
//   };

//   const fetchData = async (productId: string) => {
//     if (!productId) return; // Exit if no product ID is provided

//     setIsLoading(true);
//     try {
//       const b = 6; // This seems like a constant value for demonstration. Adjust as needed.
//       const response = await axios.get(`http://127.0.0.1:8000/price_forecasting/${productId}/`+b);
//       const { graph } = response.data;

//       const labels = Object.keys(graph).slice(-12);
//       const data = labels.map(label => graph[label]);

//       setProductData((prevState: { datasets: any[]; }) => ({
//         ...prevState,
//         labels: labels,
//         datasets: [
//           { ...prevState.datasets[0], data: data },
//         ],
//       }));
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data for product:", error);
//       setIsLoading(false);
//     }
//   };

//   // Removed duplicate useEffect for fetchData()

//   // Assuming fetchVendorProducts() definition is correct and exists in your code

//   return (
//     <>
//       <Select
//         value={selectedProductId}
//         onChange={(e) => setSelectedProductId(e.target.value as string)}
//         style={{ width: "300px" }}
//       >
//         {vendorProducts.map((product, index) => (
//           <MenuItem key={index} value={product.product_id.toString()}>
//             {product.brand} - {product.product_type}
//           </MenuItem>
//         ))}
//       </Select>

//       {!isLoading && selectedProductId && (
//         <div className="container">
//           {/* Chart and other components here, no change needed from your provided code */}
//         </div>
//       )}
//     </>
//   );
// };
// export default LineGraph;

// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";
// import "./LineGraph.css";
// import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
// import { Container } from "react-bootstrap";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineGraph: React.FC = () => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [selectedProductId, setSelectedProductId] = useState<string | number>(
//     ""
//   );
//   const [forecastMonths, setForecastMonths] = useState<number>(0);
//   const [showForecast, setShowForecast] = useState<boolean>(false);
//   const [forecastData, setForecastData] = useState<any[]>([]);
//   const [productData, setProductData] = useState<any>({
//     labels: [],
//     datasets: [
//       {
//         label: "Product Sales",
//         data: [],
//         borderColor: "blue",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         pointBackgroundColor: "blue", // Set point color
//         pointBorderColor: "blue", // Set point color
//       },
//     ],
//   });

//   useEffect(() => {
//     // Fetch products for the dropdown
//     const fetchProducts = async (vendorId: number) => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/view/${vendorId}`
//         );
//         return response.data;
//       } catch (error) {
//         console.error("Error fetching vendor products:", error);
//         return []; // Return an empty array if an error occurs
//       }
//     };

//     const vendorId = 1;

//     fetchProducts(vendorId)
//       .then((data) => {
//         setProducts(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching vendor products:", error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedProductId) {
//       fetchData();
//       if (showForecast) {
//         fetchDataWithForecast();
//       }
//     }
//   }, [selectedProductId, showForecast, forecastMonths]);

//   const handleForecastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value);
//     setForecastMonths(value >= 0 ? value : 0);
//   };

//   const handleKeyPress = (event: React.KeyboardEvent) => {
//     if (event.key === "Enter") {
//       setShowForecast(true);
//     }
//   };

//   const handleForecastButtonClick = () => {
//     setShowForecast(true);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleProductChange = (
//     event: React.ChangeEvent<{ value: unknown }>
//   ) => {
//     const productId = event.target.value as string;
//     setSelectedProductId(productId);
//     // If needed, you can call handleProductChange function here passing productId
//   };

//   const fetchData = async (productId: string) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/sales_data/${productId}`
//       );
//       const data = response.data;

//       console.log("Fetched data:", data);

//       // Extracting data from response
//       const { graph } = data;

//       // Extracting labels and sales data
//       const labels = Object.keys(graph);
//       const salesData = labels.map((label) => parseInt(graph[label]));

//       console.log("Actual sales data:", salesData);

//       // Update the state with new product data
//       setProductData({
//         labels: labels,
//         datasets: [
//           {
//             label: "Product Sales",
//             data: salesData,
//             borderColor: "blue",
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             pointBackgroundColor: "blue",
//             pointBorderColor: "blue",
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     if (showForecast) {
//       fetchDataWithForecast();
//     }
//   }, [showForecast, forecastMonths]);

//   // const handleProductChange = (
//   //   event: React.ChangeEvent<{ value: unknown }>
//   // ) => {
//   //   const productId = event.target.value as string;
//   //   setSelectedProductId(productId);
//   //   // If needed, you can call handleProductChange function here passing productId
//   // };

//   const fetchDataWithForecast = async () => {
//     try {
//       const a = 5;
//       const b = 6;
//       const response = await axios.get(
//         "http://127.0.0.1:8000/sale_forecasting/" + a + "/" + b
//       );
//       const data = response.data;

//       // Extracting data from response
//       const { forecasted } = data;

//       // Extracting forecasted sales data based on user input
//       const forecastedData: any[] = [];
//       for (let i = 1; i <= forecastMonths; i++) {
//         const monthKey = `month_${i}`;
//         if (forecasted.hasOwnProperty(monthKey)) {
//           forecastedData.push({
//             label: `Forecast ${i}`,
//             data: forecasted[monthKey],
//           });
//         }
//       }

//       // Clear existing forecast data and add new forecasted months
//       setForecastData(forecastedData);
//     } catch (error) {
//       console.error("Error fetching forecasted data:", error);
//     }
//   };

//   // Combine actual sales data and forecasted data
//   const allLabels = [
//     ...productData.labels,
//     ...forecastData.map((item) => item.label),
//   ];
//   const allSalesData = [
//     ...productData.datasets[0].data,
//     ...forecastData.map((item) => item.data),
//   ];

//   const combinedLabels = [
//     ...productData.labels,
//     ...forecastData.map((item) => item.label),
//   ];
//   const combinedSalesData = [
//     ...productData.datasets[0].data,
//     ...forecastData.map((item) => item.data),
//   ];

//   const options = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Month",
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
//           text: "Quantity",
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <div className="container">
//         <Select
//           value={String(selectedProductId)}
//           onChange={(e) => {
//             const productId = e.target.value;
//             setSelectedProductId(productId as string);
//           }}
//           displayEmpty
//           inputProps={{ "aria-label": "Without label" }}
//         >
//           <MenuItem value="" disabled>
//             Select a Product
//           </MenuItem>
//           {Object.entries(products).map(
//             (
//               [productId, product] // Using Object.entries to iterate over object entries
//             ) => (
//               <MenuItem key={productId} value={String(productId)}>
//                 {product.brand} - {product.product_type}
//               </MenuItem>
//             )
//           )}
//         </Select>

//         <div className="chart-container">
//           <div className="forecast-input">
//             <label htmlFor="forecastMonths">Number of forecasted months:</label>
//             <input
//               type="number"
//               id="forecastMonths"
//               name="forecastMonths"
//               value={forecastMonths}
//               onChange={handleForecastChange}
//               onKeyDown={handleKeyPress}
//               inputMode="numeric" // Restrict input to numbers only
//             />
//           </div>
//           <Line
//             data={{
//               labels: allLabels,
//               datasets: [
//                 {
//                   label: "Product Sales",
//                   data: allSalesData,
//                   borderColor: "blue",
//                   backgroundColor: "rgba(255, 99, 132, 0.2)",
//                   pointBackgroundColor: "blue",
//                   pointBorderColor: "blue",
//                 },
//               ],
//             }}
//             options={options}
//           />
//         </div>

//         <div className="data-table-container">
//           <div className="data-table">
//             <table>
//               <thead className="table-header">
//                 <tr>
//                   <th>Month</th>
//                   <th>Quantity</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {combinedLabels.map((label, index) => (
//                   <tr key={index}>
//                     <td>{label}</td>
//                     <td>{combinedSalesData[index]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LineGraph;
