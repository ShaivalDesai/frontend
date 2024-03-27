import {
  Container,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardN from "../../Components/DashboardNavbar";
import CustomCard from "../../Components/InsightCards";
// import LineGraph from "../../Components/LineGraph";
import CustomProductCard from "../../Components/Product_Component";
import axios from "axios";
import Product_Insight_Graph from "../../Components/Insight_Graph";
// import LineGraph from "../../Components/LineGraph";

interface GraphData {
  [key: string]: number;
}

interface ProductDetails {
  product_id: number; // Add product ID
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

const fetchVendorProducts = async (
  vendorId: number
): Promise<ProductDetails[]> => {
  try {
    const id = 1; // Assuming vendor ID is 1
    const response = await axios.get(`http://127.0.0.1:8000/view/${id}`);
    const data = response.data;
    console.log("Received data from backend:", data); // Log the received data
    return data; // Assuming data is already an array of ProductDetails
  } catch (error) {
    console.error("Error fetching vendor products:", error);
    return []; // Return an empty array if an error occurs
  }
};

const ProductInsight: React.FC = () => {
  const [backendData, setBackendData] = useState<BackendData | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [vendorProducts, setVendorProducts] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null
  );

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const products = await fetchVendorProducts(1);
        setVendorProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vendor products:", error);
        setIsLoading(false);
      }
    };

    fetchDataFromBackend();
  }, []);

  const handleProductChange = async (productId: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/product_insights/${productId}`
      );
      const data = response.data;
      setBackendData(data);
      // Find the selected product details
      const selected = vendorProducts.find(
        (product) => product.product_id === parseInt(productId)
      );

      setSelectedProduct(selected || null);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  console.log("Selected product");
  // console.log(selected);
  return (
    <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
      <>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>

        <Typography
          variant="h4"
          sx={{
            marginTop: "70px",
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif",
            // fontWeight: "bold",
            fontSize: "50px",
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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <DashboardN />
              <div
                style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    marginTop: "30px",
                    textAlign: "center",

                    fontSize: "30px",
                    color: "black",
                  }}
                >
                  Select the product:
                </Typography>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <Select
                    value={selectedProductId !== null ? selectedProductId : ""}
                    onChange={(e) => {
                      const productId = e.target.value as string;
                      setSelectedProductId(productId);
                      handleProductChange(productId);
                    }}
                    style={{
                      width: "200px",
                      height: "40px",
                      fontSize: "16px",
                      marginTop: "-20px",
                    }}
                  >
                    {Object.entries(vendorProducts).map(
                      ([productId, product]) => (
                        <MenuItem key={productId} value={productId}>
                          {product.brand} - {product.product_type}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Container>
              </div>

              {backendData && (
                <div
                  style={{
                    // display: "flex",
                    margin: "20px",
                    // maxWidth: "800px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Product Quantity:"
                        content={backendData?.product_quantity}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Sale Last Month:"
                        content={backendData?.sale_last_month}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Price Last Month: "
                        content={backendData?.price_last_month}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Total Customers:"
                        content={backendData?.price_last_month}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Last Month Customer:"
                        content={backendData?.price_last_month}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Total Revenue:"
                        content={backendData?.price_last_month}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Last Month Revenue:"
                        content={backendData?.price_last_month}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Return:"
                        content={backendData?.price_last_month}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <CustomCard
                        title="Inventory:"
                        content={backendData?.price_last_month}
                      />{" "}
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "-20px",
                      maxWidth: "800px",
                    }}
                  >
                    <div style={{ marginBottom: "20px" }}>
                      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <CustomProductCard
                              image={backendData.product_details.image}
                              brand={backendData.product_details.brand}
                              product_type={
                                backendData.product_details.product_type
                              }
                              price={backendData.product_details.price}
                            />
                          </Grid>
                        </Grid>
                      </Container>
                    </div>

                    <div>
                      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Paper
                          elevation={3}
                          style={{
                            padding: "30px",
                            width: "790px",
                            marginTop: "10px",
                            height: "380px",
                          }}
                        >
                          <Product_Insight_Graph graphData={backendData.graph_data} />
                        </Paper>
                      </Container>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default ProductInsight;
