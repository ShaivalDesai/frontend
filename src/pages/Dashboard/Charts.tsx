import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

interface ChartCardProps {
  title: string;
}

interface ChartData {
  month: string;
  x: number;
  amount: number;
}

const data = [
  { name: "Jan", X: 4000, amt: 2400 },
  { name: "Feb", X: 3000, amt: 2210 },
  { name: "Mar", X: 2000, amt: 2290 },
  { name: "Apr", X: 2780, amt: 2000 },
  { name: "May", X: 1890, amt: 2181 },
  { name: "Jun", X: 2390, amt: 2500 },
];


const ChartCard: React.FC<ChartCardProps> = ({ title }) => {

  // const [data, setData] = useState<ChartData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("your_api_endpoint_here");
  //       const formattedData: ChartData[] = response.data.map((item: any) => ({
  //         month: item.name,
  //         x: item.X,
  //         amount: item.amt,
  //       }));
  //       setData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <Box sx={{ maxWidth: 550, margin: "auto", marginTop: 2 }}>
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
          {/* Use the title prop */}
          <Typography variant="h5" component="h2" textAlign="center">
            {title}
          </Typography>
          <br />
          <div style={{ width: "100%", height: 300 }}>
            <LineChart
              width={500} // Adjust this width to fit your design
              height={250}
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              {/* <Line type="monotone" dataKey="Y" stroke="#8884d8" /> */}
              <Line type="monotone" dataKey="X" stroke="#82ca9d" />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChartCard;

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, Typography, Box } from "@mui/material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import axios from "axios";

// interface ChartData {
//   month: string;
//   x: number;
//   amount: number;
// }

// interface ChartCardProps {
//   title: string;
// }

// const ChartCard: React.FC<ChartCardProps> = ({ title }) => {
//   const [data, setData] = useState<ChartData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("your_api_endpoint_here");
//         const formattedData: ChartData[] = response.data.map((item: any) => ({
//           month: item.name,
//           x: item.X,
//           amount: item.amt,
//         }));
//         setData(formattedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box sx={{ maxWidth: 550, margin: 'auto', marginTop: 2 }}>
//       <Card sx={{
//             borderRadius: "10px",
//             backgroundColor: "#f1e0c5",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "box-shadow 0.3s, background-color 0.3s",
//             "&:hover": {
//               boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//               backgroundColor: "",
//             },
//           }}>
//         <CardContent>
//           <Typography variant="h5" component="h2" textAlign="center">
//             {title}
//           </Typography>
//           <br />
//           <div style={{ width: "100%", height: 300 }}>
//             <LineChart
//               width={500}
//               height={250}
//               data={data}
//               margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//             >
//               <XAxis dataKey="month" />
//               <YAxis />
//               <CartesianGrid strokeDasharray="3 3" />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="amount" stroke="#8884d8" />
//               <Line type="monotone" dataKey="x" stroke="#82ca9d" />
//             </LineChart>
//           </div>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default ChartCard;
