import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

// Define the props interface
interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
}

const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
}) => {
  return (
    <Box sx={{ maxWidth: 550, margin: "auto", marginTop: 2 }}>
      <Card sx={{
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
          <Typography variant="h5" component="h2" textAlign="center">
            {title}
          </Typography>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PieChartCard;
