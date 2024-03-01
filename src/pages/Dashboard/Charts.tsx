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
  data: { month: string; quantity: number }[];
}

export interface ChartData {
  month: string;
  quantity: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, data }) => {
  // State to hold the chart data
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Set the chart data when the component mounts or when the data prop changes
    setChartData(data);
  }, [data]);

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
          <Typography variant="h5" component="h2" textAlign="center">
            {title}
          </Typography>
          <br />
          <div style={{ width: "100%", height: 300 }}>
           
            <LineChart
              width={500}
              height={250}
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="quantity" stroke="#00008B" />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChartCard;

