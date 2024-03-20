// // import React from "react";

// // import {
// //   Card,
// //   CardActionArea,
// //   CardContent,
// //   CardMedia,
// //   Box,
// //   Typography,
// //   IconButton,
// //   Button,
// //   Paper,
// // } from "@mui/material";

// // interface CustomCardProps {
// //   // product_id: number;
// //   image: string;
// //   brand: string;
// //   product_type: string;
// //   price: number;
// // }

// // const CustomProductCard: React.FC<CustomCardProps> = ({
// //   image,
// //   brand,
// //   product_type,
// //   price,
// // }) => {
// //   return (
// // <>
// // <Paper elevation={3} style={{ padding: "30px", width: "400px", height: "200px", marginBottom: "20px" }}>
// //   <Box display="flex" alignItems="center" justifyContent="space-between">
// //     {/* Image */}
// //     <Card style={{ height: "auto" }}>
// //       <CardActionArea>
// //         <CardMedia
// //           component="img"
// //           src={`data:image/jpeg;base64,${image}`}
// //           alt="Product Image"
// //           style={{ maxHeight: 200, width: "auto" }} // Adjust the maxHeight and width as needed
// //         />
       
// //       </CardActionArea>
// //     </Card>

   
// //     <Box ml={2} flex={1}>
// //       <Typography gutterBottom variant="h6" component="h2">
// //         {brand}
// //       </Typography>
// //       <Typography variant="body1" color="text.secondary">
// //         Product Type: {product_type}
// //       </Typography>
// //       <Typography variant="body1" color="text.secondary">
// //         Price: ₹{price.toFixed(2)}
// //       </Typography>
// //     </Box>
// //   </Box>
// //   </Paper>
// // </>

// //   );
// // };

// // export default CustomProductCard;


// import React from "react";
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Box,
//   Typography,
//   Paper,
// } from "@mui/material";

// interface CustomCardProps {
//   brand: string;
//   product_type: string;
//   price?: number; // Making price non-compulsory
//   image?: string; // Making image non-compulsory
// }

// const CustomProductCard: React.FC<CustomCardProps> = ({
//   image,
//   brand,
//   product_type,
//   price,
// }) => {
//   return (
//     <>
//       <Paper
//         elevation={3}
//         style={{
//           padding: "30px",
//           width: "300px",
//           height: "380px",
//           marginBottom: "20px",
//         }}
//       >
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           {/* Image */}
//           {image && (
//             <Card style={{ height: "auto" }}>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   src={`data:image/jpeg;base64,${image}`}
//                   alt="Product Image"
//                   style={{ maxHeight: 200, width: "auto" }} // Adjust the maxHeight and width as needed
//                 />
//               </CardActionArea>
//             </Card>
//           )}

//           <Box ml={2} flex={1}>
//             <Typography gutterBottom variant="h6" component="h2">
//               {brand}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Product Type: {product_type}
//             </Typography>
//             {price && (
//               <Typography variant="body1" color="text.secondary">
//                 Price: ₹{price.toFixed(2)}
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </Paper>
//     </>
//   );
// };

// export default CustomProductCard;




import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Paper,
} from "@mui/material";

interface CustomCardProps {
  brand: string;
  product_type: string;
  price?: number;
  image?: string;
}

const CustomProductCard: React.FC<CustomCardProps> = ({
  image,
  brand,
  product_type,
  price,
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        width: "300px",
        height: "400px",
        marginBottom: "20px",
        // backgroundColor:"#f1e0c5",
      }}
    >
    {image && (
             <Box style={{ width: "100%", height: "auto", overflow: "hidden" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={`data:image/jpeg;base64,${image}`}
                  alt="Product Image"
                  style={{ maxHeight: 330, width:"300px" ,objectFit: "contain"}} // Adjust the maxHeight and width as needed
                />
              </CardActionArea>
            </Box>
          )}


<Box style={{ textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
        <Typography gutterBottom variant="h6" component="h2">
          {brand}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Product Type: {product_type}
        </Typography>
        {price && (
          <Typography variant="body1" color="text.secondary">
            Price: ₹{price.toFixed(2)}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default CustomProductCard;


