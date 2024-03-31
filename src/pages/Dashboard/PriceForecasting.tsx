import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import DashboardCards from "./Cards";
import DashboardN from "../../Components/DashboardNavbar";
import LineGraph from "../../Components/LineGraph";
import { LineChart } from "recharts/types/chart/LineChart";
import LineGraph2 from "../../Components/LineGraph2";
// import LineGraph2 from "../../Components/LineGraph2";

const PriceForecasting: React.FC = () => {
  return (
    <>
      <div
        style={{
          background:
            "#d4d4d4",
        }}
      >
        <DashboardN />

        <LineGraph />
      </div>
    </>
  );
};

export default PriceForecasting;
