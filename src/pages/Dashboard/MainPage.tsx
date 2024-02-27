import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import DashboardCards from "./Cards";
const MainPage: React.FC = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default MainPage;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DashboardCards from "./Cards";
// import ChartCard from "./Charts";
// import PieChartCard from "./PieChart";

// const API_URL = "http://example.com/api/data"; // Replace this with your actual API URL

// const Dashboard = () => {
//   const [topSales, setTopSales] = useState<number | null>(null);
//   const [totalSales, setTotalSales] = useState<number | null>(null);
//   const [customers, setCustomers] = useState<number | null>(null);
//   const [orders, setOrders] = useState<number | null>(null);
//   const [chartData, setChartData] = useState([]);
//   const [pieChartData, setPieChartData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         const data = response.data;

//         setTopSales(data.topSales);
//         setTotalSales(data.totalSales);
//         setCustomers(data.customers);
//         setOrders(data.orders);
//         setChartData(data.chartData);
//         setPieChartData(data.pieChartData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <DashboardCards
//         topSales={topSales ?? 0} // Provide a default value if topSales is null
//         totalSales={totalSales ?? 0} // Provide a default value if totalSales is null
//         customers={customers ?? 0} // Provide a default value if customers is null
//         orders={orders ?? 0} // Provide a default value if orders is null
//       />
//       <ChartCard title="Monthly Sale"  /> /* Pass chartData as prop
//       <PieChartCard title="Pie Chart" data={pieChartData} /> 
//     </div>
//   );
// };

// export default Dashboard;
