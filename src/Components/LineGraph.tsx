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
// import { Select, MenuItem, Container, Typography } from "@mui/material";

// interface ProductDetails {
//   product_id: number;
//   price: number;
//   brand: string;
//   product_type: string;
//   image: string;
// }

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
//         pointBackgroundColor: "blue",
//         pointBorderColor: "blue",
//       },
//     ],
//   });

//   const [forecastMonths, setForecastMonths] = useState<number>(0);
//   const [showForecast, setShowForecast] = useState<boolean>(false);
//   const [forecastData, setForecastData] = useState<any[]>([]);
//   const [vendorProducts, setVendorProducts] = useState<ProductDetails[]>([]);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(
//     null
//   );

//   const handleForecastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value);
//     setForecastMonths(value >= 0 ? value : 0);
//     setShowForecast(true); // Automatically show forecast when value changes
//   };

//   const fetchVendorProducts = async (vendorId: number): Promise<void> => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/view/${vendorId}`
//       );
//       const data: ProductDetails[] = response.data;
//       console.log("Received data from backend:", data);
//       setVendorProducts(data);
//     } catch (error) {
//       console.error("Error fetching vendor products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [selectedProductId]);

//   const fetchData = async () => {
//     try {
//       if (selectedProductId) {
//         let response;
//         if (forecastMonths > 0) {
//           response = await axios.get(
//             `http://127.0.0.1:8000/price_forecasting/${selectedProductId}/${forecastMonths}`
//           );
//         } else {
//           // Fetching only the last 12 months' data
//           const a = 1;
//           response = await axios.get(
//             `http://127.0.0.1:8000/price_forecasting/${selectedProductId}/${a}`
//           );
//         }
//         const data = response.data;

//         // Extracting data from response
//         const { graph, forecasted } = data;

//         // Extracting only the latest 12 months data if no forecasted months are selected
//         const labels = Object.keys(graph);
//         const salesData = labels.map((label) => parseInt(graph[label]));

