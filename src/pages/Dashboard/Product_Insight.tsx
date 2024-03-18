// import { Container, Grid, Paper } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import DashboardN from "../../Components/DashboardNavbar";
// import CustomCard from "../../Components/InsightCards";
// import LineGraph from "../../Components/LineGraph";
// import CustomProductCard from "../../Components/Product_Component";

// interface GraphData {
//   [key: string]: number;
// }

// interface ProductDetails {
//   //   product_id: number;
//   price: number;
//   brand: string;
//   product_type: string;
//   image: string;
// }

// interface BackendData {
//   graph_data: GraphData;
//   product_details: ProductDetails;
//   product_quantity: number;
//   sale_last_month: number;
//   price_last_month: number;
// }

// const fetchData = async (a: number): Promise<BackendData> => {
//   try {
//     const response = await fetch(`http://127.0.0.1:8000/product_insights/${a}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error("Error fetching data");
//   }
// };

// const ProductInsight: React.FC = () => {
//   const [backendData, setBackendData] = useState<BackendData | null>(null);

//   useEffect(() => {
//     const fetchDataFromBackend = async () => {
//       try {
//         const data = await fetchData(5); // Adjust parameter as needed
//         setBackendData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDataFromBackend();
//   }, []);

//   return (
//     <div>
//       {backendData ? (
//         <div>
//           <DashboardN />

//           <div
//             style={{
//               display: "flex",
//               marginTop: "100px",
//               marginLeft: "135px",
//               //   marginRight: "80px",
//               maxWidth: "800px", // Set a maximum width to prevent the elements from stretching too wide
//             }}
//           >
//             <div style={{ marginRight: "30px" }}>
//               <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 <h2>Product Details</h2>
//                 <Grid container spacing={2}>
//                   {/* Directly display the product details */}
//                   <Grid item xs={12} sm={6} md={4}>
//                     <CustomProductCard
//                       image={backendData.product_details.image}
//                       brand={backendData.product_details.brand}
//                       product_type={backendData.product_details.product_type}
//                       price={backendData.product_details.price}
//                     />
//                   </Grid>
//                 </Grid>
//               </Container>
//             </div>

//             <div>
//               <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 <h2>Graph</h2>
//                 <Paper
//                   elevation={3}
//                   style={{
//                     padding: "30px",
//                     width: "400px",
//                     marginTop: "20px",
//                     height: "200px",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <LineGraph graphData={backendData.graph_data} />
//                 </Paper>
//               </Container>
//             </div>
//           </div>

//           <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <h2>Product Details</h2>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Product Quantity"
//                   content={backendData.product_quantity}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Sale Last Month:"
//                   content={backendData.sale_last_month}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Price Last Month: "
//                   content={backendData.price_last_month}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Total Customers:"
//                   content={backendData.product_quantity}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Last Month Customer:"
//                   content={backendData.product_quantity}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Total Revenue:"
//                   content={backendData.product_quantity}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Last Month Revenue:"
//                   content={backendData.product_quantity}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Return:"
//                   content={backendData.product_quantity}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <CustomCard
//                   title="Inventory:"
//                   content={backendData.product_quantity}
//                 />
//               </Grid>
//             </Grid>
//           </Container>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ProductInsight;

import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardN from "../../Components/DashboardNavbar";
import CustomCard from "../../Components/InsightCards";
import LineGraph from "../../Components/LineGraph";
import CustomProductCard from "../../Components/Product_Component";

interface GraphData {
  [key: string]: number;
}

interface ProductDetails {
  price: number;
  brand: string;
  product_type: string;
  image: string;
}

interface BackendData {
  graph_data: GraphData;
  product_details: ProductDetails;
  product_quantity: number;
  sale_last_month: number;
  price_last_month: number;
}

const fetchData = async (a: number): Promise<BackendData> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/product_insights/${a}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

const ProductInsight: React.FC = () => {
  const [backendData, setBackendData] = useState<BackendData | null>(null);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const data = await fetchData(5); // Adjust parameter as needed
        setBackendData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromBackend();
  }, []);

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Riot:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <Typography
        variant="h4"
        sx={{
            marginTop:"70px",
          textAlign: "center",
          fontFamily: "'Protest Riot', sans-serif",
          fontWeight: "bold",
          fontSize: "60px",
          color: "red",
          background:
            "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Product Insight
      </Typography>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        {backendData ? (
          <div>
            <DashboardN />

            <div
              style={{
                display: "flex",
                // marginTop: "5px",
                marginLeft: "135px",
                maxWidth: "800px",
              }}
            >
              <div style={{ marginRight: "30px" }}>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <h2>Product Details</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomProductCard
                        image={backendData.product_details.image}
                        brand={backendData.product_details.brand}
                        product_type={backendData.product_details.product_type}
                        price={backendData.product_details.price}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </div>

              <div>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <h2>Graph</h2>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "30px",
                      width: "400px",
                      marginTop: "20px",
                      height: "200px",
                      marginBottom: "20px",
                    }}
                  >
                    {/* <LineGraph graphData={backendData.graph_data} /> */}
                  </Paper>
                </Container>
              </div>
            </div>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <h2>Product Details</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Product Quantity:"
                    content={backendData.product_quantity}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Sale Last Month:"
                    content={backendData.sale_last_month}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Price Last Month: "
                    content={backendData.price_last_month}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Total Customers:"
                    content={backendData.product_quantity}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Last Month Customer:"
                    content={backendData.product_quantity}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Total Revenue:"
                    content={backendData.product_quantity}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Last Month Revenue:"
                    content={backendData.product_quantity}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Return:"
                    content={backendData.product_quantity}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    title="Inventory:"
                    content={backendData.product_quantity}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ProductInsight;
