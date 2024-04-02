// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import { Delete, Add } from "@mui/icons-material";
// import Navbar from "../Navbar";

// interface Product {
//   product_id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   image: string[];
// }

// const WishlistPage = ({
//   wishlist: initialWishlist,
// }: {
//   wishlist: Product[];
// }) => {
//   const [wishlist, setWishlist] = useState<Product[]>(initialWishlist);
//   const [cartState, setCartState] = useState<Product[]>([]);
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   const tableHeaderStyle: React.CSSProperties = {
//     padding: "8px 16px", // Adjusted padding here
//     textAlign: "center",
//     borderBottom: "1px solid #ddd",
//     backgroundColor: "#724c31",
//     color: "white",
//     fontSize: "21px",
//   };

//   const tableCellStyle: React.CSSProperties = {
//     padding: "8px",
//     textAlign: "center",
//     borderBottom: "1px solid #ddd",
//     fontSize: "20px",
//   };

//   const imageStyle: React.CSSProperties = {
//     width: "80px",
//     height: "auto",
//     borderRadius: "8px",
//   };

//   // useEffect(() => {
//   //   const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//   //   setWishlist(storedWishlist);
//   // }, []);

//   const handleRemoveFromWishlist = (productId: number) => {
//     const updatedWishlist = wishlist.filter(
//       (item) => item.product_id !== productId
//     );
//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   const addToCart = (product: Product) => {
//     // Fetch the current cart from localStorage or initialize it as an empty array
//     const currentCart = JSON.parse(
//       localStorage.getItem("cart") || "[]"
//     ) as Product[];

//     // Check if the product is already in the cart
//     const isProductInCart = currentCart.some(
//       (item: Product) => item.product_id === product.product_id
//     );

//     if (!isProductInCart) {
//       // If the product is not in the cart, add it
//       const updatedCart = [...currentCart, product];

//       // Update the cart in the local storage
//       localStorage.setItem("cart", JSON.stringify(updatedCart));

//       // Update state (if you're using it to reflect the cart changes immediately in the UI)
//       setCartItems(updatedCart); // Assuming setCartItems is managing a state used for rendering
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Box sx={{ flexGrow: 1, padding: 3 }}>
//         <Grid container spacing={4} justifyContent="center">
//           <Grid item xs={12}>
//             {wishlist.length > 0 ? (
//               <TableContainer
//                 component={Paper}
//                 elevation={3}
//                 sx={{
//                   borderRadius: "12px",
//                   overflowX: "auto",
//                   maxWidth: "80%", // Adjust the maximum width as needed
//                   margin: "auto",
//                 }}
//               >
//                 <Table aria-label="wishlist table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell style={tableHeaderStyle}>
//                         Product Image
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>Brand</TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Product Type
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>Price</TableCell>
//                       <TableCell style={tableHeaderStyle}>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {wishlist.map((product) => (
//                       <TableRow key={product.product_id} hover>
//                         <TableCell style={tableCellStyle}>
//                           <img
//                             src={`data:image/jpeg;base64,${product.image}`}
//                             alt={product.product_type}
//                             style={imageStyle}
//                           />
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           {product.brand}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           {product.product_type}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           ₹{product.price.toFixed(2)}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           <div
//                             style={{ display: "flex", alignItems: "center" }}
//                           >
//                             <IconButton
//                               aria-label="remove"
//                               onClick={() =>
//                                 handleRemoveFromWishlist(product.product_id)
//                               }
//                               title="Remove from wishlist"
//                               style={{ marginLeft: "80px" }} // Adjust margin as needed
//                             >
//                               <Delete />
//                             </IconButton>
//                             <IconButton
//                               aria-label="add"
//                               onClick={() => addToCart(product)}
//                               title="Add to Cart" // Set the title attribute
//                             >
//                               <Add />
//                             </IconButton>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <Typography
//                 style={{ textAlign: "center", fontSize: "25px" }}
//                 variant="body1"
//               >
//                 Your wishlist is empty!
//               </Typography>
//             )}
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default WishlistPage;







import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Navbar from "../Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image: string[]; // Assuming image is stored as string URL
}

// const tableHeaderStyle: React.CSSProperties = {
//       padding: "8px",
//       textAlign: "left",
//       borderBottom: "1px solid #ddd",
//       // backgroundColor: "#724c31",
//       color: "white",
//     };

const tableCellStyle: React.CSSProperties = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};


const WishlistPage = ({
  wishlist: initialWishlist,
}: {
  // wishlist: { [key: string]: Product };
  wishlist: Product[];
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const c_id = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ [key: string]: Product }>(
          "http://127.0.0.1:8000/wishlist/" + c_id
        );
        if (response.data && typeof response.data === "object") {
          setWishlist(Object.values(response.data));
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/wishlist_remove/${c_id}/${productId}`
      );
      if (response.status === 200) {
        window.alert("Product removed from wishlist successfully");
        window.location.reload();
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const addToCart = async (product: number) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/cart_add/${c_id}/${product}`
      );
      if (response.status === 200) {
        window.alert("Product added to cart successfully");
        window.location.reload();
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={10}>
            {wishlist.length > 0 ? (
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                  borderRadius: "12px",
                  overflowX: "auto",
                  maxWidth: "80%", // Adjust the maximum width as needed
                  justifyContent: "center",
                  display: "flex",
                  margin: "auto",
                }}
              >
                <Table aria-label="wishlist table">
                  <TableHead style={{ backgroundColor: "#724c31" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>Product Image</TableCell>
                      <TableCell style={{ color: "white" }}>Brand</TableCell>
                      <TableCell style={{ color: "white" }}>Product Type</TableCell>
                      <TableCell style={{ color: "white" }}>Price</TableCell>
                      <TableCell colSpan={2} style={{ color: "white", textAlign: "center" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wishlist.map((product) => (
                      <TableRow key={product.product_id} hover>
                        <TableCell>
                          <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.product_type}
                            style={{ width: "70px", height: "70px", borderRadius: "8px" }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: "18px" }}>
                            {product.brand}
                          </Typography>
                        </TableCell>
                        <TableCell>{product.product_type}</TableCell>
                        <TableCell>
                          {product.price !== undefined ? `₹${product.price.toFixed(2)}` : 'Price not available'}

                        </TableCell>
                        <TableCell>
                         
                          <Button variant="contained" startIcon={<AddCircleRoundedIcon />} style={{ fontSize: "12px" }}
                            onClick={() => addToCart(product.product_id)}
                          >
                            Add to Cart
                          </Button>
                        
                          <Button variant="contained" startIcon={<Delete />} style={{ fontSize: "12px  ", marginLeft: "10px" }}
                            onClick={() => handleRemoveFromWishlist(product.product_id)}
                          >
                            Remove
                          </Button>

                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography style={{ textAlign: "center", fontSize: "25px" }} variant="body1">
                Your wishlist is empty!
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default WishlistPage;
