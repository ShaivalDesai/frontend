// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Select, MenuItem, Typography } from "@mui/material";
// import DashboardN from "./DashboardNavbar";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface SalesData {
//   [key: string]: number;
// }

// interface ProductDetails {
//   product_id: number;
//   price: number;
//   brand: string;
//   product_type: string;
//   image: string;
// }

// interface DataSet {
//   my_data: {
//     vendor_id: number;
//     product_id: number;
//     sales: SalesData;
//   } | null;
//   competitor_data: {
//     product_id: number;
//     sales: SalesData;
//   } | null;
// }

// const SalesComparisonChart: React.FC = () => {
//   const [data, setData] = useState<DataSet>({
//     my_data: null,
//     competitor_data: null,
//   });
//   const [vendorProducts, setVendorProducts] = useState<ProductDetails[]>([]);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(
//     null
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedProductId) return; // Exit if no product selected
//       try {
//         const response = await axios.get<DataSet>(
//           `http://127.0.0.1:8000/compare/1/${selectedProductId}`
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedProductId]);

//   const fetchVendorProducts = async (vendorId: number): Promise<void> => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/view_list/${vendorId}`
//       );
//       const data: ProductDetails[] = (
//         Object.values(response.data) as ProductDetails[][]
//       ).flat(); // Type assertion
//       console.log("Received data from backend:", data);
//       setVendorProducts(data);
//     } catch (error) {
//       console.error("Error fetching vendor products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchVendorProducts(1);
//   }, []);

//   const handleProductSelect = (productId: number) => {
//     setSelectedProductId(productId);
//   };

//   const labels = data.my_data ? Object.keys(data.my_data.sales) : [];
//   const mySalesData = data.my_data ? Object.values(data.my_data.sales) : [];
//   const competitorSalesData = data.competitor_data
//     ? Object.keys(data.competitor_data.sales).map(
//         (date) => data.competitor_data!.sales[date] || 0
//       )
//     : [];

//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: "My Sales",
//         data: mySalesData,
//         // backgroundColor: "rgba(53, 162, 235, 0.5)",
//         backgroundColor: "red",
//       },
//       {
//         label: "Competitor Sales",
//         data: competitorSalesData,
//         // backgroundColor: "rgba(255, 99, 132, 0.5)",
//         backgroundColor: "blue",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Sales Comparison Chart",
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

//       <DashboardN />
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             paddingTop: "90px",
//             fontFamily: "'Roboto', sans-serif",
//             fontWeight: "bold",
//             fontSize: "30px",
//             color: "#724c31",
//             marginRight: "10px",
//           }}
//         >
//           Select Product:
//         </Typography>
//         <Select
//           onChange={(e) => handleProductSelect(Number(e.target.value))}
//           value={selectedProductId !== null ? selectedProductId.toString() : ""}
//           style={{ minWidth: "200px", marginTop: "90px", height: "40px" }}
//         >
//           {Object.entries(vendorProducts).map(([key, product]) => (
//             <MenuItem key={product.product_id} value={product.product_id}>
//               {product.brand} - {product.product_type}
//             </MenuItem>
//           ))}
//         </Select>
//       </div>

//       <Bar options={options} data={chartData} />
//     </>
//   );
// };

// export default SalesComparisonChart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Select, MenuItem, Typography, Card, CardContent, Grid } from "@mui/material";
import DashboardN from "./DashboardNavbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  [key: string]: number;
}

interface ProductDetails {
  product_id: number;
  price: number;
  brand: string;
  product_type: string;
  image: string;
}

interface DataSet {
  my_data: {
    vendor_id: number;
    product_id: number;
    sales: SalesData;
  } | null;
  competitor_data: {
    product_id: number;
    sales: SalesData;
  } | null;
}

const SalesComparisonChart: React.FC = () => {
  const [data, setData] = useState<DataSet>({
    my_data: null,
    competitor_data: null,
  });
  const [vendorProducts, setVendorProducts] = useState<ProductDetails[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedProductId) return; // Exit if no product selected
      try {
        const response = await axios.get<DataSet>(
          `http://127.0.0.1:8000/compare/1/${selectedProductId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedProductId]);

  const fetchVendorProducts = async (vendorId: number): Promise<void> => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/view_list/${vendorId}`
      );
      const data: ProductDetails[] = (
        Object.values(response.data) as ProductDetails[][]
      ).flat(); // Type assertion
      console.log("Received data from backend:", data);
      setVendorProducts(data);
    } catch (error) {
      console.error("Error fetching vendor products:", error);
    }
  };

  useEffect(() => {
    fetchVendorProducts(1);
  }, []);

  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
  };

  let labels: string[] = [];
  let mySalesData: number[] = [];
  let competitorSalesData: number[] = [];

  if (data.my_data && data.my_data.sales) {
    const salesEntries = Object.entries(data.my_data.sales);
    const last12Months = salesEntries.slice(-12); // Get last 12 months

    labels = last12Months.map(([date]) => date);
    mySalesData = last12Months.map(([_, value]) => value);
  }

  if (data.competitor_data && data.competitor_data.sales) {
    const salesEntries = Object.entries(data.competitor_data.sales);
    const last12Months = salesEntries.slice(-12); // Get last 12 months

    competitorSalesData = last12Months.map(([_, value]) => value);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "My Sales",

        data: mySalesData,
        // backgroundColor: "rgba(53, 162, 235, 0.5)",
        backgroundColor: "blue",
      },
      {
        label: "Competitor Sales",
        data: competitorSalesData,
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sales Comparison Chart",
        font: {
          size: 25, // Adjust the font size as needed
        },
      },
    },
  };

  return (
    <>
    <div style={{background:"#d4d4d4"}}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <DashboardN />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            paddingTop: "90px",
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#724c31",
            marginRight: "10px",
          }}
        >
          Select Product:
        </Typography>
        <Select
          onChange={(e) => handleProductSelect(Number(e.target.value))}
          value={selectedProductId !== null ? selectedProductId.toString() : ""}
          style={{ minWidth: "200px", marginTop: "90px", height: "40px" }}
        >
          {vendorProducts.map((product) => (
            <MenuItem key={product.product_id} value={product.product_id}>
              {product.brand} - {product.product_type}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh",marginTop:"-120px" }}
        
      >
        <Grid item  justifyContent="center"   >
          <Card variant="outlined" style={{ width: "1000px",borderRadius:"30px" }}>
            <CardContent>
              <Typography variant="h6" component="h2">
               
              </Typography>
              <div style={{ height: "400px", marginTop: "5px" , justifyContent:"center",marginLeft:"75px"}}>
                <Bar data={chartData} options={options} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default SalesComparisonChart;
