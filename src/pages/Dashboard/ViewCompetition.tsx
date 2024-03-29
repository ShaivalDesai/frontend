// import React from 'react';
// import SalesComparisonChart from '../../Components/BarGraph';
// import './App.css';

// const ViewCompetition: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <SalesComparisonChart />
//       </header>
//     </div>
//   );
// }

// export default ViewCompetition;

import React, { useEffect } from "react";
import SalesComparisonChart from "../../Components/BarGraph";

import DashboardN from "../../Components/DashboardNavbar";
// import { LineChart } from "recharts/types/chart/LineChart";
import LineGraph from "../../Components/LineGraph";
import LineGraph2 from "../../Components/LineGraph2";
const ViewCompetition: React.FC = () => {
  return (
    <>
      <div
        // style={{
        //   background: "#d4d4d4",
        // }}
      >
        <SalesComparisonChart />
      </div>
    </>
  );
};

export default ViewCompetition;
