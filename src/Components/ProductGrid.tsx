// // import React from "react";
// // import {
// //   Typography,
// //   Box,
// //   CardActionArea,
// //   CardContent,
// //   CardMedia,
// //   Grid,
// //   Card,
// //   styled,
// // } from "@mui/material";

// // interface Product {
// //   product_id: number;
// //   product_type: string;
// //   brand: string;
// //   price: number;
// //   photo: string[];
// // }

// // const CustomCard = styled(Card)(({ theme }) => ({
// //   maxWidth: 345,
// //   maxHeight: 650,
// //   width: "100%",
// //   margin: "auto",
// //   transition: "0.3s",
// //   borderRadius: "10px",
// //   "&:hover": {
// //     transform: "scale(1.05)",
// //     boxShadow: theme.shadows[20],
// //   },
// // }));

// // const ProductGrid: React.FC<{ product: Product[] }> = ({ product }) => {
// //   return (
// //     <Box sx={{ flexGrow: 1, padding: 3 }}>
// //       <Grid container spacing={4} justifyContent="center">
// //         {product.map((product) => (
// //           <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
// //             <CustomCard>
// //               <CardActionArea>
// //                 <CardMedia
// //                   component="img"
// //                   src={`data:image/jpeg;base64,${product.photo}`}
// //                   alt={product.product_type}
// //                 />
// //                 <CardContent>
// //                   <Typography gutterBottom variant="h6" component="h2">
// //                     {product.brand}
// //                   </Typography>
// //                   <Typography variant="body1" color="text.secondary">
// //                     Product Type: {product.product_type}
// //                   </Typography>
// //                   <Typography variant="body1" color="text.secondary">
// //                     Price: ₹{product.price.toFixed(2)}
// //                   </Typography>
// //                 </CardContent>
// //               </CardActionArea>
// //             </CustomCard>
// //           </Grid>
// //         ))}
// //         {product.length === 0 && (
// //           <Typography variant="body1">No products to display.</Typography>
// //         )}
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default ProductGrid;



// import React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Box, Grid, CardActionArea } from "@mui/material";

// interface Product {
//   product_id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   photo: string[]; // Assuming photo is an array of image URLs
// }

// const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       {product.photo.map((photoUrl, index) => (
//         <CardMedia
//           key={index}
//           component="img"
//           height="140"
//           src={`data:image/jpeg;base64,${product.photo}`}
//           alt={`${product.brand} - ${index}`} // Add index to make alt text unique
//         />
//       ))}
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.brand}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Type: {product.product_type}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Price: {product.price}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;



import React from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
  Card,
  styled,
  Grid,
  Box,
} from "@mui/material";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  photo: string[]; // Assuming photo is an array of image URLs
}

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  maxHeight: 650,
  width: "100%",
  margin: "auto",
  transition: "0.3s",
  borderRadius: "10px",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[20],
  },
}));

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
 
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <CustomCard>
        <CardActionArea>
          {product.photo.map((photoUrl, index) => (
            <CardMedia
              key={index}
              component="img"
              height="500"
              src={`data:image/jpeg;base64,${photoUrl}`} // Fixing photo URL
              alt={`${product.brand} - ${index}`} // Add index to make alt text unique
            />
          ))}
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {product.brand}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Product Type: {product.product_type}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Price: ₹{product.price.toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </CustomCard>
    </Grid>
    
      </Box>
  );
};

export default ProductCard;

