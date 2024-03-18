import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardN from "../../Components/DashboardNavbar";
import CustomCard from "../../Components/InsightCards";
import LineGraph from "../../Components/LineGraph";

interface GraphData {
  [key: string]: number;
}

interface ProductDetails {
  product_id: number;
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
    <div>
      {backendData ? (
        <div>
          <DashboardN />
          <h2>Product Details</h2>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <h2>Product Details</h2>
            <Grid container spacing={2}>
            
              <Grid item xs={12} sm={6} md={4}>
                <CustomCard
                  title="Product Quantity"
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
            </Grid>
          </Container>

          <h2>Graph Data</h2>
          <LineGraph graphData={backendData.graph_data} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductInsight;
