import React, { useEffect } from "react";
import DashboardN from "../../Components/DashboardNavbar";
import LineGraph2 from "../../Components/LineGraph2";

const SalesForecasting: React.FC = () => {
  return (
    <>
      <div
        style={{
          background: "#d4d4d4",
        }}
      >
        <DashboardN />
        <LineGraph2 />
      </div>
    </>
  );
};

export default SalesForecasting;
