import React from "react";
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


interface ChartCardProps {
  title: string; 
}

const data = [
  { name: "Jan", X: 4000, Y: 2400, amt: 2400 },
  { name: "Feb", X: 3000, Y: 1398, amt: 2210 },
  { name: "Mar", X: 2000, Y: 9800, amt: 2290 },
  { name: "Apr", X: 2780, Y: 3908, amt: 2000 },
  { name: "May", X: 1890, Y: 4800, amt: 2181 },
  { name: "Jun", X: 2390, Y: 3800, amt: 2500 },
  
];

// Adjust the component to accept props
const ChartCard: React.FC<ChartCardProps> = ({ title }) => {
  return (
    <Box sx={{ maxWidth: 550, margin: 'auto', marginTop: 2 }}>
      <Card  sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}>
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
              <Line type="monotone" dataKey="Y" stroke="#8884d8" />
              <Line type="monotone" dataKey="X" stroke="#82ca9d" />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChartCard;
