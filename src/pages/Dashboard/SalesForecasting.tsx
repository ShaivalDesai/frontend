import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import DashboardCards from "./Cards";
import DashboardN from "../../Components/DashboardNavbar";
import LineGraph from "../../Components/LineGraph";
const SalesForecasting: React.FC = () => {
  return (
    <>
     <DashboardN/>
      <LineGraph/>
    </>
  );
};

export default SalesForecasting;