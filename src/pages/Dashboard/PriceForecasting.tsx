import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import DashboardCards from "./Cards";
import DashboardN from "../../Components/DashboardNavbar";
import LineGraph from "../../Components/LineGraph";
import { LineChart } from "recharts/types/chart/LineChart";
import LineGraph2 from "../../Components/LineGraph2";

const PriceForecasting: React.FC = () => {


    
  return (
    <>
     <DashboardN/>
     <div  style={{ marginTop: "100px" }}>
     <LineGraph2/>
     </div>
    </>
  );
};

export default PriceForecasting;