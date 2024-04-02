// import React from "react";
// import { Card, CardContent, Typography, Box } from "@mui/material";
// import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

// interface PieChartCardProps {
//   title: string;
//   data: { name: string; value: number }[];
//   colors?: string[];
// }

// const PieChartCard: React.FC<PieChartCardProps> = ({
//   title,
//   data,
//   colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"],
// }) => {
//   return (
//     <Box sx={{ maxWidth: 550, margin: "auto", marginTop: 2 }}>
//       <Card
//         sx={{
//           borderRadius: "10px",
//           backgroundColor: "#f1e0c5",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           transition: "box-shadow 0.3s, background-color 0.3s",
//           "&:hover": {
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//             backgroundColor: "",
//           },
//         }}
//       >
//         <CardContent>
//           <Typography variant="h5" component="h2" textAlign="center">
//             {title}
//           </Typography>
//           <br />
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <PieChart width={400} height={300}>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={105}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {data.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={colors[index % colors.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </div>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PieChartCard;

// // 0
// // :
// // "16"
// // 1
// // :
// // "34"
// // 2
// // :
// // "50"
// // 3
// // :
// // "21"
// // 4
// // :
// // "19"

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
}
interface CustomTooltipProps {
  active: boolean;
  payload?: Array<{ name: string; value: number }>; // Make payload optional
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid black", padding: "10px", borderRadius: "10px" }}>
        <p>{payload[0].name}</p> {/* Access name directly */}
        <p>{payload[0].value}</p> {/* Access value directly */}
      </div>
    );
  }

  return null;
};

const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"],
}) => {
  return (
    <Box sx={{ maxWidth: 550, margin: "auto", marginTop: 2, }}>
      <Card
        sx={{
          borderRadius: "10px",
          backgroundColor: "#f1e0c5",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s, background-color 0.3s",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center">
            {title}
          </Typography>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PieChart width={400} height={300} margin={{ top: -20 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip active={false} />} />
              {/* <Legend
                wrapperStyle={{
                  marginTop: "50px",
                  textAlign: "center",
                }}
              /> */}

              {/* <div style={{ marginTop: "50px", textAlign: "center" }}>
                <Legend />
              </div> */}
            </PieChart>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PieChartCard;
