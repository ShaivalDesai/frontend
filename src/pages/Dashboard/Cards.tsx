// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography, Grid } from "@mui/material";

// interface DashboardCardsProps {
//   topSales: number;
//   totalSales: number;
//   customers: number;
//   orders: number;
// }

// const DashboardCards: React.FC = () => {
//   const [topSales, setTopSales] = useState<number | null>(null);
//   const [totalSales, setTotalSales] = useState<number | null>(null);
//   const [customers, setCustomers] = useState<number | null>(null);
//   const [orders, setOrders] = useState<number | null>(null);

//   // useEffect(() => {
//   //   const storedTopSales = localStorage.getItem("topSales");
//   //   const storedTotalSales = localStorage.getItem("totalSales");
//   //   const storedCustomers = localStorage.getItem("customers");
//   //   const storedOrders = localStorage.getItem("orders");

//   //   if (storedTopSales) setTopSales(Number(storedTopSales));
//   //   if (storedTotalSales) setTotalSales(Number(storedTotalSales));
//   //   if (storedCustomers) setCustomers(Number(storedCustomers));
//   //   if (storedOrders) setOrders(Number(storedOrders));
//   // }, []);

//   // useEffect(() => {
//   //   if (topSales !== null) localStorage.setItem("topSales", String(topSales));
//   //   if (totalSales !== null)
//   //     localStorage.setItem("totalSales", String(totalSales));
//   //   if (customers !== null)
//   //     localStorage.setItem("customers", String(customers));
//   //   if (orders !== null) localStorage.setItem("orders", String(orders));
//   // }, [topSales, totalSales, customers, orders]);
//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           sx={{
//             borderRadius: "10px",
//             backgroundColor: "#f1e0c5",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "box-shadow 0.3s, background-color 0.3s",
//             "&:hover": {
//               boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//               backgroundColor: "",
//             },
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="h2">
//               Top Sales
//             </Typography>
//             <Typography color="text.secondary">$1200</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           sx={{
//             borderRadius: "10px",
//             backgroundColor: "#f1e0c5",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "box-shadow 0.3s, background-color 0.3s",
//             "&:hover": {
//               boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//               backgroundColor: "",
//             },
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="h2">
//               Total Sales
//             </Typography>
//             <Typography color="text.secondary">$2500</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           sx={{
//             borderRadius: "10px",
//             backgroundColor: "#f1e0c5",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "box-shadow 0.3s, background-color 0.3s",
//             "&:hover": {
//               boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//               backgroundColor: "",
//             },
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="h2">
//               Customers
//             </Typography>
//             <Typography color="text.secondary">50</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           sx={{
//             borderRadius: "10px",
//             backgroundColor: "#f1e0c5",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "box-shadow 0.3s, background-color 0.3s",
//             "&:hover": {
//               boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//               backgroundColor: "",
//             },
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="h2">
//               Last Month Order
//             </Typography>
//             <Typography color="text.secondary">50</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default DashboardCards;

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface DashboardCardsProps {
  topSales: number;
  totalSales: number;
  customers: number;
  orders: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  topSales,
  totalSales,
  customers,
  orders,
}) => {
  // Remove local state and useEffect related to fetching and storing data

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Top Sales
            </Typography>
            <Typography color="text.secondary">{topSales}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Total Sales
            </Typography>
            <Typography color="text.secondary">{totalSales}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Customers
            </Typography>
            <Typography color="text.secondary">{customers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Last Month Order
            </Typography>
            <Typography color="text.secondary">{orders}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;

