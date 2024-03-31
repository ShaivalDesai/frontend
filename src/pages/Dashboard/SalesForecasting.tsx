import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import DashboardCards from "./Cards";
import DashboardN from "../../Components/DashboardNavbar";
// import { LineChart } from "recharts/types/chart/LineChart";
import LineGraph from "../../Components/LineGraph";

// import LineGraphS from "../../Components/LineGraphS";
const SalesForecasting: React.FC = () => {


    
  return (
    <>
     <DashboardN/>
     <div  style={{ marginTop: "100px" }}>
     <LineGraph/>
     </div>
    </>
  );
};

export default SalesForecasting;