//         // Update the state to show only the last 12 months initially if no forecasted months are selected
//         setProductData({
//           labels: labels.slice(-12),
//           datasets: [
//             {
//               label: "Product Sales",
//               data: salesData.slice(-12),
//               borderColor: "blue",
//               backgroundColor: "rgba(255, 99, 132, 0.2)",
//               pointBackgroundColor: "blue",
//               pointBorderColor: "blue",
//             },
//           ],
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     if (showForecast && selectedProductId) {
//       fetchDataWithForecast();
//     }
//   }, [showForecast, forecastMonths, selectedProductId]);

//   const fetchDataWithForecast = async () => {
//     try {
//       const forecastMonthsToFetch = Math.max(1, forecastMonths);
//       const response = await axios.get(
//         `http://127.0.0.1:8000/price_forecasting/${selectedProductId}/${forecastMonths}`
//       );
//       const data = response.data;
//       const { forecasted } = data;

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

//       setForecastData(forecastedData.slice(0, 6));
//     } catch (error) {
//       console.error("Error fetching forecasted data:", error);
//     }
//   };

//   const handleDropdownOpen = () => {
//     fetchVendorProducts(3);
//   };

//   const handleProductSelect = (productId: number) => {
//     setSelectedProductId(productId);
//   };

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
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>

//       <Typography
//         variant="h4"
//         sx={{
//           // marginTop: "1px",
//           marginBottom: "10px",
//           textAlign: "center",
//           fontFamily: "'Roboto', sans-serif",
//           // fontWeight: "bold",
//           fontSize: "30px",
//           color: "red",
//           background:
//             "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Select Product:
//       </Typography>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           width: "100%",
//           marginBottom: "20px",
//         }}
//       >
//         <Select
//           onOpen={handleDropdownOpen}
//           onChange={(e) => handleProductSelect(Number(e.target.value))}
//           value={selectedProductId !== null ? selectedProductId.toString() : ""}
//           style={{ minWidth: "200px" }}
//         >
//           {Object.entries(vendorProducts).map(([key, product]) => (
//             <MenuItem key={product.product_id} value={product.product_id}>
//               {" "}
//               {product.brand} - {product.product_type}
//             </MenuItem>
//           ))}
//         </Select>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-around",
//           width: "100%",
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           className="chart-container"
//           style={{ flex: 1, minWidth: "300px", marginRight: "20px" }}
//         >
//           <div className="forecast-input">
//             <label htmlFor="forecastMonths">Number of forecasted months:</label>
//             <input
//               type="number"
//               id="forecastMonths"
//               name="forecastMonths"
//               value={forecastMonths}
//               onChange={handleForecastChange}
//               inputMode="numeric"
//             />
//           </div>

//           <Line
//             data={{
//               labels: [
//                 ...productData.labels,
//                 ...forecastData.map((item) => item.label),
//               ],
//               datasets: [
//                 {
//                   label: "Product Sales",
//                   data: productData.datasets[0].data,
//                   borderColor: "blue",
//                   backgroundColor: "rgba(255, 99, 132, 0.2)",
//                   pointBackgroundColor: "blue",
//                   pointBorderColor: "blue",
//                 },
//                 {
//                   label: "Forecasted Sales",
//                   data: [
//                     ...productData.datasets[0].data, // Use the actual sales data instead of padding
//                     ...forecastData.map((item) => item.data),
//                   ],
//                   borderColor: "red",
//                   backgroundColor: "rgba(75, 192, 192, 0.2)",
//                   pointBackgroundColor: "red",
//                   pointBorderColor: "red",
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
//                 {productData.labels.map((label: any, index: any) => (
//                   <tr key={index}>
//                     <td>{label}</td>
//                     <td>{productData.datasets[0].data[index]}</td>
//                   </tr>
//                 ))}
//                 {forecastData.map((item, index) => (
//                   <tr key={index + productData.labels.length}>
//                     <td>{item.label}</td>
//                     <td>{item.data}</td>
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

// <style>
//   {`
//   .select-container {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 20px;
//     width: 100%; /* Ensure it takes full width */
//   }

//   .container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 100%; /* Ensures container is full width */
//   }

//   .chart-container, .data-table-container {
//     width: 100%;
//     max-width: 800px; /* Adjust based on your design */
//     margin: 0 auto;
//   }

//   table-header{
//     color:"red";
//   }
//    `}
// </style>;

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
import { Select, MenuItem, Container, Typography } from "@mui/material";

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

const LineGraph: React.FC = () => {
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

  const [forecastMonths, setForecastMonths] = useState<number>(1);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [vendorProducts, setVendorProducts] = useState<ProductDetails[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const handleForecastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setForecastMonths(value >= 0 ? value : 0);
    setShowForecast(true); // Automatically show forecast when value changes
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

  useEffect(() => {
    fetchData();
  }, [selectedProductId]);

  const fetchData = async () => {
    try {
      if (selectedProductId) {
        let response;
        if (forecastMonths > 0) {
          response = await axios.get(
            `http://127.0.0.1:8000/price_forecasting/${selectedProductId}/${forecastMonths}`
          );
        } else {
          // Fetching only the last 12 months' data
          const a = 1;
          response = await axios.get(
            `http://127.0.0.1:8000/price_forecasting/${selectedProductId}/${a}`
          );
        }
        const data = response.data;

        // Extracting data from response
        const { graph, forecasted } = data;

        // Extracting only the latest 12 months data if no forecasted months are selected
        const labels = Object.keys(graph);
        const salesData = labels.map((label) => parseInt(graph[label]));

        // Update the state to show only the last 12 months initially if no forecasted months are selected
        setProductData({
          labels: labels.slice(-12),
          datasets: [
            {
              label: "Product Sales",
              data: salesData.slice(-12),
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

  useEffect(() => {
    if (showForecast && selectedProductId) {
      fetchDataWithForecast();
    }
  }, [showForecast, forecastMonths, selectedProductId]);

  const fetchDataWithForecast = async () => {
    try {
      const forecastMonthsToFetch = Math.max(1, forecastMonths);
      const response = await axios.get(
        `http://127.0.0.1:8000/price_forecasting/${selectedProductId}/${forecastMonths}`
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

      setForecastData(forecastedData.slice(0, 6));
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

  return (
    <>
      <div
        style={{
          backgroundColor: selectedProductId ? "#d4d4d4" : "#d4d4d4", // Conditional background color
          minHeight: "100vh", // Ensure the page takes up at least the full viewport height
        }}
      >
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            fontSize: "50px",

            color: "red",
            background:
              "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: "65px",
          }}
        >
          Price Forecasting
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {/* <Typography
          variant="h4"
          sx={{
            paddingTop: "80px",
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#724c31",
            marginRight: "10px",
          }}
        >
          Select Product:
        </Typography> */}

          {/* <Typography
        variant="h4"
        sx={{
          marginTop:"20px",
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold",
          fontSize: "50px",
          marginBottom: "1rem",
          color: "red",
          background:
            "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
       Price Forecasting
      </Typography> */}
          {/* <Select
          onOpen={handleDropdownOpen}
          onChange={(e) => handleProductSelect(Number(e.target.value))}
          value={selectedProductId !== null ? selectedProductId.toString() : ""}
          style={{ minWidth: "200px", marginTop: "80px", height: "40px" }}
        >
          {Object.entries(vendorProducts).map(([key, product]) => (
            <MenuItem key={product.product_id} value={product.product_id}>
              {product.brand} - {product.product_type}
            </MenuItem>
          ))}
        </Select> */}

          <Select
            onOpen={handleDropdownOpen}
            onChange={(e) => handleProductSelect(Number(e.target.value))}
            value={
              selectedProductId !== null ? selectedProductId.toString() : ""
            }
            style={{ minWidth: "200px", marginTop: "20px", height: "40px" }}
            displayEmpty // This is to display the selected value even when it's empty
          >
            {/* Placeholder */}
            <MenuItem value="" disabled>
              Select the product
            </MenuItem>
            {/* Other options */}
            {Object.entries(vendorProducts).map(([key, product]) => (
              <MenuItem key={product.product_id} value={product.product_id}>
                {product.brand} - {product.product_type}
              </MenuItem>
            ))}
          </Select>
        </div>

        {selectedProductId && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <div
              className="chart-container"
              style={{ flex: 1, minWidth: "300px", marginRight: "20px" }}
            >
              <div className="forecast-input">
                <label
                  htmlFor="forecastMonths"
                  style={{
                    textAlign: "center",
                    color: "brown",
                    justifyContent: "center",
                  }}
                >
                  Months to Forecast:
                </label>
                {/* <input
              type="number"
              id="forecastMonths"
              name="forecastMonths"
              value={forecastMonths}
              onChange={handleForecastChange}
              inputMode="numeric"
            /> */}

                <input
                  type="text"
                  id="forecastMonths"
                  name="forecastMonths"
                  value={forecastMonths}
                  onChange={handleForecastChange}
                  inputMode="numeric"
                  style={{ width: "4em" }}
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
                      data: productData.datasets[0].data,
                      borderColor: "blue",
                      // backgroundColor: "rgba(255, 99, 132, 0.2)",
                      backgroundColor: "#0000ff",
                      pointBackgroundColor: "blue",
                      pointBorderColor: "blue",
                    },
                    {
                      label: "Forecasted Sales",
                      data: [
                        ...productData.datasets[0].data, // Use the actual sales data instead of padding
                        ...forecastData.map((item) => item.data),
                      ],
                      borderColor: "red",
                      backgroundColor: "red",
                      pointBackgroundColor: "red",
                      pointBorderColor: "red",
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
                        <td style={{ color: "red" }}>{item.label}</td>
                        <td style={{ color: "red" }}>{item.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LineGraph;

<style>
  {`

body {
  background: linear-gradient(45deg, #fbfaf9 0%, #e4d9d0 100%);
}


  .select-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%; 
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; 
  }
  
  .chart-container, .data-table-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  
  }
   




.table-container {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  text-align: left;
  padding: 12px 15px;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

td {
  border-top: 1px solid #eee;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}


@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    text-align: right;
  }

  td:before {
    position: absolute;
    top: 12px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
    content: attr(data-label);
  }

  td:last-child {
    border-bottom: 0;
  }
}


.forecast-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.forecast-input label {
  font-weight: bold;
}

.forecast-input input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.chart-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.line-graph-container {
  display: flex;
}

.chart-container,
.forecast-chart-container {
  flex: 1;
  margin: 10px;
}

.container {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  width: 70%;
}

.data-table-container {
  width: 25%; 
  max-height: 500px; 
  overflow-y: auto; 
  margin-top: 10px;
  
}

.data-table {
  width: 100%;
}


.chart-container {
  width: 60%; 
}


.data-table-container {
  width: 35%; 
}


.container {
  display: flex;
  flex-wrap: wrap;
}


.chart-container,
.data-table-container {
  margin: 10px; 
}

}`}
</style>;
