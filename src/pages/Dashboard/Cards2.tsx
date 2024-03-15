// import React from "react";
// import { Card, CardContent, Typography, Grid } from "@mui/material";

// interface DashboardCardsProps {
//   name: string;
//   onClick?: () => void; 
// }

// const DashboardCards: React.FC<DashboardCardsProps> = ({ name, onClick }) => {
//   return (
//     <Grid item xs={12} sm={6} md={3}>
//       <Card
//         sx={{
//           borderRadius: "10px",
//           backgroundColor: "#f1e0c5",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           transition: "box-shadow 0.3s, background-color 0.3s",
//           "&:hover": {
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//             backgroundColor: "",
//             cursor: "pointer", // Change cursor to pointer on hover
//           },
//         }}
//         onClick={onClick} // Attach onClick handler to the card
//       >
//         <CardContent>
//           <Typography variant="h5" component="h2">
//             {name}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };

// export default DashboardCards;



// import React from "react";
// import { Card, CardContent, Typography, Grid } from "@mui/material";

// interface DashboardCardsProps {
//   name: string;
//   onClick?: () => void; // Define onClick prop as optional function
// }

// const DashboardCards: React.FC<DashboardCardsProps> = ({ name, onClick }) => {
//   return (
//     <Grid item xs={12} sm={6} md={3}>
//       <Card
//         sx={{
//           borderRadius: "10px",
//           backgroundColor: "#f1e0c5", // Light background color
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           transition: "box-shadow 0.3s, background-color 0.3s",
//           width: "100%", // Set fixed width for the card
//           height: "150%", // Set fixed height for the card
//           "&:hover": {
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//             backgroundColor: "",
//             cursor: "pointer",
//             justifyContent:"center" // Change cursor to pointer on hover
//           },
//         }}
//         onClick={onClick} // Attach onClick handler to the card
//       >
//         <CardContent>
//           <Typography variant="h5" component="h2" textAlign="center">
//             {name}
//           </Typography>
//           {/* Additional design elements */}
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
        
//             {/* <img
//               src="https://via.placeholder.com/150"
//               alt="placeholder"
//               style={{ marginTop: "10px", borderRadius: "50%" }}
//             /> */}
//           </div>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };

// export default DashboardCards;


import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface DashboardCardsProps {
  name: string;
  onClick?: () => void; // Define onClick prop as optional function
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ name, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          borderRadius: "10px",
          backgroundImage: "linear-gradient(45deg, #D2B48C, #DEB887)", // Gradient background
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s, background-color 0.3s",
          width: "200px", // Set fixed width for the card
          height: "100px", // Set fixed height for the card (adjusted height)
          display: "flex", // Make the card a flex container
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          },
        }}
        onClick={onClick} // Attach onClick handler to the card
      >
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DashboardCards;

